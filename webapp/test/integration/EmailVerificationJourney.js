/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"djembe/in/my/pocket/util/Constant",
	"djembe/in/my/pocket/test/integration/Server",
	"./pages/EmailVerification"
], function (opaTest, Constant, Server) {
	"use strict";

	QUnit.module("EmailVerification Journey");

	opaTest("Should see the email verification page", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#EmailVerification"
		});

		// Assertions
		Then.onTheEmailVerificationView.iShouldSeeTheView();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see the message page text", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#EmailVerification"
		});

		// Assertions
		Then.onTheEmailVerificationView.iShouldSeeMessagePageText();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see the message page description", function (Given, When, Then) {

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
			hash: "#EmailVerification"
		});

		// Assertions
		Then.onTheEmailVerificationView.iShouldSeeMessagePageDescription();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see too many request message", function (Given, When, Then) {

		// Mock getSendEmailVerificationStub Firebase Call
		Server
			.getInstance()
			.getSendEmailVerificationStub()
			.returns(new Promise(function (resolve, reject) {
				reject({
					code: Constant.AUTH_ERRORS.TOO_MANY_REQUESTS
				});
			}));

		// Arrangements
		Given.iStartMyApp({
			hash: "#EmailVerification"
		});

		// Action
		When.onTheEmailVerificationView.iPressOnSendEmailButton();

		// Assertions
		Then.onTheEmailVerificationView.iShouldSeeEmailAlreadyAnUseAlertMessage();

		// Action
		When.onTheEmailVerificationView.iPressYesNoPopupOnNoButton();

		// Assertions
		Then.onTheEmailVerificationView.iShouldSeePopupClosed();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see send e-mail success message", function (Given, When, Then) {

		// Mock getSendEmailVerificationStub Firebase Call
		Server
			.getInstance()
			.getSendEmailVerificationStub()
			.returns(new Promise(function (resolve, reject) {
				resolve();
			}));

		// Arrangements
		Given.iStartMyApp({
			hash: "#EmailVerification"
		});

		// Action
		When.onTheEmailVerificationView.iPressOnSendEmailButton();

		// Assertions
		Then.onTheEmailVerificationView.iShouldSeeEmailSuccessMessage();

		// Action
		When.onTheEmailVerificationView.iPressYesNoPopupOnNoButton();

		// Assertions
		Then.onTheEmailVerificationView.iShouldSeePopupClosed();
		
		// Assertions
		Then.onTheEmailVerificationView.iShouldGoToSignInPage();

		// Cleanup
		Then.iTeardownMyApp();
	});
	
	opaTest("Should navigate to sign in page", function (Given, When, Then) {

		// Arrangements
		Given.iStartMyApp({
			hash: "#EmailVerification"
		});

		// Action
		When.onTheEmailVerificationView.iPressOnNavBackHeaderButton();

		// Assertions
		Then.onTheEmailVerificationView.iShouldGoToSignInPage();

		// Cleanup
		Then.iTeardownMyApp();
	});
});