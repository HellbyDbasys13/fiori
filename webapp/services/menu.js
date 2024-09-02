// const sercice = require('./http')
const urlMenu = ' https://hoomplus.ngrok.dev/api/menu'
sap.ui.define([
    "./http"
],
    function (HTTP) {
        "use strict";

        return {
            get: async (idRrol)=> await HTTP.call(urlMenu+`?idRol=${idRrol}`, 'GET'),

            onClick: function () {
                // Lógica cuando se hace clic en el botón
                MessageToast.show("¡Botón Clickme presionado!");
            }
        };

    });