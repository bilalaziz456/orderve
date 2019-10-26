var common = require('./utils');
module.exports = {

    toElement: {
        textBox: element(by.model("yourName")),
        result: element(by.css(".span4 h1")),
        add: element(by.css(".btn-primary[value='add']")),
        todoListTextBox: element(by.model("todoList.todoText")),

        //Dairy
        Dairy: element(by.buttonText('Dairy')),
        Products: element.all(by.className('gridCard product-list-view')),
        TestCheese: element(by.xpath("//a[@class='product-item-link' and normalize-space()='Test Cheese']")),
        AddtoCart: element.all(by.buttonText('Add to Cart')).get(0),
        Message: element(by.className('message-success success message')),
        miniCart: element(by.css("span [class='counter-number']")),

        //Search
        searchbar: element(by.xpath("//input[@id='search']")),
        suggestions: element.all(by.css(".autocomplete-wrapper [class='aa-suggestions']")).get(0),
    },

    ListofProducts: function () {
        return element.all(by.xpath("//a[@class='product-item-link']")).each(function (element, index) {
            element.getText().then(function (text) {
                console.log(index, text);
                common.ExecutionLogs(index + " " + text);
            });
        });
    },

    searchCheese: function () {
        common.waitForElement(this.toElement.searchbar, 5000);
        return this.toElement.searchbar.sendKeys('cheese');
    },

    suggestionList: function () {
        common.waitForElement(this.toElement.suggestions, 8000);
        return element.all(by.css(".aa-dataset-products [class='aa-suggestions'] [class='info']")).each(function (element, index) {
            element.getText().then(function (text) {
                console.log(index, text);
                common.ExecutionLogs(index + " " + text);
            });
        });
    }
}