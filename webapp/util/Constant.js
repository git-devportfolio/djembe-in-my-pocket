sap.ui.define([], function () {
	"use strict";

	return {

		PAGES: {
			SIGN_IN: "SignIn",
			SIGN_UP: "SignUp",
			ACCOUNT: "MyAccount",
			PW_FORGET: "PwForget",
			EXCEPTION: "Exception",
			RHYTHM_LIST: "RhythmList",
			UPDATE_EMAIL: "UpdateEmail",
			EMAIL_VERIFICATION: "EmailVerification"
		},

		EVENTS: {
			CHANNEL_ID: "djembe.in.my.pocket",
			SIGN_IN: "SignIn",
			SIGN_OUT: "SignOut",
			EMAIL_VERIFICATION: "EmailVerification"
		},

		AUTH_ERRORS: {
			INVALID_EMAIL: "auth/invalid-email",
			WEAK_PASSWORD: "auth/weak-password",
			WRONG_PASSWORD: "auth/wrong-password",
			USER_NOT_FOUND: "auth/user-not-found",
			TOO_MANY_REQUESTS: "auth/too-many-requests",
			EMAIL_ALREADY_IN_USE: "auth/email-already-in-use",
			OPERATION_NOT_ALLOWED: "auth/operation-not-allowed",
			REQUIRES_RECENT_LOGIN: "auth/requires-recent-login"
		},

		FRAGMENTS: {
			WARNING_POPOVER: "djembe.in.my.pocket.view.fragments.WarningPopover"
		},

		UI: {
			DELAY_FOCUS: 400	/* 0 for OPA5 test else 400 */
		},
		
		STORAGE: {
			AVATAR: "avatar/"
		}
	};
});