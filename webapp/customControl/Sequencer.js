sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";
	return Control.extend("djembe.in.my.pocket.customControl.Sequencer", {
		metadata: {
			"properties": {
				"timeSignature": {
					"type": "int",
					"group": "Data",
					"defaultValue": null,
					"bindable": "bindable"
				}
			},
			"aggregations": {
				"items": {
					"type": "djembe.in.my.pocket.customControl.Bar",
					"multiple": true,
					"singularName": "item"
				}
			},
			defaultAggregation: "items",
			"events": {

			}
		},

		init: function () {
			if (sap.ui.core.Control.prototype.init) {
				sap.ui.core.Control.prototype.init.apply(this, arguments); //run the super class's method first
			}
		},

		onBeforeRendering: function () {
			//if I need to do any post render actions, it will happen here
			if (sap.ui.core.Control.prototype.onBeforeRendering) {
				sap.ui.core.Control.prototype.onBeforeRendering.apply(this, arguments); //run the super class's method first
			}
		},

		onAfterRendering: function () {
			//if I need to do any post render actions, it will happen here
			if (sap.ui.core.Control.prototype.onAfterRendering) {
				sap.ui.core.Control.prototype.onAfterRendering.apply(this, arguments); //run the super class's method first
			}
		},

		// setTimeSignature: function (iValue) {
		// 	this.setProperty("timeSignature", iValue, false);
		// },

		renderer: {
			apiVersion: 2, // see 'Renderer Methods' for an explanation of this flag
			render: function (oRm, oControl) { // the part creating the HTML
				oControl.render(oRm, oControl);
			}
		},

		render: function (oRm, oControl) { /* https://openui5.hana.ondemand.com/api/sap.ui.core.RenderManager */
			oRm
				.openStart("div", oControl)
				.class("sequencer").openEnd();

			// oRm
			// 	.text("Sequencer " + oControl.getTimeSignature());

			$.each(oControl.getItems(), function(key, value) {
				oRm.renderControl(value);		
			});
			
			oRm
				.close("div");
		}
	});
});