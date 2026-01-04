// Operaciones SÍNCRONAS con fs - ES Modules

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('=== Operaciones SÍNCRONAS (Bloqueantes) - ES Modules ===\n');

const tempDir = path.join(__dirname, 'temp-sync');
const filePath = path.join(tempDir, 'sincrono.txt');

console.log('⏸️  INICIO - Las operaciones se ejecutan una tras otra\n');

// 1. Crear directorio (SÍNCRONO)
console.log('1️⃣  Creando directorio...');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
  console.log('   ✅ Directorio creado');
}

// 2. Escribir archivo (SÍNCRONO)
console.log('\n2️⃣  Escribiendo archivo...');
fs.writeFileSync(filePath, 'Primera línea\n');
console.log('   ✅ Archivo escrito');

// 3. Leer archivo (SÍNCRONO)
console.log('\n3️⃣  Leyendo archivo...');
const contenido = fs.readFileSync(filePath, 'utf-8');
console.log('   📖 Contenido:', contenido.trim());

// 4. Agregar contenido (SÍNCRONO)
console.log('4️⃣  Agregando más contenido...');
fs.appendFileSync(filePath, 'Segunda línea\n');
console.log('   ✅ Contenido agregado');

// 5. Leer de nuevo (SÍNCRONO)
console.log('\n5️⃣  Leyendo archivo actualizado...');
const contenidoFinal = fs.readFileSync(filePath, 'utf-8');
console.log('   📖 Contenido final:\n', contenidoFinal);

// 6. Limpiar (SÍNCRONO)
console.log('6️⃣  Limpiando archivos temporales...');
fs.unlinkSync(filePath);
fs.rmdirSync(tempDir);
console.log('   🧹 Limpieza completada');

console.log('\n⏸️  FIN - Todas las operaciones se ejecutaron en orden secuencial');
console.log('📝 Nota: Cada operación BLOQUEÓ la ejecución hasta completarse');
