sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("siar.controller.MasterPage", {

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
        }
    });
});
