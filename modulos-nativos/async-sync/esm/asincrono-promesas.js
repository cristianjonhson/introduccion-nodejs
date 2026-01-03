// Operaciones ASÍNCRONAS con Promesas - ES Modules
// ES Modules soporta async/await nativamente (Top-level await)

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('=== Operaciones ASÍNCRONAS con Promesas - ES Modules ===\n');

const tempDir = path.join(__dirname, 'temp-promises');
const filePath = path.join(tempDir, 'promesas.txt');

try {
  console.log('▶️  INICIO - Operaciones con async/await (Top-level)\n');

  // 1. Crear directorio
  console.log('1️⃣  Creando directorio...');
  await fs.mkdir(tempDir, { recursive: true });
  console.log('   ✅ Directorio creado');

  // 2. Escribir archivo
  console.log('\n2️⃣  Escribiendo archivo...');
  await fs.writeFile(filePath, 'Primera línea\n');
  console.log('   ✅ Archivo escrito');

  // 3. Leer archivo
  console.log('\n3️⃣  Leyendo archivo...');
  const contenido = await fs.readFile(filePath, 'utf-8');
  console.log('   📖 Contenido:', contenido.trim());

  // 4. Agregar contenido
  console.log('\n4️⃣  Agregando más contenido...');
  await fs.appendFile(filePath, 'Segunda línea\n');
  console.log('   ✅ Contenido agregado');

  // 5. Leer de nuevo
  console.log('\n5️⃣  Leyendo archivo actualizado...');
  const contenidoFinal = await fs.readFile(filePath, 'utf-8');
  console.log('   📖 Contenido final:\n', contenidoFinal);

  // 6. Obtener información del archivo
  console.log('6️⃣  Obteniendo información del archivo...');
  const stats = await fs.stat(filePath);
  console.log('   📊 Tamaño:', stats.size, 'bytes');
  console.log('   📊 Creado:', stats.birthtime);

  // 7. Limpiar
  console.log('\n7️⃣  Limpiando archivos temporales...');
  await fs.unlink(filePath);
  await fs.rmdir(tempDir);
  console.log('   🧹 Limpieza completada');

  console.log('\n▶️  FIN - Todas las operaciones completadas');
  console.log('📝 Nota: Top-level await permite async/await sin función wrapper');
  console.log('✨ Ventaja de ES Modules: código más limpio y directo');

} catch (error) {
  console.error('❌ Error:', error.message);
}
