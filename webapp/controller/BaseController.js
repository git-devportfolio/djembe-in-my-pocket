sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, History, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("com.lab.StepRhythm.controller.BaseController", {
		////////////////////////////////////////////////////////////
		//	ATTRIBUTES
		////////////////////////////////////////////////////////////

		__targetName: null,
		__dialogs: {},
		__homeRoute: "",
		__homeRouteParams: {},

		DEFAULT_DIALOG_ID: "___DEFAULT_DIALOG_ID___",

		////////////////////////////////////////////////////////////
		//	LIFECYCLE
		////////////////////////////////////////////////////////////

		onInit: function() {
			this.__dialogs = {};
			if(this.__targetName !== undefined && this.__targetName !== null) {
				var targets = typeof this.__targetName === 'string' ? [this.__targetName] : this.__targetName;
				for(var i = 0; i < targets.length; i++) {
					this.getRouter().getRoute(targets[i]).attachPatternMatched(this.__onRouteMatched, this);
				}
			}
		},

		////////////////////////////////////////////////////////////
		//	METHODS
		////////////////////////////////////////////////////////////

		/**
		 * Return the app router
		 * @public
		 * @returns {object} The app Router
		 */
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		/**
		 * Utility to implement the router nav back
		 * @public
		 */
		onNavBack: function(oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			// The history contains a previous entry
			if(sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				for(var [name, route] of Object.entries(this.getRouter()._oRoutes)) {
					var toCompare = (this.__homeRoute === undefined || this.__homeRoute === null || this.__homeRoute === "") ? route._oConfig.pattern :
						route._oConfig.name;
					if(toCompare === this.__homeRoute) {
						this.navTo(route._oConfig.name, this.__homeRouteParams, true);
						break;
					}
				}
			}
		},

		/**
		 * Utility to implement the router nav to
		 * @public
		 */
		navTo: function(sRoute, mData, bReplace) {
			this.getRouter().navTo(sRoute, mData, bReplace);
		},

		__onRouteMatched: function(oEvent) {
			var args = oEvent.getParameters().arguments;
			var argsValues = [oEvent, oEvent.getParameters().name];
			for(var key in args) {
				if(args.hasOwnProperty(key)) {
					var obj = args[key];
					argsValues.push(obj);
				}
			}
			this.onRouteMatched.apply(this, argsValues);
		},

		/**
		 * This method must be implemented by each Controller that want to match a routing path
		 * @public
		 */
		onRouteMatched: function(oEvent, routeName) {
			// OVERRIDE ON SUBCLASS
		},

		/**
		 * Get the Component
		 * @public
		 * @returns {object} The Component
		 */
		getComponent: function() {
			return this.getOwnerComponent();
		},

		/**
		 * Utility to get the model path from an event
		 * @public
		 * @param {object} oEvent UI5 event
		 * @param {string} modelName Model name
		 * @returns {string} The binding path
		 */
		getPathFromEvent: function(oEvent, modelName) {
			var context = oEvent.getSource().getBindingContext(modelName);
			var sPath = context.getPath().substr(1);
			return sPath;
		},

		/**
		 * Utility to set a View model
		 * @public
		 * @param {object} model JSON/OData Model
		 * @param {string} modelName Model name
		 */
		setViewModel: function(model, modelName) {
			var view = this.getView();
			if(modelName === null || modelName === undefined) {
				view.setModel(model);
			} else {
				view.setModel(model, modelName);
			}
		},

		/**
		 * Utility to get a View model
		 * @public
		 * @param {string} modelName Model name
		 * @returns The model
		 */
		getViewModel: function(modelName) {
			var view = this.getView();
			var model = modelName === null || modelName === undefined ? view.getModel() : view.getModel(modelName);
			return model;
		},

		/**
		 * Utility to get a View model property
		 * @public
		 * @param {object} model JSON/OData Model
		 * @param {string} modelName Model name
		 * @returns The model property
		 */
		getViewModelProperty: function(modelName, propertyName) {
			return this.getViewModel(modelName).getProperty(propertyName);
		},

		/**
		 * Utility to set a View model property
		 * @public
		 * @param {object} model JSON/OData Model
		 * @param {string} modelName Model name
		 * @param {string} value Property value
		 */
		setViewModelProperty: function(modelName, propertyName, value) {
			return this.getViewModel(modelName).setProperty(propertyName, value);
		},

		/**
		 * Utility to get a View model from an Event
		 * @public
		 * @param {object} oEvent UI5 Event
		 * @param {string} modelName Model name
		 * @returns {string} JSON/OData Model
		 */
		getViewModelFromEvent: function(oEvent, modelName) {
			var view = this.getView();
			var model = modelName === null || modelName === undefined ? view.getModel() : view.getModel(modelName);
			return model.getProperty(oEvent.getSource().getBindingContext().getPath());
		},

		/**
		 * Utility to set a Component model
		 * @public
		 * @param {object} model JSON/OData Model
		 * @param {string} modelName Model name
		 */
		setComponentModel: function(model, modelName) {
			var component = this.getOwnerComponent();
			if(modelName === null || modelName === undefined) {
				component.setModel(model);
			} else {
				component.setModel(model, modelName);
			}
		},

		/**
		 * Utility to get a Component model
		 * @public
		 * @param {string} modelName Model name
		 * @returns The model
		 */
		getComponentModel: function(modelName) {
			var component = this.getOwnerComponent();
			var model = modelName === null || modelName === undefined ? component.getModel() : component.getModel(modelName);
			return model;
		},

		/**
		 * Utility to get a Component model property
		 * @public
		 * @param {object} model JSON/OData Model
		 * @param {string} modelName Model name
		 * @returns The model property
		 */
		getComponentModelProperty: function(modelName, propertyName) {
			return this.getComponentModel(modelName).getProperty(propertyName);
		},

		/**
		 * Utility to set a Component model property
		 * @public
		 * @param {object} model JSON/OData Model
		 * @param {string} modelName Model name
		 * @param {string} value Property value
		 */
		setComponentModelProperty: function(modelName, propertyName, value) {
			return this.getComponentModel(modelName).setProperty(propertyName, value);
		},

		/**
		 * Utility to get a Component model from an Event
		 * @public
		 * @param {object} oEvent UI5 Event
		 * @param {string} modelName Model name
		 * @returns {string} JSON/OData Model
		 */
		getComponentModelFromEvent: function(oEvent, modelName) {
			var component = this.getOwnerComponent();
			var model = modelName === null || modelName === undefined ? component.getModel() : component.getModel(modelName);
			return model.getProperty(oEvent.getSource().getBindingContextPath());
		},

		/**
		 * Getter for the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Get the translation for sKey
		 * @public
		 * @param {string} sKey the translation key
		 * @param {array} aParameters translation paramets (can be null)
		 * @returns {string} The translation of sKey
		 */
		getTranslation: function(sKey, aParameters) {
			if(aParameters === undefined || aParameters === null) {
				return this.getResourceBundle().getText(sKey)
			} else {
				return this.getResourceBundle().getText(sKey, aParameters)
			}

		},

		/**
		 * -----------------------------------------------------------------------
		 *	Returns a function, that, as long as it continues to be invoked, will not
		 *	be triggered. The function will be called after it stops being called for
		 *	N milliseconds. If `immediate` is passed, trigger the function on the
		 *	leading edge, instead of the trailing.
		 * -----------------------------------------------------------------------
		 */
		delayedFunctionCall: function(func, wait, immediate) {
			var timeout;
			return function() {
				var args = arguments;
				var later = function() {
					timeout = null;
					if(!immediate) func.apply(this, args);
				}.bind(this);
				var callNow = immediate && !timeout;
				jQuery.sap.clearDelayedCall(timeout);
				timeout = jQuery.sap.delayedCall(wait, null, later);
				if(callNow) func.apply(this, args);
			};
		},

		/*******************************************************
		 * MESSAGE BOX FROM BUS
		 *******************************************************/
		/**
		 * Utility to create a MessageBox
		 * @public
		 * @param {string} icon MessageBox icon
		 * @param {string} title MessageBox title
		 * @param {array} MessageBox actions
		 * @param {object} onCloseCallback MessageBox close callback
		 */
		showMessageBox: function(icon, title, message, actions, onCloseCallback) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.show(message, {
				icon: icon,
				title: title,
				actions: actions,
				styleClass: bCompact ? "sapUiSizeCompact" : "",
				onClose: onCloseCallback
			});
		},

		////////////////////////////////////////////////////////
		//	EVENT BUS
		////////////////////////////////////////////////////////

		/**
		 * Utility to send a bus event
		 * @public
		 * @param {string} channel Event channel
		 * @param {string} event Event name
		 * @param {object} data Event data
		 */
		sendEvent: function(channel, event, data) {
			sap.ui.getCore().getEventBus().publish(channel, event, data);
		},

		/**
		 * Utility to subscribe to a channel and event
		 * @public
		 * @param {string} channel Event channel
		 * @param {string} event Event name
		 * @param {object} handler Event handler
		 * @param {object} listener Event listener
		 */
		subscribe: function(channel, event, handler, listener) {
			sap.ui.getCore().getEventBus().subscribe(channel, event, handler, listener);
		},

		/**
		 * Utility to unsubscribe to a channel and event
		 * @public
		 * @param {string} channel Event channel
		 * @param {string} event Event name
		 * @param {object} handler Event handler
		 * @param {object} listener Event listener
		 */
		unSubscribe: function(channel, event, handler, listener) {
			sap.ui.getCore().getEventBus().unsubscribe(channel, event, handler, listener);
		},

		////////////////////////////////////////////////////////
		//	TOAST
		////////////////////////////////////////////////////////

		/**
		 * Utility to create a toast
		 * @public
		 * @param {string} channel Toast message
		 * @param {boolean} event Is this a sticky message
		 */
		showToast: function(message, sticky) {
			MessageToast.show(message, {
				closeOnBrowserNavigation: !sticky ? false : true
			});
		},

		////////////////////////////////////////////////////////////
		//	DIALOG
		////////////////////////////////////////////////////////////

		/**
		 * Return a created dialog
		 * @public
		 * @param {string} dialogId Dialog ID
		 * @returns The dialog associated to the id
		 */
		getDialog: function(dialogId) {
			return this.__dialogs[dialogId];
		},

		/**
		 * Create a dialog
		 * @public
		 * @param {string} dialogId Dialog ID
		 * @param {string} dialogPath Path to the XML dialog file
		 * @returns The created dialog
		 */
		createDialog: function(dialogId, dialogPath) {
			if(dialogId === undefined || dialogId === null || dialogId === "") {
				dialogId = this.DEFAULT_DIALOG_ID;
			}

			var dialog = this.__dialogs[dialogId];
			if(!dialog) {
				dialog = sap.ui.xmlfragment(this.getView().getId(), dialogPath, this);
				this.getView().addDependent(dialog);
				this.__dialogs[dialogId] = dialog;
			}
			return dialog;
		},

		/**
		 * Destroy a dialog
		 * @public
		 * @param {string} dialogId Dialog ID
		 */
		destroyDialog: function(dialogId) {
			if(dialogId === undefined || dialogId === null || dialogId === "") {
				dialogId = this.DEFAULT_DIALOG_ID;
			}

			var dialog = this.__dialogs[dialogId];
			if(dialog) {
				if(dialog.close) {
					dialog.close();
				}
				dialog.destroy();
				this.__dialogs[dialogId] = null;
			}
		},

		////////////////////////////////////////////////////////////
		//	POPOVER
		////////////////////////////////////////////////////////////

		/**
		 * Create a Popover
		 * @public
		 * @param {string} dialogId Dialog ID
		 * @param {string} popoverPath Path to the Popover XML path
		 * @param {object} openByElement Element to bind the popover to
		 * @returns The created Popover
		 */
		createPopover: function(popoverId, popoverPath, openByElement) {
			var popover = this.createDialog(popoverId, popoverPath);

			// delay because addDependent will do a async rerendering and the popover will immediately close without it
			if(openByElement) {
				jQuery.sap.delayedCall(0, this, function() {
					popover.openBy(openByElement);
				});
			}
			return popover;
		},

		/**
		 * Destroy a popover
		 * @public
		 * @param {string} popoverId Popover ID
		 */
		destroyPopover: function(popoverId) {
			this.destroyDialog(popoverId);
		}
	});
});