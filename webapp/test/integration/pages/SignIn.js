sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/matchers/I18NText",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/Interactable"
], function (Opa5, Press, EnterText, I18NText, Properties, Interactable) {
	"use strict";
	var sViewName = "SignIn";
	Opa5.createPageObjects({
		onTheSignInView: {
			actions: {

				// iPressPage_SignIn - Page: function () {
				// 	return this.waitFor({
				// 		id: "SignIn-Page",
				// 		viewName: "SignIn",
				// 		actions: new Press(),
				// 		errorMessage: "Was not able to find the control with the id SignIn-Page"
				// 	});
				// },

				iPressOnSignUpLink: function () {
					return this.waitFor({
						id: "SignIn-SignUp-Link",
						viewName: "SignIn",
						actions: new Press(),
						errorMessage: "Was not able to find the control with the id SignIn-SignUp-Link"
					});
				},

				iEnterMalformedEmail: function () {
					return this.waitFor({
						id: "SignIn-SimpleForm-Input-Email",
						viewName: sViewName,
						actions: new EnterText({
							text: "test1-bad-email"
						}),
						errorMessage: "Was not able to find the control with the id SignIn-SimpleForm-Input-Email"
					});
				},

				iEnterCorrectEmail: function () {
					return this.waitFor({
						id: "SignIn-SimpleForm-Input-Email",
						viewName: sViewName,
						actions: new EnterText({
							text: "test1@valid_email.fr"
						}),
						errorMessage: "Was not able to find the control with the id SignIn-SimpleForm-Input-Email"
					});
				},

				iEnterCorrectPassword: function () {
					return this.waitFor({
						id: "SignIn-SimpleForm-Input-Password",
						viewName: sViewName,
						autoWait: false,
						actions: new EnterText({
							text: "P@ssword"
						}),
						errorMessage: "Was not able to find the control with the id SignIn-SimpleForm-Input-Password"
					});
				},

				iEnterWrongPassword: function () {
					return this.waitFor({
						id: "SignIn-SimpleForm-Input-Password",
						viewName: sViewName,
						autoWait: false,
						actions: new EnterText({
							text: "P@s"
						}),
						errorMessage: "Was not able to find the control with the id SignIn-SimpleForm-Input-Password"
					});
				},

				iSubmitForm: function () {
					return this.waitFor({
						id: "SignIn-Submit-Button",
						autoWait: false,
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Was not able to find the control with the id SignIn-Submit-Button"
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

				iPressOnPwForgetLink: function () {
					return this.waitFor({
						id: "SignIn-PwForget-Link",
						viewName: "SignIn",
						actions: new Press(),
						errorMessage: "Was not able to find the control with the id SignIn-PwForget-Link"
					});
				}

				// iPressButton_SignIn - Google - SignIn - Button: function () {
				// 	return this.waitFor({
				// 		id: "SignIn-Google-SignIn-Button",
				// 		viewName: "SignIn",
				// 		actions: new Press(),
				// 		errorMessage: "Was not able to find the control with the id SignIn-Google-SignIn-Button"
				// 	});
				// },
				// iPressButton_SignIn - Facebook - SignIn - Button: function () {
				// 	return this.waitFor({
				// 		id: "SignIn-Facebook-SignIn-Button",
				// 		viewName: "SignIn",
				// 		actions: new Press(),
				// 		errorMessage: "Was not able to find the control with the id SignIn-Facebook-SignIn-Button"
				// 	});
				// }
			},
			assertions: {

				iShouldSeeTheView: function () {
					return this.waitFor({
						id: "SignIn-Page",
						viewName: sViewName,
						success: function (oPage) {
							//sap.ui.test.Opa.getContext().control = oPage;
							Opa5.assert.ok(true, "The SignIn view is displayed");
						},
						errorMessage: "Was not able to find the control SignIn-Page"
					});
				},

				iShouldSeeFocusOnInputEmail: function () {
					return this.waitFor({
						id: "SignIn-SimpleForm-Input-Email",
						autoWait: false,
						viewName: sViewName,
						// matchers: function(oInput) {
						// 	return oInput.$().is(":focus");
						// },
						matchers: new Interactable(),
						success: function (oInput) {
							Opa5.assert.ok(true, "Email input is focused");
						},
						errorMessage: "Was not able to find the control with the id SignIn-SimpleForm-Input-Email"
					});
				},

				iShouldSeeSubmitButtonDisabled: function () {
					return this.waitFor({
						id: "SignIn-Submit-Button",
						autoWait: false,
						viewName: sViewName,
						matchers: [new Properties({
							enabled: false
						})],
						success: function () {
							Opa5.assert.ok(true, "SignIn-Form-Submit control is disabled");
						},
						errorMessage: "Was not able to find the control with the id SignIn-Form-Submit"
					});
				},

				iShouldSeeInvalidEmailMessage: function () {
					return this.waitFor({
						id: "SignIn-SimpleForm-Input-Email",
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
						errorMessage: "Was not able to find the control with the id SignIn-SimpleForm-Input-Email"
					});
				},

				iShouldSeeValueStateWithNoneValue: function () {
					return this.waitFor({
						id: "SignIn-SimpleForm-Input-Email",
						viewName: sViewName,
						matchers: [new Properties({
							valueState: sap.ui.core.ValueState.None
						})],
						success: function () {
							Opa5.assert.ok(true, "The valueState property equals to None");
						},
						errorMessage: "Was not able to find the control with the id SignIn-SimpleForm-Input-Email"
					});
				},

				iShouldSeeUserNotFoundAlertMessage: function () {
					return this.waitFor({
						id: "Warning-User-Not-Found",
						searchOpenDialogs: true,
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The message box is displayed");
						},
						errorMessage: "Was not able to find the control Warning-User-Not-Found"
					});
				},

				iShouldSeeWrongPasswordAlertMessage: function () {
					return this.waitFor({
						id: "MessageBox-Warning-Wrong-Password",
						searchOpenDialogs: true,
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The message box is displayed");
						},
						errorMessage: "Was not able to find the control MessageBox-Warning-Wrong-Password"
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

				iShouldGoToSignUpPage: function () {
					return this.waitFor({
						id: "SignUp-Page",
						viewName: "SignUp",
						success: function (oPage) {
							Opa5.assert.ok(true, "The SignIn page is displayed");
						},
						errorMessage: "Was not able to find the control SignUp-Page"
					});
				},

				iShouldGoToPwForgetPage: function () {
					return this.waitFor({
						id: "PwForget-Page",
						viewName: "PwForget",
						success: function (oPage) {
							Opa5.assert.ok(true, "The PwForget page is displayed");
						},
						errorMessage: "Was not able to find the control PwForget-Page"
					});
				},

				iShouldGoToEmailVerificationPage: function () {
					return this.waitFor({
						id: "EmailVerification-Page",
						viewName: "EmailVerification",
						success: function (oPage) {
							Opa5.assert.ok(true, "The EmailVerification page is displayed");
						},
						errorMessage: "Was not able to find the control EmailVerification-Page"
					});
				}
			}
		}
	});
});