'use strict';

const hml = require("../locators/headerMenuLocators.json"),
    config = require('../../config/config.js'),
    EC = protractor.ExpectedConditions;
require("babel-core/register");
require("babel-polyfill");

let headerMenu = function() {
    this.headerBody = $(hml.componentMenu.headerBody);
    this.headerButtons = $(hml.componentMenu.headerButtons);
    this.menuButton = $(hml.componentMenu.menuButton);
    this.searchButton = $(hml.componentMenu.searchButton);
    this.likeButton = $(hml.componentMenu.likeButton);
    this.countriesButton = $(hml.componentMenu.countriesButton);

    this.titleStories = element(by.xpath(hml.componentMenu.titleStories));
    this.ulListStories = this.titleStories.$('ul');
    this.lnkNews = element(by.linkText('Latest News'));
    this.lnkInnovation = element(by.linkText('Innovation'));
    this.lnkCareing = element(by.linkText('Caring & Giving'));
    this.lnkPersonal = element(by.linkText('Personal Stories'));
    this.lnkHealth = element(by.linkText('Health & Wellness'));
    this.lnkHeritage = element(by.linkText('Our Heritage'));
    this.titleCompanies = element(by.xpath(hml.componentMenu.titleCompanies));
    this.ulCompanies = element(by.xpath(hml.componentMenu.ulCompanies));

    this.lnkCompanyAbout = element(by.linkText('About J&J'));
    this.lnkCompanyProducts = element(by.linkText('Products'));
    this.lnkCompanyProcurement = element(by.linkText('Procurement'));
    this.lnkCompanyCareers = element(by.linkText('Careers'));
    this.lnkCompanyMedia = element(by.linkText('Media Center'));
    this.lnkCompanyInvestors = element(by.linkText('Investors'));
    this.lnkCompanySocietal = element(by.linkText('Our Societal Impact'));

    this.searchInput = $(hml.componentMenu.searchInput);
    this.lblCountries = element(by.xpath(hml.componentMenu.lblCountries));
    this.titleMenuPages = $(hml.componentMenu.titleMenuPages);

    this.lblFollow = element(by.xpath(hml.componentMenu.lblFollow));
    this.lnkFB = element(by.linkText('Facebook'));
    this.lnkTWT = element(by.linkText('Twitter'));
    this.lnkYoutube = element(by.linkText('YouTube'));
    this.lnkLinkdin = element(by.linkText('LinkedIn'));

    this.ulAboutJNJ = $$(hml.componentMenu.ulCompanies).get(0);
    this.ulProducts = $$(hml.componentMenu.ulCompanies).get(1);
    this.ulProcurement = $$(hml.componentMenu.ulCompanies).get(2);
    this.ulCareers = $$(hml.componentMenu.ulCompanies).get(3);
    this.ulInvestors = $$(hml.componentMenu.ulCompanies).get(4);
    this.ulSocietal = $$(hml.componentMenu.ulCompanies).get(5);

    this.clickMenuItems = async function(elActual, elExpected) {
        await elActual.click();
        await browser.wait(EC.visibilityOf(elExpected), config.config.regularTimeout, 'wait for component opens');
    };

    this.mouseHover = async function(elActual) {
        await browser.actions().mouseMove(elActual).perform();
        await browser.sleep(5000);
    };
};
module.exports = new headerMenu();