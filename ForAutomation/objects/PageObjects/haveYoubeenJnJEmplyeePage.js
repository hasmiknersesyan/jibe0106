'use strict';

const config = require('../../config/config.js'),
    lpl = require("../locators/loginPageLocators.json"),
    personalInfoPage = require('./personalInfoPage.js'),
    EC = protractor.ExpectedConditions;

require("babel-core/register");
require("babel-polyfill");

let haveYoubeenJnJEmplyeePage = function () {

    //page element locators
    this.rbYes = element(by.xpath("//mat-radio-button[@id='mat-radio-17']"));
    this.rbNo = element(by.xpath("//mat-radio-button[@id='mat-radio-18']"));
    this.btnNext = element(by.xpath("//span[contains(text(), 'Next')]"));

    this.clickRadioButton = async function (rb) {
        await browser.wait(EC.visibilityOf(rb), config.config.regularTimeout, 'waits for jnj emplyee question page loads');      
        await rb.click();
        
    };

    this.clickNextButton = async function () {
        await this.btnNext.click();
        await browser.wait(EC.visibilityOf(personalInfoPage.lblFirstName), config.config.regularTimeout, 'waits for personalInfoPage');
    };
};

module.exports = new haveYoubeenJnJEmplyeePage();