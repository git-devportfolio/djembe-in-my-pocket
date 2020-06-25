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

	return BaseController.extend("djembe.in.my.pocket.controller.Profile", {
		///////////////////////////////////////////////////////////////////////
		//	FORMATTER
		///////////////////////////////////////////////////////////////////////

		formatter: Formatter,

		///////////////////////////////////////////////////////////////////////
		//	ATTRIBUTES
		///////////////////////////////////////////////////////////////////////

		__targetName: "Profile",

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

			sap.ui.getCore().getEventBus().subscribe(
				Constant.EVENTS.CHANNEL_ID,
				Constant.EVENTS.SIGN_OUT,
				this.onSignOutEventHandler,
				this
			);
			
			this.__createModel();
		},
		
		/** 
		 * Event to initialize this UI5 Control. Call the backend 
		 * service and update view with data model.
		 * 
		 * @param sChanel string channel name
		 * @param sEvent  string event name
		 * @param oData	  object json data
		 * @returns		  void
		 */
		onSignOutEventHandler: function (sChanel, sEvent, oData) {
			if (sChanel !== Constant.EVENTS.CHANNEL_ID) {
				return;
			}

			if (sEvent === Constant.EVENTS.SIGN_OUT) {
				this.navTo(Constant.PAGES.SIGN_IN);
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

			// 
			this.__setBindingForView();
		},

		///////////////////////////////////////////////////////////////////////
		//	EVENTS VIEW
		///////////////////////////////////////////////////////////////////////

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf djembe.in.my.pocket.view.Login
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf djembe.in.my.pocket.view.Login
		 */
		onAfterRendering: function () {
			// this.byId("Account-Form-Email").$().css("color", Theming.get("sapUiContentDisabledTextColor"));
		},

		onSignOutButtonPress: function() {
			FirebaseService.getInstance().signOut();	
		},
		
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf djembe.in.my.pocket.view.Login
		 */
		//	onExit: function() {
		//
		//	}

		/**
		 * Nav to create account view
		 * 
		 * @public
		 * @param {object} oEvent UI5 event
		 */
		// onLinkSignUpPress: function (oEvent) {
		// 	this.navTo(Constant.PAGES.SIGN_UP);
		// },

		/**
		 * Nav to reset password view
		 * 
		 * @public
		 * @param {object} oEvent UI5 event
		 */
		// onLinkPwForgetPress: function (oEvent) {
		// 	this.navTo(Constant.PAGES.PW_FORGET);
		// },

		/**
		 * Allows existing users to sign in using their email address and password
		 * 
		 * @public
		 * @param {event} oEvent UI5 event
		 */
		// onSignInButtonPress: function (oEvent) {
		// 	var oModel = this.getViewModel("viewModel");
		// 	var oData = oModel.getData(); 

		// 	var fnSignInCallbackSuccess = function () {
		// 		var sEmail = oData.email.toLowerCase();
		// 	};

		// 	var fnSignInCallbackError = function (oError) {
		// 		MessageBox.error(oError.message /* this.getTranslation("signInViewAuthenticationErrorMessage") */ );
		// 	};

		// 	FirebaseService.getInstance()
		// 		.signInWithEmailAndPassword(oData.email, oData.password)
		// 		.then(fnSignInCallbackSuccess.bind(this))
		// 		.catch(fnSignInCallbackError.bind(this));
		// },

		/**
		 * Enable/Disable signIn button
		 * 
		 * @public
		 */
		// isValidForm: function (sEmail, sPassword) {
		// 	if (!Utility.isValidEmail(sEmail)) {
		// 		return false;
		// 	}
		// 	if (!sPassword) {
		// 		return false;
		// 	}
		// 	return true;
		// },

		///////////////////////////////////////////////////////////////////////
		//	PRIVATE METHOD
		///////////////////////////////////////////////////////////////////////

		/**
		 * 
		 * @private
		 */
		__createModel: function () {
			this.setViewModel(new JSONModel({
				"uid": "",
				"email": "",
				"photoURL": "",
				"displayName": "",
				"isAnonymous": "",
				"providerData": "",
				"emailVerified": ""
			}), "viewModel");
		},

		/**
		 *    
		 * 
		 * @private
		 */
		__setBindingForView: function () {
			var oUser = FirebaseService.getInstance().getUser();

			this.setViewModelProperty("viewModel", "/uid", oUser.uid);
			this.setViewModelProperty("viewModel", "/email", oUser.email);
			this.setViewModelProperty("viewModel", "/photoURL", oUser.photoURL);
			this.setViewModelProperty("viewModel", "/displayName", oUser.displayName);
			this.setViewModelProperty("viewModel", "/isAnonymous", oUser.isAnonymous);
			this.setViewModelProperty("viewModel", "/providerData", oUser.providerData);
			this.setViewModelProperty("viewModel", "/emailVerified", oUser.emailVerified);
		}
	});

});