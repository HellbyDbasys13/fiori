sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment',
	'sap/m/MessageToast',
	"sap/m/MenuItem",
	"sap/ui/model/json/JSONModel"
], function (Controller, Fragment, MessageToast, MenuItem, JSONModel) {
	"use strict";

	return Controller.extend("siar.controller.App", {
		onInit: function () {
			// Crear el modelo para el menú lateral
			var oModel = new JSONModel({
				menuItems: [
					{ title: "Home", icon: "sap-icon://home" },
					{ title: "Detail", icon: "sap-icon://detail-view" },
					{ title: "User", icon: "sap-icon://person-placeholder" }
				]
			});
			this.getView().setModel(oModel);
		},

		onMenuItemPress: function (oEvent) {
			var sItemTitle = oEvent.getSource().getTitle();
			var oSplitApp = this.byId("splitApp");
			switch (sItemTitle) {
				case "Home":
					oSplitApp.toDetail(this.createId("homePage"));
					break;
				case "Detail":
					oSplitApp.toDetail(this.createId("detailPage"));
					break;
				case "User":
					oSplitApp.toDetail(this.createId("userPage"));
					break;
				default:
					oSplitApp.toDetail(this.createId("homePage"));
					break;
			}
		},
		onShowHello: function () {
			sap.m.MessageToast.show("¡Hola Mundo!");
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
			var oItem = oEvent.getParameter("item"),
				sItemPath = "";

			while (oItem instanceof MenuItem) {
				sItemPath = oItem.getText() + " > " + sItemPath;
				oItem = oItem.getParent();
			}

			sItemPath = sItemPath.substr(0, sItemPath.lastIndexOf(" > "));

			MessageToast.show("Action triggered on item: " + sItemPath);
		}
	});
});
