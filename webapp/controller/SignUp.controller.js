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

	return BaseController.extend("djembe.in.my.pocket.controller.SignUp", {
		///////////////////////////////////////////////////////////////////////
		//	FORMATTER
		///////////////////////////////////////////////////////////////////////

		formatter: Formatter,

		///////////////////////////////////////////////////////////////////////
		//	ATTRIBUTES
		///////////////////////////////////////////////////////////////////////

		__targetName: "SignUp",

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
		 * @memberOf djembe.in.my.pocket.view.SignUp
		 */
		onBeforeRendering: function () {},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf djembe.in.my.pocket.view.SignUp
		 */
		onAfterRendering: function () {
			// this.byId("SignUp-Form").$().css("background-color", Theming.get("sapUiFieldBackground"));
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf djembe.in.my.pocket.view.SignUp
		 */
		//	onExit: function() {
		//
		//	}

		/**
		 * Nav to sign in view
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
		 * Allows existing users to sign in using their email address and password
		 * 
		 * @public
		 * @param {event} oEvent UI5 event
		 */
		onSignUpButtonPress: function (oEvent) {
			var oModel = this.getViewModel("viewModel");
			var oData = oModel.getData();

			var fnSignUpCallbackSuccess = function (oUserCredential) {
				var oUser = oUserCredential.user;

				if (oUser && oUser.emailVerified === false) {
					oUser.sendEmailVerification().then(function () {
						this.navTo(Constant.PAGES.EMAIL_VERIFICATION);
					}.bind(this));
				}
			};

			var fnSignUpCallbackError = function (oError) {

				switch (oError.code) {

				case Constant.AUTH_ERRORS.EMAIL_ALREADY_IN_USE:

					MessageBox.warning(this.getTranslation(oError.code), {
						id: "MessageBox-Email-Already-Use",
						actions: [MessageBox.Action.YES, MessageBox.Action.NO],
						initialFocus: MessageBox.Action.NO,
						onClose: function (oAction) {
							if (oAction === MessageBox.Action.YES) {
								this.navTo(Constant.PAGES.SIGN_IN);
							} else {
								this.__setInputEmailFocus(Constant.UI.DELAY_FOCUS);
								this.setViewModelProperty("viewModel", "/emailFocusOut", false);
							}
						}.bind(this)
					});
					break;

				case Constant.AUTH_ERRORS.OPERATION_NOT_ALLOWED:

					MessageBox.warning(this.getTranslation(oError.code), {
						actions: [MessageBox.Action.YES, MessageBox.Action.NO],
						initialFocus: MessageBox.Action.NO,
						onClose: function (oAction) {
							if (oAction === MessageBox.Action.YES) {
								this.navTo(Constant.PAGES.SIGN_UP);
							} else {
								this.__setInputEmailFocus(100);
								this.setViewModelProperty("viewModel", "/emailFocusOut", false);
							}
						}.bind(this)
					});
					break;

				case Constant.AUTH_ERRORS.WEAK_PASSWORD:

					MessageBox.warning(this.getTranslation(oError.code), {
						onClose: function (oAction) {
							this.__setInputPasswordOneFocus(100);
						}.bind(this)
					});
					break;

				default:
				}
			};

			if (this.isValidForm(oData.email, oData.passwordOne, oData.passwordTwo)) {

				FirebaseService.getInstance()
					.createUserWithEmailAndPassword(oData.email, oData.passwordOne)
					.then(fnSignUpCallbackSuccess.bind(this))
					.catch(fnSignUpCallbackError.bind(this));
			}
		},

		/**
		 * Enable/Disable signIn button
		 * 
		 * @public
		 */
		isValidForm: function (sEmail, sPasswordOne, sPasswordTwo) {
			if (!sEmail || !sPasswordOne || !sPasswordTwo) {
				return false;
			}
			if (sPasswordOne !== sPasswordTwo) {
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
			return this.byId("SignUp-SimpleForm-Input-Email");
		},

		/**
		 * @public
		 */
		getInputPasswordOne: function () {
			return this.byId("SignUp-SimpleForm-Input-Password-One");
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
				"username": "",
				"email": "",
				"passwordOne": "",
				"passwordTwo": "",
				"emailFocusOut": false
			}), "viewModel");
		},

		/**
		 * Init view controls binding
		 * 
		 * @private
		 */
		__setBindingForView: function (oEvent) {
			var oArgs = oEvent.getParameter("arguments");

			this.__resetForm();

			if (oArgs.email) { // 
				this.__setInputPasswordOneFocus(350);
				this.setViewModelProperty("viewModel", "/email", oArgs.email);
			} else {
				this.__setInputEmailFocus(350);
			}
		},

		/**
		 * @private
		 */
		__resetForm: function () {
			this.setViewModelProperty("viewModel", "/email", "");
			this.setViewModelProperty("viewModel", "/passwordOne", "");
			this.setViewModelProperty("viewModel", "/passwordTwo", "");
		},

		/**
		 * @private
		 */
		__setInputEmailFocus: function (iDelay) {
			jQuery.sap.delayedCall(iDelay, this, function () {
				this.getInputEmail().focus();
			});
		},

		/**
		 * @private
		 */
		__setInputPasswordOneFocus: function (iDelay) {
			jQuery.sap.delayedCall(iDelay, this, function () {
				this.getInputPasswordOne().focus();
			});
		}

	});

});