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

			this.__setBindingForView();
		},

		///////////////////////////////////////////////////////////////////////
		//	EVENTS VIEW
		///////////////////////////////////////////////////////////////////////

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf djembe.in.my.pocket.view.SignUp
		 */
		//	onBeforeRendering: function() {
		//
		//	},

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
			this.navTo("SignIn");
		},

		/**
		 * Allows existing users to sign in using their email address and password
		 * 
		 * @public
		 * @param {event} oEvent UI5 event
		 */
		onSignUpButtonWithEmailAndPassword: function (oEvent) {
			
			return;
			
			var sUsername = this.getViewModelProperty("viewModel", "/username");
			var sEmail = this.getViewModelProperty("viewModel", "/email");
			var sPasswordOne = this.getViewModelProperty("viewModel", "/passwordOne");
			var sPasswordTwo = this.getViewModelProperty("viewModel", "/passwordTwo");

			// Verify the password matches
			if (sPasswordOne !== sPasswordTwo) {
				MessageBox.error(this.getTranslation("signUpViewPasswordMatchesErrorMessage"));
			} else {

				var fnSignUpCallbackSuccess = function () {
					debugger;
				};

				var fnSignUpCallbackError = function (oError) {
					MessageBox.error(oError.message);
				};

				FirebaseService.getInstance()
					.createUserWithEmailAndPassword(sEmail, sPasswordOne)
					.then(fnSignUpCallbackSuccess.bind(this))
					.catch(fnSignUpCallbackError.bind(this));
			}
		},

		/**
		 * Enable/Disable signIn button
		 * 
		 * @private
		 */
		isValidForm: function (sUsername, sEmail, sPasswordOne, sPasswordTwo) {
			if (!sUsername || !sPasswordOne || !sPasswordTwo) {
				return false;
			}
			if (!Utility.isValidEmail(sEmail)) {
				return false;
			}
			return true;
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
				"passwordTwo": ""
					// "messageStripText": "",
					// "showMessageStrip": false
			}), "viewModel");
		},

		/**
		 * Init view controls binding
		 * 
		 * @private
		 */
		__setBindingForView: function () {

		}

	});

});