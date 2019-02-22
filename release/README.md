1. From the root of your project create a subdirectory called 'scripts'
2. Add 'release.js' to 'scripts' directory
3. Add this script to your package.json (adds useful short cut instead of 'node scripts/release.js')
```
  "scripts": {
    "release": "node scripts/release"
  },
```
5. Install additional dependencies
```
 yarn add child-process-promise lodash bluebird
```
6. Commit your changes
7. Release your first tagged version
```
yarn release
```
The nice thing is on release it gives you a list of options for updating your projects with this dependency
