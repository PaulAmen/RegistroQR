const fs = require('fs');
const csv = require('csv-parser');
const QRCode = require('qrcode');
const path = require('path');

// Función para sanitizar nombres de archivos
function sanitizeFileName(name) {
    return name.replace(/[^a-zA-Z0-9]/g, '_');
}

// Asegúrate de que la carpeta `qr_codes` exista
const outputDir = path.join(__dirname, 'qr_codes');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Función para leer el CSV y generar los códigos QR
function generateQRFromCSV(csvFilePath) {
    fs.createReadStream(csvFilePath)
        .pipe(csv(['nombre', 'correo', 'semestre', 'paralelo']))
        .on('data', (row) => {
            const jsonData = {
                nombre: row.nombre,
                correo: row.correo,
                semestre: row.semestre,
                paralelo: row.paralelo
            };

            // Convertir los datos a un string JSON
            const jsonString = JSON.stringify(jsonData);

            // Sanitizar el nombre del archivo
            const sanitizedFileName = sanitizeFileName(row.nombre);

            // Definir la ruta completa para guardar el archivo PNG
            const filePath = path.join(outputDir, `${sanitizedFileName}.png`);

            // Generar el QR y guardarlo en la carpeta `qr_codes`
            QRCode.toFile(filePath, jsonString, function (err) {
                if (err) throw err;
                console.log(`QR code for ${row.nombre} has been generated at ${filePath}.`);
            });
        })
        .on('end', () => {
            console.log('CSV file successfully processed.');
        });
}

// Llama a la función con la ruta al archivo CSV en la carpeta `data`
generateQRFromCSV('data/estudiantes.csv');
