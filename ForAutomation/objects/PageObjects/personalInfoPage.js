'use strict';

const config = require('../../config/config.js'),   
    personalAddressPage = require("./personalAddressPage.js"),    
    EC = protractor.ExpectedConditions;

require("babel-core/register");
require("babel-polyfill");

let  personalIndoPage = function () {

    this.lblFirstName = element(by.xpath("//label[contains(text(), 'First Name')]")); 
    this.lblFirstName = element(by.xpath("//label[contains(text(), 'Last Name')]"));
    this.inputFirstName = element(by.xpath("//div[@class='mat-form-field-infix']/input[@placeholder='First Name']"));
    this.inputLastName = element(by.xpath("//div[@class='mat-form-field-infix']/input[@placeholder='Last Name']"));
    this.btnNext = element(by.xpath("//span[contains(text(), 'Next')]"));       

    this.sendInputKeys = async function(el, text) {
        await el.clear().sendKeys(text);        
    }

    this.clickNextButton = async function () {       
        await this.btnNext.click(); 
        await browser.wait(EC.visibilityOf(personalAddressPage.inputStreet), config.config.regularTimeout, 'waits for personalAddressPage');              
    };

};

module.exports = new personalIndoPage();