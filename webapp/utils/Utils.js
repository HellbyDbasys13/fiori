sap.ui.define([
    "sap/ui/core/Fragment",
    "sap/ui/core/UIComponent",
    "sap/ui/core/mvc/Controller"
], function (Fragment, UIComponent, Controller) {
    "use strict";

    return {
        /**
         * Obtiene un componente/control por su ID, sin importar dónde se invoque.
         * @param {string} sId - El ID del componente a buscar.
         * @param {sap.ui.core.mvc.Controller} [oController] - El controlador actual (opcional).
         * @returns {sap.ui.core.Control} - El componente encontrado, o null si no se encuentra.
         */
        getControlById: function (sId) {
            var oControl = null;
            var oView, sFragmentId;

            // Si se proporciona un controlador, obtener la vista asociada y su ID
            if (oController instanceof Controller) {
                oView = oController.getView();
                sFragmentId = oView.getId();
                
                // Buscar el control dentro de la vista utilizando el ID completo
                oControl = oView.byId(sId);
                
                // Si no se encuentra, intentar buscar en el fragmento
                if (!oControl) {
                    oControl = Fragment.byId(sFragmentId, sId);
                }
            }

            // Si no se encontró en la vista o el fragmento, buscar globalmente
            if (!oControl) {
                oControl = sap.ui.getCore().byId(sId);
            }

            // Retornar el control encontrado, o null si no se encontró
            return oControl;
        }
    };
});
