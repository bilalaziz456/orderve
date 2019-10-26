var common = require('../../page_objects/utils')
// var email = "omccormack" + common.generateRandomNumber(10000, 99999) + "@codal.com";
var email = "omccormack9998@codal.com";
var pswdText = "6azGdWw3YQ8849GW";
module.exports = {

    toElement: {
        //SignIn
        signIn:     element(by.xpath("//a[@class='signin']")),
        createAcct: element(by.xpath("//a[@class='btn accentBtn accentBtnInvert']")),
        FirstName:  element(by.xpath("//input[@id='firstname']")),
        LastName:   element(by.xpath("//input[@id='lastname']")),
        Email:      element(by.xpath("//input[@id='email_address']")),
        Pwd:        element(by.xpath("//input[@id='password']")),
        Cpwd:       element(by.xpath("//input[@id='password-confirmation']")),
        Consumer:   element(by.xpath("(//span[@class='radioText'])[1]")),
        CreateAcctBtn: element(by.xpath("//button[@class='btn accentBtn']")),
        ValidationMsg: element(by.xpath("//div[@data-bind='html: message.text' and contains(text(), 'You must confirm your account')]")),
        CreateAcctHeader: element(by.xpath("//*[@class='col-12 col-lg-5 text-center']//h4")),

        //signIn
        un: element(by.id('email')),
        pw: element(by.id('pass')),
        MyAcct: element(by.xpath("//a[@class='dropdown-toggle my-account-toggle']")),
        
    },

    VerifyAcct: function () {
        common.waitForElement(this.toElement.MyAcct, 5000);
        var AcctOvw= element(by.linkText('Account Overview'));
        return this.toElement.MyAcct.click().then(function(){
            common.waitForElement(AcctOvw, 5000);
            AcctOvw.click().then(function(){
                expect(element(by.xpath("//div[@class='order-top-heading']//h2")).getText()).toEqual('Account Overview');
            })
        })
    },

    enterSignInUserName: function () {
        common.waitForElement(this.toElement.un, 5000);
        return this.toElement.un.sendKeys(browser.params.username);
    },

    enterSignInPassword: function () {
        common.waitForElement(this.toElement.pw, 2000);
        return this.toElement.pw.sendKeys(browser.params.password);
    },

    signInButton: function () {
        return this.toElement.CreateAcctBtn.click();
    },

    clickSignIn: function () {
        common.waitForElement(this.toElement.signIn, 5000);
        return this.toElement.signIn.click();
        //    return this.toElement.searchbar.sendKeys('cheese');
    },

    clickCreateAcct: function () {
        common.waitForElement(this.toElement.createAcct, 5000);
        return this.toElement.createAcct.click();
    },

    enterFirstName: function () {
        common.waitForElement(this.toElement.FirstName, 2000);
        return this.toElement.FirstName.sendKeys('AutoFirst');
    },

    enterLastName: function () {
        common.waitForElement(this.toElement.LastName, 2000);
        return this.toElement.LastName.sendKeys('AutoLast');
    },

    enterEmail: function () {
        common.waitForElement(this.toElement.Email, 2000);
        return this.toElement.Email.sendKeys(email);
    },

    enterPassword: function () {
        common.waitForElement(this.toElement.Pwd, 5000);
        this.toElement.Pwd.sendKeys(pswdText);
        expect(this.toElement.CreateAcctHeader.getText()).toEqual('Create Account');
        return this.toElement.Cpwd.sendKeys(pswdText);
    },

    selectConsumer: function () {
        common.waitForElement(this.toElement.Consumer, 5000);
        expect(this.toElement.Consumer.getText()).toEqual('As a consumer');
        return this.toElement.Consumer.click();
    },

    createAcctButton: function () {
        common.waitForElement(this.toElement.CreateAcctBtn, 5000);
        var ValidationMsg= element(by.xpath("//div[@data-bind='html: message.text' and contains(text(), 'You must confirm your account')]"))
        return this.toElement.CreateAcctBtn.click().then(function(){
            common.waitForElement(ValidationMsg, 5000);
            expect(ValidationMsg.getText()).toContain('Please check your email for the confirmation link');
        })
    },

    VerifyValidation: function () {
        common.waitForElement(this.toElement.ValidationMsg, 5000);
        return this.toElement.ValidationMsg.getText().then(function(text){
            console.log(text);
        })
            
        
    },
}