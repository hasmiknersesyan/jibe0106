require('babel-register')({
    presets: [
        'env'
    ]
});

const HTMLReport = require('protractor-html-reporter-2'),
    SpecReporter = require('jasmine-spec-reporter').SpecReporter,
    jasmineReporters = require('jasmine-reporters'),
    // argv = require('yargs').argv,
    packageInfo = require('../package.json');

const config = require('./config');
let folder = 'v.' + packageInfo.version;

const path = require('path'),
    fs = require('fs'),   
    Q = require('q'),
    argv = require('yargs')
        .options({
            env: {
                default: "local",
                choices: ["local" ,"browserstack"],
            },
            browser: {
                alias: 'b',
                describe: 'Browser',
                default: 'chrome',
                choices: ['chrome', 'firefox', 'ie', 'gc_headless', 'ff_headless']
            }           
        })
        .help('h').argv;


exports.config = {
    baseUrl: 'https://jobs.jnj.com/jobs?page=1',


    // MultiCapabilities to be passed to the webdriver instance.
    // multiCapabilities: (function () {
    // })(),

    // Capabilities to be passed to the webdriver instance.
    capabilities: (function () {
        let chrome = () => {
            return {
                'seleniumAddress': 'http://localhost:4444/wd/hub',
                'browserName': 'chrome',
                'chromeOptions': {
                    'args': ["--disable-gpu", "--window-size=800,600"]
                }
            }
        };

        let firefox = () => {
            return {
                'seleniumAddress': 'http://localhost:4444/wd/hub',
                'browserName': 'firefox',
                'moz:firefoxOptions': {
                    'args': ['--safe-mode']
                },
                'acceptInsecureCerts': true
            }
        };

        let ie = () => {
            return {
                'seleniumAddress': 'http://localhost:4444/wd/hub',
                'browserName': 'internet explorer',
                "ie.ensureCleanSession": true,
            };
        };

        let gc_headless = () => {
            return {
                'seleniumAddress': 'http://localhost:4444/wd/hub',
                'browserName': 'chrome',
                'chromeOptions': {
                    'args': ["--headless", "--disable-gpu", "--window-size=800,600"]
                }
            }
        };

        let ff_headless = () => {
            return {
                'seleniumAddress': 'http://localhost:4444/wd/hub',
                'browserName': 'firefox',
                'moz:firefoxOptions': {
                    'args': ["--headless", '--safe-mode']
                },
                'acceptInsecureCerts': true
            }
        };

        let ie_headless = () => {
            return {
                'seleniumAddress': 'http://localhost:4444/wd/hub',
                'browserName': 'internet explorer',
                "ie.ensureCleanSession": true,
            };
        };
        //run in browserstack env
        let gc_browserstack = () => {
            return {
                'seleniumAddress': 'http://test15823:VJ5eEppGxSiUpygsouTG@hub-cloud.browserstack.com/wd/hub',
                'browserstack.user': 'test15823',
                'browserstack.key': 'VJ5eEppGxSiUpygsouTG',
                'browserName': 'chrome',
                'platform': 'WINDOWS'
                // 'browserstack.local': true,                
            }
        };

        let ff_browserstack = () => {
            return {
                'seleniumAddress': 'http://test15823:VJ5eEppGxSiUpygsouTG@hub-cloud.browserstack.com/wd/hub',
                'browserstack.user': 'test15823',
                'browserstack.key': 'VJ5eEppGxSiUpygsouTG',
                'browserName': 'firefox',
                'platform': 'WINDOWS'
            }
        };

        let ie_browserstack = () => {
            return {
                'seleniumAddress': 'http://test15823:VJ5eEppGxSiUpygsouTG@hub-cloud.browserstack.com/wd/hub',
                'browserstack.user': 'test15823',
                'browserstack.key': 'VJ5eEppGxSiUpygsouTG',
                'browserName': 'internet explorer',
                'platform': 'WINDOWS'
            };
        };

        if (argv.env === "local") {
             //run the test >>protractor protractor_multi.conf.js  --env local --browser firefox
            switch (argv.browser) {
                case 'chrome': {
                    return chrome();
                }
                case 'firefox': {
                    return firefox();
                }
                case 'gc_headless': {
                    return gc_headless();
                }
                case 'ff_headless': {
                    return ff_headless();
                }
                case 'ie': {
                    return ie();
                }
                default: {
                    console.log(`browser ${argv.browser} is not supported`);
                    process.exit(-1);
                }
            };
        } else if (argv.env === 'browserstack') {
            //run the test >>protractor protractor_multi.conf.js  --env browserstack --browser firefox
            switch (argv.browser) {
                case 'chrome': {
                    return gc_browserstack();
                }
                case 'firefox': {
                    return ff_browserstack();
                }
                case 'ie': {
                    return ie_browserstack();
                }
                default: {
                    console.log(`browser ${argv.browserstack} is not supported`);
                    process.exit(-1);
                }
            };
        }
    })(),

    suites: { 'test': '../tests/suites/*.js' },

    frameworks: ['jasmine2'],
    jasmineNodeOpts: {
        showColors: true,
        isVerbose: true,
        print: function () { }
    },

    params: {
        //  slowSpecTimeout: config.slowSpecTimeout
    },

    onPrepare: function () {

        //Should be removed before run on Angular app
        browser.ignoreSynchronization = true;
        let jasmineEnv = jasmine.getEnv();

        let browserName, browserVersion;
        let capsPromise = browser.getCapabilities();
        jasmineEnv.addReporter(new SpecReporter({
            displayStacktrace: 'all'
        }));

        //report in xml format is generated
        jasmineEnv.addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './reports',
            filePrefix: 'xmlresults'
        }));

        let fs = require('fs-extra');

        fs.emptyDir('reports/screenshots/', function (err) {
            if (err) {
                console.log(err);
            }
        });

        jasmineEnv.addReporter({
            specDone: function (result) {
                if (result.status == 'failed') {
                    browser.getCapabilities().then(function (caps) {
                        let browserName = caps.get('browserName');

                        browser.takeScreenshot().then(function (png) {

                            // screenshot name
                            let stream = fs.createWriteStream('reports/screenshots/' + browserName + '-' + result.fullName + '.png');
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                        });
                    });
                }
            }
        });
    },

    onComplete: function () {
        let browserName, browserVersion;
        let capsPromise = browser.getCapabilities();

        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            platform = caps.get('platform');

            testConfig = {
                reportTitle: 'Protractor Test Execution Report',
                outputPath: './reports',
                outputFilename: 'ProtractorTestReport',
                screenshotPath: './screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true,
                testPlatform: platform
            };

            //convert .xml repoert to HTML
            new HTMLReport().from('./reports/xmlresults.xml', testConfig);
        });
    }
};


