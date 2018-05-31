'use strict';

const config = require('../../config/config.js'),
    lpl = require("../locators/loginPageLocators.json"),    
    attachCoverLetterPage = require('./attachCoverLetterPage.js'),
    EC = protractor.ExpectedConditions;

require("babel-core/register");
require("babel-polyfill");

let  uploadResumePage = function () {

    //page element locators
    this.lbluploadResume = element(by.xpath("//h2[contains(text(), 'Upload Your Resume')]"));
    this.selectFromPrevResumeButton = element(by.xpath("//button[@class='ui button previous-resume-btn']"));
    this.lblUploadOptions = element(by.xpath("//h3[contains(text(), 'Upload a resume using one of the following:')]"));
    this.lblUsePrevUploadedResume = element(by.xpath("//h5[contains(text(), 'Use a previously uploaded resume:')]"));
    this.lblUploadResumeUsingOtherOptions = element(by.xpath("//h5[contains(text(), 'Or, upload a new resume using one of the following:')]"));

    this.googleDriveButton = element(by.xpath("//button[@class='ui button drive-upload ng-star-inserted']"));
    this.dropBoxButton = element(by.xpath("//button[@class='ui button dropbox-upload ng-star-inserted']"));
    this.viaEmailButton = element(by.xpath("//button[@class='ui button email-upload ng-star-inserted']"));
    this.btnUpload = element(by.xpath("//button[contains(text(), 'Upload')]"));
    this.btnUploadPreviewsResume = element(by.xpath("//span[contains(text(), 'Select From Previous Resumes')]"));
    this.btnNext = element(by.xpath("//span[contains(text(), 'Next')]"));

    this.clickSelectFromPrevResumeButton = async function () {
        await browser.wait(EC.visibilityOf(this.selectFromPrevResumeButton), config.config.regularTimeout, 'waits for selectFromPrevResumeButton');   
        await this.selectFromPrevResumeButton.click();
        await browser.wait(EC.visibilityOf(this.btnUpload), config.config.regularTimeout, 'waits for btnUpload');       
    };

    this.clickUploadButton = async function () {
        await this.btnUpload.click();
        await browser.wait(EC.visibilityOf(this.btnUploadPreviewsResume), config.config.regularTimeout, 'waits for btnUploadPreviewsResume');       
    };

    this.clickNextdButton = async function () {
        await this.btnNext.click();
        await browser.sleep(5000);
        await browser.wait(EC.visibilityOf(attachCoverLetterPage.lblattachLetter), config.config.regularTimeout, 'waits for btnUploadPreviewsResume');       
    };

};

module.exports = new uploadResumePage();