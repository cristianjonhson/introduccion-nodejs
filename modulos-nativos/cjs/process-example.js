// Módulo Process de Node.js (CommonJS)
// El módulo process proporciona información y control sobre el proceso de Node.js actual

// ✅ Buena práctica: importar explícitamente (Node.js 16+)
const process = require('node:process');

console.log('=== Módulo Process de Node.js ===\n');

// 1. Información del Proceso
console.log('1️⃣  Información del Proceso:\n');
console.log('   PID (Process ID):', process.pid);
console.log('   Versión de Node.js:', process.version);
console.log('   Versiones de dependencias:', process.versions);
console.log('   Plataforma:', process.platform);
console.log('   Arquitectura:', process.arch);
console.log('   Uptime del proceso:', process.uptime().toFixed(2), 'segundos');

// 2. Directorio y Rutas
console.log('\n2️⃣  Directorio y Ejecución:\n');
console.log('   Directorio actual (cwd):', process.cwd());
console.log('   Archivo ejecutado:', process.argv[1]);
console.log('   Ruta del ejecutable de Node:', process.execPath);

// 3. Argumentos de Línea de Comandos
console.log('\n3️⃣  Argumentos de Línea de Comandos:\n');
console.log('   process.argv:', process.argv);
console.log('   Ejecutable Node:', process.argv[0]);
console.log('   Script ejecutado:', process.argv[1]);
if (process.argv.length > 2) {
  console.log('   Argumentos adicionales:', process.argv.slice(2));
} else {
  console.log('   (No hay argumentos adicionales)');
  console.log('   💡 Prueba: node process-example.js arg1 arg2 arg3');
}

// 4. Variables de Entorno
console.log('\n4️⃣  Variables de Entorno:\n');
console.log('   NODE_ENV:', process.env.NODE_ENV || 'no definido');
console.log('   HOME:', process.env.HOME || process.env.USERPROFILE);
console.log('   PATH (primeras 100 caracteres):', process.env.PATH?.substring(0, 100) + '...');
console.log('   Total de variables de entorno:', Object.keys(process.env).length);

// Ejemplo: Configuración según entorno
const config = process.env.NODE_ENV === 'production' 
  ? { debug: false, logLevel: 'error' }
  : { debug: true, logLevel: 'verbose' };
console.log('   Configuración actual:', config);

// 5. Uso de Memoria
console.log('\n5️⃣  Uso de Memoria:\n');
const memoryUsage = process.memoryUsage();
console.log('   RSS (Resident Set Size):', (memoryUsage.rss / 1024 / 1024).toFixed(2), 'MB');
console.log('   Heap Total:', (memoryUsage.heapTotal / 1024 / 1024).toFixed(2), 'MB');
console.log('   Heap Usado:', (memoryUsage.heapUsed / 1024 / 1024).toFixed(2), 'MB');
console.log('   External:', (memoryUsage.external / 1024 / 1024).toFixed(2), 'MB');
console.log('   Array Buffers:', (memoryUsage.arrayBuffers / 1024 / 1024).toFixed(2), 'MB');

// 6. Uso de CPU
console.log('\n6️⃣  Uso de CPU del Proceso:\n');
const cpuUsage = process.cpuUsage();
console.log('   User CPU time:', cpuUsage.user, 'microsegundos');
console.log('   System CPU time:', cpuUsage.system, 'microsegundos');
console.log('   Total CPU time:', ((cpuUsage.user + cpuUsage.system) / 1000).toFixed(2), 'ms');

// 7. Eventos del Proceso
console.log('\n7️⃣  Eventos del Proceso:\n');

// Evento: beforeExit (se ejecuta cuando Node.js vacía su event loop)
process.on('beforeExit', (code) => {
  console.log('   📢 Evento beforeExit con código:', code);
});

// Evento: exit (se ejecuta justo antes de salir)
process.on('exit', (code) => {
  console.log('   📢 Evento exit con código:', code);
  console.log('   👋 Adiós desde el evento exit!');
});

// Evento: uncaughtException (captura errores no manejados)
process.on('uncaughtException', (error) => {
  console.error('   ❌ Error no capturado:', error.message);
  process.exit(1);
});

// Evento: unhandledRejection (promesas rechazadas sin catch)
process.on('unhandledRejection', (reason, promise) => {
  console.error('   ❌ Promesa rechazada sin manejar:', reason);
});

// Evento: warning (advertencias de Node.js)
process.on('warning', (warning) => {
  console.warn('   ⚠️  Advertencia:', warning.message);
});

