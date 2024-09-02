sap.ui.define([
    "sap/ui/base/Object",
    "siar/services/forms"
], function (BaseObject, forms) {
    "use strict";

    return {
        getCustomForm: async function (RolId, FormularioId) {
            let newForm = []
            let formResponse = await new forms(33, 11).getFormaById(RolId, FormularioId)

            let tmp = [...new Set(formResponse.map(item => item.level))].forEach(a => {
                let sHtmlContent = formResponse
                    .filter(control => control.level === a)
                    .map(control =>
                        createControl(control.label, control.name, control.type, control.value, control.bind, control.size)
                    ).join('')
                let fullForm = createControlesDiv(sHtmlContent);
                let dynamicForm = new sap.ui.core.HTML({
                    content: fullForm
                })
                var oPanel = new sap.m.Panel({
                    expanded: true,
                    content: [
                        dynamicForm
                    ]
                });

                oPanel.addStyleClass("sapUiResponsiveMargin");
                oPanel.addStyleClass("customPanel");


                let oHTMLControl = new sap.ui.core.HTML({
                    content: oPanel
                })
                
                newForm.push(oPanel)
            });

            return newForm
        }
    };
});

const createControl = (label, name, type, value, bind = null, size = 0) => {
    const valueAttribute = value ? ` value="${value}"` : "";
    let controlHtml = label ? `<label for="${name}">${label}${(type === "label" && value) ? `<sapn style="padding-left:10%;" >${value}</span>` : ''}</label>` : '';

    if (type === "select" && bind) {
        controlHtml += `<select id="${name}" name="${name}" onchange="onChangeHandler(event)">`;
        bind.forEach(option => {
            controlHtml += `<option value="${option.value}">${option.label}</option>`;
        });
        controlHtml += `</select>`;
    } else if (type === "radio" && bind) {
        bind.forEach(option => {
            controlHtml += `
                    <div>
                        <input type="radio" id="${option.value}" name="${name}" value="${option.value}" onchange="onChangeHandler(event)" />
                        <label for="${option.value}">${option.label}</label>
                    </div>`;
        });
    } else if (type === "label") {

    } else if (type === "title") {
        controlHtml = `<h1>${label}</h1>`
    } else if (type === "table") {
        var tableHTML = '<table style="width:100%; border-collapse: collapse;" class="table-custom">';
        tableHTML += '<thead><tr>';

        // Añadir los encabezados
        bind.forEach(function (item) {
            tableHTML += '<th style="padding: 12px; border: 1px solid #dee2e6; background-color: #f8f9fa;">' + item.label + '</th>';
        });

        tableHTML += '</tr></thead><tbody><tr>';

        // Añadir las celdas de la fila con los valores
        bind.forEach(function () {
            tableHTML += '<td style="padding: 12px; border: 1px solid #dee2e6;">' + '</td>';
        });

        tableHTML += '</tr></tbody></table>';

        controlHtml += tableHTML
    } else {
        controlHtml += `<input type="${type}" id="${name}" name="${name}" onchange="onChangeHandler(event)"${valueAttribute}/>`;
    }

    return `<div ${(size && size > 0 ? `class="col-${size}"` : '')}>${controlHtml}</div>`;
}

const createControlesDiv = (controlsHtml) => {
    return `<div class="controles">${controlsHtml}</div>`;
}