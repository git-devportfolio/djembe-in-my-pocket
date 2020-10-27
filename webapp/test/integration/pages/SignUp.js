sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/matchers/I18NText",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/Interactable"
], function (Opa5, Press, EnterText, I18NText, Properties, Interactable) {
	"use strict";
	var sViewName = "SignUp";
	Opa5.createPageObjects({
		onTheSignUpView: {
			actions: {
				
				iEnterMalformedEmail: function () {
					return this.waitFor({
						id: "SignUp-SimpleForm-Input-Email",
						viewName: sViewName,
						actions: new EnterText({
							text: "test1-bad-email"
						}),
						errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Email"
					});
				},

				iEnterCorrectEmail: function () {
					return this.waitFor({
						id: "SignUp-SimpleForm-Input-Email",
						viewName: sViewName,
						actions: new EnterText({
							text: "test1@valid_email.fr"
						}),
						errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Email"
					});
				},
				
				iEnterTooShortPasswordOne: function() {
					return this.waitFor({
						id: "SignUp-SimpleForm-Input-Password-One",
						viewName: sViewName,
						actions: new EnterText({
							text: "test1"
						}),
						errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Password-One"
					});					
				},
				
				iEnterCorrectPasswordOne: function () {
					return this.waitFor({
						id: "SignUp-SimpleForm-Input-Password-One",
						viewName: sViewName,
						actions: new EnterText({
							text: "test123"
						}),
						errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Password-One"
					});
				},
				
				iEnterPasswordTwoNotEqualsToPasswordOne: function() {
					return this.waitFor({
						id: "SignUp-SimpleForm-Input-Password-Two",
						viewName: sViewName,
						actions: new EnterText({
							text: "test456"
						}),
						errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Password-Two"
					});					
				},
				
				iEnterPasswordTwoEqualsToPasswordOne: function () {
					return this.waitFor({
						id: "SignUp-SimpleForm-Input-Password-Two",
						viewName: sViewName,
						actions: new EnterText({
							text: "test123"
						}),
						errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Password-Two"
					});
				},
				
				iSubmitForm: function () {
					return this.waitFor({
						id: "SignUp-Submit-Button",
						autoWait: false,
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Was not able to find the control with the id SignUp-Submit-Button"
					});
				},
				
				iPressYesNoPopupOnNoButton: function () {
					return this.waitFor({
						controlType: "sap.m.Button",
						viewName: sViewName,
						searchOpenDialogs: true,
						actions: function (oButton) {
							oButton.getParent().getButtons()[1].firePress();
						},
						errorMessage: "Was not able to find the control sap.m.MessageBox"
					});
				},
				
				iPressOnSignInLink: function () {
					return this.waitFor({
						id: "SignUp-SignIn-Link",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Was not able to find the control with the id SignUp-SignIn-Link"
					});
				}
			},
			assertions: {

				iShouldSeeTheView: function () {
					return this.waitFor({
						id: "SignUp-Page",
						viewName: sViewName,
						success: function (oPage) {
							Opa5.assert.ok(true, "The SignUp view is displayed");
						},
						errorMessage: "Was not able to find the control SignUp-Page"
					});
				},
				
				iShouldSeeFocusOnInputEmail: function () {
					return this.waitFor({
						id: "SignUp-SimpleForm-Input-Email",
						autoWait: false,
						viewName: sViewName,
						matchers: new Interactable(),
						success: function (oInput) {
							Opa5.assert.ok(true, "Email input is focused");
						},
						errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Email"
					});
				},
				
				iShouldSeeSubmitButtonDisabled: function () {
					return this.waitFor({
						id: "SignUp-Submit-Button",
						autoWait: false,
						viewName: sViewName,
						matchers: [new Properties({
							enabled: false
						})],
						success: function () {
							Opa5.assert.ok(true, "SignUp-Form-Submit control is disabled");
						},
						errorMessage: "Was not able to find the control with the id SignUp-Form-Submit"
					});
				},

				iShouldSeeInvalidEmailMessage: function () {
					return this.waitFor({
						id: "SignUp-SimpleForm-Input-Email",
						viewName: sViewName,
						matchers: [new I18NText({
							propertyName: "valueStateText",
							key: "auth/invalid-email"
						}), new Properties({
							valueState: sap.ui.core.ValueState.Error
						})],
						success: function () {
							Opa5.assert.ok(true,
								"The i18n auth/invalid-email key is displayed and valueState property equals to Error");
						},
						errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Email"
					});
				},

				iShouldSeeEmailValueStateWithNoneValue: function () {
					return this.waitFor({
						id: "SignUp-SimpleForm-Input-Email",
						viewName: sViewName,
						matchers: [new Properties({
							valueState: sap.ui.core.ValueState.None
						})],
						success: function () {
							Opa5.assert.ok(true, "The valueState property equals to None");
						},
						errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Email"
					});
				},
				
				iShouldSeeInvalidPasswordOneMessage: function () {
					return this.waitFor({
						id: "SignUp-SimpleForm-Input-Password-One",
						viewName: sViewName,
						matchers: [new I18NText({
							propertyName: "valueStateText",
							key: "signUpViewPasswordLengthErrorMessage"
						}), new Properties({
							valueState: sap.ui.core.ValueState.Error
						})],
						success: function () {
							Opa5.assert.ok(true,
								"The i18n signUpViewPasswordLengthErrorMessage key is displayed and valueState property equals to Error");
						},
						errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Password-One"
					});
				},
				
				iShouldSeePasswordOneValueStateWithNoneValue: function () {
					return this.waitFor({
						id: "SignUp-SimpleForm-Input-Password-One",
						viewName: sViewName,
						matchers: [new Properties({
							valueState: sap.ui.core.ValueState.None
						})],
						success: function () {
							Opa5.assert.ok(true, "The valueState property equals to None");
						},
						errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Password-One"
					});
				},
				
				iShouldSeeInvalidPasswordTwoMessage: function () {
					return this.waitFor({
						id: "SignUp-SimpleForm-Input-Password-Two",
						viewName: sViewName,
						matchers: [new I18NText({
							propertyName: "valueStateText",
							key: "signUpViewPasswordMatchesErrorMessage"
						}), new Properties({
							valueState: sap.ui.core.ValueState.Error
						})],
						success: function () {
							Opa5.assert.ok(true,
								"The i18n signUpViewPasswordMatchesErrorMessage key is displayed and valueState property equals to Error");
						},
						errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Password-Two"
					});
				},
				
				iShouldSeePasswordTwoValueStateWithNoneValue: function () {
					return this.waitFor({
						id: "SignUp-SimpleForm-Input-Password-Two",
						viewName: sViewName,
						matchers: [new Properties({
							valueState: sap.ui.core.ValueState.None
						})],
						success: function () {
							Opa5.assert.ok(true, "The valueState property equals to None");
						},
						errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Password-Two"
					});
				},
				
				iShouldSeeEmailAlreadyAnUseAlertMessage: function () {
					return this.waitFor({
						id: "MessageBox-Email-Already-Use",
						searchOpenDialogs: true,
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The message box is displayed");
						},
						errorMessage: "Was not able to find the control MessageBox-Email-Already-Use"
					});
				},
				
				iShouldSeePopupClosed: function () {
					return this.waitFor({
						check: function () {
							return $(".sapMMessageBoxWarning").length === 0;
						},
						success: function () {
							Opa5.assert.ok(true, "The Messagebox is closed");
						},
						errorMessage: "Was not able to find the control type sap.m.MessageBox"
					});
				},
				
				iShouldGoToSignInPage: function () {
					return this.waitFor({
						id: "SignIn-Page",
						viewName: "SignIn",
						success: function (oPage) {
							Opa5.assert.ok(true, "The SignIn page is displayed");
						},
						errorMessage: "Was not able to find the control SignIn-Page"
					});
				}
			}
		}
	});
});