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

	return BaseController.extend("djembe.in.my.pocket.controller.PwForget", {
		///////////////////////////////////////////////////////////////////////
		//	FORMATTER
		///////////////////////////////////////////////////////////////////////

		formatter: Formatter,

		///////////////////////////////////////////////////////////////////////
		//	ATTRIBUTES
		///////////////////////////////////////////////////////////////////////

		__targetName: "PwForget",

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
			BaseController.prototype.onRouteMatched.apply(this, arguments);

			// 
			this.__setBindingForView();
			this.__setInputEmailFocus(Constant.UI.DELAY_FOCUS);
		},

		///////////////////////////////////////////////////////////////////////
		//	EVENTS VIEW
		///////////////////////////////////////////////////////////////////////

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf djembe.in.my.pocket.view.Login
		 */
		onBeforeRendering: function () {
		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf djembe.in.my.pocket.view.Login
		 */
		onAfterRendering: function () {
			// this.byId("SignIn-Form").$().css("background-color", Theming.get("sapUiFieldBackground"));
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf djembe.in.my.pocket.view.Login
		 */
		//	onExit: function() {
		//
		//	}

		/**
		 * Nav to create Myaccount view
		 * 
		 * @public
		 * @param {object} oEvent UI5 event
		 */
		onLinkSignInPress: function (oEvent) {
			this.navTo(Constant.PAGES.SIGN_IN);
		},

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
		 * Allows existing users to reset password using their email address 
		 * 
		 * @public
		 * @param {event} oEvent UI5 event
		 */
		onPwForgetButtonPress: function (oEvent) {
			var sEmail = this.getViewModelProperty("viewModel", "/email");
			var sCustomButtonText = this.getTranslation("signUpViewFormSignInLink");

			var fnSendEmailCallbackSuccess = function () {
				MessageBox.information(this.getTranslation("pwForgetViewSendEmailConfirmationMessage"), {
					id: "Send-Password-Reset-Message",
					actions: [sCustomButtonText],
					onClose: function (oAction) {
						this.navTo(Constant.PAGES.SIGN_IN, {
							email: sEmail
						});
					}.bind(this)
				});
			};

			var fnSendEmailCallbackError = function (oError) {

				switch (oError.code) {

				case Constant.AUTH_ERRORS.INVALID_EMAIL: // INVALID EMAIL

					MessageBox.warning(this.getTranslation(oError.code), {
						onClose: function (oAction) {
							this.__setInputEmailFocus(Constant.UI.DELAY_FOCUS);
						}.bind(this)
					});
					break;

				case Constant.AUTH_ERRORS.USER_NOT_FOUND: // NO ACCOUNT

					MessageBox.warning(this.getTranslation(oError.code), {
						id: "Warning-User-Not-Found",
						actions: [MessageBox.Action.YES, MessageBox.Action.NO],
						initialFocus: MessageBox.Action.NO,
						onClose: function (oAction) {
							if (oAction === MessageBox.Action.YES) {
								this.navTo(Constant.PAGES.SIGN_UP, {
									email: sEmail
								});
							} else {
								this.__setInputEmailFocus(Constant.UI.DELAY_FOCUS);
							}
						}.bind(this)
					});
					break;

				default:
					MessageBox.warning(oError.message);

				}
			};

			FirebaseService.getInstance()
				.sendPasswordResetEmail(sEmail)
				.then(fnSendEmailCallbackSuccess.bind(this))
				.catch(fnSendEmailCallbackError.bind(this));
		},

		///////////////////////////////////////////////////////////////////////
		//	PUBLIC METHOD
		///////////////////////////////////////////////////////////////////////

		/**
		 * Enable/Disable signIn button
		 * 
		 * @public
		 */
		isValidForm: function (sEmail) {
			if (!Utility.isValidEmail(sEmail)) {
				return false;
			}
			return true;
		},

		/**
		 * @public
		 */
		getInputEmail: function () {
			return this.byId("PwForget-SimpleForm-Input-Email");
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
				"email": "",
				"emailFocusOut": false
			}), "viewModel");
		},

		/**
		 *    
		 * 
		 * @private
		 */
		__setBindingForView: function () {
			this.__resetForm();
		},

		/**
		 * @private
		 */
		__resetForm: function () {
			this.setViewModelProperty("viewModel", "/email", "");
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