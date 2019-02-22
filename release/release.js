//1. From the root of your project create a subdirectory called 'scripts'
//2. Add 'release.js' to 'scripts' directory
//3. Add this script to your package
/*
  "scripts": {
    "release": "node scripts/release"
  },
*/
//5. Install additional dependencies
/*
 yarn add child-process-promise lodash bluebird
*/
//6. Commit your changes
//7. Release your first tagged version
/*
yarn release
*/


const exec = require('child-process-promise').exec;
const _ = require('lodash');
const Promise = require('bluebird');

Promise.mapSeries([
	() => handleExec( exec('git pull origin') ),
	() => handleExec( exec('git status') )
], handler => handler() )
.then( results => _.last( results ) )
.then( ( status ) => {
	if( _.find( status.split('\n'), item => {
		return /Changes (to be|not staged for) commit/.test(item) ? true : false
	} ) ){
		throw new Error('You must commit all your changes before releasing');
	}

	const releaseType = process.argv[2] || 'patch';
	console.log( `creating '${releaseType}' release...`);
	
	handleExec( exec(`npm version ${releaseType}`) )
	.then( data => {
		const version = /v([0-9]+\.[0-9]+\.[0-9]+)/.exec( data )[1];
		console.log(`tagging release '${version}'...`);
		return handleExec( exec(`git tag ${version}`) )
		.then( data => {
			console.log('pushing release to Github...');
			Promise.mapSeries( [
				() => handleExec( exec(`git push origin`) ),
				() => handleExec( exec(`git push origin --tags`) )
			], ( func ) => func() )
			.then( data => {
				handleExec( exec(`git remote -v`) )
				.then( info => {
					const origin = info.split('\n')[0];
					const [match,team,repo] = /([a-zA-Z0-9\-_]+)\/([a-zA-Z0-9\-_]+).git/.exec( origin );
					const teamId = _.replace(_.lowerCase(team),' ','');
					const pckg = require('../package.json');
					console.log('update your dependencies...\n');
					console.log( `https://github.com/${team}/${repo}/releases/tag/${version}\n-or-` );
					console.log( `"${pckg.name}": "github:${teamId}/${repo}#${version}"\n-or-` );
					console.log( `yarn add ${team}/${repo}#${version}\n...` );
				} );
	
			} )
		} )
	} );
})
.catch( err => console.error( err.message ) );


function handleExec( promise ){
	return promise.then( data => data.stdout.toString() )
}
