sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/thirdparty/sinon",
	"djembe/in/my/pocket/service/FirebaseService"
], function (Object, Sinon, FirebaseService) {
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
	var Server = Object.extend("djembe.in.my.pocket.test.integration.Server", {

		__oGetCurrentUserStub: null,
		__oSendEmailVerificationStub: null,
		__oSendPasswordResetEmailStub: null,
		__oSignInWithEmailAndPasswordStub: null,
		__oCreateUserWithEmailAndPasswordStub: null,
		__oSetUserEmailAddressStub: null,
		
		////////////////////////////////////////////////////////////
		//	CONSTRUCTOR
		////////////////////////////////////////////////////////////

		constructor: function () {

			this.__oIsAppInitStub = Sinon.stub(FirebaseService.getInstance(), "isAppInit");
			this.__oGetCurrentUserStub = Sinon.stub(FirebaseService.getInstance(), "getCurrentUser");
			this.__oSetUserEmailAddressStub = Sinon.stub(FirebaseService.getInstance(), "setUserEmailAddress");
			this.__oSendEmailVerificationStub = Sinon.stub(FirebaseService.getInstance(), "sendEmailVerification");
			this.__oSendPasswordResetEmailStub = Sinon.stub(FirebaseService.getInstance(), "sendPasswordResetEmail");
			this.__oSignInWithEmailAndPasswordStub = Sinon.stub(FirebaseService.getInstance(), "signInWithEmailAndPassword");
			this.__oCreateUserWithEmailAndPasswordStub = Sinon.stub(FirebaseService.getInstance(), "createUserWithEmailAndPassword");
		},

		////////////////////////////////////////////////////////////
		//	METHODS
		////////////////////////////////////////////////////////////

		getIsAppInit: function () {
			return this.__oIsAppInitStub;
		},

		getSignInWithEmailAndPasswordStub: function () {
			return this.__oSignInWithEmailAndPasswordStub;
		},

		getCreateUserWithEmailAndPasswordStub: function () {
			return this.__oCreateUserWithEmailAndPasswordStub;
		},

		getSendEmailVerificationStub: function () {
			return this.__oCreateUserWithEmailAndPasswordStub;
		},
		
		getSendPasswordResetEmailStub: function () {
			return this.__oSendPasswordResetEmailStub;
		},

		geSetUserEmailAddressStub: function () {
			return this.__oSetUserEmailAddressStub;
		},
		
		getCurrentUserStub: function() {
			return this.__oGetCurrentUserStub;
		}
		
	});

	return {

		getInstance: function () {
			if (!_oInstance) {
				_oInstance = new Server();
			}
			return _oInstance;
		}
	};
});