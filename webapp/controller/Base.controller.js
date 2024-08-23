sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"../services/menu"
], function (Controller, Fragment, ) {
	"use strict";

	return Controller.extend("siar.controller.Base", {

		onInit: function () {
			console.log('BASE onInit')
		},

		onBeforeRendering: function () {
			console.log('BASE onBeforeRendering')
		},

		onAfterRendering: function () {
			console.log('BASE onAfterRendering')
			setTimeout(() => {
				console.clear()
			}, 5000);
		},

		onExit: function () {
			console.log('BASE onExit')
		},

		//Menu lateral
		_buildMenu: function (aMenuData) {
			var oNavigationList = this.getControlById("navigationList");

			aMenuData.forEach(function (oItem) {
				var oNavigationItem = new sap.tnt.NavigationListItem({
					text: oItem.title,
					icon: oItem.icon,
					key: oItem.page,
					select: this.onNavigationItemSelect.bind(this), selectable: false
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
			} else if (sText == 'Salir') {
				const url = this.getView().getModel().oData?.menuItems?.find(i => i.title == 'Salir')?.url
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
			let oSplitApp = this.getControlById("splitApp");
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
				id: this.getIdView(),
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

				 // Llenar el contenido HTML dinámico
				 var oHtmlControl = this.byId("dynamicHtmlContent");
				 var sHtmlContent = this.baseControls();
				 oHtmlControl.setContent(sHtmlContent);

				// Navegar a la página de detalle
				oSplitApp.toDetail(oPage);
			}.bind(this));
		},

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
		},

		getControlById: function (sId) {
			return this.byId(sId) || sap.ui.getCore().byId(sId);
		},

		getIdView:function(){
			return this.getView().getId()
		},
		baseControls:function(){
			let sHtmlContent = `
				<div class="controles">
					<div>
						<label for="empleado">EMPLEADO</label>
						<input type="text" id="empleado" name="empleado">
					</div>
					<div>
						<label for="nombre">NOMBRE</label>
						<input type="text" id="nombre" name="nombre">
					</div>
					<div>
						<label for="posicion">POSICIÓN</label>
						<input type="text" id="posicion" name="posicion">
					</div>
					<div>
						<label for="cia_sa">CIA_SA</label>
						<input type="text" id="cia_sa" name="cia_sa">
					</div>
					<div>
						<label for="nombrecia">NOMBRE CIA</label>
						<input type="text" id="nombrecia" name="nombrecia">
					</div>
					<div>
						<label for="funcion">FUNCIÓN</label>
						<input type="text" id="funcion" name="funcion">
					</div>
					<div>
						<label for="puesto">PUESTO</label>
						<input type="text" id="puesto" name="puesto">
					</div>
					<div>
						<label for="ccosto">C COSTO</label>
						<input type="text" id="ccosto" name="ccosto">
					</div>
					<div>
						<label for="fechanacimiento">FECHA NACIMIENTO</label>
						<input type="date" id="fechanacimiento" name="fechanacimiento">
					</div>
					<div>
						<label for="fechaingreso">FECHA INGRESO</label>
						<input type="date" id="fechaingreso" name="fechaingreso">
					</div>
					<div>
						<label for="fechaantiguedad">FECHA ANTIGÜEDAD</label>
						<input type="date" id="fechaantiguedad" name="fechaantiguedad">
					</div>
					<div>
						<label for="agrupador">AGRUPADOR</label>
						<input type="text" id="agrupador" name="agrupador">
					</div>
					<div>
						<label for="esquema">ESQUEMA</label>
						<input type="text" id="esquema" name="esquema">
					</div>
					<div>
						<label for="sgmm">SGMM</label>
						<input type="text" id="sgmm" name="sgmm">
					</div>
					<div>
						<label for="actualizacion">ACTUALIZACIÓN</label>
						<input type="text" id="actualizacion" name="actualizacion">
					</div>
				</div>
			`;

			return sHtmlContent
		}
	});
});
