/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"djembe/in/my/pocket/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});