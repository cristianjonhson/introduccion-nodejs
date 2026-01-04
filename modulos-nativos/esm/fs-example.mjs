// Ejemplo de módulo nativo: File System (fs) con ES Modules

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// En ES Modules, necesitamos recrear __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('=== Módulo fs (File System) - ES Modules ===\n');

// 1. Crear un directorio temporal
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
  console.log('✅ Directorio "temp" creado');
}

// 2. Escribir un archivo
const filePath = path.join(tempDir, 'ejemplo.txt');
const contenido = 'Hola desde Node.js usando ES Modules!\n';
fs.writeFileSync(filePath, contenido);
console.log('✅ Archivo "ejemplo.txt" creado');

// 3. Leer el archivo
const contenidoLeido = fs.readFileSync(filePath, 'utf-8');
console.log('📖 Contenido del archivo:', contenidoLeido);

// 4. Agregar más contenido
fs.appendFileSync(filePath, 'Línea adicional agregada.\n');
console.log('✅ Contenido agregado al archivo');

// 5. Leer de nuevo
const contenidoFinal = fs.readFileSync(filePath, 'utf-8');
console.log('📖 Contenido final:\n', contenidoFinal);

// 6. Obtener información del archivo
const stats = fs.statSync(filePath);
console.log('📊 Información del archivo:');
console.log('   - Tamaño:', stats.size, 'bytes');
console.log('   - Creado:', stats.birthtime);
console.log('   - Es archivo:', stats.isFile());
console.log('   - Es directorio:', stats.isDirectory());

// 7. Limpiar: eliminar archivo y directorio
fs.unlinkSync(filePath);
fs.rmdirSync(tempDir);
console.log('\n🧹 Archivos temporales eliminados');
