'use strict';

const config = require('../../config/config.js'),
    lpl = require("../locators/loginPageLocators.json"),    
    EC = protractor.ExpectedConditions;

require("babel-core/register");
require("babel-polyfill");

let  personalElAddressPage = function () {

    this.inputPhone = element(by.xpath("//input[@placeholder='Preferred Phone Number']"));
    this.inputEmail = element(by.xpath("//input[@placeholder='Email Address']"));
    

    this.sendInputKeys = async function(el, text) {
        await browser.wait(EC.visibilityOf(this.inputPhone), config.config.regularTimeout, 'waits for personalInfoPage');   
        await el.clear().sendKeys(text);        
    };

    this.clickNextButton = async function () {       
        await this.btnNext.click(); 
        // await browser.wait(EC.visibilityOf(personalInfoPage.lblFirstName), config.config.regularTimeout, 'waits for personalInfoPage');              
    };

};

module.exports = new personalElAddressPage();