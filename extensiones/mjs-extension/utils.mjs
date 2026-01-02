// Archivo con extensión .mjs - Fuerza el uso de ES Modules
// Funciona sin necesidad de package.json con "type": "module"

export const saludar = (nombre) => {
  return `¡Hola, ${nombre}!`;
};

export const despedir = (nombre) => {
  return `¡Adiós, ${nombre}!`;
};

export const calcular = {
  sumar: (a, b) => a + b,
  restar: (a, b) => a - b,
  multiplicar: (a, b) => a * b,
  dividir: (a, b) => a / b
};

// Export por defecto
export default {
  saludar,
  despedir,
  calcular
};
