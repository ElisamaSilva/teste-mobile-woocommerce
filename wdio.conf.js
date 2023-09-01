const {join} = require('path')
const allure = require('allure-commandline')

exports.config = {
    // hostname: 'localhost',
    // port: 4723,
    // path: '/wd/hub',
    // services: ['appium'],

    user: process.env.BROWSERSTACK_USERNAME || 'elisamanasciment_dFmrYx',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'bxshDAPphdKp3JwxAB8R',
    hostname: 'hub.browserstack.com',
    services: [
        [
          'browserstack',
          {
            buildIdentifier: '${BUILD_NUMBER}',
            browserstackLocal: true,
            opts: { forcelocal: false, localIdentifier: "webdriverio-appium-app-browserstack-repo" },
            app: process.env.BROWSERSTACK_APP_PATH || './app/android/wcandroid-7.3.1.apk',
          }
        ]
      ],
    

    specs: [
        './test/specs/**/*.js'
    ],
    framework: 'mocha',
    // capabilities: [{
    //     "platformName": "Android",
    //     "appium:platformVersion": "10.0",
    //     "appium:deviceName": "Pixel XL",
    //     "appium:automationName": "UiAutomator2",
    //     "appium:app": join(process.cwd(), './app/android/wcandroid-7.3.1.apk'),
    //     "appium:appPackage": "com.woocommerce.android",
    //     "appium:appWaitActivity": "com.woocommerce.android.ui.login.LoginActivity"
    // }],
    capabilities: [{
        'bstack:options': {
          deviceName: 'Google Pixel 4 XL',
          osVersion: "10.0"
        }
    }],
    commonCapabilities: {
        'bstack:options': {
          projectName: "BrowserStack Samples",
          buildName: 'browserstack build',
          sessionName: 'BStack parallel webdriverio-appium',
          debug: true,
          networkLogs: true,
          source: 'webdriverio:appium-sample-sdk:v1.0'
        }
    },
    maxInstances: 10,
    updateJob: false,
    logLevel: 'info',
    coloredLogs: true,
    screenshotPath: './errorShots/',
    baseUrl: '',
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    
    
    waitForTimeout: 20000,
    mochaOpts: {
        timeout: 300000
    },
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }]
    ],
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        await browser.takeScreenshot();
    }    
}