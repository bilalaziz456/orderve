let fs = require('fs');
let os = require("os");
const {LOG_FILE} = require('../constants/file_paths');

function Utils() {
    let until = protractor.ExpectedConditions;
    let logWriteStream = null;
    this.elements = {
        pageTitle: element(by.css("meta[name='title']"))
    };
    this.getCurrentUrl = () => {
        return browser.executeScript('return window.location.href');
    };
    this.openLogFileStream = () => {
        if(!logWriteStream) logWriteStream = fs.createWriteStream(LOG_FILE, {flags: 'a'});
    };
    this.log = (str) => {
        logWriteStream.write(str + os.EOL);
    };
    this.closeLogFileStream = () => {
        if (logWriteStream) logWriteStream.end();
    };
    this.waitForElementToBePresent = (element, timeOut, message) => {
        return browser.wait(until.presenceOf(element), timeOut, message + ' is not present');
    };
    this.waitForElementToBeStale = (element, timeOut, message) => {
        return browser.wait(until.stalenessOf(element), timeOut, message + ' is not stale');
    };
    this.waitForElementToBeVisible = (element, timeOut, message) => {
        return browser.wait(until.visibilityOf(element), timeOut, message + ' is not visible');
    };
    this.waitForElementToBeInvisible = (element, timeOut, message) => {
        return browser.wait(until.invisibilityOf(element), timeOut, message + ' is not invisible');
    };
    this.waitForElementToBeClickable = (element, timeOut, message) => {
        return browser.wait(until.elementToBeClickable(element), timeOut, message + ' is not clickable');
    };
    this.waitForTitleContains = (element, timeOut, message) => {
        return browser.wait(until.titleContains(element), timeOut, 'title does not contains ' + message);
    };
    this.waitForTitleIs = (element, timeOut, message) => {
        return browser.wait(until.titleIs(element), timeOut, 'title does not match the string ' + message);
    };
    this.waitForUrlContains = (element, timeOut, message) => {
        return browser.wait(until.urlContains(element), timeOut, 'url does not contains ' + message);
    };
    this.waitForUrlIs = (element, timeOut, message) => {
        return browser.wait(until.urlIs(element), timeOut, 'url does not match the string ' + message);
    };
    this.isBlank = (str) => {
        return str === null || str === '' || str === undefined;
    };
    this.isFunction = (func) => {
        return typeof func === "function";
    };
}

module.exports = new Utils();

// module.exports = {
//     toElement: {
//         Conform: element(by.buttonText('Confirm')),
//         Cancel: element(by.buttonText('Cancel')),
//     },
//
//     ExecutionLogs: function (str) {
//         str = str + '\n';
//         fs.appendFile("reports/logfile.txt", str, function (err) {
//         });
//
//     },
//
//     waitForElement: function (elemnt, unit) {
//         return browser.wait(protractor.ExpectedConditions.visibilityOf(elemnt), unit);
//     },
//
//     waitForElementToBeClicable: function (elemnt, unit) {
//         var EC = protractor.ExpectedConditions;
//         return browser.wait(EC.elementToBeClickable(elemnt), unit);
//     },
//
//     waitUrl: function (myUrl, unit) {
//         var EC = protractor.ExpectedConditions;
//         return browser.wait(EC.urlContains(myUrl), unit);
//     },
//
//     waitForInvisibility: function (element, unit) {
//         var EC = protractor.ExpectedConditions;
//         return browser.wait(EC.invisibilityOf(element), unit);
//     },
//
//     getCurruntDate: function () {
//         var today = new Date();
//         var dd = today.getDate();
//         var mm = today.getMonth() + 1; //January is 0!
//         var yyyy = today.getFullYear();
//         if (dd < 10) {
//             dd = '0' + dd
//         }
//         if (mm < 10) {
//             mm = '0' + mm
//         }
//         today = yyyy + '-' + mm + '-' + dd;
//         return today;
//     }
// }