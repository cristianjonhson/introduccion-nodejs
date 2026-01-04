// Listar Directorios (como comando ls) - CommonJS
// Equivalente a comandos: ls, ls -l, ls -a, ls -R

const fs = require('node:fs');
const path = require('node:path');

console.log('=== Listar Directorios (comando ls en Node.js) ===\n');

// 1. Listar archivos básico (ls)
console.log('1️⃣  Listar archivos básico (equivalente a: ls):\n');

const dirActual = process.cwd();
console.log(`   Directorio: ${dirActual}\n`);

try {
  const archivos = fs.readdirSync(dirActual);
  console.log(`   Total: ${archivos.length} elementos\n`);
  
  archivos.forEach(archivo => {
    console.log(`   ${archivo}`);
  });
} catch (error) {
  console.error('   ❌ Error al leer directorio:', error.message);
}

// 2. Listar con información detallada (ls -l)
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('2️⃣  Listar con detalles (equivalente a: ls -l):\n');

function formatearBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

function formatearFecha(fecha) {
  return fecha.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function listarConDetalles(directorio) {
  try {
    const archivos = fs.readdirSync(directorio);
    
    console.log('   Permisos  Tamaño      Modificado              Nombre');
    console.log('   ──────────────────────────────────────────────────────────');
    
    archivos.forEach(archivo => {
      const rutaCompleta = path.join(directorio, archivo);
      const stats = fs.statSync(rutaCompleta);
      
      const tipo = stats.isDirectory() ? 'd' : '-';
      const permisos = `${tipo}rwxr-xr-x`; // Simplificado
      const tamano = stats.isDirectory() ? '<DIR>     ' : formatearBytes(stats.size).padEnd(10);
      const fecha = formatearFecha(stats.mtime);
      const icono = stats.isDirectory() ? '📁' : '📄';
      
      console.log(`   ${permisos} ${tamano} ${fecha}  ${icono} ${archivo}`);
    });
  } catch (error) {
    console.error('   ❌ Error:', error.message);
  }
}

listarConDetalles(dirActual);

// 3. Separar archivos y directorios
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('3️⃣  Separar archivos y directorios:\n');

function clasificarArchivos(directorio) {
  try {
    const elementos = fs.readdirSync(directorio);
    const directorios = [];
    const archivos = [];
    
    elementos.forEach(elemento => {
      const rutaCompleta = path.join(directorio, elemento);
      const stats = fs.statSync(rutaCompleta);
      
      if (stats.isDirectory()) {
        directorios.push(elemento);
      } else {
        archivos.push(elemento);
      }
    });
    
    console.log(`   📁 Directorios (${directorios.length}):`);
    directorios.forEach(dir => console.log(`      • ${dir}`));
    
    console.log(`\n   📄 Archivos (${archivos.length}):`);
    archivos.forEach(archivo => console.log(`      • ${archivo}`));
    
    return { directorios, archivos };
  } catch (error) {
    console.error('   ❌ Error:', error.message);
    return { directorios: [], archivos: [] };
  }
}

clasificarArchivos(dirActual);

// 4. Listar recursivamente (ls -R)
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('4️⃣  Listar recursivamente (equivalente a: ls -R):\n');

function listarRecursivo(directorio, nivel = 0, maxNivel = 2) {
  if (nivel > maxNivel) return;
  
  const indentacion = '  '.repeat(nivel);
  
  try {
    const elementos = fs.readdirSync(directorio);
    
    elementos.forEach(elemento => {
      // Ignorar node_modules y carpetas ocultas
      if (elemento === 'node_modules' || elemento.startsWith('.')) return;
      
      const rutaCompleta = path.join(directorio, elemento);
      
      try {
        const stats = fs.statSync(rutaCompleta);
        
        if (stats.isDirectory()) {
          console.log(`${indentacion}📁 ${elemento}/`);
          listarRecursivo(rutaCompleta, nivel + 1, maxNivel);
        } else {
          const extension = path.extname(elemento);
          const icono = extension === '.js' ? '📜' : 
                       extension === '.json' ? '📋' : 
                       extension === '.md' ? '📝' : '📄';
          console.log(`${indentacion}${icono} ${elemento}`);
        }
      } catch (err) {
        // Ignorar errores de permisos
      }
    });
  } catch (error) {
    console.error(`${indentacion}❌ Error en ${directorio}:`, error.message);
  }
}

console.log(`   ${dirActual}/`);
listarRecursivo(dirActual, 1, 2);

// 5. Filtrar por extensión
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('5️⃣  Filtrar por extensión:\n');

function listarPorExtension(directorio, extension) {
  try {
    const archivos = fs.readdirSync(directorio);
    const filtrados = archivos.filter(archivo => {
      const rutaCompleta = path.join(directorio, archivo);
      const stats = fs.statSync(rutaCompleta);
      return !stats.isDirectory() && path.extname(archivo) === extension;
    });
    
    console.log(`   Archivos ${extension} encontrados: ${filtrados.length}\n`);
    filtrados.forEach(archivo => console.log(`   📜 ${archivo}`));
    
    return filtrados;
  } catch (error) {
    console.error('   ❌ Error:', error.message);
    return [];
  }
}

listarPorExtension(dirActual, '.js');

// 6. Ordenar por tamaño
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('6️⃣  Ordenar por tamaño (más grande primero):\n');

function listarPorTamano(directorio, limite = 10) {
  try {
    const archivos = fs.readdirSync(directorio);
    const archivosConTamano = [];
    
    archivos.forEach(archivo => {
      const rutaCompleta = path.join(directorio, archivo);
      try {
        const stats = fs.statSync(rutaCompleta);
        if (!stats.isDirectory()) {
          archivosConTamano.push({
            nombre: archivo,
            tamano: stats.size
          });
        }
      } catch (err) {
        // Ignorar errores
      }
    });
    
    // Ordenar por tamaño descendente
    archivosConTamano.sort((a, b) => b.tamano - a.tamano);
    
    console.log(`   Top ${Math.min(limite, archivosConTamano.length)} archivos más grandes:\n`);
    archivosConTamano.slice(0, limite).forEach((archivo, index) => {
      console.log(`   ${index + 1}. ${formatearBytes(archivo.tamano).padEnd(12)} ${archivo.nombre}`);
    });
  } catch (error) {
    console.error('   ❌ Error:', error.message);
  }
}

listarPorTamano(dirActual, 10);

// 7. Ordenar por fecha de modificación
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('7️⃣  Ordenar por fecha de modificación (más reciente primero):\n');

function listarPorFecha(directorio, limite = 5) {
  try {
    const archivos = fs.readdirSync(directorio);
    const archivosConFecha = [];
    
    archivos.forEach(archivo => {
      const rutaCompleta = path.join(directorio, archivo);
      try {
        const stats = fs.statSync(rutaCompleta);
        archivosConFecha.push({
          nombre: archivo,
          fecha: stats.mtime,
          tipo: stats.isDirectory() ? 'DIR' : 'FILE'
        });
      } catch (err) {
        // Ignorar errores
      }
    });
    
    // Ordenar por fecha descendente
    archivosConFecha.sort((a, b) => b.fecha - a.fecha);
    
    console.log(`   Últimos ${Math.min(limite, archivosConFecha.length)} elementos modificados:\n`);
    archivosConFecha.slice(0, limite).forEach((archivo, index) => {
      const icono = archivo.tipo === 'DIR' ? '📁' : '📄';
      const fecha = formatearFecha(archivo.fecha);
      console.log(`   ${index + 1}. ${fecha}  ${icono} ${archivo.nombre}`);
    });
  } catch (error) {
    console.error('   ❌ Error:', error.message);
  }
}

listarPorFecha(dirActual, 5);

// 8. Incluir archivos ocultos (ls -a)
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('8️⃣  Incluir archivos ocultos (equivalente a: ls -a):\n');

function listarTodo(directorio) {
  try {
    const archivos = fs.readdirSync(directorio);
    const ocultos = archivos.filter(a => a.startsWith('.'));
    const visibles = archivos.filter(a => !a.startsWith('.'));
    
    console.log(`   Archivos visibles: ${visibles.length}`);
    console.log(`   Archivos ocultos: ${ocultos.length}\n`);
    
    if (ocultos.length > 0) {
      console.log('   Archivos ocultos:');
      ocultos.forEach(archivo => console.log(`   🔒 ${archivo}`));
    }
  } catch (error) {
    console.error('   ❌ Error:', error.message);
  }
}

listarTodo(dirActual);

// 9. Buscar archivos por patrón
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('9️⃣  Buscar archivos por patrón (ejemplo: *example*):\n');

function buscarPorPatron(directorio, patron) {
  try {
    const archivos = fs.readdirSync(directorio);
    const encontrados = archivos.filter(archivo => 
      archivo.toLowerCase().includes(patron.toLowerCase())
    );
    
    console.log(`   Archivos que contienen "${patron}": ${encontrados.length}\n`);
    encontrados.forEach(archivo => {
      const rutaCompleta = path.join(directorio, archivo);
      const stats = fs.statSync(rutaCompleta);
      const icono = stats.isDirectory() ? '📁' : '📄';
      console.log(`   ${icono} ${archivo}`);
    });
  } catch (error) {
    console.error('   ❌ Error:', error.message);
  }
}

buscarPorPatron(dirActual, 'example');

// 10. Estadísticas del directorio
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔟 Estadísticas del directorio:\n');

function obtenerEstadisticas(directorio) {
  try {
    const archivos = fs.readdirSync(directorio);
    let totalArchivos = 0;
    let totalDirectorios = 0;
    let tamanoTotal = 0;
    const extensiones = {};
    
    archivos.forEach(archivo => {
      const rutaCompleta = path.join(directorio, archivo);
      try {
        const stats = fs.statSync(rutaCompleta);
        
        if (stats.isDirectory()) {
          totalDirectorios++;
        } else {
          totalArchivos++;
          tamanoTotal += stats.size;
          
          const ext = path.extname(archivo) || '(sin extensión)';
          extensiones[ext] = (extensiones[ext] || 0) + 1;
        }
      } catch (err) {
        // Ignorar errores
      }
    });
    
    console.log(`   📊 Estadísticas:`);
    console.log(`   • Total de elementos: ${archivos.length}`);
    console.log(`   • Directorios: ${totalDirectorios}`);
    console.log(`   • Archivos: ${totalArchivos}`);
    console.log(`   • Tamaño total: ${formatearBytes(tamanoTotal)}\n`);
    
    console.log('   📈 Archivos por extensión:');
    Object.entries(extensiones)
      .sort((a, b) => b[1] - a[1])
      .forEach(([ext, count]) => {
        console.log(`      ${ext}: ${count}`);
      });
  } catch (error) {
    console.error('   ❌ Error:', error.message);
  }
}

obtenerEstadisticas(dirActual);

// Resumen
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✨ RESUMEN DE COMANDOS:\n');
console.log('   Comando Unix/Linux → Equivalente Node.js');
console.log('   ────────────────────────────────────────');
console.log('   ls                → fs.readdirSync()');
console.log('   ls -l             → readdirSync() + statSync()');
console.log('   ls -a             → readdirSync() (incluye ocultos)');
console.log('   ls -R             → readdirSync() recursivo');
console.log('   ls *.js           → readdirSync() + filter()');
console.log('   ls -lS            → readdirSync() + sort por tamaño');
console.log('   ls -lt            → readdirSync() + sort por fecha');

console.log('\n📝 MÉTODOS PRINCIPALES:\n');
console.log('   • fs.readdirSync(dir) - Síncrono, retorna array de nombres');
console.log('   • fs.readdir(dir, cb) - Asíncrono con callback');
console.log('   • fs.promises.readdir(dir) - Asíncrono con promesas');
console.log('   • fs.statSync(path) - Información del archivo/directorio');
console.log('   • fs.readdirSync(dir, { withFileTypes: true }) - Retorna Dirent objects');
