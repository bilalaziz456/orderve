var po = require('../page_objects/spec_2_po');
const utils = require('../page_objects/utils');
const searchPageObject = require('../page_objects/search_page_object');
const productPageObject = require('../page_objects/product_list_page_object');
const cartPageObject = require('../page_objects/cart_page_object');
const urlConstants = require('../constants/urls');
const stringConstants = require('../constants/string');

describe('Order one more Item', () => {
    beforeAll(() => {
        utils.openLogFileStream();
    });
    it("Scenario 6: Click on the search button & verify the current url", () => {
        utils.log("Scenario 6: Clicked on search & verifying the current URL");
        searchPageObject.pressSearchButton(() => {
            expect(utils.getCurrentUrl()).toEqual(urlConstants.SEARCH_CHEESE_URL);
        });
        utils.log("------------------------------------------------");
    });

    it('Scenario 7: Click on "cheese beemster goat gouda" & verify the current url', () => {
        searchPageObject.waitForSearchedProductPageToLoad().then(() => {
            productPageObject.showAllProducts();
        }).then(() => {
            productPageObject.goToProduct(urlConstants.SEARCHED_PRODUCT_URL_02);
        }).then(() => {
            expect(utils.getCurrentUrl()).toEqual(urlConstants.SEARCHED_PRODUCT_URL_02);
        });
        utils.log("------------------------------------------------");
    });

    it('Scenario 8: Add "cheese beemster goat gouda" to cart & verify "added to cart" message appears & minicart icon is updated', () => {
        utils.log("Scenario 8: Adding CHEESE BEEMSTER GOAT GOUDA & verifying the cart/minicart");
        cartPageObject.compareBeforeAndAfterItemAddCount(stringConstants.ADDED_PRODUCT_TO_CART_MESSAGE_02).then(() => {
            utils.log("------------------------------------------------");
        });
    });

    it('Scenario 9: Click on mini cart, verify 2 rows of products & click on "view cart"', () => {
        utils.log("Scenario 9: Click on mini cart, verify 2 rows of products & click on view cart");
        cartPageObject.pressMiniCartIcon().then(() => {
            cartPageObject.validateAddedItemCount(1)
        }).then(() => {
            cartPageObject.goToCart().then(() => {
                utils.waitForUrlIs(urlConstants.CART_URL).then(() => {
                    expect(utils.getCurrentUrl()).toEqual(urlConstants.CART_URL);
                    utils.log("------------------------------------------------");
                })
            });
        });
    });

    it('Scenario 10: update "test cheese" by clicking on the "+" icon in the input area, & click on "update" when it appears', () => {
        utils.log("Scenario 10: update 'test cheese' by clicking on the '+' icon");
        cartPageObject.incrementFirstItem().then(() => {
            cartPageObject.updateFirstItem().then(() => {
                utils.waitForElementToBeInvisible(cartPageObject.elements.cartPageUpdateFirstItemBtn);
            });
            utils.log("------------------------------------------------");
        });
    });

    it('Scenario 11: After page reload, go to checkout', () => {
        utils.log("Scenario 11: After page reload, go to checkout");
    //     cartPageObject.checkOutFromCartPage();
    //     common.waitForElementToBeClicable(po.toElement.goto_checkout, 5000);
    //     po.toElement.goto_checkout.click();
    //     common.ExecutionLogs("------------------------------------------------");
    });


    // it("Scenario 12: Checkout 1) as guest", () => {
    //     common.ExecutionLogs("Scenario 12: Checkout 1) as guest");
    //     common.waitForElement(po.toElement.checkout_as_guest, 30000);
    //     po.toElement.checkout_as_guest.click()
    //     common.waitForElementToBeClicable(po.toElement.guest_email, 20000);
    //     browser.sleep(5000)
    //     po.toElement.guest_email.sendKeys("pjathar@codal.com");
    //     po.toElement.guest_fname.sendKeys("Guest");
    //     po.toElement.guest_lname.sendKeys("User");
    //     po.toElement.guest_address.sendKeys("block no 14 4th floor");
    //     po.toElement.guest_phone_no.sendKeys("2345678910");
    //     po.toElement.guest_city.sendKeys("Denver");
    //     po.toElement.guest_state.sendKeys("New York");
    //     po.toElement.guest_zipcode.sendKeys("10038");
    //     browser.sleep(1000)
    //     po.toElement.payment_review.click();
    //     common.waitForElement(po.toElement.guest_payment_title, 60000);
    //     expect(po.toElement.guest_payment_title.getText()).toEqual("Payment Method");
    //     browser.switchTo().frame(element(by.name('__privateStripeFrame5')).getWebElement())
    //     po.toElement.guest_card_number.sendKeys("5555555555554444");
    //     po.toElement.guest_card_expr_date.sendKeys("03/24");
    //     po.toElement.guest_card_cvv_no.sendKeys("123");
    //     browser.switchTo().defaultContent();
    //     po.toElement.guest_place_order.click()
    //     common.waitForElement(po.toElement.order_success_msg, 20000)
    //     expect(po.toElement.order_success_msg.getText()).toEqual("Order Successfully Placed!");
    // })
});
