sap.ui.define([
    "sap/ui/base/Object",
    "siar/services/forms",
    "sap/ui/core/mvc/Controller",
    "sap/m/Label",
    "sap/m/Input",
    "sap/m/DatePicker",
    "sap/m/Select",
    "sap/ui/core/Item",
    "sap/m/Button",
    "sap/m/Panel",
    "sap/m/VBox",
    "sap/m/Table",
    "sap/m/Column",
    "sap/m/ColumnListItem",
    "sap/m/Text",
    "sap/m/Title",
    "sap/m/HBox",
    "sap/ui/layout/Grid", // Añadimos Grid para la disposición responsiva
    "sap/ui/layout/GridData",
    "sap/ui/core/Icon"
], function (BaseObject, forms,
    Controller, Label, Input, DatePicker, Select, Item, Button, Panel, VBox, Table, Column, ColumnListItem, Text, Title, HBox, Grid, GridData, Icon
) {
    "use strict";

    return {
        getCustomForm: async function (RolId, FormularioId) {
            let newForm = [];
            let formResponse = await new forms(33, 11).getFormaById(RolId, FormularioId);

            let nForm = await this.createForm(formResponse);

            return nForm;
        },
        createForm: async function (formData) {
            var currentLevel = -1;
            var oPanel, oGrid;
            var panelsList = []; // Lista para almacenar los Paneles creados
            var panelIndex = 0; // Para rastrear el número de panel

            formData.forEach(function (item) {
                var oComponent;

                // Detecta si cambia el nivel y crea un nuevo Panel
                if (item.level !== currentLevel) {
                    currentLevel = item.level;
                    panelIndex++; // Aumentamos el índice del panel

                    // Si ya existe un Panel, lo agregamos a la lista
                    if (oPanel) {
                        panelsList.push(oPanel);
                    }

                    // Crea un nuevo Panel y Grid para el nuevo grupo
                    oPanel = new Panel();

                    // Añadir la clase de estilo solicitada
                    oPanel.addStyleClass("sapUiResponsiveMargin");

                    // Crea un Grid para organizar los elementos de manera responsiva
                    oGrid = new Grid({
                        width: "100%"
                    });

                    // Asignar tamaño de 6 columnas (mitad de la pantalla) a los paneles 2 y 3
                    if (panelIndex === 2 || panelIndex === 3) {
                        oPanel.setLayoutData(new GridData({ span: "L6 M6 S12" })); // Ocupa la mitad en pantallas grandes y medianas
                    } else {
                        oPanel.setLayoutData(new GridData({ span: "L12 M12 S12" })); // Ocupa el ancho completo en otros paneles
                    }

                    oPanel.addContent(oGrid); // Añade el Grid al Panel
                }

                // Calcula el tamaño del span basado en la propiedad size del JSON
                var span = this._calculateGridSpan(item.size);

                // Según el tipo de componente, creamos los correspondientes elementos de UI5
                switch (item.type) {
                    case "title":
                        oComponent = new Title({ text: item.label, level: "H" + item.level });
                        oComponent.setLayoutData(new GridData({ span: "L12 M12 S12" })); // Los títulos toman siempre el ancho completo
                        break;
                    case "label":
                        oComponent = new Label({ text: item.label });
                        oComponent.setLayoutData(new GridData({ span: span }));
                        break;
                    case "text":
                        oComponent = new VBox({
                            items: [
                                new Label({ text: item.label }),
                                new Input({
                                    value: item.value,
                                    width: "100%",
                                    layoutData: new GridData({ span: span }),
                                    change: this.onChangeHandler.bind(this) // Llama a la función onChangeHandler
                                })
                            ]
                        });
                        oComponent.setLayoutData(new GridData({ span: span })); // Responsividad basada en size
                        break;
                    case "date":
                        oComponent = new VBox({
                            items: [
                                new Label({ text: item.label }),
                                new DatePicker({
                                    value: item.value,
                                    width: "100%",
                                    layoutData: new GridData({ span: span }),
                                    change: this.onChangeHandler.bind(this) // Llama a la función onChangeHandler
                                })
                            ]
                        });
                        oComponent.setLayoutData(new GridData({ span: span })); // Responsividad basada en size
                        break;
                    case "select":
                        var oSelect = new Select({
                            width: "100%",
                            layoutData: new GridData({ span: span }),
                            change: this.onChangeHandler.bind(this) // Llama a la función onChangeHandler
                        });
                        item.bind.forEach(function (option) {
                            oSelect.addItem(new Item({ text: option.label, key: option.value }));
                        });
                        oComponent = new VBox({
                            items: [
                                new Label({ text: item.label }),
                                oSelect
                            ]
                        });
                        oComponent.setLayoutData(new GridData({ span: span })); // Responsividad basada en size
                        break;
                    case "download":
                        oComponent = this.createDownloadComponent(item.bind); // Llama al nuevo método con el contenedor que ocupa el 100% y centra los botones
                        oComponent.setLayoutData(new GridData({ span: span }));
                        break;
                    case "button":
                        oComponent = new Button({
                            text: item.label || "Button",
                            layoutData: new GridData({ span: span }),
                            press: this.onChangeHandler.bind(this) // Llama a la función onChangeHandler para botones
                        });
                        oComponent.setLayoutData(new GridData({ span: span }));
                        break;
                    case "button-icon":
                        oComponent = new VBox({
                            alignItems: "Center",
                            justifyContent: "Center",
                            items: [
                                new Label({ text: item.label }),
                                new Icon({
                                    src: item.icon,
                                    color: "#007aff",
                                    text: item.label,
                                    size: "20px",
                                    layoutData: new GridData({ span: span }),
                                    press: this.onClickHandler.bind(this) // Llama a la función onChangeHandler para botones
                                })
                            ]
                        });
                        oComponent.addStyleClass("button-icon");
                        oComponent.setLayoutData(new GridData({ span: span }));
                        break;
                    case "table":
                        oComponent = new Table({
                            columns: item.bind.map(function (column) {
                                return new Column({ header: new Label({ text: column.label }) });
                            })
                        });

                        // Dummy row for structure example
                        oComponent.addItem(new ColumnListItem({
                            cells: item.bind.map(function (column) {
                                return new Text({ text: "Data" });
                            })
                        }));
                        oComponent.setLayoutData(new GridData({ span: "L12 M12 S12" })); // Las tablas toman todo el ancho
                        break;
                }

                // Aplica la clase CSS personalizada para agregar margen
                // oComponent.addStyleClass("customMargin");

                // Agregar el componente al Grid
                if (oComponent) {
                    oGrid.addContent(oComponent);
                }
            }.bind(this)); // Aseguramos que el contexto se mantenga para usar `this`

            // Agrega el último panel creado a la lista
            if (oPanel) {
                panelsList.push(oPanel);
            }

            // Retorna la lista de Paneles creados
            return panelsList;
        },

        // Nuevo método para crear el componente de descarga
        createDownloadComponent: function (bindData) {
            var oDownloadHBox = new HBox({
                justifyContent: "Center",  // Centramos los elementos en el eje horizontal
                alignItems:"Center",
                width: "100%", // Ocupa todo el ancho de la pantalla
                // addStyleClass: "downloadContainer" // Añade la clase personalizada para el fondo
            });

            // Añade los botones al VBox
            bindData.forEach(function (file) {

                var oDownloadVBox = new VBox({
                    width: "100%",  // Asegura que el VBox ocupe todo el ancho del HBox
                    alignItems: "Center", // Alinea los botones en el centro verticalmente
                    items:[
                        
                        new Icon({
                            src: file.type,
                            color: "#007aff",
                            size: "70px",
                            press: function () {
                                window.open(file.url, "_blank");
                            }
                        }),
                        new Label({ text: file.name })
                    ]
                });

                oDownloadHBox.addItem(oDownloadVBox);
            });

            oDownloadHBox.addStyleClass("downloadContainer");
            return oDownloadHBox;  // Retorna el HBox que contiene los elementos centrados
        },

        _calculateGridSpan: function (size) {
            // Si no se proporciona un tamaño, tomamos 12 por defecto (todo el ancho)
            var span = size ? size : 12;

            // Mapeamos el valor size a las columnas de la Grid de SAPUI5
            // Equivalente a la estructura de Bootstrap: 12 columnas por fila
            var gridSpan = "L" + span + " M" + span + " S" + span;
            return gridSpan;
        },
        onChangeHandler: function (oEvent) {
            // Función que será llamada cada vez que se dispare el evento de cambio o click
            console.log("Evento de cambio o clic detectado", oEvent.getSource());
        },
        onClickHandler: function (oEvent) {
            // Función que será llamada cada vez que se dispare el evento de cambio o click
            console.log("Evento de cambio o clic detectado", oEvent.getSource());
        }
    };
});
