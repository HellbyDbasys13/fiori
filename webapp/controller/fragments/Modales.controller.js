sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Panel",
    "sap/m/Input",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "../../utils/Utils"
  ], function (Controller, Panel, Input, Fragment, Utils) {
    "use strict";
  
    return Controller.extend("siar.controller.fragments.Modales", {
      onInit: function () {
        // Configuración del modelo JSON
            var oModel = new sap.ui.model.json.JSONModel({
                email: "",
                confirmEmail: ""
            });
            this.getView().setModel(oModel);
  
      },
        //Modal de Formulario
    onOpenDialog: function () {
        this.getView().byId("formDialog").open()
    },
    onCloseDialog: function () {
        this.getView().byId("formDialog").close()
    
    },
    onSubmitForm: function () {
        var oView = this.getView();
        var formData = {
            nombre: oView.byId("nombre").getValue(),
            apellidoPat: oView.byId("apellidoPat").getValue(),
            apellidoMat: oView.byId("apellidoMat").getValue(),
            fecha: oView.byId("fecha").getValue(),
            genero: oView.byId("genero").getSelectedKey(),
            comentarios: oView.byId("comentarios").getValue()
        }
        // Convertir a JSON y mostrar en consola (puedes enviarlo a un servidor o procesarlo de otra forma)
        console.log(JSON.stringify(formData));

        //Mostrar mensaje de éxito
        MessageToast.show("Datos enviado con éxito");

        //Cerra Modal
        this.onCloseDialog();
    },
    onFileChangeDep: function(oEvent) {
        var fileUploader = this.byId("fileUploaderDep");
        var oText = this.byId("fileName");

                    var file = oEvent.getParameter("files")[0];
        if (file) {
            // Actualiza el texto con el nombre del archivo
            oText.setText("Selected file: " + file.name);
        } else {
            // No se seleccionó un archivo
            oText.setText("No file selected");
        }
    },
         //Modal de Envio de correo
        onOpenDialogEmail: function() {
            this.getView().byId("formDialogEmail").open()
    
        },
        onCloseDialogEmail: function() {
    
            this.getView().byId("formDialogEmail").close()
               
    
        },
      
    });
  });
  