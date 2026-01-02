// Archivo con extensión .cjs - Fuerza el uso de CommonJS
// Útil cuando tu package.json tiene "type": "module"

const saludar = (nombre) => {
  return `¡Hola, ${nombre}!`;
};

const despedir = (nombre) => {
  return `¡Adiós, ${nombre}!`;
};

const calcular = {
  sumar: (a, b) => a + b,
  restar: (a, b) => a - b,
  multiplicar: (a, b) => a * b,
  dividir: (a, b) => a / b
};

// Exportar usando CommonJS
module.exports = {
  saludar,
  despedir,
  calcular
};
