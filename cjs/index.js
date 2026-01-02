// Importar usando require() - CommonJS
const { suma, resta, multiplica } = require('./math');

console.log('=== Ejemplo CommonJS (CJS) ===');
console.log('Suma: 5 + 3 =', suma(5, 3));
console.log('Resta: 5 - 3 =', resta(5, 3));
console.log('Multiplicación: 5 * 3 =', multiplica(5, 3));
