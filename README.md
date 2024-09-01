# Registro de Estudiantes por QR

Este proyecto permite registrar estudiantes mediante la lectura de códigos QR. El frontend realiza una solicitud POST a un script de Google Apps Script (GAS), que a su vez guarda los datos en una hoja de cálculo de Google Sheets.

## Script de Google Apps Script (GAS)

```javascript
function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById('ID DE LA HOJA DE CÁLCULO');
    var sheet = ss.getSheetByName('NOMBRE DE LA HOJA');

    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([new Date(), data.nombre, data.correo, data.semestre, data.paralelo]);

    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'message': error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
