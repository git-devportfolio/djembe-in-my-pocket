sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./NavigationJourney",
	"./SignInJourney",
	"./SignUpJourney",
	"./PwForgetJourney",
	"./EmailVerificationJourney",
	"./UpdateEmailJourney"
], function (Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
		viewNamespace: "djembe.in.my.pocket.view.",
		autoWait: true
	});
});