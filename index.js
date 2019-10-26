const config = require('./config/protractor_conf').config;
const suiteName = require('./config/test_suits');

config.suites = [
    //suiteName.spec1,
    //suiteName.spec2,
      suiteName.signIn
];
exports.config = config;
