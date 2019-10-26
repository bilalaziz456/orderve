const utils = require('./utils.js');
const stringConstants = require('../constants/string');

function CartPageObject() {
    this.elements = {
        cartItemCount: element(by.css('.minicart-wrapper > .action.showcart > .counter.qty .counter-number')),
        addToCartBtn: element(by.id('product-addtocart-button')),
        miniCartIconBtn: element(by.css('a.action.showcart[href=\'https://stage.orderve.com/checkout/cart/\']')),
        goToCartBtn: element(by.css('div.actions a.viewcart.action')),
        addToCartSuccessMessageContainer: element(by.css('div[role=\'alert\'] > .message.message-success.success > div')),
        cartAddedItemList: element.all(by.css('li.item.product.product-item[data-role=\'product-item\']')),
        cartPageFirstItemIncrementBtn: element(by.css('div.cart-item-container .cart-item-list:nth-child(2) .quantity-button.quantity-up')),
        cartPageUpdateFirstItemBtn: element(by.css('button.update-cart[type=\'submit\']'))
    };
    this.compareBeforeAndAfterItemAddCount = (messageText) => {
        let initialCount = 0;
        let resultValue = 0;
        return this.elements.cartItemCount.isPresent().then((isPresent) => {
            if (isPresent) {
                return this.elements.cartItemCount.getText().then((value) => {
                    initialCount = Number(value);
                });
            }
        }).then(() => {
            return this.addProductToCart(messageText).then(() => {
                return this.elements.cartItemCount.getText().then((value) => {
                    resultValue = Number(value);
                    expect(initialCount).toBeLessThan(resultValue);
                });
            });
        });
    };

    this.pressMiniCartIcon = () => {
        return utils.waitForElementToBeVisible(this.elements.miniCartIconBtn, 30000, 'Mini cart button').then(()=>{
            return utils.waitForElementToBeClickable(this.elements.miniCartIconBtn, 30000, 'Mini cart button').then(()=>{
                return browser.actions().mouseMove(this.elements.miniCartIconBtn).then(()=>{
                    return this.elements.miniCartIconBtn.click();
                })
            })
        })



    };

    this.goToCart = () => {
        return utils.waitForElementToBeClickable(this.elements.goToCartBtn, 30000, 'Go to cart button').then(()=>{
            return this.elements.goToCartBtn.click();
        })
    };

    this.validateAddedItemCount = (itemCountToCompare) => {
        // utils.waitForElementToBeVisible(this.elements.cartAddedItemList, 30000, 'Added item list');
        return this.elements.cartAddedItemList.then((items) => {
            expect(items.length).toBeGreaterThanOrEqual(itemCountToCompare);
        });
    };

    this.addProductToCart = (messageText) => {
        return utils.waitForElementToBeVisible(this.elements.addToCartBtn, 50000, 'Add to cart button').then(()=>{
            return  utils.waitForElementToBeClickable(this.elements.addToCartBtn, 50000, 'Add to cart button').then(()=>{
                return this.elements.addToCartBtn.click().then(() => {
                   return  utils.waitForElementToBeVisible(this.elements.addToCartSuccessMessageContainer, 30000, 'Add to cart success message').then(()=>{
                       expect(this.elements.addToCartSuccessMessageContainer.getText()).toEqual(messageText);
                   })
                });
            })
        })


    };

    this.incrementFirstItem = () => {
        return this.elements.cartPageFirstItemIncrementBtn.click();
    };

    this.updateFirstItem = () => {
        return utils.waitForElementToBeVisible(this.elements.cartPageUpdateFirstItemBtn, 30000, 'Update item button').then(()=>{
            return this.elements.cartPageUpdateFirstItemBtn.click();
        });

    };

    this.checkOutFromCartPage = () => {

    }
}

module.exports = new CartPageObject();