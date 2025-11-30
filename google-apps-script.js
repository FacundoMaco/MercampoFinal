function doPost(e) {
    try {
        // ID extraído de tu hoja de cálculo
        const SPREADSHEET_ID = '1rEHx6Sww1u27Ur5eOLxpfhOXwvxCbWcDScXwFLeUqRo';
        const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();

        // Headers automáticos si está vacío
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(['ID Pedido', 'Fecha/Hora', 'ClienteID', 'ProductoID', 'ProductoNombre', 'Presentación', 'Cantidad', 'Unidad', 'Observaciones', 'Estado']);
        }

        const data = JSON.parse(e.postData.contents);

        // Aseguramos que sea un array para iterar
        const rows = Array.isArray(data) ? data : [data];

        rows.forEach(line => {
            sheet.appendRow([
                line['ID Pedido'],
                line['Fecha/Hora'],
                line['ClienteID'],
                line['ProductoID'],
                line['ProductoNombre'],
                line['Presentación'],
                line['Cantidad'],
                line['Unidad'],
                line['Observaciones'],
                line['Estado']
            ]);
        });

        return ContentService.createTextOutput(JSON.stringify({ success: true }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
