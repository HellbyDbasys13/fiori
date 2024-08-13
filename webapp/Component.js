sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
    "use strict";

    return UIComponent.extend("siar.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            // Llamar al init de la clase base
            UIComponent.prototype.init.apply(this, arguments);
            
            // Establecer la vista raíz
            this.getRouter().initialize();
        },

        createContent: function () {
            var oView = sap.ui.view({
                id: "app",
                viewName: "siar.view.MasterPage",
                type: "XML",
                async: true
            });
            return oView;
        }
    });
});
