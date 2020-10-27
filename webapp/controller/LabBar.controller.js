sap.ui.define([
	"djembe/in/my/pocket/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("djembe.in.my.pocket.controller.LabBar", {
		
		///////////////////////////////////////////////////////////////////////
		//	ATTRIBUTES
		///////////////////////////////////////////////////////////////////////

		__targetName: "LabBar",
		
		///////////////////////////////////////////////////////////////////////
		//	LIFECYCLE EVENTS
		///////////////////////////////////////////////////////////////////////
		
		onInit: function () {
			this.setViewModel(new JSONModel({
				"timeSignature": 8,
				"bars": [{
					name: "Mesure 1",
					steps: [
						{ "time": 0, "noteID": "2000001" },
						{ "time": 4, "noteID": "2000001" }
					]
				},{
					name: "Mesure 2",
					steps: [
						{ "time": 0, "noteID": "2000001" },
						{ "time": 4, "noteID": "2000001" }
					]
				}]
				
			}), "viewModel");

		},
		
		/**
		 * match a routing path
		 * @public
		 * @param {object} oEvent UI5 event
		 * @param {string} routeName Name of the route
		 */
		onRouteMatched: function (oEvent, routeName) {
			BaseController.prototype.onRouteMatched.apply(this, arguments);
		},
		
		onReadBindingTest: function(oEvent) {
			// var oSequencer = this.byId("Audio-Sequencer");
			this.setViewModelProperty("viewModel", "/timeSignature", 32);
		}

	});
});