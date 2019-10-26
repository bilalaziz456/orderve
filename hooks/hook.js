const {BASE_URL} = require('../constants/urls');

module.exports = {
    beforeAll: function () {
        browser.waitForAngular(false);
        browser.manage().deleteAllCookies();
        browser.get(BASE_URL);
    },

    afterAll: function () {

    }
};