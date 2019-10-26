var po = require('../pageObj/user_po');

describe('Verify If user is able to Login', () => {

    beforeAll(function() {
        require('../../hooks/hook').beforeAll();
     });
     
     afterAll(function() {
        require('../../hooks/hook').afterAll();
     }); 
     //Commented to Test the Hooks
    /*
    it("Step 2: Click on sign in/create account", function () {
        
        po.clickSignIn();
        browser.sleep(5000);
        expect(browser.getCurrentUrl()).toContain("/customer/account/login/referer");
    }) 

    it("Step 3: Enter the required data", function () {
        po.enterSignInUserName();
        po.enterSignInPassword();
    })

    it("Step 4: Click on Sign In button", function () {
        po.signInButton();
        browser.sleep(3000);
        expect(browser.getCurrentUrl()).toEqual("http://orderves.nextmp.net/");
    }) */
  
    it("Step 5: Verify the Account", function () {
        po.VerifyAcct();
    })

});