const urlConstants = require('../constants/urls');

exports.config = {
    seleniumAddress: 'http://localhost:4723/wd/hub',
    directConnect: true,
    plugins: [{
        package: require.resolve('protractor-screenshoter-plugin'),
        screenshotPath: 'reports',
        screenshotOnExpect: 'failure+success',
        screenshotOnSpec: 'failure+success',
        htmlOnExpect: 'failure+success',
        withLogs: true,
        writeReportFreq: 'asap',
        imageToAscii: 'none',
        clearFoldersBeforeTest: true
    }],
    params: {
        baseURL: urlConstants.BASE_URL
    },
    framework: 'jasmine2',
    multiCapabilities: [
        {
            browserName: 'chrome',
            platformName: 'Android',
            platformVersion: '9',
            deviceName: 'emulator-5554',
            unicodeKeyboard: true,
            resetKeyboard: true
        },
        // {
        //     browserName: "safari",
        //     platformName: "iOS",
        //     platformVersion: "13.1",
        //     automationName: "XCUITest",
        //     deviceName: "iPhone 8",
        //     unicodeKeyboard: true,
        //     resetKeyboard: true
        // },
    ],
    jasmineNodeOpts: {
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 300000// Increase the default jasmine time interval.
    },
    onPrepare: function () {
        browser.ignoreSynchronization = true;
    },
};