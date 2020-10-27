sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press",
	"sap/ui/test/actions/EnterText",
	"sap/ui/test/matchers/I18NText",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/Interactable"
], function (Opa5, Press, EnterText, I18NText, Properties, Interactable) {
	"use strict";
	var sViewName = "EmailVerification";
	Opa5.createPageObjects({
		onTheEmailVerificationView: {

			actions: {

				iPressOnSendEmailButton: function () {
					return this.waitFor({
						id: "EmailVerification-SendEmail-Button",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Was not able to find the control with the id EmailVerification-SendEmail-Button"
					});
				},

				iPressOnUpdateEmailButton: function () {
					return this.waitFor({
						id: "EmailVerification-UpdateEmail-Button",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Was not able to find the control with the id EmailVerification-UpdateEmail-Button"
					});
				},
				
				iPressOnNavBackHeaderButton: function () {
					return this.waitFor({
						id: "EmailVerification-NavBack-Button",
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Was not able to find the control with the id EmailVerification-NavBack-Button"
					});
				},
				
				iPressYesNoPopupOnNoButton: function () {
					return this.waitFor({
						controlType: "sap.m.Button",
						viewName: sViewName,
						searchOpenDialogs: true,
						actions: function (oButton) {
							oButton.getParent().getButtons()[0].firePress();
						},
						errorMessage: "Was not able to find the control sap.m.MessageBox"
					});
				}
			},
			assertions: {

				iShouldSeeTheView: function () {
					return this.waitFor({
						id: "EmailVerification-Page",
						viewName: sViewName,
						success: function (oPage) {
							Opa5.assert.ok(true, "The EmailVerification view is displayed");
						},
						errorMessage: "Was not able to find the control EmailVerification-Page"
					});
				},

				iShouldSeeMessagePageText: function () {
					return this.waitFor({
						id: "EmailVerification-MessagePage",
						viewName: sViewName,
						matchers: [new I18NText({
							propertyName: "text",
							key: "EmailVerificationViewMessagePageText"
						})],
						success: function () {
							Opa5.assert.ok(true,
								"The i18n EmailVerificationViewMessagePageText key is displayed"
							);
						},
						errorMessage: "Was not able to find the control with the id EmailVerification-MessagePage"
					});
				},
				
				iShouldSeeMessagePageDescription: function () {
					return this.waitFor({
						id: "EmailVerification-MessagePage",
						viewName: sViewName,
						matchers: [new I18NText({
							propertyName: "description",
							key: "EmailVerificationViewMessagePageDescription",
							parameters: "test@email.fr"
						})],
						success: function () {
							Opa5.assert.ok(true,
								"The i18n EmailVerificationViewMessagePageText key is displayed"
							);
						},
						errorMessage: "Was not able to find the control with the id EmailVerification-MessagePage"
					});
				},
				
				iShouldSeeEmailAlreadyAnUseAlertMessage: function () {
					return this.waitFor({
						id: "MessageBox-Send-Email-Error",
						searchOpenDialogs: true,
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The message box is displayed");
						},
						errorMessage: "Was not able to find the control MessageBox-Send-Email-Error"
					});
				},
				
				iShouldSeeEmailSuccessMessage: function () {
					return this.waitFor({
						id: "MessageBox-Send-Email-Success",
						searchOpenDialogs: true,
						viewName: sViewName,
						success: function (oControl) {
							Opa5.assert.ok(true, "The message box is displayed");
						},
						errorMessage: "Was not able to find the control MessageBox-Send-Email-Success"
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