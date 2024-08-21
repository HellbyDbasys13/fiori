sap.ui.define([

],
    function () {
        "use strict";

        return {
            call: async (url, method, data = {}, headers = {}) => {
                try {
                    const options = {
                        method,
                        headers: {
                            'Content-Type': 'application/json',
                            ...headers,
                        },
                    };

                    if (method === 'POST' || method === 'PUT') {
                        options.body = JSON.stringify(data);
                    }

                    const response = await fetch(url, options);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const result = await response.json();
                    return result;
                } catch (error) {
                    console.error('Error making HTTP request:', error.message);
                    return null
                }
            }
        };

    });