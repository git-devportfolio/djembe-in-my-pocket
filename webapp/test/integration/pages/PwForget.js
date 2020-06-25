sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/matchers/I18NText",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/Interactable"
], function (Opa5, Press, EnterText, I18NText, Properties, Interactable) {
	"use strict";
	var sViewName = "PwForget";
	Opa5.createPageObjects({
		onThePwForgetView: {
			actions: {
				
				iEnterMalformedEmail: function () {
					return this.waitFor({
						id: "PwForget-SimpleForm-Input-Email",
						viewName: sViewName,
						actions: new EnterText({
							text: "test1-bad-email"
						}),
						errorMessage: "Was not able to find the control with the id PwForget-SimpleForm-Input-Email"
					});
				},

				iEnterCorrectEmail: function () {
					return this.waitFor({
						id: "PwForget-SimpleForm-Input-Email",
						viewName: sViewName,
						actions: new EnterText({
							text: "test1@valid_email.fr"
						}),
						errorMessage: "Was not able to find the control with the id PwForget-SimpleForm-Input-Email"
					});
				},
				
				iSubmitForm: function () {
					return this.waitFor({
						id: "PwForget-Submit-Button",
						autoWait: false,
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Was not able to find the control with the id PwForget-Submit-Button"
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
				}
				
				// iPressPage_SignUp - Page: function () {
				// 	return this.waitFor({
				// 		id: "SignUp-Page",
				// 		viewName: "SignUp",
				// 		actions: new Press(),
				// 		errorMessage: "Was not able to find the control with the id SignUp-Page"
				// 	});
				// },
				// iPressLink_linkSignIn: function () {
				// 	return this.waitFor({
				// 		id: "linkSignIn",
				// 		viewName: "SignUp",
				// 		actions: new Press(),
				// 		errorMessage: "Was not able to find the control with the id linkSignIn"
				// 	});
				// },
				// iEnterTextInput_SignUp - SimpleForm - Input - Email: function () {
				// 	return this.waitFor({
				// 		id: "SignUp-SimpleForm-Input-Email",
				// 		viewName: "SignUp",
				// 		actions: new EnterText({
				// 			text: "Text to enter in the control"
				// 		}),
				// 		errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Email"
				// 	});
				// },
				// iEnterTextInput_SignUp - SimpleForm - Input - Password - One: function () {
				// 	return this.waitFor({
				// 		id: "SignUp-SimpleForm-Input-Password-One",
				// 		viewName: "SignUp",
				// 		actions: new EnterText({
				// 			text: "Text to enter in the control"
				// 		}),
				// 		errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Password-One"
				// 	});
				// },
				// iEnterTextInput_SignUp - SimpleForm - Input - Password - Two: function () {
				// 	return this.waitFor({
				// 		id: "SignUp-SimpleForm-Input-Password-Two",
				// 		viewName: "SignUp",
				// 		actions: new EnterText({
				// 			text: "Text to enter in the control"
				// 		}),
				// 		errorMessage: "Was not able to find the control with the id SignUp-SimpleForm-Input-Password-Two"
				// 	});
				// },
				// iPressButton_SignUp - Submit - Button: function () {
				// 	return this.waitFor({
				// 		id: "SignUp-Submit-Button",
				// 		viewName: "SignUp",
				// 		actions: new Press(),
				// 		errorMessage: "Was not able to find the control with the id SignUp-Submit-Button"
				// 	});
				// },
				// iPressButton_SignUp - Google - SignUp - Button: function () {
				// 	return this.waitFor({
				// 		id: "SignUp-Google-SignUp-Button",
				// 		viewName: "SignUp",
				// 		actions: new Press(),
				// 		errorMessage: "Was not able to find the control with the id SignUp-Google-SignUp-Button"
				// 	});
				// },
				// iPressButton_SignUp - Facebook - SignUp - Button: function () {
				// 	return this.waitFor({
				// 		id: "SignUp-Facebook-SignUp-Button",
				// 		viewName: "SignUp",
				// 		actions: new Press(),
				// 		errorMessage: "Was not able to find the control with the id SignUp-Facebook-SignUp-Button"
				// 	});
				// }
			},
			assertions: {

				iShouldSeeTheView: function () {
					return this.waitFor({
						id: "PwForget-Page",
						viewName: sViewName,
						success: function (oPage) {
							Opa5.assert.ok(true, "The PwForget view is displayed");
						},
						errorMessage: "Was not able to find the control PwForget-Page"
					});
				},
				
				iShouldSeeFocusOnInputEmail: function () {
					return this.waitFor({
						id: "PwForget-SimpleForm-Input-Email",
						autoWait: false,
						viewName: sViewName,
						matchers: new Interactable(),
						success: function (oInput) {
							Opa5.assert.ok(true, "Email input is focused");
						},
						errorMessage: "Was not able to find the control with the id PwForget-SimpleForm-Input-Email"
					});
				},
				
				iShouldSeeSubmitButtonDisabled: function () {
					return this.waitFor({
						id: "PwForget-Submit-Button",
						autoWait: false,
						viewName: sViewName,
						matchers: [new Properties({
							enabled: false
						})],
						success: function () {
							Opa5.assert.ok(true, "PwForget-Form-Submit control is disabled");
						},
						errorMessage: "Was not able to find the control with the id PwForget-Form-Submit"
					});
				},

				iShouldSeeInvalidEmailMessage: function () {
					return this.waitFor({
						id: "PwForget-SimpleForm-Input-Email",
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
						errorMessage: "Was not able to find the control with the id PwForget-SimpleForm-Input-Email"
					});
				},

				iShouldSeeValueStateWithNoneValue: function () {
					return this.waitFor({
						id: "PwForget-SimpleForm-Input-Email",
						viewName: sViewName,
						matchers: [new Properties({
							valueState: sap.ui.core.ValueState.None
						})],
						success: function () {
							Opa5.assert.ok(true, "The valueState property equals to None");
						},
						errorMessage: "Was not able to find the control with the id PwForget-SimpleForm-Input-Email"
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
				}
			}
		}
	});
});