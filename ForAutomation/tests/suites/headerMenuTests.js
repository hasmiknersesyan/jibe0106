'use strict';

const headerMenu = require('../../objects/components/headerMenu.js'),
    indexPage = require('../../objects/PageObjects/indexPage.js');

describe('Header menu test', function() {

    beforeAll(async function()   {
        await indexPage.openURL();
        await browser.driver.manage().window().maximize();
    });

    it('should check menu search', async function()   {
        await headerMenu.clickMenuItems(headerMenu.searchButton, headerMenu.searchInput);
        // add expect checks
    });

    it('should check menu countries', async function()   {
        await headerMenu.clickMenuItems(headerMenu.countriesButton, headerMenu.lblCountries);
        // add expect checks
    });

    it('should check menu items for news page URL', async function()   {
        await headerMenu.clickMenuItems(headerMenu.menuButton, headerMenu.titleStories);
        await headerMenu.clickMenuItems(headerMenu.lnkNews, headerMenu.titleMenuPages);
        await expect(browser.getCurrentUrl()).toContain('latest-news', 'check news page URL');       
    });

    it('should check menu items for check innovation page URL', async function()   {    
        await headerMenu.clickMenuItems(headerMenu.lnkInnovation, headerMenu.titleMenuPages);
        await expect(browser.getCurrentUrl()).toContain('innovation', 'check innovation page URL');       
    });

    it('should check menu items for caring-and-giving', async function()   {      
        await headerMenu.clickMenuItems(headerMenu.lnkCareing, headerMenu.titleMenuPages);
        await expect(browser.getCurrentUrl()).toContain('caring-and-giving', 'check caring-and-giving page URL');        
    });

    it('should check menu items', async function()   {    
        await headerMenu.clickMenuItems(headerMenu.lnkPersonal, headerMenu.titleMenuPages);
        await expect(browser.getCurrentUrl()).toContain('personal-stories', 'check personal-stories page URL');

        await headerMenu.clickMenuItems(headerMenu.lnkHealth, headerMenu.titleMenuPages);
        await expect(browser.getCurrentUrl()).toContain('health-and-wellness', 'check health-and-wellness page URL');

        await headerMenu.clickMenuItems(headerMenu.lnkHeritage, headerMenu.titleMenuPages);
        await expect(browser.getCurrentUrl()).toContain('our-heritage', 'check our-heritage page URL');
    });

    it('should check links About Companies', async function() {
        await headerMenu.mouseHover(headerMenu.lnkCompanyAbout);
        //add checks
    });

    it('should check Products of Companies  ', async function() {
        await headerMenu.mouseHover(headerMenu.lnkCompanyProducts);
        //add checks
    });

    it('should check Our Companies Procurement', async function() {
        await headerMenu.mouseHover(headerMenu.lnkCompanyProcurement);
        //add checks
    });

    it('should check Our Companies Careers', async function() {
        await headerMenu.mouseHover(headerMenu.lnkCompanyCareers);
        //add checks
    });

    it('should check Our Companies Investors', async function() {
        await headerMenu.mouseHover(headerMenu.lnkCompanyInvestors);
        //add checks
    });

    it('should check Our Companies Societal', async function() {
        await headerMenu.mouseHover(headerMenu.lnkCompanySocietal, headerMenu.ulSocietal);
        //add checks
    });
});

