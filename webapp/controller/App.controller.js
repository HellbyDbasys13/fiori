sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment',
	'sap/m/MessageToast',
	"sap/m/MenuItem",
	"sap/ui/model/json/JSONModel",
	"../services/menu" // Importa el módulo menu.js
], function (Controller, Fragment, MessageToast, MenuItem, JSONModel, menu) {
	"use strict";

	return Controller.extend("siar.controller.App", {
		onInit: function () {
			menu.get().then((response) => {
				console.log(response)
				this.getView().setModel(new JSONModel({
					menuItems: response
				}));
			})
		},

		onMenuItemPress: function (oEvent) {
			let oSplitApp = this.byId("splitApp");
			let idItemMenu = oEvent.getSource().getId().split('-').pop();
			const menuModel = this.getView().getModel().oData?.menuItems
			const { page, url } = menuModel.find((obj, index) => index == idItemMenu)
			if (url)
				window.location.href = url;
			else
				oSplitApp.toDetail(this.createId(page));
		},

		onUserIconPress: function () {
			var oView = this.getView(),
				oButton = oView.byId("userIcon");

			if (!this._oMenuFragment) {
				this._oMenuFragment = Fragment.load({
					id: oView.getId(),
					name: "siar.view.fragments.masterpage.UserMenu",
					controller: this
				}).then(function (oMenu) {
					oMenu.openBy(oButton);
					this._oMenuFragment = oMenu;
					return this._oMenuFragment;
				}.bind(this));
			} else {
				this._oMenuFragment.openBy(oButton);
			}
		},

		onMenuAction: function (oEvent) {
			let oItem = oEvent.getParameter("item").getText()
			const menuModel = this.getView().getModel().oData?.menuItems
			if(oItem!='Salir'){

			}else{
				const { page, url } = menuModel.pop()
				window.location.href = url;
			}
		}
	});
});
