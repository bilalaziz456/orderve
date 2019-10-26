//import {describe, it} from "selenium-webdriver/testing";
//import * as browser from "protractor";
//import {element} from "protractor";
const urlConstants = require('../constants/urls');
const stringConstants = require('../constants/string');
const utils = require('../page_objects/utils');
const sideMenuPageObject = require('../page_objects/side_menu_page_object');
const productListPageObject = require('../page_objects/product_list_page_object');
const searchPageObject = require('../page_objects/search_page_object');
const cartPageObject = require('../page_objects/cart_page_object');

describe('Go to home page:', () => {
    beforeAll(() => {
        browser.waitForAngular(false);
        utils.openLogFileStream();
        browser.get(urlConstants.BASE_URL);
    });

    it("Scenario 1: Launch & verify the title", function () {
        browser.get(urlConstants.BASE_URL).then(() => {
            expect(utils.elements.pageTitle.getAttribute('content')).toEqual(stringConstants.TITTLE);
        });
        utils.log('Scenario 1: Page Title verified as "Orderve.com"!');
        utils.log('------------------------------------------------------------');
    });

    it("Scenario 2: Click on 'Dairy' from the top menu on the home page to go to", function () {
        sideMenuPageObject.goToDairyProductList().then(() => {
            expect(utils.getCurrentUrl()).toEqual(urlConstants.DAIRY_URL);
        });

        utils.log('Scenario 2: Current url is: ' + urlConstants.DAIRY_URL);
        utils.log('------------------------------------------------------------')
    });

    it("Scenario 3: Print List of Products", function () {
        productListPageObject.printListOfProduct();
        utils.log('Scenario 3: List of Products Visible under Dairy are: ')
    });

    it("Scenario 4: Add Test Cheese", function () {
        utils.log('------------------------------------------------------------');
        utils.log('Scenario 4: Add Test Cheese');
        productListPageObject.goToProduct(urlConstants.SEARCHED_PRODUCT_URL_01).then(() => {
            cartPageObject.compareBeforeAndAfterItemAddCount(stringConstants.ADDED_PRODUCT_TO_CART_MESSAGE_01);
        });
        utils.log('------------------------------------------------------------')
    });

    it("Scenario 5: Make sure that search suggestions show for 'Cheese'", function () {
        utils.log('Scenario 5: Enter the letter "cheese" into the search bar');
        searchPageObject.validateSearchSuggestionsCount('cheese', 0);
        utils.log('------------------------------------------------------------');
    });

    afterAll(() => {
        // utils.closeLogFileStream();
    });
});