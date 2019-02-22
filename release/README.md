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
//default
yarn release
//patch
yarn release patch
//minor
yarn release minor
//major
yarn release major
```
The nice thing is on release it gives you a list of options for updating your projects with this dependency
Example output:

```
https://github.com/Jimib/utility-scripts/releases/tag/1.0.0
-or-
"utility": "github:Jimib/utility-scripts#1.0.0"
-or-
yarn add Jimib/utility-scripts#1.0.0
```
