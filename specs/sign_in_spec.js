const {BASE_URL} = require('../constants/urls');
const {USER_NAME, PASSWORD, INVALID_USER_NAME, INVALID_PASSWORD} = require('../constants/values');
const sideMenuPageObject = require('../page_objects/side_menu_page_object');
const signInPageObject = require('../page_objects/sign_in_page_object');

describe('Sign in functionality tests', function () {
    beforeAll(() => {
        browser.waitForAngular(false);
        browser.get(BASE_URL);
    });
    it('Fields validation test', () => {
        browser.manage().deleteAllCookies().then(()=>{
            browser.get(BASE_URL).then(()=>{
                sideMenuPageObject.goToSignInPage().then(() => {
                    signInPageObject.performSignIn('', '');
                }).then(() => {
                    signInPageObject.validateErrorMessageText();
                });
            });
        });
    });
    it('Unsuccessful login test', () => {
        browser.manage().deleteAllCookies().then(()=>{
            browser.get(BASE_URL).then(()=>{
                sideMenuPageObject.goToSignInPage().then(() => {
                    signInPageObject.performSignIn(INVALID_USER_NAME, INVALID_PASSWORD);
                }).then(() => {
                    signInPageObject.validateLoginFailureInvalidCredentials();
                });
            });
        });
    });
    it('Successful login test', () => {
        browser.manage().deleteAllCookies().then(()=>{
            browser.get(BASE_URL).then(()=>{
                sideMenuPageObject.goToSignInPage().then(() => {
                    signInPageObject.performSignIn(USER_NAME, PASSWORD);
                }).then(() => {
                    signInPageObject.validateLoginSuccess();
                });
            });
        });
    });
    afterAll(() => {
        browser.manage().deleteAllCookies();
    });
});