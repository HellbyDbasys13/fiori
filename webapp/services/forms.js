const urlForm = 'https://hoomplus.ngrok.dev/api/form'

sap.ui.define([
    "sap/ui/base/Object",
    "./http"
],
    function (BaseObject, HTTP) {
        "use strict";

        return BaseObject.extend("siar.services.forms", {
            constructor: function () {
            },
            getFormaById: async (RolId,FormularioId) => await HTTP.call(`${urlForm}?RolId=${RolId}&FormularioId=${FormularioId}`, 'GET')
        });
    });