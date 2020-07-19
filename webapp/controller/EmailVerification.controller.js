sap.ui.define([
	"sap/ui/core/theming/Parameters",
	"djembe/in/my/pocket/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"djembe/in/my/pocket/util/Constant",
	"djembe/in/my/pocket/util/Utility",
	"djembe/in/my/pocket/util/Formatter",
	"djembe/in/my/pocket/service/FirebaseService",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Theming, BaseController, JSONModel, Constant, Utility, Formatter, FirebaseService, MessageBox,
	MessageToast) {
	"use strict";

	return BaseController.extend("djembe.in.my.pocket.controller.EmailVerification", {
		///////////////////////////////////////////////////////////////////////
		//	FORMATTER
		///////////////////////////////////////////////////////////////////////

		formatter: Formatter,

		///////////////////////////////////////////////////////////////////////
		//	ATTRIBUTES
		///////////////////////////////////////////////////////////////////////

		__targetName: "EmailVerification",
		__timeoutID: null,

		///////////////////////////////////////////////////////////////////////
		//	LIFECYCLE EVENTS
		///////////////////////////////////////////////////////////////////////

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.lab.StepRhythm.view.Rhythms
		 */
		onInit: function () {
			BaseController.prototype.onInit.apply(this, arguments);

			this.__createModel();
		},

		/**
		 * match a routing path
		 * @public
		 * @param {object} oEvent UI5 event
		 * @param {string} routeName Name of the route
		 */
		onRouteMatched: function (oEvent, routeName) {
			BaseController.prototype.onRouteMatched.apply(this, arguments); // Initialize Firebase if not

			// Update view model
			this.__setBindingForView(oEvent);
		},

		///////////////////////////////////////////////////////////////////////
		//	EVENTS VIEW
		///////////////////////////////////////////////////////////////////////

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf djembe.in.my.pocket.view.EmailVerification
		 */
		onBeforeRendering: function () {},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf djembe.in.my.pocket.view.EmailVerification
		 */
		onAfterRendering: function () {},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf djembe.in.my.pocket.view.EmailVerification
		 */
		//	onExit: function() {
		//
		//	}

		/**
		 * Come back to SignIn view
		 * 
		 * @public
		 */
		onNavBackButtonPress: function (oEvent) {
			this.navTo(Constant.PAGES.SIGN_IN);
		},

		/**
		 * Send email and come back to SignIn view
		 * 
		 * @public
		 */
		onSendEmailButtonPress: function (oEvent) {
			this._sendEmailVerification();
		},

		/**
		 * Come back to SignIn view
		 * 
		 * @public
		 */
		onUpdateEmailButtonPress: function (oEvent) {
			this.navTo(Constant.PAGES.UPDATE_EMAIL);
		},

		///////////////////////////////////////////////////////////////////////
		//	PUBLIC METHOD
		///////////////////////////////////////////////////////////////////////

		/**
		 * @public
		 */
		getMessagePage: function () {
			return this.byId("EmailVerification-MessagePage");
		},

		/**
		 * @public
		 */
		getBusyDialog: function () {
			return this.byId("EmailVerification-BusyDialog");
		},

		///////////////////////////////////////////////////////////////////////
		//	PRIVATE METHOD
		///////////////////////////////////////////////////////////////////////

		/**
		 * 
		 * @private
		 */
		_sendEmailVerification: function () {

			var fnSignUpCallbackSuccess = function () {
				this.navTo(Constant.PAGES.SIGN_IN);
				this.__showSendEmailSuccessMessage();
			};

			var fnSignUpCallbackError = function (oError) {

				switch (oError.code) {

				case Constant.AUTH_ERRORS.TOO_MANY_REQUESTS:

					MessageBox.error(this.getTranslation(oError.code), {
						id: "MessageBox-Send-Email-Error"
					});
					break;

				default:
					MessageBox.error(oError.message);

				}
			};

			FirebaseService.getInstance()
				.sendEmailVerification()
				.then(fnSignUpCallbackSuccess.bind(this))
				.catch(fnSignUpCallbackError.bind(this));
		},

		/**
		 * 
		 * @private
		 */
		__createModel: function () {
			this.setViewModel(new JSONModel({}), "viewModel");
		},

		/**
		 * Init view controls binding
		 * 
		 * @private
		 */
		__setBindingForView: function (oEvent) {
			var sDescription = null;
			var oUser = FirebaseService.getInstance().getCurrentUser();

			sDescription = this.getTranslation("EmailVerificationViewMessagePageDescriptionL1", [oUser.email]);
			sDescription += this.getTranslation("EmailVerificationViewMessagePageDescriptionL2");
			sDescription += this.getTranslation("EmailVerificationViewMessagePageDescriptionL3");

			this.getMessagePage().setDescription(sDescription);
		},

		/**
		 * 
		 * 
		 * @private
		 */
		__showSendEmailSuccessMessage: function () {
			setTimeout(function () {
				MessageBox.success(this.getTranslation("EmailVerificationViewSendEmailSuccesMessageText"), {
					title: this.getTranslation("EmailVerificationViewSendEmailSuccesMessageTitle"),
					actions: this.getTranslation("EmailVerificationViewSendEmailSuccesMessageAction")
				});
			}.bind(this), 500);
		}
	});

});