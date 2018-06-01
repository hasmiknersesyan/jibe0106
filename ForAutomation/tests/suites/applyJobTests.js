'use strict';

const config = require('../../config/config.js'),
    labels = require("../dataSource/indexPage.json"),
    commonData = require("../dataSource/common.json"),
    labelsPositionDetails = require("../dataSource/positionDetailsPage.json"),
    labelsConsentForm = require("../dataSource/consentFormPage.json"),
    labelsLogin = require("../dataSource/loginPage.json"),
    indexPage = require('../../objects/PageObjects/indexPage.js'),
    positionDetailsPage = require('../../objects/PageObjects/positionDetailsPage.js'),
    consentFormPage = require('../../objects/PageObjects/consentFormPage.js'),
    uploadResumePage = require('../../objects/PageObjects/uploadResumePage.js'),
    attachCoverLetterPage = require('../../objects/PageObjects/attachCoverLetterPage.js'),
    personalInfoPage = require('../../objects/PageObjects/personalInfoPage.js'),
    loginPage = require('../../objects/PageObjects/loginPage.js'),
    using = require('jasmine-data-provider');

describe('careers jnj automation sctipts', function () {

    beforeAll(async function () {
        await indexPage.openURL();
        await browser.driver.manage().window().maximize();
    });

    it('index page UI elements checks', async function () {
        expect(await indexPage.lblSearchJob.getText()).toBe(labels.lblSearchJob, 'check lblSearchJob');
        expect(await indexPage.lblSearchLocation.getText()).toBe(labels.lblSearchLocation, 'check lblSearchLocation');
        expect(await indexPage.lblSortBy.getText()).toBe(labels.lblSortBy, 'check lblSortBy');
    });

    it('should verify position search', async function () {
        await indexPage.enterSearchPosition("Manager");
        await indexPage.clickSearch();
        expect(await indexPage.resultPosition.isDisplayed()).toBe(true, 'check result position not displayed');
    });

    xit('should verify location search', async function () {
        await indexPage.enterSearchLocation("Shangai");
        await indexPage.clickSearch();
        expect(await indexPage.locationSearchResult.isDisplayed()).toBe(true, 'check Search results not displayed');
    });

    it('should verify position details page', async function () {
        await indexPage.clickPosition();
        expect(await positionDetailsPage.applyButton.getText()).toBe(labelsPositionDetails.btnApply, 'check btnApply');
    });

    xit('position details page UI elements checks', async function () {
        expect(await positionDetailsPage.lblJobAlert.getText()).toBe(labelsPositionDetails.lblJobAlert, 'check lblJobAlert');
        expect(await positionDetailsPage.lblJobTitle.getText()).toContain(labelsPositionDetails.lblJobTitle, 'check lblJobTitle');
        expect(await positionDetailsPage.lblLocations.getText()).toContain(labelsPositionDetails.lblLocations, 'check lblLocations');
        expect(await positionDetailsPage.lblFunctions.getText()).toBe(labelsPositionDetails.lblFunctions, 'check lblFunctions');
        expect(await positionDetailsPage.lblJobDescription.getText()).toBe(labelsPositionDetails.lblJobDescription, 'check lblJobDescription');
    });

    // let x = commonData.emailValidation;
    // using(x, function (inputData){
    //     it('should verify get_alert_field negative validation', async function() {
    //         await positionDetailsPage.enterfieldAlertEmail(inputData);
    //         await positionDetailsPage.clickAlertEmail(positionDetailsPage.emailAlertErrorMessage);
    //         expect(await positionDetailsPage.emailAlertErrorMessage.isDisplayed()).toBeTruthy('check Alert messige not visible');
    //         expect(await positionDetailsPage.emailAlertErrorMessage.getText()).toBe(labelsPositionDetails.emailAlertErrorMessage, 'check emailAlertErrorMessage');
    //     });
    // });

    it('should verify get_alert_field positive validation', async function () {
        await positionDetailsPage.enterfieldAlertEmail(config.config.loginEmailValue);
        await positionDetailsPage.clickAlertEmail(positionDetailsPage.alertSuccessMessage);
        expect(await positionDetailsPage.alertSuccessMessage.getText()).toBe(labelsPositionDetails.alertSuccessMessage, 'check alertSuccessMessage');
    });

    xit('should verify position Details Page Apply button', async function () {
        await positionDetailsPage.clickApplyButton();
        expect(await consentFormPage.txtConsentPart2.getText()).toBe(labelsConsentForm.txtConsentPart2, 'check lblConsentHeader');
        expect(await consentFormPage.lblInformationYouProvide.getText()).toBe(labelsConsentForm.lblInformationYouProvide, 'check lblInformationYouProvide');
        expect(await consentFormPage.lblPassiveInformation.getText()).toBe(labelsConsentForm.lblPassiveInformation, 'check lblPassiveInformation');
        expect(await consentFormPage.lblThroughBrowser.getText()).toBe(labelsConsentForm.lblThroughBrowser, 'check lblThroughBrowser');
        expect(await consentFormPage.lblUsingCookies.getText()).toBe(labelsConsentForm.lblUsingCookies, 'check lblUsingCookies');
        expect(await consentFormPage.lblUsingPixel.getText()).toBe(labelsConsentForm.lblUsingPixel, 'check lblUsingPixel');
        expect(await consentFormPage.lblOnlineAdv.getText()).toBe(labelsConsentForm.lblOnlineAdv, 'check lblOnlineAdv');
    });

    it('should verify login Page ', async function () {
        await positionDetailsPage.clickApplyButton();
        await consentFormPage.clickAgreeButton();
        expect(await loginPage.labelLogin.getText()).toBe(labelsLogin.lblLogin);
    });

    // let data = commonData.emailValidation;
    // using(data, function (inputData){
    //     it('should verify login email field negative validation', async function() {
    //         await loginPage.enterEmail(inputData);
    //         await loginPage.enterPassword(config.config.loginPasswordValue);
    //         await loginPage.clickLoginButton('negative');
    //         expect(await loginPage.loginErrorMessage.getText()).toBe(labelsLogin.loginErrorMessage, 'check loginErrorMessage');
    //     });
    // });

    it('should check uploadResume page', async function () {
        await loginPage.enterEmail(config.config.loginEmailValue);
        await loginPage.enterPassword(config.config.loginPasswordValue);
        await loginPage.clickLoginButton('positive');
        expect(await uploadResumePage.lbluploadResume.isDisplayed()).toBeTruthy('UploadYourResume displayed');
        expect(await uploadResumePage.lblUploadOptions.isDisplayed()).toBeTruthy('UploadOptions displayed');
        expect(await uploadResumePage.lblUsePrevUploadedResume.isDisplayed()).toBeTruthy('UsePrevUploadedResume displayed');
        expect(await uploadResumePage.selectFromPrevResumeButton.isDisplayed()).toBeTruthy('check selectPreviewsResume button displayed');
        expect(await uploadResumePage.lblUploadResumeUsingOtherOptions.isDisplayed()).toBeTruthy('UploadResumeUsingOtherOptions displayed');

    });

    it('should check the Select From Prev Resume', async function () {
        await uploadResumePage.clickSelectFromPrevResumeButton();
        await uploadResumePage.clickUploadButton();
        expect(await uploadResumePage.btnNext.isDisplayed()).toBeTruthy('check btnNext displayed');
        await uploadResumePage.clickNextdButton();
    });

    it('should check the Select From Prev Resume', async function () {  
        await attachCoverLetterPage.clickRadioButton('No');
        await attachCoverLetterPage.clickNextButton();
    });
});
