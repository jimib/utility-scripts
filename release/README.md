1. From the root of your project create a subdirectory called 'scripts'
2. Add 'release.js' to 'scripts' directory
3. Add this script to your package
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
The nice thing is on release it gives you commands required to update your projects with this dependency
