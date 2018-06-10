'use strict';

const config = require('../../config/config.js'),
    poJob = require("../locators/indexPageLocators.json"),
    positionDetailsPage = require('./positionDetailsPage.js'),
    EC = protractor.ExpectedConditions;

require("babel-core/register");
require("babel-polyfill");

let IndexPage = function(){
    this.searchInput = element(by.xpath("//*[@class='keyword-search']//input[@type='text']"));
    this.fieldSearchLocation = element(by.xpath("//*[@class='location-search ui-location-typeahead']//input"));
    this.locationSearchResult = element(by.xpath("//*[contains(text(), 'Shanghai, China')][@id='job-location-0']"));
    this.lblSearchJob = element(by.id('label-keywords'));
    this.lblSearchLocation = element(by.id('label-location-search'));
    this.lblSortBy = element(by.xpath("//*[@id='search-sort']/label"));
    this.searchButton = element(by.css('.search-btn'));    
    this.resultPositionlList = element.all(by.xpath("//a/span[contains(text(),'Manager')]"));
    this.resultPosition = this.resultPositionlList.get(3);

    this.openURL = async function() {
        await browser.get(config.config.baseURL);
        await browser.wait(EC.visibilityOf(this.searchInput), config.config.regularTimeout, 'wait for search');
    };

    this.enterSearchPosition  = async function(Posiotion) {
        await browser.wait(EC.visibilityOf(this.searchInput), config.config.regularTimeout, 'wait for search');
        await this.searchInput.sendKeys(Posiotion);
        await this.lblSearchJob.click();
    };

    this.enterSearchLocation  = async function(searchLocation) {
        await this.fieldSearchLocation.sendKeys(searchLocation);
        await this.lblSearchLocation.click();
    };

    this.clickSearch = async function() {
        await this.searchButton.click();
        await browser.sleep(5000);
        await browser.wait(EC.visibilityOf(this.resultPosition), config.config.regularTimeout)
    };

    this.clickPosition = async function() {
        await this.resultPosition.click();
        await browser.wait(EC.visibilityOf(positionDetailsPage.applyButton), config.config.regularTimeout)
    };
};

module.exports = new IndexPage();