// 8. Señales del Sistema
console.log('   Manejadores de señales registrados:');

// SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('\n   📢 SIGINT recibido (Ctrl+C)');
  console.log('   Limpiando recursos...');
  process.exit(0);
});

// SIGTERM (terminación)
process.on('SIGTERM', () => {
  console.log('   📢 SIGTERM recibido');
  console.log('   Cerrando aplicación gracefully...');
  process.exit(0);
});

console.log('   ✅ Manejadores de SIGINT y SIGTERM configurados');
console.log('   💡 Presiona Ctrl+C para probar SIGINT');

// 9. Streams Estándar
console.log('\n8️⃣  Streams Estándar:\n');
console.log('   stdin es terminal:', process.stdin.isTTY ? 'Sí' : 'No');
console.log('   stdout es terminal:', process.stdout.isTTY ? 'Sí' : 'No');
console.log('   stderr es terminal:', process.stderr.isTTY ? 'Sí' : 'No');

// Escribir directamente a stdout (sin \n automático)
process.stdout.write('   Escribiendo con stdout: ');
process.stdout.write('¡Hola! ');
process.stdout.write('¿Cómo estás?\n');

// stderr para errores
process.stderr.write('   ⚠️  Esto es un mensaje de error (stderr)\n');

// 10. Cambiar Directorio
console.log('\n9️⃣  Cambiar Directorio de Trabajo:\n');
const directorioOriginal = process.cwd();
console.log('   Directorio actual:', directorioOriginal);

try {
  // Intentar cambiar al directorio padre
  process.chdir('..');
  console.log('   Nuevo directorio:', process.cwd());
  
  // Regresar al directorio original
  process.chdir(directorioOriginal);
  console.log('   De vuelta a:', process.cwd());
} catch (error) {
  console.error('   ❌ Error al cambiar directorio:', error.message);
}

// 11. Código de Salida
console.log('\n🔟 Código de Salida:\n');
console.log('   Código de salida actual:', process.exitCode ?? 0);
console.log('   Para salir con error: process.exit(1)');
console.log('   Para salir exitosamente: process.exit(0) o dejar que termine naturalmente');

// 12. Información adicional
console.log('\n1️⃣1️⃣  Información Adicional:\n');
console.log('   Title:', process.title);
console.log('   ppid (Parent Process ID):', process.ppid);
console.log('   Usuario actual:', process.getuid?.() ?? 'N/A (Windows)');
console.log('   Grupo actual:', process.getgid?.() ?? 'N/A (Windows)');

// 13. Features y Configuración
console.log('\n1️⃣2️⃣  Features de Node.js:\n');
console.log('   Features:', process.features);
console.log('   Configuración:', process.config.variables);

// 14. Ejemplo Práctico: Script con argumentos
console.log('\n1️⃣3️⃣  Ejemplo Práctico - Parser de Argumentos:\n');

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};
  
  args.forEach((arg, index) => {
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = args[index + 1] && !args[index + 1].startsWith('--') 
        ? args[index + 1] 
        : true;
      options[key] = value;
    }
  });
  
  return options;
}

const options = parseArgs();
console.log('   Opciones parseadas:', Object.keys(options).length > 0 ? options : 'ninguna');
console.log('   💡 Prueba: node process-example.js --name Juan --age 25 --verbose');

// 15. Resumen y Mejores Prácticas
console.log('\n✨ RESUMEN DE USOS COMUNES:\n');
console.log('   • process.env - Variables de entorno y configuración');
console.log('   • process.argv - Argumentos de línea de comandos');
console.log('   • process.cwd() - Directorio de trabajo actual');
console.log('   • process.exit() - Salir del proceso con código');
console.log('   • process.on() - Manejar eventos del proceso');
console.log('   • process.memoryUsage() - Monitorear uso de memoria');
console.log('   • process.platform - Detectar sistema operativo');
console.log('   • process.version - Verificar versión de Node.js');

console.log('\n📝 MEJORES PRÁCTICAS:\n');
console.log('   ✅ Importar explícitamente: require("node:process")');
console.log('   ✅ Validar process.env para configuración');
console.log('   ✅ Manejar señales (SIGINT, SIGTERM) para cleanup');
console.log('   ✅ Usar process.exitCode en lugar de process.exit()');
console.log('   ✅ Capturar uncaughtException y unhandledRejection');
console.log('   ✅ Usar process.stdout.write() para logs sin \\n');

console.log('\n👋 Proceso terminando naturalmente...');
// El evento 'exit' se ejecutará automáticamente
