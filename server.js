require('app-module-path').addPath(__dirname);
const App = require("app/index");
global.config = require('./config/index');
new App();