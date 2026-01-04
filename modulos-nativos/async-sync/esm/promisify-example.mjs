// Ejemplo de util.promisify - ES Modules

import fs from 'node:fs';
import util from 'node:util';

console.log('=== util.promisify - ES Modules ===\n');

// ❌ Forma antigua: funciones con callbacks
console.log('📝 Funciones originales con callbacks:');
console.log('   - fs.readFile(path, encoding, callback)');
console.log('   - fs.writeFile(path, data, callback)');
console.log('   - fs.stat(path, callback)\n');

// ✅ Convertir a promesas con util.promisify
console.log('🔄 Convirtiendo a promesas con util.promisify...\n');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);

// Con Top-level await (ventaja de ES Modules)
try {
  const tempDir = './temp-promisify-esm';
  const filePath = `${tempDir}/ejemplo.txt`;

  // 1. Crear directorio
  console.log('1️⃣  Creando directorio...');
  await mkdir(tempDir, { recursive: true });
  console.log('   ✅ Directorio creado');

  // 2. Escribir archivo usando función promisificada
  console.log('\n2️⃣  Escribiendo archivo con writeFile promisificado...');
  await writeFile(filePath, 'Contenido creado con util.promisify en ES Modules\n');
  console.log('   ✅ Archivo escrito');

  // 3. Leer archivo usando función promisificada
  console.log('\n3️⃣  Leyendo archivo con readFile promisificado...');
  const contenido = await readFile(filePath, 'utf-8');
  console.log('   📖 Contenido:', contenido.trim());

  // 4. Obtener información del archivo
  console.log('\n4️⃣  Obteniendo stats con stat promisificado...');
  const stats = await stat(filePath);
  console.log('   📊 Tamaño:', stats.size, 'bytes');
  console.log('   📊 Es archivo:', stats.isFile());
  console.log('   📊 Creado:', stats.birthtime);

  // 5. Limpiar
  console.log('\n5️⃣  Limpiando archivos...');
  await unlink(filePath);
  await rmdir(tempDir);
  console.log('   🧹 Limpieza completada');

  console.log('\n✨ VENTAJAS de util.promisify en ES Modules:');
  console.log('   • Convierte callbacks a promesas automáticamente');
  console.log('   • Top-level await (sin función async wrapper)');
  console.log('   • Código más limpio y legible');
  console.log('   • Compatible con APIs antiguas');

  console.log('\n💡 NOTA: fs/promises es preferible cuando está disponible');
  console.log('   import fs from "node:fs/promises";');

} catch (error) {
  console.error('❌ Error:', error.message);
}
