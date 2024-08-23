sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("siar.controller.fragments.Home", {
      
      onInit: function () {
        console.log('INicia el controladaor de Home donde vamos a poner el fomulario dinamico')
        
      },
      
      onClick: function () {
        debugger
        let oSplitApp = this.byId("splitApp");
        oSplitApp.toDetail(this.createId('Dynamicform'));
      }

  });
});
