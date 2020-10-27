/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"djembe/in/my/pocket/util/Constant",
	"djembe/in/my/pocket/test/integration/Server",
	"./pages/SignUp"
], function (opaTest, Constant, Server) {
	"use strict";

	QUnit.module("SignUp Journey");

	opaTest("Should see the sign up page", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#SignUp"
		});

		// Assertions
		Then.onTheSignUpView.iShouldSeeTheView();

		// Cleanup
		Then.iTeardownMyApp();
	});
	
	opaTest("Should see focus on input email", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#SignUp"
		});

		// Assertions
		Then.onTheSignUpView.iShouldSeeFocusOnInputEmail();

		// Cleanup
		Then.iTeardownMyApp();
	});
	
	opaTest("Should see submit button disabled", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#SignUp"
		});

		// Assertions
		Then.onTheSignUpView.iShouldSeeSubmitButtonDisabled();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see invalid email message", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#SignUp"
		});

		// Action
		When.onTheSignUpView.iEnterMalformedEmail();

		// Assertions
		Then.onTheSignUpView.iShouldSeeInvalidEmailMessage();

		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should see nothing due to valid email", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#SignUp"
		});

		// Action
		When.onTheSignUpView.iEnterCorrectEmail();

		// Assertions
		Then.onTheSignUpView.iShouldSeeEmailValueStateWithNoneValue();

		// Cleanup
		Then.iTeardownMyApp();
	});
	
	opaTest("Should see invalid password-one message", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#SignUp"
		});

		// Action
		When.onTheSignUpView.iEnterTooShortPasswordOne();

		// Assertions
		Then.onTheSignUpView.iShouldSeeInvalidPasswordOneMessage();

		// Cleanup
		Then.iTeardownMyApp();
	});
	
	opaTest("Should see nothing due to valid password-one", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#SignUp"
		});

		// Action
		When.onTheSignUpView.iEnterCorrectPasswordOne();

		// Assertions
		Then.onTheSignUpView.iShouldSeePasswordOneValueStateWithNoneValue();

		// Cleanup
		Then.iTeardownMyApp();
	});
	
	opaTest("Should see invalid password-two message", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#SignUp"
		});

		// Action
		When.onTheSignUpView.iEnterCorrectPasswordOne();
		When.onTheSignUpView.iEnterPasswordTwoNotEqualsToPasswordOne();
		
		// Assertions
		Then.onTheSignUpView.iShouldSeeInvalidPasswordTwoMessage();

		// Cleanup
		Then.iTeardownMyApp();
	});
	
	opaTest("Should see nothing due to valid password-two", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#SignUp"
		});

		// Action
		When.onTheSignUpView.iEnterCorrectPasswordOne();
		When.onTheSignUpView.iEnterPasswordTwoEqualsToPasswordOne();

		// Assertions
		Then.onTheSignUpView.iShouldSeePasswordTwoValueStateWithNoneValue();

		// Cleanup
		Then.iTeardownMyApp();
	});
	
	opaTest("Should see email already in use alert message", function (Given, When, Then) {
		// Mock SignInWithEmailAndPassword Firebase Call
		Server
			.getInstance()
			.getCreateUserWithEmailAndPasswordStub()
			.returns(new Promise(function (resolve, reject) {
				reject({
					code: Constant.AUTH_ERRORS.EMAIL_ALREADY_IN_USE
				});
			}));
			
		// Arrangements
		Given.iStartMyApp({
			hash: "#SignUp"
		});

		// Action
		When.onTheSignUpView.iEnterCorrectEmail();
		When.onTheSignUpView.iEnterCorrectPasswordOne();
		When.onTheSignUpView.iEnterPasswordTwoEqualsToPasswordOne();
		When.onTheSignUpView.iSubmitForm();

		// Assertions
		Then.onTheSignUpView.iShouldSeeEmailAlreadyAnUseAlertMessage();

		// Action
		When.onTheSignUpView.iPressYesNoPopupOnNoButton();
		
		// Assertions
		Then.onTheSignUpView.iShouldSeePopupClosed();
		
		// Cleanup
		Then.iTeardownMyApp();
	});
	
	opaTest("Should go to SignIn page", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			hash: "#SignUp"
		});

		// Action
		When.onTheSignUpView.iPressOnSignInLink();
		
		// Assertions
		Then.onTheSignUpView.iShouldGoToSignInPage();
		
		// Cleanup
		Then.iTeardownMyApp();
	});
	
});