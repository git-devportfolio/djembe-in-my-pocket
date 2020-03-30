sap.ui.define([
	"djembe/in/my/pocket/util/Utility"
], function (Utility) {
	"use strict";

	return {

		formatEmailValueState: function (sEmail) {
			var sValueState = sap.ui.core.ValueState.None;
			if (sEmail && !Utility.isValidEmail(sEmail)) {
				sValueState = sap.ui.core.ValueState.Error;
			}
			return sValueState;
		}

		// formatPasswordValueState: function (sPassword) {
		// 	var sValueState = sap.ui.core.ValueState.None;
		// 	if (!sPassword) {
		// 		sValueState = sap.ui.core.ValueState.Error;
		// 	}
		// 	return sValueState;
		// }

	};
});