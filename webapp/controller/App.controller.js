sap.ui.define([
	"djembe/in/my/pocket/controller/BaseController",
	"djembe/in/my/pocket/service/ExceptionService"
], function (BaseController, ExceptionService) {
	"use strict";

	return BaseController.extend("djembe.in.my.pocket.controller.App", {
		onInit: function () {
			// ExceptionService.getInstance().logError("Nouveau message d'erreur !!!!");
		}
	});
});