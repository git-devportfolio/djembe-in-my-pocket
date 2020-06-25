sap.ui.define([], function () {
	"use strict";

	return {

		PAGES: {
			SIGN_IN: "SignIn",
			SIGN_UP: "SignUp",
			PROFILE: "Profile",
			PW_FORGET: "PwForget",
			EXCEPTION: "Exception",
			RHYTHM_LIST: "RhythmList"
		},

		EVENTS: {
			CHANNEL_ID: "djembe.in.my.pocket",
			SIGN_IN: "SignIn",
			SIGN_OUT: "SignOut"
		},

		AUTH_ERRORS: {
			INVALID_EMAIL: "auth/invalid-email",
			WEAK_PASSWORD: "auth/weak-password",
			WRONG_PASSWORD: "auth/wrong-password",
			USER_NOT_FOUND: "auth/user-not-found",
			EMAIL_ALREADY_IN_USE: "auth/email-already-in-use",
			OPERATION_NOT_ALLOWED: "auth/operation-not-allowed"
		},
		
		FRAGMENTS: {
			WARNING_POPOVER: "djembe.in.my.pocket.view.fragments.WarningPopover"
		}
	};
});