'use strict';

const config = require('../../config/config.js'),
    cfpl = require("../locators/consentFormPageLocators.json"),
    EC = protractor.ExpectedConditions,
    loginPage = require('./loginPage.js');

require("babel-core/register");
require("babel-polyfill");

let ConsentFormPage = function() {
    //page elements locators
    this.lblConsentHeader = element(by.xpath("//div[@class='main-content jibe-container']/h3"));
    this.txtConsentPart2 = element(by.xpath("//p[contains(text(), 'This site may collect')]"));
    this.lblInformationYouProvide = element(by.xpath("//strong[contains(text(), 'Information You Provide')]"));
    this.lblPassiveInformation = element(by.xpath("//strong[contains(text(), 'Passive Information Collection and Use')]"));
    this.lblThroughBrowser = element(by.xpath("//strong[contains(text(), 'Through your browser:')]"));
    this.lblUsingCookies = element(by.xpath("//strong[contains(text(), 'Using cookies:')]"));
    this.lblUsingFlashCookies = element(by.xpath("//strong[contains(text(), 'Using Flash cookies')]"));
    this.lblUsingPixel = element(by.xpath("//strong[contains(text(), 'Using pixel tags, web beacons, ')]"));
    this.lblOnlineAdv = element(by.xpath("//strong[contains(text(), 'Online behavioral advertising:')]"));
    this.agreeButton = element(by.xpath("//div[@class='main-content jibe-container']/a[contains(text(), 'Accept')]"));

    this.clickAgreeButton  = async function() {
        await browser.executeScript('window.scrollTo(0,20000)');
        await this.agreeButton.click();
        // await browser.sleep(5000);
        await browser.wait(EC.visibilityOf(loginPage.labelLogin), config.config.regularTimeout);
    };
};

module.exports = new ConsentFormPage();
