// IIFE - Immediately Invoked Function Expression (CommonJS)
// Funciones que se ejecutan inmediatamente al ser definidas

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
// console.log(count); // ❌ Error: count no está definido (es privado)

// 5. IIFE asíncrona
console.log('\n5️⃣  IIFE asíncrona:\n');

(async function() {
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

// 7. Módulo Pattern con IIFE
console.log('\n7️⃣  Module Pattern con IIFE:\n');

const miModulo = (function() {
  // Variables y funciones privadas
  let variablePrivada = 'Secreto';
  
  function funcionPrivada() {
    return 'Función privada';
  }
  
  // API pública
  return {
    funcionPublica: function() {
      return `   Acceso público: ${variablePrivada}`;
    },
    setVariable: function(valor) {
      variablePrivada = valor;
    }
  };
})();

console.log(miModulo.funcionPublica());
miModulo.setVariable('Nuevo valor');
console.log(miModulo.funcionPublica());

// 8. IIFE para inicialización
console.log('\n8️⃣  IIFE para inicialización de configuración:\n');

const config = (function() {
  const env = process.env.NODE_ENV || 'development';
  
  const configs = {
    development: {
      api: 'http://localhost:3000',
      debug: true
    },
    production: {
      api: 'https://api.produccion.com',
      debug: false
    }
  };
  
  return configs[env];
})();

console.log('   Configuración cargada:', config);

console.log('\n✨ VENTAJAS de las IIFE:');
console.log('   • Crean un scope privado (evitan contaminar el scope global)');
console.log('   • Se ejecutan inmediatamente');
console.log('   • Útiles para inicialización');
console.log('   • Permiten el patrón módulo');
console.log('   • Evitan conflictos de nombres de variables');

console.log('\n📝 SINTAXIS:');
console.log('   (function() { /* código */ })();');
console.log('   (function() { /* código */ }());');
console.log('   (() => { /* código */ })();');
