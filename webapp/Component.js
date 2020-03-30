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

			this.initDevice();

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
		beforeInit: function () {},

		/**
		 * Function that will be before after router initialization
		 * @public
		 */
		afterInit: function () {},

		/**
		 * Function that will be called after router initialization
		 * @public
		 */
		afterRouting: function () {
			ExceptionService.getInstance().setRouter(this.getRouter());
		},

		/**
		 * Function that initilize device model with all the device informations
		 *
		 * @public
		 */
		initDevice: function () {
			this.setModel(models.createDeviceModel(), "device");
		},

		/**
		 * Read firebase-config key in manifest.json
		 *
		 * @public
		 */
		getFirebaseConfigKey: function () {
			var oEntry = null;
			oEntry = this.getMetadata().getManifestEntry("sap.ui5");
			if (!oEntry) {
				ExceptionService.getInstance().logFatal(
					this.getModel("i18n").getResourceBundle().getText("appComponentFirebaseConfigError"),
					this.getModel("i18n").getResourceBundle().getText("sapui5KeyDoesNotExistInManifestJson")
				);
			} else {
				oEntry = oEntry["firebase-config"];
				if (!oEntry) {
					ExceptionService.getInstance().logFatal(
						this.getModel("i18n").getResourceBundle().getText("appComponentFirebaseConfigError"),
						this.getModel("i18n").getResourceBundle().getText("firebaseConfigKeyDoesNotExistInManifestJson")
					);
				}
			}
			return oEntry;
		}
	});
});