// Ejemplo de módulo nativo: Uptime con CommonJS

const os = require('os');

console.log('=== Sistema Uptime - CommonJS ===\n');

// Obtener uptime en segundos
const uptimeSeconds = os.uptime();

// Calcular días, horas, minutos y segundos
const days = Math.floor(uptimeSeconds / 86400);
const hours = Math.floor((uptimeSeconds % 86400) / 3600);
const minutes = Math.floor((uptimeSeconds % 3600) / 60);
const seconds = Math.floor(uptimeSeconds % 60);

console.log('⏱️  Tiempo de actividad del sistema:');
console.log('   - Total en segundos:', uptimeSeconds.toFixed(0));
console.log('   - Formato legible:', `${days}d ${hours}h ${minutes}m ${seconds}s`);

// Formato compacto
if (days > 0) {
  console.log('   - Formato compacto:', `${days}d ${hours}h ${minutes}m`);
} else {
  console.log('   - Formato compacto:', `${hours}h ${minutes}m`);
}

// Calcular desde cuándo está activo
const startTime = new Date(Date.now() - uptimeSeconds * 1000);
console.log('\n📅 El sistema se inició:');
console.log('   - Fecha:', startTime.toLocaleDateString('es-ES'));
console.log('   - Hora:', startTime.toLocaleTimeString('es-ES'));
console.log('   - Completo:', startTime.toString());

// Uptime del proceso Node.js
const processUptime = process.uptime();
const procMinutes = Math.floor(processUptime / 60);
const procSeconds = Math.floor(processUptime % 60);

console.log('\n🟢 Tiempo de ejecución del proceso Node.js:');
console.log('   - Total en segundos:', processUptime.toFixed(2));
console.log('   - Formato legible:', `${procMinutes}m ${procSeconds}s`);

// Comparación
const percentOfSystemUptime = (processUptime / uptimeSeconds * 100).toFixed(4);
console.log('\n📊 Comparación:');
console.log('   - Este proceso lleva el', percentOfSystemUptime, '% del uptime del sistema');

// Información adicional
console.log('\n💻 Información adicional:');
console.log('   - Plataforma:', os.platform());
console.log('   - Hostname:', os.hostname());
console.log('   - Arquitectura:', os.arch());
