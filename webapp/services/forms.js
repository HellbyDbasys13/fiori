// const urlForm = 'https://hoomplus.ngrok.dev/api/form'
const urlForm = 'https://66c4fd79b026f3cc6cf13ae3.mockapi.io/api/v1/form'

sap.ui.define([
    "sap/ui/base/Object",
    "./http"
],
    function (BaseObject, HTTP) {
        "use strict";

        return BaseObject.extend("siar.services.forms", {
            constructor: function () {
            },
            // getFormaById: async (RolId,FormularioId) => await HTTP.call(`${urlForm}?RolId=${RolId}&FormularioId=${FormularioId}`, 'GET')
            getFormaById: async (RolId, FormularioId) => await HTTP.call(`${urlForm}`, 'GET')
        });
    });