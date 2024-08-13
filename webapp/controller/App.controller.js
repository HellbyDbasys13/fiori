sap.ui.define([
  "sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment',
	'sap/m/MessageToast',
	"sap/m/MenuItem"
], function (Controller, Fragment, MessageToast, MenuItem) {
  "use strict";

  return Controller.extend("siar.controller.App", {
      onShowHello : function () {
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
					}).then(function(oMenu) {
						oMenu.openBy(oButton);
						this._oMenuFragment = oMenu;
						return this._oMenuFragment;
					}.bind(this));
				} else {
					this._oMenuFragment.openBy(oButton);
				}
			},
			onMenuAction: function(oEvent) {
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
