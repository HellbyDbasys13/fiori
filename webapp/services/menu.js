// const sercice = require('./http')
const urlMenu = 'https://66c4fd79b026f3cc6cf13ae3.mockapi.io/api/v1/menu'
sap.ui.define([
    "./http"
],
    function (HTTP) {
        "use strict";

        return {
            get: async ()=> await HTTP.call(urlMenu, 'GET')
        };

    });