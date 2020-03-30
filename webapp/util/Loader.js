sap.ui.define([
	"sap/ui/base/Object",
	"sap/m/BusyDialog"
], function (Object, BusyDialog) {
	"use strict";

	var _oInstance = null;

	/** 
	 * singleton 
	 * 
	 * @see {@link https://openui5.hana.ondemand.com/api/sap.m.BusyDialog}
	 *
	 * @author XPO
	 * @version 0.1
	 *
	 * @public
	 */
	var Loader = Object.extend("djembe.in.my.pocket.util.Loader", {

		__loader: null,

		////////////////////////////////////////////////////////////
		//	CONSTRUCTOR
		////////////////////////////////////////////////////////////

		constructor: function () {
			this.__loader = new BusyDialog();
		},

		////////////////////////////////////////////////////////////
		//	METHODS
		////////////////////////////////////////////////////////////

		/**
		 * 
		 * 
		 * @param {} xxx 
		 * @public
		 */
		open: function () {
			this.__loader.open();
		},

		/**
		 * 
		 * 
		 * @param {} xxx 
		 * @public
		 */
		close: function () {
			this.__loader.close();
		}

	});

	return {

		getInstance: function () {
			if (!_oInstance) {
				_oInstance = new Loader();
			}
			return _oInstance;
		}
	};
});