sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/Avatar",
	"sap/m/HBox",
	"sap/m/Label"
], function (Control, Avatar, HBox, Label) {
	"use strict";
	return Control.extend("djembe.in.my.pocket.customControl.ToolbarAvatar", {
		metadata: {
			properties: {
				/**
				 * Determines the path to the desired image or icon.
				 */
				src: {
					type: "sap.ui.core.URI",
					group: "Data",
					defaultValue: null
				},
				/**
				 * Defines the shape of the <code>Avatar</code>.
				 */
				displayShape: {
					type: "sap.m.AvatarShape",
					group: "Appearance",
					defaultValue: sap.m.AvatarShape.Circle
				},
				/**
				 * Sets a predefined display size of the <code>Avatar</code>.
				 */
				displaySize: {
					type: "sap.m.AvatarSize",
					group: "Appearance",
					defaultValue: sap.m.AvatarSize.XS
				},
				/**
				 * Determines the text to the desired username.
				 */
				displayName: {
					type: "string",
					group: "Data",
					defaultValue: null
				}
			},
			aggregations: {
				"_HBox": {
					type: "sap.m.HBox",
					multiple: false
				},
				"_Avatar": {
					type: "sap.m.Avatar",
					multiple: false
				},
				"_Label": {
					type: "sap.m.Label",
					multiple: false
				}
			},
			events: {
				press: {}
			}
		},

		init: function () {
			if (sap.ui.core.Control.prototype.init) {
				sap.ui.core.Control.prototype.init.apply(this, arguments); //run the super class's method first
			}

			this.setAggregation("_HBox", new HBox());
			this.setAggregation("_Label", new Label());
			this.setAggregation("_Avatar", new Avatar());
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

		setSrc: function (value) {
			this.setProperty("src", value, true);
			this.getAggregation("_Avatar").setSrc(value);
		},

		setDisplaySize: function (value) {
			this.setProperty("displaySize", value, true);
			this.getAggregation("_Avatar").setDisplaySize(value);
		},

		setDisplayShape: function (value) {
			this.setProperty("displayShape", value, true);
			this.getAggregation("_Avatar").setDisplayShape(value);
		},

		ontouchstart: function (oEvent) {
			this.firePress();
		},

		renderer: {
			apiVersion: 2, // see 'Renderer Methods' for an explanation of this flag
			render: function (oRm, oControl) { // the part creating the HTML
				oControl.renderCustomComponent(oRm, oControl);
			}
		},

		renderCustomComponent: function (oRm, oControl) {
			oRm.openStart("div", oControl);

			oRm.class("sapMFlexBox");
			oRm.class("sapMFlexBoxAlignItemsCenter");

			if (oControl.hasListeners("press")) {

				oRm.class("sapMPointer");
				oRm.attr("role", "button");
				oRm.attr("tabindex", 0);

			} else {

				oRm.attr("role", "img");
			}

			oRm.openEnd();

			oControl.renderAvatarComponent(oRm, oControl);
			oControl.renderDisplayNameComponent(oRm, oControl);

			oRm.close("div");
		},

		renderAvatarComponent: function (oRm, oControl) {
			var oAvatar = oControl.getAggregation("_Avatar");
			oAvatar.addStyleClass("sapUiTinyMarginEnd");
			oRm.renderControl(oAvatar);
		},

		renderDisplayNameComponent: function (oRm, oControl) {
			oRm.openStart("span", oControl).openEnd();
			oRm.text(oControl.getDisplayName()); // write the Control property 'name', with automatic XSS protection
			oRm.close("span");
		}
	});
});