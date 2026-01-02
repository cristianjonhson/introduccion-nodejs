// Archivo con extensión .mjs - Importa usando import

import { saludar, despedir, calcular } from './utils.mjs';

console.log('=== Ejemplo con extensión .mjs ===');
console.log(saludar('Node.js'));
console.log(despedir('ES Modules'));
console.log('\nOperaciones matemáticas:');
console.log('10 + 5 =', calcular.sumar(10, 5));
console.log('10 - 5 =', calcular.restar(10, 5));
console.log('10 * 5 =', calcular.multiplicar(10, 5));
console.log('10 / 5 =', calcular.dividir(10, 5));
