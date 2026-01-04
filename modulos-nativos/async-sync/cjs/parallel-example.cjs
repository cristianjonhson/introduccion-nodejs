// Ejecución Paralela vs Secuencial en Node.js (CommonJS)
const fs = require('node:fs/promises');
const path = require('node:path');

console.log('=== EJECUCIÓN PARALELA vs SECUENCIAL ===\n');

// Función auxiliar para simular operación asíncrona
function operacionAsincrona(nombre, duracion) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${nombre} completada (${duracion}ms)`);
    }, duracion);
  });
}

// Función para medir tiempo de ejecución
async function medirTiempo(nombre, funcion) {
  console.log(`\n⏱️  ${nombre}:`);
  const inicio = Date.now();
  const resultado = await funcion();
  const duracion = Date.now() - inicio;
  console.log(`   ✅ Tiempo total: ${duracion}ms`);
  return resultado;
}

async function ejemplos() {
  // 1. EJECUCIÓN SECUENCIAL (una tras otra)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('1️⃣  EJECUCIÓN SECUENCIAL (una tras otra)\n');
  
  await medirTiempo('Secuencial', async () => {
    const resultado1 = await operacionAsincrona('Tarea 1', 1000);
    console.log(`   ${resultado1}`);
    
    const resultado2 = await operacionAsincrona('Tarea 2', 1000);
    console.log(`   ${resultado2}`);
    
    const resultado3 = await operacionAsincrona('Tarea 3', 1000);
    console.log(`   ${resultado3}`);
    
    // Total esperado: ~3000ms (1000 + 1000 + 1000)
  });

  // 2. EJECUCIÓN PARALELA con Promise.all()
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('2️⃣  EJECUCIÓN PARALELA con Promise.all()\n');
  
  await medirTiempo('Paralelo (Promise.all)', async () => {
    const resultados = await Promise.all([
      operacionAsincrona('Tarea 1', 1000),
      operacionAsincrona('Tarea 2', 1000),
      operacionAsincrona('Tarea 3', 1000)
    ]);
    
    resultados.forEach(resultado => console.log(`   ${resultado}`));
    // Total esperado: ~1000ms (todas al mismo tiempo)
  });

  // 3. Promise.all() con múltiples tipos de operaciones
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('3️⃣  Promise.all() - Múltiples operaciones diferentes\n');
  
  await medirTiempo('Operaciones mixtas', async () => {
    const [usuarios, productos, config] = await Promise.all([
      operacionAsincrona('Cargar usuarios', 800),
      operacionAsincrona('Cargar productos', 600),
      operacionAsincrona('Cargar configuración', 400)
    ]);
    
    console.log(`   ${usuarios}`);
    console.log(`   ${productos}`);
    console.log(`   ${config}`);
  });

  // 4. Promise.allSettled() - Espera todas, incluso si fallan
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('4️⃣  Promise.allSettled() - Maneja fallos\n');
  
  const promesasConErrores = [
    operacionAsincrona('Tarea exitosa 1', 500),
    Promise.reject(new Error('Esta tarea falló')),
    operacionAsincrona('Tarea exitosa 2', 300),
    Promise.reject(new Error('Esta también falló'))
  ];

  const resultadosSettled = await Promise.allSettled(promesasConErrores);
  
  resultadosSettled.forEach((resultado, index) => {
    if (resultado.status === 'fulfilled') {
      console.log(`   ✅ Promesa ${index + 1}: ${resultado.value}`);
    } else {
      console.log(`   ❌ Promesa ${index + 1}: ${resultado.reason.message}`);
    }
  });

  // 5. Promise.race() - La primera que termine (gana la carrera)
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('5️⃣  Promise.race() - Primera en completar\n');
  
  const ganador = await Promise.race([
    operacionAsincrona('Servidor A', 800),
    operacionAsincrona('Servidor B', 400),
    operacionAsincrona('Servidor C', 600)
  ]);
  
  console.log(`   🏆 Ganador: ${ganador}`);
  console.log('   (Las otras promesas siguen ejecutándose en segundo plano)');

  // 6. Promise.any() - Primera exitosa (ignora rechazos)
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('6️⃣  Promise.any() - Primera exitosa\n');
  
  try {
    const primeraExitosa = await Promise.any([
      Promise.reject(new Error('Falló')),
      operacionAsincrona('Respuesta válida', 500),
      operacionAsincrona('Otra respuesta', 300)
    ]);
    
    console.log(`   🎯 Primera exitosa: ${primeraExitosa}`);
  } catch (error) {
    console.log('   ❌ Todas las promesas fallaron:', error.message);
  }

  // 7. Ejemplo práctico: Leer múltiples archivos en paralelo
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('7️⃣  Ejemplo Práctico: Múltiples operaciones de archivos\n');
  
  const tempDir = path.join(__dirname, 'temp-parallel');
  
  try {
    // Crear directorio temporal
    await fs.mkdir(tempDir, { recursive: true });
    
    // Crear archivos en paralelo
    await medirTiempo('Crear 3 archivos en paralelo', async () => {
      await Promise.all([
        fs.writeFile(path.join(tempDir, 'archivo1.txt'), 'Contenido 1'),
        fs.writeFile(path.join(tempDir, 'archivo2.txt'), 'Contenido 2'),
        fs.writeFile(path.join(tempDir, 'archivo3.txt'), 'Contenido 3')
      ]);
      console.log('   ✅ 3 archivos creados');
    });
    
    // Leer archivos en paralelo
    await medirTiempo('Leer 3 archivos en paralelo', async () => {
      const [contenido1, contenido2, contenido3] = await Promise.all([
        fs.readFile(path.join(tempDir, 'archivo1.txt'), 'utf-8'),
        fs.readFile(path.join(tempDir, 'archivo2.txt'), 'utf-8'),
        fs.readFile(path.join(tempDir, 'archivo3.txt'), 'utf-8')
      ]);
      
      console.log(`   📄 Archivo 1: ${contenido1}`);
      console.log(`   📄 Archivo 2: ${contenido2}`);
      console.log(`   📄 Archivo 3: ${contenido3}`);
    });
    
    // Limpiar en paralelo
    await Promise.all([
      fs.unlink(path.join(tempDir, 'archivo1.txt')),
      fs.unlink(path.join(tempDir, 'archivo2.txt')),
      fs.unlink(path.join(tempDir, 'archivo3.txt'))
    ]);
    
    await fs.rmdir(tempDir);
    console.log('   🧹 Limpieza completada');
    
  } catch (error) {
    console.error('   ❌ Error:', error.message);
  }

  // 8. Control de concurrencia: Limitar tareas paralelas
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('8️⃣  Control de Concurrencia - Limitar tareas paralelas\n');
  
  async function procesarEnLotes(tareas, tamanoLote) {
    const resultados = [];
    
    for (let i = 0; i < tareas.length; i += tamanoLote) {
      const lote = tareas.slice(i, i + tamanoLote);
      console.log(`   📦 Procesando lote ${Math.floor(i / tamanoLote) + 1} (${lote.length} tareas)...`);
      const resultadosLote = await Promise.all(lote.map(tarea => tarea()));
      resultados.push(...resultadosLote);
    }
    
    return resultados;
  }
  
  const muchasTareas = Array.from({ length: 10 }, (_, i) => 
    () => operacionAsincrona(`Tarea ${i + 1}`, 200)
  );
  
  await medirTiempo('Procesamiento en lotes de 3', async () => {
    await procesarEnLotes(muchasTareas, 3);
    console.log('   ✅ 10 tareas completadas en lotes de 3');
  });
}

// Ejecutar ejemplos
ejemplos()
  .then(() => {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✨ RESUMEN DE VENTAJAS:\n');
    console.log('   🚀 Paralelo es MÁS RÁPIDO para operaciones independientes');
    console.log('   ⏱️  Reduce el tiempo total de ejecución');
    console.log('   💪 Mejor uso de recursos (I/O, red, CPU)');
    console.log('   🎯 Promise.all() - Espera todas, falla si una falla');
    console.log('   🛡️  Promise.allSettled() - Espera todas, nunca falla');
    console.log('   🏁 Promise.race() - Primera en terminar (éxito o fallo)');
    console.log('   ✅ Promise.any() - Primera exitosa (ignora fallos)');
    console.log('\n📝 CUÁNDO USAR CADA UNO:\n');
    console.log('   • Secuencial: Cuando una operación depende de la anterior');
    console.log('   • Paralelo: Cuando las operaciones son independientes');
    console.log('   • Promise.all(): Necesitas TODOS los resultados');
    console.log('   • Promise.allSettled(): Quieres resultados aunque fallen algunos');
    console.log('   • Promise.race(): Te sirve con la primera respuesta');
    console.log('   • Promise.any(): Necesitas UNA respuesta exitosa');
  })
  .catch(error => {
    console.error('❌ Error general:', error);
  });
