sap.ui.define([], function () {
	"use strict";

	return {
		
		/**
		 * Email validation
		 * 
		 * @public
		 * @param {string} sEmail an email
		 * @return true if email is correct if not false 
		 */
		isValidEmail: function (sEmail) {
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(sEmail)) {
				return true;
			}
			return false;
		}
	};
});