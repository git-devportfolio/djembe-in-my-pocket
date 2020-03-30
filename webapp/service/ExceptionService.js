sap.ui.define([
	"sap/ui/base/Object",
	"sap/m/MessageBox",
	"sap/base/Log",
	"djembe/in/my/pocket/util/Constant"
], function (Object, MessageBox, Log, Constant) {
	"use strict";

	var _oInstance = null;

	/** 
	 * Ce singleton centralise la gestion des logs à l'aide des méthodes publiques logInfo, logDebug, logWarning, logError et logFatal dédiées à l'application.
	 * La métohde onLogEntry est un listener qui peut être utilisé pour afficher les messages applicatif dans une popup, une page dédiée ou pour les envoyer
	 * vers un serveur de log à des fin de supervision. 
	 * 
	 * Le niveau de log est valorisé par l'instruction data-sap-ui-logLevel = ["debug", "error"] dans le fichier index.html
	 * 
	 * @see {@link https://openui5.hana.ondemand.com/api/module:sap/base/Log#methods}
	 *
	 * @author XPO
	 * @version 0.1
	 *
	 * @public
	 */
	var ExceptionService = Object.extend("djembe.in.my.pocket.service.ExceptionService", {

		///////////////////////////////////////////////////////////////////////
		//	ATTRIBUTES
		///////////////////////////////////////////////////////////////////////

		__oRouter: "",

		///////////////////////////////////////////////////////////////////////
		//	CONSTRUCTOR
		///////////////////////////////////////////////////////////////////////

		constructor: function () {},

		///////////////////////////////////////////////////////////////////////
		//	PUBLIC METHODS
		///////////////////////////////////////////////////////////////////////
		
		setRouter: function (oRouter) {
			this.__oRouter = oRouter;
		},

		getLogEntries: function() {
			return Log.getLogEntries();	
		},

		LogInfo: function (sMessage, sDetail) {
			Log.info(sMessage, sDetail, "djembe.in.my.pocket");
		},

		logDebug: function (sMessage, sDetail) {
			Log.debug(sMessage, sDetail, "djembe.in.my.pocket");
		},

		logWarning: function (sMessage, sDetail) {
			Log.warning(sMessage, sDetail, "djembe.in.my.pocket");
		},

		logError: function (sMessage, sDetail) {
			Log.error(sMessage, sDetail, "djembe.in.my.pocket");
		},

		logFatal: function (sMessage, sDetail) {
			Log.fatal(sMessage, sDetail, "djembe.in.my.pocket");
		},

		/** 
		 * Cette méthode est notifiée à chaque nouvelle entrée dans le log pour les méthodes logInfo, logDebug, logWarning, logError
		 * 
		 * @param {object} [oLog] The new listener object that should be informed
		 * 
		 * @see {@link https://openui5.hana.ondemand.com/api/module:sap/base/Log#methods}
		 *
		 * @author XPO
		 * @version 0.1
		 *
		 * @public
		 */
		onLogEntry: function (oLog) {
			if (oLog.component.indexOf("djembe.in.my.pocket") !== -1) {
				this.__oRouter.navTo(Constant.PAGES.EXCEPTION);
			}
		}
	});

	return {

		getInstance: function () {
			if (!_oInstance) {
				_oInstance = new ExceptionService();
			}
			return _oInstance;
		}
	};
});