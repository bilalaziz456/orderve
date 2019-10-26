var po = require('../pageObj/user_po');

describe('Verify If user is able to create an account', () => {

    it("Step 1: Open Orderve Staging", function () {
        expect(browser.getCurrentUrl()).toEqual("http://orderves.nextmp.net/customer/account/login");
    })

    it("Step 2: Click on sign in/create account", function () {
        po.clickSignIn();
        browser.sleep(5000);
        expect(browser.getCurrentUrl()).toContain("/customer/account/login/referer");
    })

    it("Step 3: Click on Create Account", function () {
        po.clickCreateAcct();
        browser.sleep(5000);
        expect(browser.getCurrentUrl()).toEqual("http://orderves.nextmp.net/customer/account/create/");
    })

    it("Step 4: Enter the required data", function () {
        po.enterFirstName();
        po.enterLastName();
        po.enterEmail();
        browser.sleep(3000);
        po.enterPassword();
    })

    it("Step 5: Click on 'As a consumer'", function () {
        po.selectConsumer();
    })

    it("Step 6: Click on Create Account button", function () {
        po.createAcctButton();
        po.VerifyValidation();
    })

})