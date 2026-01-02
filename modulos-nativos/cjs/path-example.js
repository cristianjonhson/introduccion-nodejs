// Ejemplo de módulo nativo: Path con CommonJS

const path = require('path');

console.log('=== Módulo path - CommonJS ===\n');

// 1. Información de rutas
const rutaCompleta = '/Users/usuario/proyectos/nodejs/app.js';

console.log('📁 Análisis de ruta:', rutaCompleta);
console.log('   - Directorio base:', path.dirname(rutaCompleta));
console.log('   - Nombre del archivo:', path.basename(rutaCompleta));
console.log('   - Extensión:', path.extname(rutaCompleta));
console.log('   - Nombre sin extensión:', path.basename(rutaCompleta, '.js'));

// 2. Construir rutas
console.log('\n🔨 Construir rutas:');
const nuevaRuta = path.join('proyectos', 'nodejs', 'src', 'index.js');
console.log('   - path.join():', nuevaRuta);

// 3. Resolver rutas absolutas
console.log('\n🎯 Rutas absolutas:');
console.log('   - __dirname:', __dirname);
console.log('   - __filename:', __filename);
console.log('   - path.resolve():', path.resolve('modulos-nativos', 'ejemplo.js'));

// 4. Normalizar rutas
console.log('\n🧹 Normalizar rutas:');
const rutaDesordenada = '/usuarios//nodejs/./src/../lib/utils.js';
console.log('   - Original:', rutaDesordenada);
console.log('   - Normalizada:', path.normalize(rutaDesordenada));

// 5. Rutas relativas
console.log('\n🔗 Rutas relativas:');
const desde = '/usuarios/proyecto/src';
const hasta = '/usuarios/proyecto/lib/utils.js';
console.log('   - Desde:', desde);
console.log('   - Hasta:', hasta);
console.log('   - Relativa:', path.relative(desde, hasta));

// 6. Separadores de ruta
console.log('\n📋 Información del sistema:');
console.log('   - Separador:', path.sep);
console.log('   - Delimitador:', path.delimiter);
console.log('   - Formato:', process.platform);
