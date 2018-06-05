'use strict';

const config = require('../../config/config.js'),
    lpl = require("../locators/loginPageLocators.json"),
    uploadResumePage = require('./uploadResumePage.js'),  
    EC = protractor.ExpectedConditions;

require("babel-core/register");
require("babel-polyfill");

let LoginPage = function () {
    //page element locators
    this.loginEmail = element(by.xpath("//input[@placeholder='Email']"));
    this.labelLogin = element(by.xpath("//h1[text()='Login']"));
    this.loginPassword = element(by.xpath("//input[@placeholder='Password']"));
    this.loginButton = element(by.xpath("//button[@type='submit']"));
    this.loginErrorMessage = element(by.xpath("//p[contains(text(), 'Please enter a valid email address.')]"));

    this.enterEmail = async function (email) {
        await this.loginEmail.clear().sendKeys(email);
    };

    this.enterPassword = async function (pass) {
        await this.loginPassword.clear().sendKeys(pass);
    };

    //validationType = 'negative' || 'positive'
    this.clickLoginButton = async function (validationType) {
        await this.loginButton.click();
        if (validationType === 'negative') {
            await browser.wait(EC.visibilityOf(this.loginErrorMessage), config.config.regularTimeout)
        } else if (validationType === 'positive') {
            await browser.sleep(config.config.regularTimeout);
            await browser.sleep(3000); // then to remove this and uncomment the browserWait
            // await browser.wait(EC.visibilityOf(uploadResumePage.lbluploadResume), config.config.regularTimeout, 'waits for lbluploadResume')
        }
    };
};

module.exports = new LoginPage();
