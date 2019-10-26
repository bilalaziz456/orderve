const utils = require('./utils.js');
const stringConstants = require('../constants/string');
const sideMenuPageObject = require('./side_menu_page_object');

function SignInPageObject() {
    this.elements = {
        signInText: element(by.css('.signIn div.signInWrapper h4')),
        emailField: element(by.css('.signInWrapper input#email')),
        passwordField: element(by.css('.signInWrapper input#pass')),
        loginBtn: element(by.css('.signInWrapper form button')),
        validationErrorMessageText: element(by.css('div.message-error.message div[data-bind=\'html: message.text\']')),
        loginFailureMessageText: element(by.css('div[role=\'alert\'] div div'))
    };
    this.waitForSignInPage = () => {
       return utils.waitForElementToBePresent(this.elements.signInText, 30000, 'Sign In text taking too much time to appear');
    };
    this.setCredentials = (email, password) => {
        return this.waitForSignInPage().then(()=>{
            return this.elements.emailField.sendKeys(email).then(()=>{
                return this.elements.passwordField.sendKeys(password)
            })
        });
    };
    this.validateErrorMessageText = () => {
        return utils.waitForElementToBePresent(this.elements.validationErrorMessageText, 30000, 'Validation error text taking too much time to appear').then(()=>{
            expect(this.elements.validationErrorMessageText.getText()).toEqual(stringConstants.SIGN_IN_VALIDATION_ERROR_MESSAGE)
        })
    };
    this.validateLoginFailureInvalidCredentials = () => {
        utils.waitForElementToBePresent(this.elements.loginFailureMessageText, 30000, 'Login failure text');
        expect(this.elements.loginFailureMessageText.getText()).toEqual(stringConstants.SIGN_IN_INVALID_CREDENTIALS_MESSAGE);
    };
    this.validateLoginSuccess = () => {
        let myAccountMenuToggleBtn = sideMenuPageObject.elements.myAccountMenuToggleBtn;
        return utils.waitForElementToBePresent(myAccountMenuToggleBtn, 30000, 'Account toggle button').then(()=>{
            return sideMenuPageObject.pressSideMenuBtn();
            expect(myAccountMenuToggleBtn.getText()).toEqual('My Account');
        })

    };
    this.performSignIn = (userName, password) => {
       return this.setCredentials(userName, password).then(()=>{
           return this.elements.loginBtn.click();
       })

    }
}

module.exports = new SignInPageObject();