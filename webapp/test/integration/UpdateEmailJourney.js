/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"djembe/in/my/pocket/util/Constant",
	"djembe/in/my/pocket/test/integration/Server",
	"./pages/SignUp",
	"./pages/UpdateEmail"
], function (opaTest, Constant, Server) {
	"use strict";

	QUnit.module("Update Email Journey");

	opaTest("Should see the update email page", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#UpdateEmail"
		});

		// Assertions
		Then.onUpdateEmailView.iShouldSeeTheView();

		// Cleanup
		Then.iTeardownMyApp();
	});
	
	opaTest("Should see focus on input email", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#UpdateEmail"
		});

		// Assertions
		Then.onUpdateEmailView.iShouldSeeFocusOnInputEmail();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see submit button disabled", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#UpdateEmail"
		});

		// Assertions
		Then.onUpdateEmailView.iShouldSeeSubmitButtonDisabled();

		// Cleanup
		Then.iTeardownMyApp();
	});
	
	opaTest("Should see invalid email message", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#UpdateEmail"
		});

		// Action
		When.onUpdateEmailView.iEnterMalformedEmail();

		// Assertions
		Then.onUpdateEmailView.iShouldSeeInvalidEmailMessage();

		// Cleanup
		Then.iTeardownMyApp();
	});
	
	opaTest("Should see nothing due to valid email", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#UpdateEmail"
		});

		// Action
		When.onUpdateEmailView.iEnterCorrectEmail();

		// Assertions
		Then.onUpdateEmailView.iShouldSeeValueStateWithNoneValue();

		// Cleanup
		Then.iTeardownMyApp();
	}); 
	
	opaTest("Should see current email text", function (Given, When, Then) {

		// Mock getIsAppInit Firebase Call (BaseController)
		Server
			.getInstance()
			.getIsAppInit()
			.returns(true);

		// Mock getCurrentUserStub Firebase Call
		Server
			.getInstance()
			.getCurrentUserStub()
			.returns({
				"email": "test@email.fr"
			});

		// Arrangements
		Given.iStartMyApp({
			hash: "#UpdateEmail"
		});

		// Assertions
		Then.onUpdateEmailView.iShouldSeeCurrentEmailText();

		// Cleanup
		Then.iTeardownMyApp();
	});
	
	opaTest("", function (Given, When, Then) {

		// Mock getIsAppInit Firebase Call (BaseController)
		Server
			.getInstance()
			.getIsAppInit()
			.returns(true);
		
		// Mock getCurrentUserStub Firebase Call
		Server
			.getInstance()
			.getCurrentUserStub()
			.returns({
				"email": "test@email.fr"
			});
			
		// Mock getSendEmailVerificationStub Firebase Call
		Server
			.getInstance()
			.geSetUserEmailAddressStub()
			.returns(new Promise(function (resolve, reject) {
				resolve();
			}));

		// Arrangements
		Given.iStartMyApp({
			hash: "#UpdateEmail"
		});

		// Action
		When.onUpdateEmailView.iEnterCorrectEmail();
		When.onUpdateEmailView.iSubmitForm();
		
		// Assertions
		Then.onUpdateEmailView.iShouldGoToEmailVerificationPage();

		// Cleanup
		Then.iTeardownMyApp();
	});
	
});