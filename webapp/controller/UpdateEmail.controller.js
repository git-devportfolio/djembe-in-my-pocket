sap.ui.define([
	"sap/ui/core/theming/Parameters",
	"djembe/in/my/pocket/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"djembe/in/my/pocket/util/Constant",
	"djembe/in/my/pocket/util/Utility",
	"djembe/in/my/pocket/util/Formatter",
	"djembe/in/my/pocket/service/FirebaseService",
	"sap/m/MessageBox"
], function (Theming, BaseController, JSONModel, Constant, Utility, Formatter, FirebaseService, MessageBox) {
	"use strict";

	return BaseController.extend("djembe.in.my.pocket.controller.UpdateEmail", {
		///////////////////////////////////////////////////////////////////////
		//	FORMATTER
		///////////////////////////////////////////////////////////////////////

		formatter: Formatter,

		///////////////////////////////////////////////////////////////////////
		//	ATTRIBUTES
		///////////////////////////////////////////////////////////////////////

		__targetName: "UpdateEmail",

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
		 * @memberOf djembe.in.my.pocket.view.UpdateEmail
		 */
		onBeforeRendering: function () {},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf djembe.in.my.pocket.view.UpdateEmail
		 */
		onAfterRendering: function () {
			// this.byId("UpdateEmail-Form").$().css("background-color", Theming.get("sapUiFieldBackground"));
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf djembe.in.my.pocket.view.UpdateEmail
		 */
		//	onExit: function() {
		//
		//	}

		/**
		 * Show email valueStateText on focus out  
		 * 
		 * @public
		 * @param {object} oEvent UI5 event
		 */
		onInputEmailChange: function (oEvent) {
			this.setViewModelProperty("viewModel", "/emailFocusOut", true);
		},

		/**
		 * Allows existing users to sign in using their email address and password
		 * 
		 * @public
		 * @param {event} oEvent UI5 event
		 */
		onUpdateEmailButtonPress: function (oEvent) {
			var oModel = this.getViewModel("viewModel");
			var oData = oModel.getData();

			
			var fnCallbackSuccess = function () {
			
				this.navTo(Constant.PAGES.EMAIL_VERIFICATION);
				FirebaseService.getInstance().sendEmailVerification();
			};

			var fnCallbackError = function (oError) {
				
				switch (oError.code) {

				case Constant.AUTH_ERRORS.REQUIRES_RECENT_LOGIN:

					MessageBox.warning(this.getTranslation(oError.code), {
						id: "MessageBox-Requires-Recent-Login",
						actions: [MessageBox.Action.OK],
						initialFocus: MessageBox.Action.NO,
						onClose: function (oAction) {
							if (oAction === MessageBox.Action.OK) {
								this.navTo(Constant.PAGES.SIGN_IN);
							}
						}.bind(this)
					});
					break;
				}
			};

			if (this.isValidForm(oData.newEmail)) {

				FirebaseService.getInstance()
					.setUserEmailAddress(oData.newEmail)
					.then(fnCallbackSuccess.bind(this))
					.catch(fnCallbackError.bind(this));
			}
		},

		/**
		 * Enable/Disable signIn button
		 * 
		 * @public
		 */
		isValidForm: function (sEmail) {
			if (!sEmail) {
				return false;
			}
			if (!Utility.isValidEmail(sEmail)) {
				return false;
			}
			return true;
		},

		/**
		 * @public
		 */
		getInputEmail: function () {
			return this.byId("UpdateEmail-SimpleForm-Input-Email");
		},

		/**
		 * @public
		 */
		getCurrentEmailText: function () {
			return this.byId("UpdateEmail-SimpleForm-Text-Current-Email");
		},

		///////////////////////////////////////////////////////////////////////
		//	PRIVATE METHOD
		///////////////////////////////////////////////////////////////////////

		/**
		 * 
		 * @private
		 */
		__createModel: function () {
			this.setViewModel(new JSONModel({
				"newEmail": "",
				"currentEmail": "",
				"emailFocusOut": false
			}), "viewModel");
		},

		/**
		 * Init view controls binding
		 * 
		 * @private
		 */
		__setBindingForView: function (oEvent) {
			var oUser = FirebaseService.getInstance().getCurrentUser();

			this.__resetForm();
			this.__setInputEmailFocus(Constant.UI.DELAY_FOCUS);
			this.setViewModelProperty("viewModel", "/currentEmail", oUser.email);
		},

		/**
		 * @private
		 */
		__resetForm: function () {
			this.setViewModelProperty("viewModel", "/newEmail", "");
		},

		/**
		 * @private
		 */
		__setInputEmailFocus: function (iDelay) {
			jQuery.sap.delayedCall(iDelay, this, function () {
				this.getInputEmail().focus();
			});
		}
	});

});