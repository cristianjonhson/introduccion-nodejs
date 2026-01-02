// Ejemplo de módulo CommonJS (CJS)

function suma(a, b) {
  return a + b;
}

function resta(a, b) {
  return a - b;
}

function multiplica(a, b) {
  return a * b;
}

// Exportar usando module.exports
module.exports = {
  suma,
  resta,
  multiplica
};
