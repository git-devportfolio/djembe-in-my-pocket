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

	return BaseController.extend("djembe.in.my.pocket.controller.SignIn", {
		///////////////////////////////////////////////////////////////////////
		//	FORMATTER
		///////////////////////////////////////////////////////////////////////

		formatter: Formatter,

		///////////////////////////////////////////////////////////////////////
		//	ATTRIBUTES
		///////////////////////////////////////////////////////////////////////

		__targetName: "SignIn",

		///////////////////////////////////////////////////////////////////////
		//	LIFECYCLE EVENTS
		///////////////////////////////////////////////////////////////////////

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.lab.StepRhythm.view.Rhythms
		 */
		onInit: function () {
			BaseController.prototype.onInit.apply(this, arguments); // Initialize Firebase if not

			this.__createModel();
			this.__subscribeEvents();
		},

		/** 
		 * Sign In is correct, nav to Rythm View
		 * 
		 * @param sChanel string channel name
		 * @param sEvent  string event name
		 * @param oData	  object json data
		 * @returns		  void
		 */
		onSignInEventHandler: function (sChanel, sEvent, oData) {
			if (sChanel !== Constant.EVENTS.CHANNEL_ID) {
				return;
			}

			if (sEvent === Constant.EVENTS.SIGN_IN) {
				this.navTo(Constant.PAGES.RHYTHM_LIST);
			}
		},

		/**
		 * match a routing path
		 * @public
		 * @param {object} oEvent UI5 event
		 * @param {string} routeName Name of the route
		 */
		onRouteMatched: function (oEvent, routeName) {
			BaseController.prototype.onRouteMatched.apply(this, arguments);

			// Update view model
			this.__setBindingForView();
			this.__setInputEmailFocus(350);
		},

		///////////////////////////////////////////////////////////////////////
		//	EVENTS VIEW
		///////////////////////////////////////////////////////////////////////

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf djembe.in.my.pocket.view.Login
		 */
		onBeforeRendering: function () {},

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
		onExit: function () {
			// this.unsubcribeEvents();
		},

		/**
		 * Nav to create account view
		 * 
		 * @public
		 * @param {object} oEvent UI5 event
		 */
		onLinkSignUpPress: function (oEvent) {
			this.navTo(Constant.PAGES.SIGN_UP);
		},

		/**
		 * Nav to reset password view
		 * 
		 * @public
		 * @param {object} oEvent UI5 event
		 */
		onLinkPwForgetPress: function (oEvent) {
			this.navTo(Constant.PAGES.PW_FORGET);
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
		onSignInButtonPress: function (oEvent) {
			var oModel = this.getViewModel("viewModel");
			var oData = oModel.getData();

			var fnSignInCallbackError = function (oError) {

				switch (oError.code) {

				case Constant.AUTH_ERRORS.INVALID_EMAIL: // INVALID EMAIL

					MessageBox.warning(this.getTranslation(oError.code), {
						onClose: function (oAction) {
							this.__setInputEmailFocus(100);
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
									email: oData.email
								});
							} else {
								this.__setInputEmailFocus(100);
								this.setViewModelProperty("viewModel", "/emailFocusOut", false);
							}
						}.bind(this)
					});
					break;

				case Constant.AUTH_ERRORS.WRONG_PASSWORD: // WRONG PASSWORD

					MessageBox.warning(this.getTranslation(oError.code), {
						id: "MessageBox-Warning-Wrong-Password",
						actions: [MessageBox.Action.YES, MessageBox.Action.NO],
						initialFocus: MessageBox.Action.NO,
						onClose: function (oAction) {
							if (oAction === MessageBox.Action.YES) {
								this.navTo(Constant.PAGES.PW_FORGET);
							} else {
								this.__setInputEmailFocus(100);
								this.setViewModelProperty("viewModel", "/emailFocusOut", false);
							}
						}.bind(this)
					});
					break;

				default:
					MessageBox.warning(oError.message);
				}
			};

			if (this.isValidForm(oData.email, oData.password)) {
				FirebaseService.getInstance()
					.signInWithEmailAndPassword(oData.email, oData.password)
					.catch(fnSignInCallbackError.bind(this));
			}

		},

		/**
		 * Allows existing users to sign in using Google Sign In
		 * 
		 * @public
		 * @param {event} oEvent UI5 event
		 */
		onGoogleSignInPress: function (oEvent) {
			FirebaseService.getInstance().signInWithGoogleAccount();
		},

		/**
		 * Allows existing users to sign in using Facebook Sign In
		 * 
		 * @public
		 * @param {event} oEvent UI5 event
		 */
		onFacebookSignInPress: function (oEvent) {
			FirebaseService.getInstance().signInWithFacebookAccount();
		},

		///////////////////////////////////////////////////////////////////////
		//	PUBLIC METHOD
		///////////////////////////////////////////////////////////////////////

		/**
		 * Enable/Disable signIn button
		 * 
		 * @public
		 */
		isValidForm: function (sEmail, sPassword) {
			if (!Utility.isValidEmail(sEmail)) {
				return false;
			}
			if (!sPassword) {
				return false;
			}
			return true;
		},

		/**
		 * @public
		 */
		getInputEmail: function () {
			return this.byId("SignIn-SimpleForm-Input-Email");
		},

		/**
		 * @public
		 */
		getInputPassword: function () {
			return this.byId("SignIn-SimpleForm-Input-Password");
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
				"password": "",
				"emailFocusOut": false
			}), "viewModel");
		},

		/**
		 * Init view controls binding
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
			this.setViewModelProperty("viewModel", "/password", "");
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
		__subscribeEvents: function () {
			this.subscribe(
				Constant.EVENTS.CHANNEL_ID, 
				Constant.EVENTS.SIGN_IN, 
				this.onSignInEventHandler, 
				this);
		},

		/**
		 * @private
		 */
		__unsubscribeEvents: function () {

			// this.subscribe(Constant.EVENTS.CHANNEL_ID, Constant.EVENTS.SIGN_IN, this.onSignInEventHandler, this);
		}
	});

});