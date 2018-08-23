const packageJson = require('../../package.json');

export const environment = {
  appName: 'Salvation With Truth',
  envName: 'TEST',
  production: false,
  test: true,
  i18nPrefix: '',
  firebase: {
    apiKey: 'AIzaSyBRIkLBv6A4eqiDiu6aepPo_O1BdDO-2Lc',
    authDomain: 'salvationwithtruth.firebaseapp.com',
    databaseURL: 'https://salvationwithtruth.firebaseio.com',
    projectId: 'salvationwithtruth',
    storageBucket: '',
    messagingSenderId: '880870946140'
  },
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript']
  },
  numberOfBits: 32,
  characters: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
};
