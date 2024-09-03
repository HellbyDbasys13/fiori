// const urlMenu = ' https://hoomplus.ngrok.dev/api/menu'
const urlMenu = 'https://66c4fd79b026f3cc6cf13ae3.mockapi.io/api/v1/menu'

sap.ui.define([
    "./http"
],
    function (HTTP) {
        "use strict";

        return {
            // get: async (idRrol) => await HTTP.call(urlMenu + `?idRol=${idRrol}`, 'GET'),
            get: async (idRrol) => await HTTP.call(urlMenu, 'GET'),

            onClick: function () {
                // Lógica cuando se hace clic en el botón
                MessageToast.show("¡Botón Clickme presionado!");
            }
        };

    });