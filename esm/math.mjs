// Ejemplo de módulo ES Modules (ESM)

export function suma(a, b) {
  return a + b;
}

export function resta(a, b) {
  return a - b;
}

export function multiplica(a, b) {
  return a * b;
}

// También puedes exportar por defecto
export default {
  suma,
  resta,
  multiplica
};
