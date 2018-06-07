'use strict';

const config = require('../../config/config.js'),
    lpl = require("../locators/loginPageLocators.json"),    
    personalInfoPage = require('./personalInfoPage.js'),
    EC = protractor.ExpectedConditions;

require("babel-core/register");
require("babel-polyfill");

let  attachCoverLetterPage = function () {

    //page element locators
    this.lblattachLetter = element(by.xpath("//mat-label[contains(text(), 'Would you like to attach a cover letter?')]"));
    this.rbYes = element(by.xpath("//div[@class = 'mat-radio-label-content'][contains(text(), 'Yes')]]"));
    this.rbNo = element(by.xpath("//div[@class = 'mat-radio-label-content'][contains(text(), 'No')]"));
    this.btnNext = element(by.xpath("//span[contains(text(), 'Next')]"));       

    this.clickRadioButton = async function (rb) {
        await browser.wait(EC.visibilityOf(this.lblattachLetter), config.config.regularTimeout, 'waits for lblattachLetter');    
        if (rb === 'Yes') {
            await this.rbYes.click();            
        } else if(rb === 'No') {
            await this.rbNo.click();
        }        
    };

    this.clickNextButton = async function () {       
        await this.btnNext.click(); 
        await browser.wait(EC.visibilityOf(personalInfoPage.lblFirstName), config.config.regularTimeout, 'waits for personalInfoPage');              
    };
};

module.exports = new attachCoverLetterPage();