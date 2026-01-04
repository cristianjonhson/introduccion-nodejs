// Operaciones ASÍNCRONAS con Promesas - CommonJS
// Usando fs/promises para un código más limpio

const fs = require('node:fs/promises');
const path = require('node:path');

console.log('=== Operaciones ASÍNCRONAS con Promesas - CommonJS ===\n');

const tempDir = path.join(__dirname, 'temp-promises');
const filePath = path.join(tempDir, 'promesas.txt');

// Función principal async
async function ejecutarOperaciones() {
  try {
    console.log('▶️  INICIO - Operaciones con async/await\n');

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
    console.log('📝 Nota: Código asíncrono pero con sintaxis LIMPIA (sin callbacks anidados)');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Ejecutar
console.log('⚡ Iniciando operaciones asíncronas con promesas...\n');
ejecutarOperaciones();
console.log('💡 Este mensaje puede aparecer antes o durante las operaciones\n');
