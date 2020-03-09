sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/base/Log",
	"sap/ui/Device",
	"djembe/in/my/pocket/model/models",
	"djembe/in/my/pocket/service/ExceptionService"
], function (UIComponent, Logging, Device, models, ExceptionService) {
	"use strict";

	return UIComponent.extend("djembe.in.my.pocket.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			/////////////////////////////////////////////////////////
			//
			// EXCEPTIONS
			//
			/////////////////////////////////////////////////////////

			Logging.addLogListener(ExceptionService.getInstance());

			/////////////////////////////////////////////////////////

			this.beforeInit();

			this.__initDevice();

			this.afterInit();

			// create the views based on the url/hash
			this.getRouter().initialize();

			this.afterRouting();
		},

		/////////////////////////////////////////////////////////
		//
		// METHODS TO OVERRIDE
		//
		/////////////////////////////////////////////////////////

		/**
		 * Function that will be called after UIComponent init but before internal initialization (device and bundle)
		 * @public
		 */
		beforeInit: function () {
		},

		/**
		 * Function that will be before after router initialization
		 * @public
		 */
		afterInit: function () {
		},

		/**
		 * Function that will be called after router initialization
		 * @public
		 */
		afterRouting: function () {
			//OVERRIDE IF NEEDED
		},

		//////////////////////////////////////////////////////////
		//
		// PRIVATE METHODS
		//
		/////////////////////////////////////////////////////////

		/**
		 * Function that initilize device model with all the device informations
		 *
		 * @private
		 */
		__initDevice: function () {
			this.setModel(models.createDeviceModel(), "device");
		},
	});
});