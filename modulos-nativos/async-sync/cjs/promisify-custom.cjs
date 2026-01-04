// Ejemplo avanzado: Crear tu propia función promisify - CommonJS

const util = require('node:util');
const fs = require('node:fs');

console.log('=== Funciones Personalizadas con util.promisify - CommonJS ===\n');

// 1. Función personalizada con callback (patrón error-first)
function saludarConRetraso(nombre, delay, callback) {
  setTimeout(() => {
    if (!nombre) {
      callback(new Error('Nombre es requerido'));
    } else {
      callback(null, `¡Hola, ${nombre}!`);
    }
  }, delay);
}

// 2. Convertir a promesa
const saludarConRetrasoPromise = util.promisify(saludarConRetraso);

// 3. Función personalizada más compleja
function operacionMatematica(a, b, operacion, callback) {
  setTimeout(() => {
    try {
      let resultado;
      switch (operacion) {
        case 'suma':
          resultado = a + b;
          break;
        case 'resta':
          resultado = a - b;
          break;
        case 'multiplicacion':
          resultado = a * b;
          break;
        case 'division':
          if (b === 0) throw new Error('División por cero');
          resultado = a / b;
          break;
        default:
          throw new Error('Operación no válida');
      }
      callback(null, resultado);
    } catch (error) {
      callback(error);
    }
  }, 100);
}

// 4. Convertir a promesa
const operacionMatematicaPromise = util.promisify(operacionMatematica);

// Función principal
async function ejemploAvanzado() {
  try {
    console.log('1️⃣  Ejemplo de función personalizada promisificada:\n');

    // Usar saludar con promesa
    console.log('   Llamando a saludarConRetraso...');
    const saludo = await saludarConRetrasoPromise('Node.js', 1000);
    console.log('   ✅', saludo);

    // Usar operaciones matemáticas
    console.log('\n2️⃣  Operaciones matemáticas promisificadas:\n');
    
    const suma = await operacionMatematicaPromise(10, 5, 'suma');
    console.log('   10 + 5 =', suma);

    const resta = await operacionMatematicaPromise(10, 5, 'resta');
    console.log('   10 - 5 =', resta);

    const mult = await operacionMatematicaPromise(10, 5, 'multiplicacion');
    console.log('   10 * 5 =', mult);

    const div = await operacionMatematicaPromise(10, 5, 'division');
    console.log('   10 / 5 =', div);

    // Ejemplo de error
    console.log('\n3️⃣  Probando manejo de errores:\n');
    try {
      await operacionMatematicaPromise(10, 0, 'division');
    } catch (error) {
      console.log('   ⚠️  Error capturado:', error.message);
    }

    // 5. Promisify múltiples funciones de fs
    console.log('\n4️⃣  Promisificando múltiples funciones de fs:\n');
    
    const fsPromises = {
      readFile: util.promisify(fs.readFile),
      writeFile: util.promisify(fs.writeFile),
      readdir: util.promisify(fs.readdir),
      stat: util.promisify(fs.stat),
      mkdir: util.promisify(fs.mkdir),
      unlink: util.promisify(fs.unlink),
      rmdir: util.promisify(fs.rmdir)
    };

    console.log('   ✅ Funciones promisificadas:', Object.keys(fsPromises).join(', '));

    // Usar las funciones promisificadas
    await fsPromises.mkdir('./temp-custom', { recursive: true });
    await fsPromises.writeFile('./temp-custom/test.txt', 'Archivo de prueba');
    const contenido = await fsPromises.readFile('./temp-custom/test.txt', 'utf-8');
    console.log('   📖 Contenido leído:', contenido);
    
    await fsPromises.unlink('./temp-custom/test.txt');
    await fsPromises.rmdir('./temp-custom');
    console.log('   🧹 Limpieza completada');

    console.log('\n✨ CONCLUSIÓN:');
    console.log('   • util.promisify funciona con cualquier función error-first callback');
    console.log('   • Puedes promisificar tus propias funciones');
    console.log('   • Ideal para trabajar con APIs antiguas');
    console.log('   • Facilita la migración de código legacy a async/await');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

console.log('▶️  Ejecutando ejemplos avanzados...\n');
ejemploAvanzado();
