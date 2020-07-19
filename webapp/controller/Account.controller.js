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

	return BaseController.extend("djembe.in.my.pocket.controller.Account", {
		///////////////////////////////////////////////////////////////////////
		//	FORMATTER
		///////////////////////////////////////////////////////////////////////

		formatter: Formatter,

		///////////////////////////////////////////////////////////////////////
		//	ATTRIBUTES
		///////////////////////////////////////////////////////////////////////

		__targetName: "Account",

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
			this.__subscribeEvents();
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

		/**
		 * 
		 * @public
		 * @param {object} oEvent UI5 event
		 */
		onLogoutButtonPress: function (oEvent) {
			FirebaseService.getInstance().signOut();
		},

		/**
		 * 
		 * @public
		 * @param {object} oEvent UI5 event
		 */
		onOkButtonPress: function (oEvent) {

		},

		/**
		 * 
		 * @public
		 * @param {object} oEvent UI5 event
		 */
		onApplyThemeChange: function (oEvent) {
			if (oEvent.getParameter("state")) {
				sap.ui.getCore().applyTheme("sap_fiori_3_dark");
			} else {
				sap.ui.getCore().applyTheme("sap_fiori_3");
			}
		},

		///////////////////////////////////////////////////////////////////////
		//	PUBLIC METHOD
		///////////////////////////////////////////////////////////////////////

		/**
		 * @public
		 */
		getLogOutButton: function () {
			return this.byId("Account-Logout-Button");
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
			this.getLogOutButton().$().find(".sapMSLITitleOnly").css("color", Theming.get("sapUiButtonRejectHoverTextColor"));
		},

		onSignOutButtonPress: function () {
			FirebaseService.getInstance().signOut();
		},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf djembe.in.my.pocket.view.Login
		 */
		//	onExit: function() {
		//
		//	}

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
		},

		/**
		 * @private
		 */
		__subscribeEvents: function () {
			this.subscribe(Constant.EVENTS.CHANNEL_ID, Constant.EVENTS.SIGN_OUT, this.onSignOutEventHandler, this);
		}
	});

});