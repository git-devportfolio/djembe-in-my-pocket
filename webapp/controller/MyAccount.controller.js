sap.ui.define([
	"sap/ui/core/theming/Parameters",
	"djembe/in/my/pocket/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"djembe/in/my/pocket/util/Constant",
	"djembe/in/my/pocket/util/Utility",
	"djembe/in/my/pocket/util/Formatter",
	"djembe/in/my/pocket/service/FirebaseService",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox"
], function (Theming, BaseController, JSONModel, Constant, Utility, Formatter, FirebaseService, History, MessageBox) {
	"use strict";

	return BaseController.extend("djembe.in.my.pocket.controller.MyAccount", {
		///////////////////////////////////////////////////////////////////////
		//	FORMATTER
		///////////////////////////////////////////////////////////////////////

		formatter: Formatter,

		///////////////////////////////////////////////////////////////////////
		//	ATTRIBUTES
		///////////////////////////////////////////////////////////////////////

		__targetName: "MyAccount",

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
		 * Nav Back to previous view
		 * @public
		 * @param {object} oEvent UI5 event
		 */
		onOkButtonPress: function (oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			}
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

		// TODO: Implémenter la modification du mot de passe
		onChangePasswordButtonPress: function () {

		},

		// TODO: Implémenter la suppression d'un compte
		// https://firebase.google.com/docs/auth/web/manage-users#delete_a_user
		onDeleteAccountButtonPress: function () {

		},

		/**
		 * Upload avatar to Storage and update profile photo URL
		 * 
		 * @public
		 * @see https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
		 */
		// TODO: RESIZE IMAGE : https://blog.lesieur.name/coder-proprement-en-javascript-par-l-exemple-upload-d-image/
		onUpdateProfilePhotoURL: function () {
			
			var OnSuccess = function (oTask) {
				oTask.snapshot.ref.getDownloadURL().then(function (sURL) {
					//console.log('File available at', downloadURL);
					//TODO : Update Profile et viewmodel
				});
			};

			// 
			var OnError = function (oError) {
				MessageBox.warning(oError.message);
			};

			//
			var uploadFile = function (oFile) {
				FirebaseService.getInstance().uploadFile({
					File: oFile,
					OnError: OnError,
					OnSuccess: OnSuccess,
					Path: Constant.STORAGE.AVATAR
				});
			};

			// TODO: Vérifier la taille du fichier uploadé 
			Utility.resizeImage(uploadFile);
		},

		///////////////////////////////////////////////////////////////////////
		//	PUBLIC METHOD
		///////////////////////////////////////////////////////////////////////


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
		onAfterRendering: function () {},

		/**
		 * 
		 * @public
		 */
		onSignOutButtonPress: function () {
			FirebaseService.getInstance().signOut();
		},

		onContactEmailButtonPress: function (oEvent) {
			sap.m.URLHelper.triggerEmail(oEvent.getSource().getValue());
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
				"appVersion": "",
				"displayName": "",
				"isAnonymous": "",
				"providerData": "",
				"emailVerified": "",
				"signInProvider": ""
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
			this.setViewModelProperty("viewModel", "/photoURL", "https://firebasestorage.googleapis.com/v0/b/djembe-in-my-pocket.appspot.com/o/avatar?alt=media&token=dca0c2c3-97f9-46d9-b6d4-9c97fc4edbe2");
			
			this.setViewModelProperty("viewModel", "/displayName", oUser.displayName);
			this.setViewModelProperty("viewModel", "/isAnonymous", oUser.isAnonymous);
			this.setViewModelProperty("viewModel", "/providerData", oUser.providerData);
			this.setViewModelProperty("viewModel", "/emailVerified", oUser.emailVerified);
			this.setViewModelProperty("viewModel", "/appVersion", this.getComponent().getAppVersion());
			this.setViewModelProperty("viewModel", "/signInProvider", oUser.providerData[0].providerId);
		},

		/**
		 * @private
		 */
		__subscribeEvents: function () {
			this.subscribe(Constant.EVENTS.CHANNEL_ID, Constant.EVENTS.SIGN_OUT, this.onSignOutEventHandler, this);
		}
	});

});