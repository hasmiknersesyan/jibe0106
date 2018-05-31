require('babel-register')({
    presets: [
        'env'
    ]
});

const HTMLReport = require('protractor-html-reporter-2'),
    SpecReporter = require('jasmine-spec-reporter').SpecReporter,
    jasmineReporters = require('jasmine-reporters'),
    argv = require('yargs').argv,
    packageInfo = require('../package.json');

const config = require('./config');

let browserName = argv.browser || 'chrome';
//let folder = 'v.' + packageInfo.version;

exports.config = {
    baseUrl: 'https://jobs.jnj.com/jobs?page=1',
    seleniumAddress: 'http://test15823:VJ5eEppGxSiUpygsouTG@hub-cloud.browserstack.com/wd/hub',

    capabilities: { //for browserStack
        browserName: browserName,
        'browserstack.user': 'test15823',
        'browserstack.key': 'VJ5eEppGxSiUpygsouTG',
        'browserName': 'chrome',
        'platform': 'WINDOWS',
        // 'browserstack.local': true,

        //to run multiple threads
        shardTestFiles: false,
        //number of threads
        maxInstances: 3
    },

    multiCapabilities: [
         {
            browserName: 'Firefox',
            // browser_version: '59.0',
            // os: 'Windows',
            // os_version: '10',
            'project': 'Job JnJ QA report on FireFox',
            'browserstack.debug': false,
            'browserstack.video': true
        },
        {
            browserName: 'internet explorer',
            // browser_version: '30.0',
            // os: 'Windows',
            // os_version: '10',
            'project': 'Job JnJ QA report on IE',
            'browserstack.debug': false,
            'browserstack.video': true,
            'browserstack.timezone': 'America/New_York',
            'resolution': '1024x768'
        },
        {
            browserName: 'chrome',
            // os: 'Windows',
            // os_version: '10',
            'project': 'Job JnJ QA reaport on Chrome',
            'browserstack.debug': false,
            'browserstack.video': false
        }
    ],

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


