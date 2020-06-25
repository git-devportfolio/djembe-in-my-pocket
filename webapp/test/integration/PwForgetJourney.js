/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"djembe/in/my/pocket/util/Constant",
	"djembe/in/my/pocket/test/integration/Server",
	"./pages/PwForget"
], function (opaTest, Constant, Server) {
	"use strict";

	QUnit.module("PwForget Journey");

	opaTest("Should see the password forget page", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#PwForget"
		});

		// Assertions
		Then.onThePwForgetView.iShouldSeeTheView();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see focus on input email", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#PwForget"
		});

		// Assertions
		Then.onThePwForgetView.iShouldSeeFocusOnInputEmail();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see submit button disabled", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#PwForget"
		});

		// Assertions
		Then.onThePwForgetView.iShouldSeeSubmitButtonDisabled();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see invalid email message", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#PwForget"
		});

		// Action
		When.onThePwForgetView.iEnterMalformedEmail();

		// Assertions
		Then.onThePwForgetView.iShouldSeeInvalidEmailMessage();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see nothing due to valid email", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#PwForget"
		});

		// Action
		When.onThePwForgetView.iEnterCorrectEmail();

		// Assertions
		Then.onThePwForgetView.iShouldSeeValueStateWithNoneValue();

		// Cleanup
		Then.iTeardownMyApp();
	});
	
	opaTest("Should see user not found alert message", function (Given, When, Then) {
		// Mock SignInWithEmailAndPassword Firebase Call
		Server
			.getInstance()
			.getSendPasswordResetEmailStub()
			.returns(new Promise(function (resolve, reject) {
				reject({
					code: Constant.AUTH_ERRORS.USER_NOT_FOUND
				});
			}));

		// Arrangements
		Given.iStartMyApp({
			hash: "#PwForget"
		});
		
		// Action
		When.onThePwForgetView.iEnterCorrectEmail();
		When.onThePwForgetView.iSubmitForm();
		
		// Assertions
		Then.onThePwForgetView.iShouldSeeUserNotFoundAlertMessage();
		
		// Action
		When.onThePwForgetView.iPressYesNoPopupOnNoButton();
		
		// Assertions
		Then.onThePwForgetView.iShouldSeePopupClosed();
		
		// Cleanup
		Then.iTeardownMyApp();
	});

});