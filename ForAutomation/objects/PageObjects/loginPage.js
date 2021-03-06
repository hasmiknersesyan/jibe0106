'use strict';

const config = require('../../config/config.js'),
    lpl = require("../locators/loginPageLocators.json"),
    uploadResumePage = require('./uploadResumePage.js'),  
    EC = protractor.ExpectedConditions;

require("babel-core/register");
require("babel-polyfill");

let LoginPage = function () {
    //page element locators
    this.loginEmail = element(by.xpath("//input[@formcontrolname='email']"));
    this.labelLogin = element(by.xpath("//ojl-login-component[@class='ng-star-inserted']/div/h1"));
    this.loginPassword = element(by.xpath("//input[@type='password']"));
    this.loginButton = element(by.xpath("//button[text()='Log In']"));
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
