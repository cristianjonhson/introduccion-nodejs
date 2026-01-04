// IIFE - Immediately Invoked Function Expression (ES Modules)

console.log('=== IIFE - Immediately Invoked Function Expression ===\n');

// 1. IIFE Básica
console.log('1️⃣  IIFE Básica:\n');

(function() {
  console.log('   ¡Esta función se ejecuta inmediatamente!');
})();

// 2. IIFE con parámetros
console.log('\n2️⃣  IIFE con parámetros:\n');

(function(nombre, edad) {
  console.log(`   Hola, soy ${nombre} y tengo ${edad} años`);
})('Node.js', 16);

// 3. IIFE que retorna un valor
console.log('\n3️⃣  IIFE que retorna un valor:\n');

const resultado = (function(a, b) {
  return a + b;
})(10, 5);

console.log('   Resultado de la suma:', resultado);

// 4. IIFE para crear scope privado
console.log('\n4️⃣  IIFE para crear scope privado:\n');

const contador = (function() {
  let count = 0; // Variable privada
  
  return {
    incrementar: function() {
      count++;
      return count;
    },
    decrementar: function() {
      count--;
      return count;
    },
    obtenerValor: function() {
      return count;
    }
  };
})();

console.log('   Contador inicial:', contador.obtenerValor());
console.log('   Incrementar:', contador.incrementar());
console.log('   Incrementar:', contador.incrementar());
console.log('   Decrementar:', contador.decrementar());
console.log('   Valor actual:', contador.obtenerValor());

// 5. IIFE asíncrona con Top-level await
console.log('\n5️⃣  IIFE asíncrona (Top-level await en ES Modules):\n');

await (async function() {
  console.log('   Iniciando operación asíncrona...');
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('   ✅ Operación completada después de 1 segundo');
})();

// 6. IIFE con arrow functions
console.log('\n6️⃣  IIFE con arrow functions:\n');

(() => {
  const mensaje = '   Arrow function IIFE ejecutada';
  console.log(mensaje);
})();

// 7. IIFE asíncrona con arrow function
console.log('\n7️⃣  IIFE asíncrona con arrow function:\n');

await (async () => {
  console.log('   Procesando datos...');
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log('   ✅ Datos procesados');
})();

// 8. Combinación de IIFE con import dinámico
console.log('\n8️⃣  IIFE con import dinámico:\n');

const utilidades = await (async () => {
  // Simulación de carga condicional
  const esDevelopment = true;
  
  if (esDevelopment) {
    return {
      log: (msg) => console.log(`   [DEV] ${msg}`),
      debug: true
    };
  } else {
    return {
      log: (msg) => console.log(msg),
      debug: false
    };
  }
})();

utilidades.log('Sistema inicializado');
console.log('   Modo debug:', utilidades.debug);

console.log('\n✨ VENTAJAS de las IIFE en ES Modules:');
console.log('   • Crean un scope privado');
console.log('   • Se ejecutan inmediatamente');
console.log('   • Pueden usar await directamente (Top-level await)');
console.log('   • Útiles para inicialización asíncrona');
console.log('   • Evitan contaminar el scope del módulo');

console.log('\n💡 NOTA sobre ES Modules:');
console.log('   • Los módulos ya tienen scope aislado por defecto');
console.log('   • IIFE son menos necesarias que en código global');
console.log('   • Útiles principalmente para lógica de inicialización');
