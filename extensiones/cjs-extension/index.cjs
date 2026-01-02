// Archivo con extensión .cjs - Importa usando require()

const { saludar, despedir, calcular } = require('./utils.cjs');

console.log('=== Ejemplo con extensión .cjs ===');
console.log(saludar('Node.js'));
console.log(despedir('CommonJS'));
console.log('\nOperaciones matemáticas:');
console.log('10 + 5 =', calcular.sumar(10, 5));
console.log('10 - 5 =', calcular.restar(10, 5));
console.log('10 * 5 =', calcular.multiplicar(10, 5));
console.log('10 / 5 =', calcular.dividir(10, 5));
