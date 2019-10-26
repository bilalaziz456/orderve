const utils = require('./utils.js');

function ProductListPageObject() {
    this.elements = {
        totalNumberOfProductItemLink: element(by.css('p span.toolbar-number')),
        showAllProduct: element(by.id('load-more-product-link')),
        allProduct: element.all(by.css('h6 a.product-item-link'))
    };
    this.listOfProducts = (onCompletion) => {
        return this.elements.showAllProduct.isPresent().then((isPresent) => {
            if (isPresent) {
                return this.elements.allProduct.then((items) => {
                    let length = items.length + 1;
                    return this.elements.showAllProduct.click().then(() => {
                         return utils.waitForElementToBePresent(element(by.css('div.product-list-view.products.gridCard:nth-child(' + length + ')')), 10000, 'List of product').then(()=>{
                             this.listOfProducts(onCompletion);
                         })
                    })
                });
            } else {
                if (utils.isFunction(onCompletion)) onCompletion();
            }
        })
    };
    this.showAllProducts = (onCompletion) => {
        return (utils.waitForElementToBePresent(this.elements.totalNumberOfProductItemLink, 30000, 'List of product').then(() => {
                this.listOfProducts(onCompletion)
            })
        )
    };
    this.printListOfProduct = () => {
        this.showAllProducts(() => {
            this.elements.allProduct.each((element, index) => {
                return element.getText().then((text) => {
                    console.log(index, text);
                    utils.log(index + " " + text);
                })
            })
        });
    };
    this.goToProduct = (productUrl) => {
        let selector = element(by.css("div.gridCard.products.product-list-view[data-href='" + productUrl + "']"));
        return selector.click().then(() => {
            return utils.waitForUrlIs(productUrl, 30000, productUrl);
        });
    };
}

module.exports = new ProductListPageObject();