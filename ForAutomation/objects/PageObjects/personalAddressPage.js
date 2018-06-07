'use strict';

const config = require('../../config/config.js'),
    lpl = require("../locators/loginPageLocators.json"),    
    EC = protractor.ExpectedConditions;

require("babel-core/register");
require("babel-polyfill");

let  personalAddressPage = function () {

    this.inputStreet = element(by.xpath("//div[@class = 'mat-form-field-infix']/input[@placeholder='Street Address (line 1)']"));
    this.inputCity = element(by.xpath("//div[@class='mat-form-field-infix']/input[@placeholder='City']"));
    this.inputZip = element(by.xpath("//div[@class = 'mat-form-field-infix']/input[@placeholder='Zip/Postal Code']"));    
    this.countryList = element(by.xpath("//div[@class='cdk-overlay-pane']/div[@class]"));
    this.selCountry = element(by.xpath("//mat-select[@aria-label='Country']"));
    this.btnNext = element(by.xpath("//span[contains(text(), 'Next')]"));
    
    this.ctyUK = element(by.xpath("//mat-option[@class='mat-option ng-star-inserted']/span[contains(text(), 'United Kingdom')]"));
    this.ctyBurundi = element(by.xpath("//mat-option[@class='mat-option ng-star-inserted']/span[contains(text(), 'Burundi')]"));
    this.ctyJapan = element(by.xpath("//mat-option/span[text()='Japan']")); 
    
    this.selState = element(by.xpath("//mat-select[@id='mat-select-2']"));
    this.stateAkita = element(by.xpath("//mat-option/span[text()='Akita-Ken']"));
    
    this.sendInputKeys = async function(el, text) {
        await browser.wait(EC.visibilityOf(this.inputStreet), config.config.regularTimeout, 'waits for personalInfoPage');   
        await el.clear().sendKeys(text);        
    };

    //selectElement(selCountry, countryList, ctyJapan);
    this.selectElement = async function(dropdownEl, elToBeSelected) {   
        await dropdownEl.click();
        await browser.sleep(5000);       
        // await browser.wait(EC.visibilityOf(listEl), config.config.regularTimeout, 'waits for elList');
        await elToBeSelected.click();            
    };

    this.clickNextButton = async function () {       
        await this.btnNext.click(); 
        // await browser.wait(EC.visibilityOf(personalInfoPage.lblFirstName), config.config.regularTimeout, 'waits for personalInfoPage');              
    };

};

module.exports = new personalAddressPage();