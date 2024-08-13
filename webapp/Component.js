sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "siar/model/models"
], function (UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend("siar.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            // Inicializar la aplicación
            UIComponent.prototype.init.apply(this, arguments);
            this.setModel(models.createDeviceModel(), "device");
        }
    });
});
