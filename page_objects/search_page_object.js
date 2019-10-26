const utils = require('./utils.js');

function SearchPageObject() {
    this.elements = {
        searchField: element(by.id('search')),
        searchBarBtn: element(by.css('button.algolia-custom-search')),
        searchSuggestionContainer: element(by.css('span.aa-suggestions')),
        suggestedItemList: element.all(by.css('div.aa-suggestion')),
        searchedItemText: element(by.css('#toolbar-amount span.toolbar-title'))
    };
    this.waitForSearchFieldToBePresent = () => {
         return utils.waitForElementToBePresent(this.elements.searchField, 30000, 'Search field');
    };
    this.waitForSearchedProductPageToLoad = () => {
        return utils.waitForElementToBePresent(this.elements.searchedItemText, 30000, 'Search item text');
    };
    this.setSearchText = (searchFor) => {
        return this.elements.searchField.sendKeys(searchFor);
    };
    this.pressSearchButton = () => {
        return utils.waitForElementToBeClickable(this.elements.searchBarBtn, 10000, 'Search button').then(()=>{
            return this.elements.searchBarBtn.click();
        });
    };
    this.searchProduct = (searchFor) => {
        return this.waitForSearchFieldToBePresent().then(()=>{
            return this.setSearchText(searchFor).then(() => {
                return this.pressSearchButton();
            });
        })
    };
    this.getSearchSuggestions = (searchFor, onSearchComplete) => {
        return this.waitForSearchFieldToBePresent().then(()=>{
            return this.setSearchText(searchFor).then(() => {
                return utils.waitForElementToBePresent(this.elements.searchSuggestionContainer, 30000, 'Search suggestion container');
            });
        })


    };
    this.validateSearchSuggestionsCount = (searchFor, count) => {
        return this.getSearchSuggestions(searchFor).then(() => {
           return  this.elements.suggestedItemList.then((items) => {
                utils.log("Suggestion count equals to : " + items.length);
                expect(items.length).toBeGreaterThan(count);
            })
        })
    }
}

module.exports = new SearchPageObject();