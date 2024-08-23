sap.ui.define([
	"./Base.controller",
	'sap/ui/core/Fragment',
	'sap/m/MessageToast',
	"sap/m/MenuItem",
	"sap/ui/model/json/JSONModel",
	"../services/menu",
	"../utils/Utils"
], function (Controller, Fragment, MessageToast, MenuItem, JSONModel, menu, Utils) {
	"use strict";

	return Controller.extend("siar.controller.App", {
		onInit: function () {
			menu.get().then((response) => {
				this.getView().setModel(new JSONModel({
					menuItems: response
				}));
				this._buildMenu(response)
			})
			this._loadFragment('Home')
			
			let view = Utils.getControlById('form', this)
      		console.log(view)
		}
	});
});
