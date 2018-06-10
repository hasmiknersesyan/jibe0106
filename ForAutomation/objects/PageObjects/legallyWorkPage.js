'use strict';

const config = require('../../config/config.js'),
    lpl = require("../locators/loginPageLocators.json"),
    personalInfoPage = require('./personalInfoPage.js'),
    EC = protractor.ExpectedConditions;

require("babel-core/register");
require("babel-polyfill");

let legallyWorkPage = function () {

    //page element locators
    this.rbYes = element(by.xpath("//input[@id='mat-radio-27-input']"));
    this.rbNo = element(by.xpath("//input[@id='mat-radio-28-input']"));
    this.btnNext = element(by.xpath("//span[contains(text(), 'Next')]"));

    this.clickRadioButton = async function (rb) {
        await browser.wait(EC.visibilityOf(this.rbYes), config.config.regularTimeout, 'waits for jnj emplyee question page loads');
        if (rb === 'Yes') {
            await this.rbYes.click();
        } else if (rb === 'No') {
            await this.rbNo.click();
        }
    };

    this.clickNextButton = async function () {
        await this.btnNext.click();
        await browser.wait(EC.visibilityOf(personalInfoPage.lblFirstName), config.config.regularTimeout, 'waits for personalInfoPage');
    };
};

module.exports = new legallyWorkPage();