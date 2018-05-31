'use strict';

const config = require('../../config/config.js'),
    lpl = require("../locators/loginPageLocators.json"),    
    EC = protractor.ExpectedConditions;

require("babel-core/register");
require("babel-polyfill");

let  attachCoverLetterPage = function () {

    //page element locators
    this.lblattachLetter = element(by.xpath("//mat-label[contains(text(), 'Would you like to attach a cover letter?')]"));
    this.rbYes = element(by.xpath("//span[contains(text(), 'Yes')]"));
    this.rbNo = element(by.xpath("//span[contains(text(), 'No')]"));    

    this.clickRadioButton = async function (rb) {
        await browser.wait(EC.visibilityOf(this.lblattachLetter), config.config.regularTimeout, 'waits for lblattachLetter');    
        if (rb === 'Yes') {
            await this.rbYes.click();
        } else if(rb === 'No') {
            await this.rbNo.click();
        }          
    };
};

module.exports = new attachCoverLetterPage();