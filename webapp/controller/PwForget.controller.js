sap.ui.define([
	"sap/ui/core/theming/Parameters",
	"djembe/in/my/pocket/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"djembe/in/my/pocket/util/Constant"
], function (Theming, BaseController, JSONModel, Constant) {
	"use strict";

	return BaseController.extend("djembe.in.my.pocket.controller.PwForget", {
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
			this.__setBindingForView();
		},

		/**
		 * match a routing path
		 * @public
		 * @param {object} oEvent UI5 event
		 * @param {string} routeName Name of the route
		 */
		onRouteMatched: function (oEvent, routeName) {},

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
			var oPwForgetForm = this.byId("PwForget-Form").$();
			oPwForgetForm.css("background-color", Theming.get("sapUiFieldBackground"));
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

		///////////////////////////////////////////////////////////////////////
		//	PRIVATE METHOD
		///////////////////////////////////////////////////////////////////////

		/**
		 * 
		 * @private
		 */
		__createModel: function () {
			var viewModel = new JSONModel();
			this.setViewModel(viewModel, "viewModel");
		},

		/**
		 * init view controls binding  
		 * @private
		 */
		__setBindingForView: function () {}

	});

});