sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/matchers/I18NText",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/Interactable"
], function (Opa5, Press, EnterText, I18NText, Properties, Interactable) {
	"use strict";
	var sViewName = "UpdateEmail";
	Opa5.createPageObjects({
		onUpdateEmailView: {
			actions: {

				iEnterMalformedEmail: function () {
					return this.waitFor({
						id: "UpdateEmail-SimpleForm-Input-Email",
						viewName: sViewName,
						actions: new EnterText({
							text: "test1-bad-email"
						}),
						errorMessage: "Was not able to find the control with the id UpdateEmail-SimpleForm-Input-Email"
					});
				},

				iEnterCorrectEmail: function () {
					return this.waitFor({
						id: "UpdateEmail-SimpleForm-Input-Email",
						viewName: sViewName,
						actions: new EnterText({
							text: "test1@valid_email.fr"
						}),
						errorMessage: "Was not able to find the control with the id UpdateEmail-SimpleForm-Input-Email"
					});
				},
				
				iSubmitForm: function () {
					return this.waitFor({
						id: "UpdateEmail-Submit-Button",
						autoWait: false,
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Was not able to find the control with the id UpdateEmail-Submit-Button"
					});
				}
			},
			assertions: {

				iShouldSeeTheView: function () {
					return this.waitFor({
						id: "UpdateEmail-Page",
						viewName: sViewName,
						success: function (oPage) {
							Opa5.assert.ok(true, "The UpdateEmail view is displayed");
						},
						errorMessage: "Was not able to find the control UpdateEmail-Page"
					});
				},

				iShouldSeeFocusOnInputEmail: function () {
					return this.waitFor({
						id: "UpdateEmail-SimpleForm-Input-Email",
						autoWait: false,
						viewName: sViewName,
						matchers: new Interactable(),
						success: function (oInput) {
							Opa5.assert.ok(true, "Email input is focused");
						},
						errorMessage: "Was not able to find the control with the id UpdateEmail-SimpleForm-Input-Email"
					});
				},

				iShouldSeeSubmitButtonDisabled: function () {
					return this.waitFor({
						id: "UpdateEmail-Submit-Button",
						autoWait: false,
						viewName: sViewName,
						matchers: [new Properties({
							enabled: false
						})],
						success: function () {
							Opa5.assert.ok(true, "Submit button control is disabled");
						},
						errorMessage: "Was not able to find the control with the id UpdateEmail-Form-Submit"
					});
				},

				iShouldSeeInvalidEmailMessage: function () {
					return this.waitFor({
						id: "UpdateEmail-SimpleForm-Input-Email",
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
						errorMessage: "Was not able to find the control with the id UpdateEmail-SimpleForm-Input-Email"
					});
				},

				iShouldSeeValueStateWithNoneValue: function () {
					return this.waitFor({
						id: "UpdateEmail-SimpleForm-Input-Email",
						viewName: sViewName,
						matchers: [new Properties({
							valueState: sap.ui.core.ValueState.None
						})],
						success: function () {
							Opa5.assert.ok(true, "The valueState property equals to None");
						},
						errorMessage: "Was not able to find the control with the id UpdateEmail-SimpleForm-Input-Email"
					});
				},

				iShouldSeeCurrentEmailText: function () {
					return this.waitFor({
						id: "UpdateEmail-SimpleForm-Text-Current-Email",
						viewName: sViewName,
						matchers: [new Properties({
							text: "test@email.fr"
						})],
						success: function () {
							Opa5.assert.ok(true,
								"Current email is displayed"
							);
						},
						errorMessage: "Was not able to reand current email"
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