sap.ui.define([
	"djembe/in/my/pocket/util/Utility"
], function (Utility) {
	"use strict";

	return {

		formatEmailInputValueState: function (sEmail, bValid) {
			if (bValid && sEmail && !Utility.isValidEmail(sEmail)) {
				return sap.ui.core.ValueState.Error;
			}
			return sap.ui.core.ValueState.None;
		},

		formatPasswordOneInputValueState: function (sPasswordOne) {
			if (sPasswordOne && sPasswordOne.length < 6) {
				return sap.ui.core.ValueState.Error;
			}
			return sap.ui.core.ValueState.None;
		},

		formatPasswordTwoInputValueState: function (sPasswordOne, sPasswordTwo) {
			if (sPasswordTwo && (sPasswordOne !== sPasswordTwo)) {
				return sap.ui.core.ValueState.Error;
			}
			return sap.ui.core.ValueState.None;
		}
	};
});