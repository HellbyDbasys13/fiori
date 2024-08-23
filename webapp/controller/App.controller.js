sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment',
	'sap/m/MessageToast',
	"sap/m/MenuItem",
	"sap/ui/model/json/JSONModel",
	"../services/menu"
], function (Controller, Fragment, MessageToast, MenuItem, JSONModel, menu) {
	"use strict";

	return Controller.extend("siar.controller.App", {
		onInit: function () {
			setTimeout(() => {
				console.clear()
			  }, 3000);
			menu.get().then((response) => {
				this.getView().setModel(new JSONModel({
					menuItems: response
				}));
				this._buildMenu(response)
			})
			this._loadFragment('Home')
		},

		onAfterRendering: function () {
		},

		//Menu lateral
		_buildMenu: function (aMenuData) {
			var oNavigationList = this.byId("navigationList");

			aMenuData.forEach(function (oItem) {
				var oNavigationItem = new sap.tnt.NavigationListItem({
					text: oItem.title,
					icon: oItem.icon,
					key: oItem.page,
					select: this.onNavigationItemSelect.bind(this),selectable:false
				});

				if (oItem.child) {
					try {
						oItem.child.forEach(function (oSubItem) {
							var oSubNavigationItem = new sap.tnt.NavigationListItem({
								text: oSubItem.title,
								// icon: oSubItem.icon,
								key: oSubItem.page,
								select: this.onNavigationItemSelect.bind(this)
							});
							oNavigationItem.addItem(oSubNavigationItem);
						}, this);
					} catch (error) {
						console.log('ERROR AL GENERAR HIJOS MENU ', error)
					}
				}

				oNavigationList.addItem(oNavigationItem);
			}, this);
		},

		onNavigationItemSelect: function (oEvent) {
			var sKey = oEvent.getParameter("item").getKey();
			var sText = oEvent.getParameter("item").getText();
			if (sKey) {
				this._loadFragment(sKey)
			}else if(sText=='Salir'){
				const url = this.getView().getModel().oData?.menuItems?.find(i=>i.title=='Salir')?.url
				window.location.href = url;
			}
		},

		//menu icono de usuario
		onMenuAction: function (oEvent) {
			let oItem = oEvent.getParameter("item").getText()
			const menuModel = this.getView().getModel().oData?.menuItems
			if (oItem != 'Salir') {

			} else {
				const { page, url } = menuModel.pop()
				window.location.href = url;
			}
		},

		_loadFragment: function (sPageId) {
			let oSplitApp = this.byId("splitApp");
			let sFragmentName = `siar.view.fragments.${sPageId}`; // Nombre del fragmento dinámico
			let sFragmentControllerName = `siar.controller.fragments.${sPageId}`; // Nombre del fragmento dinámico
			let oController;

			// Intentar cargar el controlador específico del fragmento
			try {
				oController = sap.ui.controller(sFragmentControllerName);
			} catch (error) {
				console.warn(`No se encontró el controlador para ${sFragmentName}. Cargando fragmento sin controlador.`);
				oController = null; // No asignar un controlador si no existe
			}

			// Carga del fragmento
			Fragment.load({
				id: this.getView().getId(),
				name: sFragmentName,
				controller: oController // Pasar null si no hay controlador
			}).then(function (oFragment) {
				// Obtener la página de detalle correspondiente
				let oPage = oSplitApp.getDetailPages().find(page => page.getId().includes("Here"));

				// Eliminar cualquier otro fragmento dentro de la página de detalle
				oPage.removeAllContent();

				// Agregar el nuevo fragmento
				oPage.addContent(oFragment);

				// Llamada al método onInit del controlador del fragmento si existe
				if (oController && oController.onInit) {
					oController.onInit();
				}

				// Navegar a la página de detalle
				oSplitApp.toDetail(oPage);
			}.bind(this));
		}
		,

		onUserIconPress: function () {
			var oView = this.getView(),
				oButton = oView.byId("userIcon");

			if (!this._oMenuFragment) {
				this._oMenuFragment = Fragment.load({
					id: oView.getId(),
					name: "siar.view.fragments.masterpage.UserMenu",
					controller: this
				}).then(function (oMenu) {
					oMenu.openBy(oButton);
					this._oMenuFragment = oMenu;
					return this._oMenuFragment;
				}.bind(this));
			} else {
				this._oMenuFragment.openBy(oButton);
			}
		}
	});
});
