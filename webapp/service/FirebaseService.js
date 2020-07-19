/* global firebase */
sap.ui.define([
	"sap/ui/base/Object",
	"sap/base/Log",
	"djembe/in/my/pocket/util/Loader",
	"djembe/in/my/pocket/util/Utility",
	"djembe/in/my/pocket/util/Constant"
], function (Object, Log, Loader, Utility, Constant) {
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

		__oUser: null,

		////////////////////////////////////////////////////////////
		//	CONSTRUCTOR
		////////////////////////////////////////////////////////////

		constructor: function () {
			Loader.getInstance().open();
		},

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
				firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
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
		 * By using an observer, you ensure that the Auth object isn't in an 
		 * intermediate state—such as initialization—when you get the current 
		 * user. When you use signInWithRedirect, the onAuthStateChanged 
		 * observer waits until getRedirectResult resolves before triggering.
		 * 
		 * @param {object} oUser get information about the user in the observer
		 * @public
		 */
		onAuthStateChanged: function (oUser) {

			Loader.getInstance().close();

			if (oUser) {

				// User is signed in.
				this.__oUser = oUser;

				// Sign in user or  
				if (oUser.emailVerified) {
					this._sendEvent(Constant.EVENTS.CHANNEL_ID, Constant.EVENTS.SIGN_IN); // Log User 
				} else {
					this._sendEvent(Constant.EVENTS.CHANNEL_ID, Constant.EVENTS.EMAIL_VERIFICATION); // Confirm User Email
				}

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
				this.__oUser = null;

				// Log out User
				this._sendEvent(Constant.EVENTS.CHANNEL_ID, Constant.EVENTS.SIGN_OUT);
			}
		},

		/**
		 * Get User profile information
		 * 
		 * @param {} 
		 * @ return {User}
		 * @public
		 */
		getUser: function () {
			return this.__oUser;
		},

		/**
		 * Get the currently signed-in user by using the currentUser property. 
		 * If a user isn't signed in, currentUser is null.
		 * 
		 * @param {} 
		 * @ return {User}
		 * @public
		 */
		getCurrentUser: function () {
			return firebase.auth().currentUser;
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
			this.onRequestSent();
			return firebase.auth()
				.createUserWithEmailAndPassword(sEmail, sPassword)
				.finally(this.onRequestCompleted.bind(this));
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
		},

		/**
		 * Sign in by redirecting to the sign-in Google page
		 * 
		 * @returns {void} 
		 * 
		 * @see https://firebase.google.com/docs/auth/web/google-signin?authuser=0
		 * @public
		 */
		signInWithGoogleAccount: function () {
			var oProvider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithRedirect(oProvider);
		},

		/**
		 * Sign in by redirecting to the sign-in Facebook page
		 * 
		 * @returns {void} 
		 * 
		 * @see https://firebase.google.com/docs/auth/web/facebook-login
		 * @public
		 */
		signInWithFacebookAccount: function () {
			var oProvider = new firebase.auth.FacebookAuthProvider();
			firebase.auth().signInWithRedirect(oProvider);
		},

		/**
		 * Gets the list of possible sign in methods for the given email address
		 * 
		 * @returns {promise}
		 * 
		 * @see https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=1#fetchsigninmethodsforemail
		 * @public
		 */
		fetchSignInMethodsForEmail: function (sEmail) {
			return firebase.auth().fetchSignInMethodsForEmail(sEmail);
		},

		/**
		 * Allows existing users to reset password using their email address 
		 * 
		 * @returns {promise}
		 * 
		 * @see https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email
		 * @public
		 */
		sendPasswordResetEmail: function (sEmail) {
			return firebase.auth().sendPasswordResetEmail(sEmail);
		},

		/**
		 * Set a user's email address
		 * 
		 * @returns {promise}
		 * 
		 * @see https://firebase.google.com/docs/auth/web/manage-users#update_a_users_profile
		 * @public
		 */
		setUserEmailAddress: function (sEmail) {
			this.onRequestSent();
			return this.getCurrentUser()
				.updateEmail(sEmail)
				.finally(this.onRequestCompleted.bind(this));
		},

		/**
		 * Send a user a verification email
		 * 
		 * @returns {promise}
		 * 
		 * @see https://firebase.google.com/docs/auth/web/manage-users#send_a_user_a_verification_email
		 * @public
		 */
		sendEmailVerification: function () {
			this.onRequestSent();
			return this.getCurrentUser()
				.sendEmailVerification()
				.finally(this.onRequestCompleted.bind(this));
		},

		/**
		 * To sign out a user
		 * 
		 * @returns {void} 
		 * 
		 * @public
		 */
		signOut: function () {
			firebase.auth().signOut();
		},

		/**
		 * Utility to send a bus event
		 * @public
		 * @param {string} channel Event channel
		 * @param {string} event Event name
		 * @param {object} data Event data
		 */
		_sendEvent: function (channel, event, data) {
			sap.ui.getCore().getEventBus().publish(channel, event, data);
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