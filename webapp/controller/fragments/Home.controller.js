sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel",

], function (Controller, MessageToast, JSONModel) {
  "use strict";

  return Controller.extend("siar.controller.fragments.Home", {

    onInit: function () {
            // Cargar el archivo JSON desde la carpeta model
            var oModel = new JSONModel();
            oModel.loadData(sap.ui.require.toUrl("fiori/model/data.json"));
            // Asegúrate de que this.getView() no es undefined
            if (this.getView()) {
                this.getView().setModel(oModel);
            } else {
                console.error("View is not available.");
            }
    }

  });
});
