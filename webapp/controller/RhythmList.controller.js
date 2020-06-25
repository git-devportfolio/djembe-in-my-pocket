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

	return BaseController.extend("djembe.in.my.pocket.controller.RhythmList", {
		///////////////////////////////////////////////////////////////////////
		//	FORMATTER
		///////////////////////////////////////////////////////////////////////

		formatter: Formatter,

		///////////////////////////////////////////////////////////////////////
		//	ATTRIBUTES
		///////////////////////////////////////////////////////////////////////

		__targetName: "RhythmList",

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
		//	onExit: function() {
		//
		//	}

		onSignOutButtonPress: function() {
			FirebaseService.getInstance().signOut();	
		},
		
		///////////////////////////////////////////////////////////////////////
		//	PUBLIC METHOD
		///////////////////////////////////////////////////////////////////////


		///////////////////////////////////////////////////////////////////////
		//	PRIVATE METHOD
		///////////////////////////////////////////////////////////////////////

		/**
		 * 
		 * @private
		 */
		__createModel: function () {
			this.setViewModel(new JSONModel({
				
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