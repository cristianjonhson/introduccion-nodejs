// Operaciones ASÍNCRONAS con callbacks - CommonJS
// Las operaciones asíncronas NO bloquean la ejecución

const fs = require('node:fs');
const path = require('node:path');

console.log('=== Operaciones ASÍNCRONAS con Callbacks - CommonJS ===\n');

const tempDir = path.join(__dirname, 'temp-async');
const filePath = path.join(tempDir, 'asincrono.txt');

console.log('▶️  INICIO - Las operaciones se ejecutan sin bloquear\n');

// 1. Crear directorio (ASÍNCRONO)
console.log('1️⃣  Solicitando crear directorio...');
fs.mkdir(tempDir, { recursive: true }, (err) => {
  if (err) {
    console.error('❌ Error al crear directorio:', err);
    return;
  }
  console.log('   ✅ Directorio creado');

  // 2. Escribir archivo (ASÍNCRONO) - dentro del callback anterior
  console.log('\n2️⃣  Solicitando escribir archivo...');
  fs.writeFile(filePath, 'Primera línea\n', (err) => {
    if (err) {
      console.error('❌ Error al escribir archivo:', err);
      return;
    }
    console.log('   ✅ Archivo escrito');

    // 3. Leer archivo (ASÍNCRONO)
    console.log('\n3️⃣  Solicitando leer archivo...');
    fs.readFile(filePath, 'utf-8', (err, contenido) => {
      if (err) {
        console.error('❌ Error al leer archivo:', err);
        return;
      }
      console.log('   📖 Contenido:', contenido.trim());

      // 4. Agregar contenido (ASÍNCRONO)
      console.log('\n4️⃣  Solicitando agregar contenido...');
      fs.appendFile(filePath, 'Segunda línea\n', (err) => {
        if (err) {
          console.error('❌ Error al agregar contenido:', err);
          return;
        }
        console.log('   ✅ Contenido agregado');

        // 5. Leer de nuevo (ASÍNCRONO)
        console.log('\n5️⃣  Solicitando leer archivo actualizado...');
        fs.readFile(filePath, 'utf-8', (err, contenidoFinal) => {
          if (err) {
            console.error('❌ Error al leer archivo:', err);
            return;
          }
          console.log('   📖 Contenido final:\n', contenidoFinal);

          // 6. Limpiar (ASÍNCRONO)
          console.log('6️⃣  Solicitando limpiar archivos temporales...');
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('❌ Error al eliminar archivo:', err);
              return;
            }
            fs.rmdir(tempDir, (err) => {
              if (err) {
                console.error('❌ Error al eliminar directorio:', err);
                return;
              }
              console.log('   🧹 Limpieza completada');
              console.log('\n▶️  FIN - Todas las operaciones completadas');
              console.log('📝 Nota: Cada operación se ejecutó SIN BLOQUEAR el programa');
            });
          });
        });
      });
    });
  });
});

console.log('\n⚡ Este mensaje aparece INMEDIATAMENTE (el código continúa sin esperar)');
console.log('💡 Las operaciones asíncronas se completan en segundo plano\n');
