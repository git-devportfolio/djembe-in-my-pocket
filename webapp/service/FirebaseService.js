/* global firebase */
sap.ui.define([
	"sap/ui/base/Object",
	"sap/base/Log",
	"djembe/in/my/pocket/util/Loader",
	"djembe/in/my/pocket/util/Utility"
], function (Object, Log, Loader, Utility) {
	"use strict";

	var _oInstance = null;

	/** 
	 * Ce singleton centralise la gestion des appels aux méthodes du service de Google Firebase.
	 * 
	 * @see {@link https://openui5.hana.ondemand.com/api/module:sap/base/Log#methods}
	 *
	 * @author XPO
	 * @version 0.1
	 *
	 * @public
	 */
	var FirebaseService = Object.extend("djembe.in.my.pocket.service.FirebaseService", {

		////////////////////////////////////////////////////////////
		//	CONSTRUCTOR
		////////////////////////////////////////////////////////////

		constructor: function () {},

		////////////////////////////////////////////////////////////
		//	METHODS
		////////////////////////////////////////////////////////////

		/**
		 * Utility to register your app with Firebase
		 * @public
		 * @param {object} mConfig Manifest Object Key
		 */
		initializeApp: function (mConfig) {
			if (mConfig) {
				firebase.initializeApp(mConfig);
				// firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
			}
		},

		/**
		 * Utility to check if app is already registrer
		 * @public
		 */
		isAppInit: function () {
			return firebase.apps.length > 0;
		},

		/**
		 *	Show aplication busy dialog 
		 * 
		 * @public
		 */
		onRequestSent: function () {
			Loader.getInstance().open();
		},

		/**
		 * Hide aplication busy dialog
		 * 
		 * @public
		 */
		onRequestCompleted: function () {
			Loader.getInstance().close();
		},

		/**
		 * Set an authentication state observer and get user data
		 * 
		 * @param {object} oUser get information about the user in the observer
		 * @public
		 */
		onAuthStateChanged: function (oUser) {
			if (oUser) {
				// User is signed in.
				// var displayName = oUser.displayName;
				// var email = oUser.email;
				// var emailVerified = oUser.emailVerified;
				// var photoURL = oUser.photoURL;
				// var isAnonymous = oUser.isAnonymous;
				// var uid = oUser.uid;
				// var providerData = oUser.providerData;
				// ...
			} else {
				// User is signed out.
				// ...
			}
		},

		/**
		 * Allows new users to register with your app using their email address and a password
		 * 
		 * @param {string} sEmail 
		 * @param {string} sPassword 
		 * @returns {promise}
		 * @public
		 */
		createUserWithEmailAndPassword: function (sEmail, sPassword) {
			return firebase.auth().createUserWithEmailAndPassword(sEmail, sPassword);
		},

		/**
		 * Allows existing users to sign in using their email address and password
		 * 
		 * @param {string} sEmail 
		 * @param {string} sPassword 
		 * @returns {promise} 
		 * @public
		 */
		signInWithEmailAndPassword: function (sEmail, sPassword) {
			this.onRequestSent();
			return firebase.auth()
				.signInWithEmailAndPassword(sEmail, sPassword)
				.finally(this.onRequestCompleted.bind(this));
		}
	});

	return {

		getInstance: function () {
			if (!_oInstance) {
				_oInstance = new FirebaseService();
			}
			return _oInstance;
		}
	};
});