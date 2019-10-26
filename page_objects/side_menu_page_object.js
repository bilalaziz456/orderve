const utils = require('./utils.js');
const searchPageObject = require('./search_page_object');
const stringConstants = require('../constants/string');

function SideMenuPageObject() {
    this.elements = {
        sideMenuBtn: element(by.id('sideMenu')),
        signInBtn: element(by.css('a.list-group-item:nth-child(1).accountMenu')),
        myAccountMenuToggleBtn: element(by.id('accountMenuToggle')),
        dairyMenuLink: element(by.css('#dairyMenuToggle a')),
        proteinMenuToggleBtn: element(by.id('proteinMenuToggle')),
        dryMenuToggleBtn: element(by.id('dryMenuToggle')),
        nonFoodMenuToggleBtn: element(by.id('nonMenuToggle'))
    };

    this.pressSideMenuBtn = () => {
        return (utils.waitForElementToBePresent(this.elements.sideMenuBtn, 30000, 'Side menu button').then(() => {
                utils.waitForElementToBeClickable(this.elements.sideMenuBtn, 10000, 'Side menu button').then(() => {
                    this.elements.sideMenuBtn.click();
                })
            })
        )
    };

    this.goToSignInPage = () => {
        return this.pressSideMenuBtn().then(() => {
            return utils.waitForElementToBeClickable(this.elements.signInBtn, 10000, 'Sign in button').then(()=>{
                return this.elements.signInBtn.click()
            })

        });
    };

    this.goToDairyProductList = () => {
        return this.getProductList(stringConstants.DAIRY_PRODUCT);
    };

    this.goToProteinProductList = () => {
        return this.getProductList(stringConstants.PROTEIN_PRODUCT);
    };

    this.goToDryProductList = () => {
        return this.getProductList(stringConstants.DRY_PRODUCT);
    };

    this.goToNonFoodProductList = () => {
        return this.getProductList(stringConstants.NON_FOOD);
    };

    this.getProductList = (productName) => {
        return this.pressSideMenuBtn().then(() => {
            switch (productName) {
                case stringConstants.DAIRY_PRODUCT :
                    return (utils.waitForElementToBeClickable(this.elements.dairyMenuLink, 10000, 'Dairy menu button').then(()=>{
                        return this.elements.dairyMenuLink.click();
                    }));
                case stringConstants.PROTEIN_PRODUCT :
                    return utils.waitForElementToBeClickable(this.elements.proteinMenuToggleBtn, 10000, 'Protein menu button').then(()=>{
                        return this.elements.proteinMenuToggleBtn.click();
                    });
                case stringConstants.DRY_PRODUCT :
                    return utils.waitForElementToBeClickable(this.elements.dryMenuToggleBtn, 10000, 'Dry menu button').then(()=>{
                        return this.elements.dryMenuToggleBtn.click();
                    });
                case stringConstants.NON_FOOD :
                    return utils.waitForElementToBeClickable(this.elements.nonFoodMenuToggleBtn, 10000, 'Non food menu button').then(()=>{
                        return this.elements.nonFoodMenuToggleBtn.click();
                    });
                default:
            }
        }).then(() => {
            return searchPageObject.waitForSearchedProductPageToLoad();
        })
    };
}

module.exports = new SideMenuPageObject();