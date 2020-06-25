/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"djembe/in/my/pocket/util/Constant",
	"djembe/in/my/pocket/test/integration/Server",
	"./pages/SignIn"
], function (opaTest, Constant, Server) {
	"use strict";

	QUnit.module("SignIn Journey");

	opaTest("Should see the sign in page", function (Given, When, Then) {
		
		// Arrangements
		Given.iStartMyApp();

		// Assertions
		Then.onTheSignInView.iShouldSeeTheView();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see focus on input email", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Assertions
		Then.onTheSignInView.iShouldSeeFocusOnInputEmail();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see submit button disabled", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Assertions
		Then.onTheSignInView.iShouldSeeSubmitButtonDisabled();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see invalid email message", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Action
		When.onTheSignInView.iEnterMalformedEmail();

		// Assertions
		Then.onTheSignInView.iShouldSeeInvalidEmailMessage();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see nothing due to valid email", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Action
		When.onTheSignInView.iEnterCorrectEmail();

		// Assertions
		Then.onTheSignInView.iShouldSeeValueStateWithNoneValue();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see user not found alert message", function (Given, When, Then) {
		// Mock SignInWithEmailAndPassword Firebase Call
		Server
			.getInstance()
			.getSignInWithEmailAndPasswordStub()
			.returns(new Promise(function (resolve, reject) {
				reject({
					code: Constant.AUTH_ERRORS.USER_NOT_FOUND
				});
			}));

		// Arrangements
		Given.iStartMyApp();
		
		// Action
		When.onTheSignInView.iEnterCorrectEmail();
		When.onTheSignInView.iEnterCorrectPassword();
		When.onTheSignInView.iSubmitForm();
		
		// Assertions
		Then.onTheSignInView.iShouldSeeUserNotFoundAlertMessage();
		
		// Action
		When.onTheSignInView.iPressYesNoPopupOnNoButton();
		
		// Assertions
		Then.onTheSignInView.iShouldSeePopupClosed();
		
		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see wrong password alert message", function (Given, When, Then) {
		// Mock SignInWithEmailAndPassword Firebase Call
		Server
			.getInstance()
			.getSignInWithEmailAndPasswordStub()
			.returns(new Promise(function (resolve, reject) {
				reject({
					code: Constant.AUTH_ERRORS.WRONG_PASSWORD
				});
			}));
			
		// Arrangements
		Given.iStartMyApp();

		// Action
		When.onTheSignInView.iEnterCorrectEmail();
		When.onTheSignInView.iEnterWrongPassword();
		When.onTheSignInView.iSubmitForm();

		// Assertions
		Then.onTheSignInView.iShouldSeeWrongPasswordAlertMessage();

		// Action
		When.onTheSignInView.iPressYesNoPopupOnNoButton();
		
		// Assertions
		Then.onTheSignInView.iShouldSeePopupClosed();
		
		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should go to PwForget page", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Action
		When.onTheSignInView.iPressOnPwForgetLink();
		
		// Assertions
		Then.onTheSignInView.iShouldGoToPwForgetPage();
		
		// Cleanup
		Then.iTeardownMyApp();
	});
	
	opaTest("Should go to SignUp page", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Action
		When.onTheSignInView.iPressOnSignUpLink();
		
		// Assertions
		Then.onTheSignInView.iShouldGoToSignUpPage();
		
		// Cleanup
		Then.iTeardownMyApp();
	});

});