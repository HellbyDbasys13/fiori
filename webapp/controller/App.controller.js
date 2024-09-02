sap.ui.define([
	"./Base.controller",
	"sap/ui/model/json/JSONModel",
	"../services/menu"
], function (Controller, JSONModel, menu) {
	"use strict";

	return Controller.extend("siar.controller.App", {
		onInit: function () {
			menu.get(1).then((response) => {
				this.getView().setModel(new JSONModel({
					menuItems: response
				}));
				this._buildMenu(response)
			})
			this._loadFragment('Home')
		}
	});
});
