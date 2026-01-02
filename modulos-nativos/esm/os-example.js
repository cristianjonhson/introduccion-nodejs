// Ejemplo de módulo nativo: OS (Operating System) con ES Modules

import os from 'os';

console.log('=== Módulo os (Operating System) - ES Modules ===\n');

// 1. Información del sistema
console.log('💻 Información del Sistema:');
console.log('   - Plataforma:', os.platform());
console.log('   - Arquitectura:', os.arch());
console.log('   - Tipo:', os.type());
console.log('   - Release:', os.release());
console.log('   - Versión:', os.version());

// 2. Información de red
console.log('\n🌐 Información de Red:');
console.log('   - Hostname:', os.hostname());
const interfaces = os.networkInterfaces();
console.log('   - Interfaces de red:', Object.keys(interfaces).join(', '));

// 3. Información de CPU
console.log('\n🔧 Información de CPU:');
const cpus = os.cpus();
console.log('   - Modelo:', cpus[0].model);
console.log('   - Núcleos:', cpus.length);
console.log('   - Velocidad:', cpus[0].speed, 'MHz');

// 4. Información de memoria
console.log('\n💾 Información de Memoria:');
const totalMem = os.totalmem();
const freeMem = os.freemem();
const usedMem = totalMem - freeMem;

console.log('   - Total:', (totalMem / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('   - Libre:', (freeMem / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('   - Usada:', (usedMem / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('   - % Uso:', ((usedMem / totalMem) * 100).toFixed(2), '%');

// 5. Información de usuario
console.log('\n👤 Información de Usuario:');
const userInfo = os.userInfo();
console.log('   - Usuario:', userInfo.username);
console.log('   - Home:', userInfo.homedir);
console.log('   - Shell:', userInfo.shell);

// 6. Información de sistema
console.log('\n⏱️  Información de Tiempo:');
const uptime = os.uptime();
const hours = Math.floor(uptime / 3600);
const minutes = Math.floor((uptime % 3600) / 60);
console.log('   - Uptime:', `${hours}h ${minutes}m`);
console.log('   - Directorio temp:', os.tmpdir());

// 7. EOL (End Of Line)
console.log('\n📝 Otros:');
console.log('   - EOL (fin de línea):', JSON.stringify(os.EOL));
console.log('   - Prioridad del proceso:', os.getPriority());
