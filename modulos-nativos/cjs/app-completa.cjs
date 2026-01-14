// Aplicación Completa - Integración de TODOS los módulos nativos - CommonJS
// Dashboard de Monitoreo del Sistema

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const process = require('node:process');
const { execSync } = require('node:child_process');

console.log('=== 🚀 Sistema de Monitoreo Integral - CommonJS ===\n');

// Configuración
const PORT = 3000;
const HOST = 'localhost';
const LOG_DIR = path.join(__dirname, 'logs');
const LOG_FILE = path.join(LOG_DIR, 'access.log');

// 1. Usar FS y PATH: Crear directorio de logs si no existe
function inicializarLogs() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
    console.log('📁 Directorio de logs creado:', LOG_DIR);
  }
}

// 2. Función de logging usando FS
function registrarAcceso(method, url, ip) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${method} ${url} - IP: ${ip}\n`;
  
  fs.appendFile(LOG_FILE, logEntry, (err) => {
    if (err) console.error('❌ Error al escribir log:', err.message);
  });
}

// 3. Leer logs usando FS
function obtenerUltimosLogs(limite = 10) {
  try {
    if (!fs.existsSync(LOG_FILE)) return [];
    
    const contenido = fs.readFileSync(LOG_FILE, 'utf-8');
    const lineas = contenido.trim().split('\n');
    return lineas.slice(-limite);
  } catch (error) {
    console.error('❌ Error al leer logs:', error.message);
    return [];
  }
}

// 4. Obtener procesos con mayor consumo de memoria
function obtenerTopProcesosMemoria() {
  try {
    let comando;
    const plataforma = os.platform();
    
    if (plataforma === 'darwin') {
      // macOS: usar ps sin --sort (BSD version)
      comando = "ps aux | sort -nrk 4 | head -n 5";
    } else if (plataforma === 'linux') {
      // Linux: usar ps con --sort
      comando = "ps aux --sort=-%mem | head -n 6 | tail -n 5";
    } else if (plataforma === 'win32') {
      // Windows: usar tasklist ordenado por memoria
      comando = 'powershell "Get-Process | Sort-Object WS -Descending | Select-Object -First 5 Name,WS,Path | Format-Table -AutoSize"';
    } else {
      return [];
    }
    
    const output = execSync(comando, { encoding: 'utf-8', timeout: 2000 });
    const lineas = output.trim().split('\n').filter(l => l.trim());
    const procesos = [];
    
    if (plataforma === 'win32') {
      // Parsear salida de Windows
      for (let i = 2; i < lineas.length && i < 7; i++) {
        const partes = lineas[i].trim().split(/\s+/);
        if (partes.length >= 2) {
          const nombre = partes[0];
          const rutaCompleta = partes.slice(2).join(' ');
          const extension = path.extname(nombre);
          const memoria = (parseInt(partes[1]) / 1024 / 1024).toFixed(2);
          const aplicacion = detectarAplicacion(nombre, rutaCompleta);
          procesos.push({ 
            nombre, 
            extension: extension || 'N/A',
            aplicacion,
            memoria: memoria + ' MB' 
          });
        }
      }
    } else {
      // Parsear salida de macOS/Linux (ps aux)
      lineas.forEach(linea => {
        const partes = linea.trim().split(/\s+/);
        if (partes.length >= 11) {
          const rutaCompleta = partes[10]; // Ruta completa del proceso
          const nombre = rutaCompleta.split('/').pop(); // Nombre del proceso
          const memPorcentaje = partes[3]; // %MEM
          const rss = parseInt(partes[5]); // RSS en KB
          const memoriaMB = (rss / 1024).toFixed(2);
          
          // Detectar extensión o tipo de proceso
          let extension = path.extname(nombre);
          if (!extension) {
            // En macOS, detectar si es parte de una app
            if (rutaCompleta.includes('.app/')) {
              extension = '.app';
            } else if (rutaCompleta.includes('/bin/') || rutaCompleta.includes('/sbin/')) {
              extension = 'binario';
            } else {
              extension = 'proceso';
            }
          }
          
          const aplicacion = detectarAplicacion(nombre, rutaCompleta);
          
          procesos.push({ 
            nombre, 
            extension,
            aplicacion,
            memoria: memoriaMB + ' MB', 
            porcentaje: memPorcentaje + '%' 
          });
        }
      });
    }
    
    return procesos.slice(0, 5);
  } catch (error) {
    return [];
  }
}

// Función auxiliar para detectar a qué aplicación corresponde un proceso
function detectarAplicacion(nombreProceso, rutaCompleta) {
  const nombre = nombreProceso.toLowerCase();
  const ruta = rutaCompleta.toLowerCase();
  
  // Detección prioritaria por contexto de ruta y nombre
  
  // Firefox y sus procesos relacionados
  if (nombre.includes('plugin-container') || nombre.includes('plugincontainer')) {
    return 'Firefox Plugin Container';
  }
  if (nombre.includes('firefox') || ruta.includes('firefox')) {
    return 'Mozilla Firefox';
  }
  
  // Visual Studio Code y sus procesos
  if (nombre === 'visual' || nombre.startsWith('visual ') || 
      ruta.includes('visual studio code') || ruta.includes('vscode') ||
      ruta.includes('code.app') || ruta.includes('electron')) {
    return 'Visual Studio Code';
  }
  
  // Chrome y sus procesos
  if (nombre.includes('chrome helper') || nombre.includes('chromehelper')) {
    return 'Chrome Helper';
  }
  
  // Mapa de procesos comunes a aplicaciones
  const mapeoAplicaciones = {
    // Navegadores
    'chrome': 'Google Chrome',
    'chromium': 'Chromium',
    'safari': 'Safari',
    'edge': 'Microsoft Edge',
    'opera': 'Opera',
    'brave': 'Brave Browser',
    
    // Editores/IDEs
    'code': 'Visual Studio Code',
    'vscode': 'Visual Studio Code',
    'sublime': 'Sublime Text',
    'atom': 'Atom Editor',
    'vim': 'Vim',
    'emacs': 'Emacs',
    'intellij': 'IntelliJ IDEA',
    'pycharm': 'PyCharm',
    'webstorm': 'WebStorm',
    
    // Desarrollo
    'node': 'Node.js',
    'python': 'Python',
    'java': 'Java',
    'docker': 'Docker',
    'postgres': 'PostgreSQL',
    'mysql': 'MySQL',
    'redis': 'Redis',
    'nginx': 'Nginx',
    'apache': 'Apache',
    
    // Comunicación
    'slack': 'Slack',
    'discord': 'Discord',
    'teams': 'Microsoft Teams',
    'zoom': 'Zoom',
    'skype': 'Skype',
    
    // Sistema
    'finder': 'Finder',
    'explorer': 'Windows Explorer',
    'windowserver': 'Window Server (macOS)',
    'kernel_task': 'Kernel (macOS)',
    'systemd': 'Systemd (Linux)',
    'svchost': 'Windows Service Host',
    'dwm': 'Desktop Window Manager',
    
    // Otros
    'spotify': 'Spotify',
    'itunes': 'iTunes',
    'terminal': 'Terminal',
    'iterm': 'iTerm2',
    'wsl': 'Windows Subsystem for Linux'
  };
  
  // Buscar coincidencias en el nombre del proceso
  for (const [clave, valor] of Object.entries(mapeoAplicaciones)) {
    if (nombre.includes(clave)) {
      return valor;
    }
  }
  
  // Si la ruta contiene información útil (macOS)
  if (ruta.includes('applications/')) {
    // Extraer nombre de aplicación en macOS
    const match = ruta.match(/applications\/([^/]+)\.app/);
    if (match) {
      const appName = match[1].replace(/-/g, ' ');
      return appName.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  }
  
  // Si no se encuentra, devolver el nombre del proceso capitalizado
  return nombreProceso.charAt(0).toUpperCase() + nombreProceso.slice(1);
}

// Función para obtener versión detallada del SO
function obtenerVersionSO() {
  try {
    const plataforma = os.platform();
    
    if (plataforma === 'darwin') {
      // macOS: obtener versión de ProductVersion
      const version = execSync('sw_vers -productVersion', { encoding: 'utf-8' }).trim();
      const nombre = execSync('sw_vers -productName', { encoding: 'utf-8' }).trim();
      const build = execSync('sw_vers -buildVersion', { encoding: 'utf-8' }).trim();
      return `${nombre} ${version} (Build ${build})`;
    } else if (plataforma === 'linux') {
      // Linux: intentar leer /etc/os-release
      try {
        const osRelease = execSync('cat /etc/os-release | grep PRETTY_NAME', { encoding: 'utf-8' });
        const match = osRelease.match(/PRETTY_NAME="(.+)"/);
        if (match) return match[1];
      } catch (e) {
        return `Linux ${os.release()}`;
      }
    } else if (plataforma === 'win32') {
      // Windows: obtener versión con wmic
      const version = execSync('wmic os get Caption,Version /value', { encoding: 'utf-8' });
      const captionMatch = version.match(/Caption=(.+)/);
      const versionMatch = version.match(/Version=(.+)/);
      if (captionMatch && versionMatch) {
        return `${captionMatch[1].trim()} (${versionMatch[1].trim()})`;
      }
    }
    
    return `${os.type()} ${os.release()}`;
  } catch (error) {
    return `${os.type()} ${os.release()}`;
  }
}

// 5. Obtener información del sistema usando OS
function obtenerInfoSistema() {
  const cpus = os.cpus();
  const totalMemoria = os.totalmem();
  const memoriaLibre = os.freemem();
  const memoriaUsada = totalMemoria - memoriaLibre;
  const topProcesos = obtenerTopProcesosMemoria();
  const loadAvg = os.loadavg();
  
  // Calcular velocidades min/max y promedio
  const velocidades = cpus.map(cpu => cpu.speed);
  const velocidadMin = Math.min(...velocidades);
  const velocidadMax = Math.max(...velocidades);
  const velocidadPromedio = Math.round(velocidades.reduce((a, b) => a + b, 0) / velocidades.length);
  
  // Calcular uso de CPU por núcleo
  const nucleosDetalle = cpus.map((cpu, idx) => {
    const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
    const idle = cpu.times.idle;
    const uso = total > 0 ? (((total - idle) / total) * 100).toFixed(1) : '0.0';
    return {
      nucleo: idx,
      velocidad: cpu.speed,
      uso: uso + '%'
    };
  });
  
  return {
    plataforma: os.platform(),
    arquitectura: os.arch(),
    hostname: os.hostname(),
    sistemaOperativo: obtenerVersionSO(),
    kernel: os.release(),
    uptime: Math.floor(os.uptime()),
    cpu: {
      modelo: cpus[0].model,
      nucleos: cpus.length,
      velocidad: velocidadPromedio,
      velocidadMin: velocidadMin,
      velocidadMax: velocidadMax,
      loadAverage: {
        '1min': loadAvg[0].toFixed(2),
        '5min': loadAvg[1].toFixed(2),
        '15min': loadAvg[2].toFixed(2)
      },
      nucleosDetalle: nucleosDetalle
    },
    memoria: {
      total: (totalMemoria / 1024 / 1024 / 1024).toFixed(2) + ' GB',
      usada: (memoriaUsada / 1024 / 1024 / 1024).toFixed(2) + ' GB',
      libre: (memoriaLibre / 1024 / 1024 / 1024).toFixed(2) + ' GB',
      porcentajeUso: ((memoriaUsada / totalMemoria) * 100).toFixed(1) + '%',
      topProcesos: topProcesos
    }
  };
}

// Función para obtener información del disco
function obtenerInfoDisco() {
  try {
    const plataforma = os.platform();
    let discos = [];
    
    if (plataforma === 'darwin' || plataforma === 'linux') {
      // macOS y Linux: usar df
      const output = execSync('df -h /', { encoding: 'utf-8' });
      const lineas = output.trim().split('\n');
      
      if (lineas.length > 1) {
        const partes = lineas[1].trim().split(/\s+/);
        if (partes.length >= 5) {
          discos.push({
            dispositivo: partes[0],
            tamano: partes[1],
            usado: partes[2],
            disponible: partes[3],
            porcentajeUso: partes[4],
            montaje: partes[5] || '/'
          });
        }
      }
      
      // Intentar obtener más discos montados
      try {
        const allDisks = execSync('df -h | grep -E "^/dev"', { encoding: 'utf-8' });
        const allLines = allDisks.trim().split('\n');
        
        allLines.forEach((linea, idx) => {
          if (idx === 0) return; // Saltar el primero que ya agregamos
          const partes = linea.trim().split(/\s+/);
          if (partes.length >= 5) {
            discos.push({
              dispositivo: partes[0],
              tamano: partes[1],
              usado: partes[2],
              disponible: partes[3],
              porcentajeUso: partes[4],
              montaje: partes[5] || 'N/A'
            });
          }
        });
      } catch (e) {
        // Ignorar errores al buscar discos adicionales
      }
      
    } else if (plataforma === 'win32') {
      // Windows: usar wmic
      const output = execSync('wmic logicaldisk get caption,size,freespace,volumename', { encoding: 'utf-8' });
      const lineas = output.trim().split('\n').slice(1);
      
      lineas.forEach(linea => {
        const partes = linea.trim().split(/\s+/);
        if (partes.length >= 3) {
          const tamanoTotal = parseInt(partes[2]) || 0;
          const libre = parseInt(partes[1]) || 0;
          const usado = tamanoTotal - libre;
          const porcentaje = tamanoTotal > 0 ? ((usado / tamanoTotal) * 100).toFixed(1) : '0';
          
          discos.push({
            dispositivo: partes[0],
            tamano: (tamanoTotal / 1024 / 1024 / 1024).toFixed(2) + ' GB',
            usado: (usado / 1024 / 1024 / 1024).toFixed(2) + ' GB',
            disponible: (libre / 1024 / 1024 / 1024).toFixed(2) + ' GB',
            porcentajeUso: porcentaje + '%',
            montaje: partes[3] || 'Local Disk'
          });
        }
      });
    }
    
    return discos.length > 0 ? discos : [{
      dispositivo: 'N/A',
      tamano: 'N/A',
      usado: 'N/A',
      disponible: 'N/A',
      porcentajeUso: 'N/A',
      montaje: 'N/A'
    }];
  } catch (error) {
    return [{
      dispositivo: 'Error',
      tamano: 'N/A',
      usado: 'N/A',
      disponible: 'N/A',
      porcentajeUso: 'N/A',
      montaje: 'Error al obtener información'
    }];
  }
}

// Helper para convertir tamaños a bytes para ordenar
function parseTamano(tamano) {
  const match = tamano.match(/([0-9.]+)([BKMGT])/);
  if (!match) return 0;
  
  const valor = parseFloat(match[1]);
  const unidad = match[2];
  
  const multiplicadores = {
    'B': 1,
    'K': 1024,
    'M': 1024 * 1024,
    'G': 1024 * 1024 * 1024,
    'T': 1024 * 1024 * 1024 * 1024
  };
  
  return valor * (multiplicadores[unidad] || 0);
}

// Función para encontrar archivos y carpetas pesados
function obtenerArchivosPesados() {
  try {
    const plataforma = os.platform();
    const homeDir = os.homedir();
    let resultado = {
      archivosPesados: [],
      carpetasPesadas: [],
      cachesPesados: []
    };
    
    if (plataforma === 'darwin' || plataforma === 'linux') {
      // Buscar carpetas pesadas - estrategia rápida
      try {
        // Primero listar carpetas del home
        const listado = execSync(
          `ls -d "${homeDir}"/[^.]* 2>/dev/null`,
          { encoding: 'utf-8', timeout: 2000 }
        );
        
        const carpetas = listado.trim().split('\n').filter(l => l);
        const tamanos = [];
        
        // Obtener tamaño de cada carpeta con timeout corto
        for (const carpeta of carpetas) {
          try {
            const tamano = execSync(
              `du -sh "${carpeta}" 2>/dev/null`,
              { encoding: 'utf-8', timeout: 3000 }
            );
            const partes = tamano.trim().split('\t');
            if (partes.length >= 1) {
              const nombreCarpeta = carpeta.split('/').pop() || carpeta;
              tamanos.push({
                nombre: nombreCarpeta,
                tamano: partes[0],
                tamanoBytes: parseTamano(partes[0])
              });
            }
          } catch (e) {
            // Timeout o error en esta carpeta, continuar con la siguiente
          }
        }
        
        // Ordenar por tamaño y tomar top 5
        tamanos.sort((a, b) => b.tamanoBytes - a.tamanoBytes);
        resultado.carpetasPesadas = tamanos.slice(0, 5).map(c => ({
          ruta: '~/' + c.nombre,
          tamano: c.tamano
        }));
        
        console.log('📁 Carpetas pesadas encontradas:', resultado.carpetasPesadas.length);
      } catch (e) {
        console.error('Error buscando carpetas:', e.message);
      }
      
      // Buscar archivos grandes en directorio home (solo primer nivel de subdirectorios)
      try {
        const archivosGrandes = execSync(
          `find "${homeDir}" -maxdepth 3 -type f -size +2G 2>/dev/null | head -n 10`,
          { encoding: 'utf-8', timeout: 10000 }
        );
        
        const lineas = archivosGrandes.trim().split('\n').filter(l => l);
        for (const archivo of lineas) {
          try {
            const stats = fs.statSync(archivo);
            const tamanoGB = (stats.size / 1024 / 1024 / 1024).toFixed(2);
            resultado.archivosPesados.push({
              ruta: archivo.replace(homeDir, '~'),
              tamano: tamanoGB + ' GB'
            });
          } catch (e) {
            // Ignorar archivos inaccesibles
          }
        }
      } catch (e) {
        console.error('Error buscando archivos grandes:', e.message);
      }
      
      // Buscar cachés pesados
      const rutasCache = [
        path.join(homeDir, 'Library/Caches'),
        path.join(homeDir, '.cache'),
        path.join(homeDir, '.npm'),
        path.join(homeDir, '.yarn/cache'),
        path.join(homeDir, '.cargo'),
        path.join(homeDir, 'Library/Application Support/Code/CachedData')
      ];
      
      rutasCache.forEach(rutaCache => {
        try {
          if (fs.existsSync(rutaCache)) {
            const tamano = execSync(`du -sh "${rutaCache}" 2>/dev/null`, { encoding: 'utf-8', timeout: 3000 });
            const partes = tamano.trim().split('\t');
            if (partes.length >= 1 && partes[0] !== '0B') {
              resultado.cachesPesados.push({
                ruta: rutaCache.replace(homeDir, '~'),
                tamano: partes[0]
              });
            }
          }
        } catch (e) {
          // Ignorar errores
        }
      });
      
    } else if (plataforma === 'win32') {
      // Windows: buscar archivos grandes
      try {
        const archivos = execSync(
          `forfiles /P "${homeDir}" /S /M *.* /C "cmd /c if @fsize GEQ 2147483648 echo @path @fsize" 2>nul`,
          { encoding: 'utf-8', timeout: 10000 }
        );
        
        const lineas = archivos.trim().split('\n').filter(l => l).slice(0, 10);
        lineas.forEach(linea => {
          const partes = linea.split(' ');
          if (partes.length >= 2) {
            const tamanoGB = (parseInt(partes[partes.length - 1]) / 1024 / 1024 / 1024).toFixed(2);
            resultado.archivosPesados.push({
              ruta: partes[0],
              tamano: tamanoGB + ' GB'
            });
          }
        });
      } catch (e) {
        // Error al buscar
      }
    }
    
    return resultado;
  } catch (error) {
    console.error('Error en obtenerArchivosPesados:', error);
    return {
      archivosPesados: [],
      carpetasPesadas: [],
      cachesPesados: []
    };
  }
}

// 5. Obtener información del proceso usando PROCESS
function obtenerInfoProceso() {
  const memoriaProceso = process.memoryUsage();
  const cpuProceso = process.cpuUsage();
  
  return {
    pid: process.pid,
    ppid: process.ppid,
    version: process.version,
    plataforma: process.platform,
    arquitectura: process.arch,
    directorio: process.cwd(),
    uptime: Math.floor(process.uptime()),
    memoria: {
      rss: (memoriaProceso.rss / 1024 / 1024).toFixed(2) + ' MB',
      heapTotal: (memoriaProceso.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
      heapUsed: (memoriaProceso.heapUsed / 1024 / 1024).toFixed(2) + ' MB'
    },
    cpu: {
      user: (cpuProceso.user / 1000).toFixed(2) + ' ms',
      system: (cpuProceso.system / 1000).toFixed(2) + ' ms'
    }
  };
}

// 6. Listar archivos en un directorio (comando ls usando FS)
function listarDirectorio(directorio) {
  try {
    const archivos = fs.readdirSync(directorio);
    const resultado = [];
    
    archivos.forEach(archivo => {
      const rutaCompleta = path.join(directorio, archivo);
      try {
        const stats = fs.statSync(rutaCompleta);
        resultado.push({
          nombre: archivo,
          tipo: stats.isDirectory() ? 'directorio' : 'archivo',
          tamano: stats.isFile() ? stats.size : 0,
          modificado: stats.mtime.toISOString()
        });
      } catch (err) {
        // Ignorar errores de permisos
      }
    });
    
    return resultado;
  } catch (error) {
    return [];
  }
}

// ===== NUEVO: helpers para comandos y parseo (Temperatura) =====
function comandoDisponible(cmd) {
  try {
    const plataforma = os.platform();
    const check = plataforma === 'win32' ? `where ${cmd}` : `command -v ${cmd}`;
    execSync(check, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function execSeguro(comando, timeout = 2000) {
  try {
    return execSync(comando, { encoding: 'utf-8', timeout, stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return null;
  }
}

function extraerNumero(texto) {
  if (!texto) return null;
  const m = texto.match(/(-?\d+(\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

function colorTemp(t) {
  if (t == null || Number.isNaN(t)) return '#666';
  if (t >= 85) return '#dc3545'; // rojo
  if (t >= 70) return '#ffc107'; // amarillo
  return '#28a745';              // verde
}

// ===== NUEVO: best-effort para temperaturas (macOS/Linux/Windows) =====
function obtenerTemperaturas() {
  const plataforma = os.platform();

  let cpuC = null;
  let cpuFuente = '';
  let gpuC = null;
  let gpuFuente = '';
  let gpuNombre = '';
  const warnings = [];

  // ---------- macOS ----------
  // ---------- macOS ----------
  if (plataforma === 'darwin') {
    // Nombre de GPU (para mostrarlo aunque no haya temp)
    const gpuNameOut = execSeguro(
      `system_profiler SPDisplaysDataType | awk -F": " '/Chipset Model/{print $2; exit}'`,
      2500
    );
    gpuNombre = gpuNameOut || '';

    // ✅ PRIORIDAD 1: smctemp (CPU + GPU) (Homebrew tap)
    if (comandoDisponible('smctemp')) {
      const outCpu = execSeguro('smctemp -c -n3 -f', 1500); // imprime número (ej: 64.2)
      const outGpu = execSeguro('smctemp -g -n3 -f', 1500); // imprime número (ej: 36.2)

      cpuC = extraerNumero(outCpu);
      gpuC = extraerNumero(outGpu);

      cpuFuente = 'smctemp';
      gpuFuente = 'smctemp';

      if (cpuC == null) warnings.push('smctemp no devolvió temperatura CPU (sensor no disponible).');
      if (gpuC == null) warnings.push('smctemp no devolvió temperatura GPU (sensor no disponible).');

      return {
        cpu: { celsius: cpuC, fuente: cpuFuente },
        gpu: { celsius: gpuC, fuente: gpuFuente, nombre: gpuNombre || '' },
        warnings
      };
    }

    // CPU fallback: osx-cpu-temp
    if (comandoDisponible('osx-cpu-temp')) {
      const out = execSeguro('osx-cpu-temp', 1500); // ej: "55.0°C"
      cpuC = extraerNumero(out);
      cpuFuente = 'osx-cpu-temp';
    } else {
      warnings.push('macOS: instala "smctemp" (recomendado) o "osx-cpu-temp" para CPU.');
    }

    // GPU fallback: powermetrics (requiere sudo)
    if (gpuC == null && process.getuid && process.getuid() === 0) {
      const out = execSeguro('powermetrics -n 1 -i 1 --samplers smc 2>/dev/null', 3500);
      const m = out && out.match(/GPU die temperature:\s*([0-9.]+)\s*C/i);
      if (m) {
        gpuC = Number(m[1]);
        gpuFuente = 'powermetrics';
      }
    }

    if (gpuC == null) {
      warnings.push('macOS: para GPU, instala "smctemp" (recomendado). Con powermetrics suele requerir sudo.');
    }
  }


  // ---------- Linux ----------
  else if (plataforma === 'linux') {
    if (comandoDisponible('sensors')) {
      const out = execSeguro('sensors', 2500);
      const line = out && out.split('\n').find(l => /Package id 0:|Tctl:|Tdie:|temp1:/i.test(l));
      cpuC = extraerNumero(line);
      cpuFuente = cpuC != null ? 'sensors' : '';
    } else {
      warnings.push('Linux: instala lm-sensors (comando "sensors") para temperatura CPU.');
    }

    if (comandoDisponible('nvidia-smi')) {
      const out = execSeguro('nvidia-smi --query-gpu=name,temperature.gpu --format=csv,noheader,nounits', 2000);
      if (out) {
        const first = out.split('\n')[0];
        const parts = first.split(',').map(s => s.trim());
        gpuNombre = parts[0] || '';
        gpuC = parts[1] ? Number(parts[1]) : null;
        gpuFuente = 'nvidia-smi';
      }
    } else if (comandoDisponible('rocm-smi')) {
      const out = execSeguro('rocm-smi --showtemp', 2500);
      gpuC = extraerNumero(out);
      gpuFuente = gpuC != null ? 'rocm-smi' : '';
      gpuNombre = gpuC != null ? 'AMD GPU' : '';
    } else {
      warnings.push('GPU: para NVIDIA se usa "nvidia-smi"; para AMD a veces "rocm-smi".');
    }
  }

  // ---------- Windows ----------
  else if (plataforma === 'win32') {
    const outCpu = execSeguro(
      'powershell -NoProfile -Command "($t=Get-CimInstance -Namespace root/wmi -ClassName MSAcpi_ThermalZoneTemperature | Select-Object -First 1 -ExpandProperty CurrentTemperature); if($t){[math]::Round(($t/10)-273.15,1)}"',
      3000
    );
    cpuC = extraerNumero(outCpu);
    cpuFuente = cpuC != null ? 'MSAcpi_ThermalZoneTemperature' : '';

    if (comandoDisponible('nvidia-smi')) {
      const out = execSeguro('nvidia-smi --query-gpu=name,temperature.gpu --format=csv,noheader,nounits', 2000);
      if (out) {
        const first = out.split('\n')[0];
        const parts = first.split(',').map(s => s.trim());
        gpuNombre = parts[0] || '';
        gpuC = parts[1] ? Number(parts[1]) : null;
        gpuFuente = 'nvidia-smi';
      }
    } else {
      warnings.push('Windows: GPU temp suele requerir drivers NVIDIA + nvidia-smi.');
    }
  }

  return {
    cpu: { celsius: cpuC, fuente: cpuFuente || 'N/A' },
    gpu: { celsius: gpuC, fuente: gpuFuente || 'N/A', nombre: gpuNombre || '' },
    warnings
  };
}


// 7. Generar HTML del dashboard
function generarDashboardHTML() {
  const infoSistema = obtenerInfoSistema();
  const infoProceso = obtenerInfoProceso();
  const infoDisco = obtenerInfoDisco();
  const archivosPesados = obtenerArchivosPesados();
  const logs = obtenerUltimosLogs(10);
  const archivos = listarDirectorio(process.cwd());

  const temperaturas = obtenerTemperaturas(); 
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard de Monitoreo del Sistema</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      min-height: 100vh;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
    }
    h1 {
      color: white;
      text-align: center;
      margin-bottom: 30px;
      font-size: 2.5em;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    .card {
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .card h2 {
      color: #667eea;
      margin-bottom: 15px;
      font-size: 1.5em;
      border-bottom: 2px solid #667eea;
      padding-bottom: 10px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .info-label {
      font-weight: 600;
      color: #555;
    }
    .info-value {
      color: #333;
      font-family: 'Courier New', monospace;
    }
    .log-entry {
      padding: 5px;
      margin: 5px 0;
      background: #f8f9fa;
      border-left: 3px solid #667eea;
      font-size: 0.85em;
      font-family: 'Courier New', monospace;
    }
    .file-list {
      max-height: 400px;
      overflow-y: auto;
    }
    .file-item {
      padding: 8px;
      margin: 5px 0;
      background: #f8f9fa;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .file-icon {
      margin-right: 10px;
      font-size: 1.2em;
    }
    .badge {
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 0.75em;
      font-weight: 600;
    }
    .badge-dir { background: #e3f2fd; color: #1976d2; }
    .badge-file { background: #f3e5f5; color: #7b1fa2; }
    .refresh-btn {
      display: block;
      width: 100%;
      padding: 15px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1.1em;
      cursor: pointer;
      margin-top: 20px;
      transition: background 0.3s;
    }
    .refresh-btn:hover {
      background: #5568d3;
    }
    .timestamp {
      text-align: center;
      color: white;
      margin-top: 20px;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🖥️ Dashboard de Monitoreo del Sistema</h1>
    
    <div class="grid">
      <!-- Información del Sistema (OS) -->
      <div class="card">
        <h2>💻 Sistema Operativo</h2>
        <div class="info-row">
          <span class="info-label">Sistema:</span>
          <span class="info-value">${infoSistema.sistemaOperativo}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Kernel:</span>
          <span class="info-value">${infoSistema.kernel}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Plataforma:</span>
          <span class="info-value">${infoSistema.plataforma}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Arquitectura:</span>
          <span class="info-value">${infoSistema.arquitectura}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Hostname:</span>
          <span class="info-value">${infoSistema.hostname}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Uptime Sistema:</span>
          <span class="info-value">${Math.floor(infoSistema.uptime / 3600)}h ${Math.floor((infoSistema.uptime % 3600) / 60)}m</span>
        </div>
      </div>
      
      <!-- CPU (OS) -->
      <div class="card">
        <h2>⚙️ Procesador</h2>
        <div class="info-row">
          <span class="info-label">Modelo:</span>
          <span class="info-value" style="font-size: 0.85em;">${infoSistema.cpu.modelo}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Núcleos:</span>
          <span class="info-value">${infoSistema.cpu.nucleos} núcleos</span>
        </div>
        <div class="info-row">
          <span class="info-label">Velocidad:</span>
          <span class="info-value">${infoSistema.cpu.velocidad} MHz${infoSistema.cpu.velocidadMin !== infoSistema.cpu.velocidadMax ? ` (${infoSistema.cpu.velocidadMin}-${infoSistema.cpu.velocidadMax} MHz)` : ''}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Carga Promedio:</span>
          <span class="info-value">${infoSistema.cpu.loadAverage['1min']} / ${infoSistema.cpu.loadAverage['5min']} / ${infoSistema.cpu.loadAverage['15min']}</span>
        </div>
        <hr style="margin: 15px 0; border: none; border-top: 1px solid #e0e0e0;">
        <h3 style="color: #555; font-size: 0.95em; margin-bottom: 10px;">📊 Detalle por Núcleo</h3>
        <div style="max-height: 110px; overflow-y: auto;">
          ${infoSistema.cpu.nucleosDetalle.map((nucleo, idx) => `
          <div style="background: #f8f9fa; padding: 6px 10px; margin: 5px 0; border-radius: 4px; display: flex; justify-content: space-between; font-size: 0.85em;">
            <span><strong>Núcleo ${nucleo.nucleo}</strong></span>
            <span>${nucleo.velocidad} MHz</span>
            <span style="color: ${parseFloat(nucleo.uso) > 80 ? '#dc3545' : parseFloat(nucleo.uso) > 50 ? '#ffc107' : '#28a745'}; font-weight: 600;">${nucleo.uso}</span>
          </div>`).join('')}
        </div>
      </div>
      
      <!-- Memoria (OS) -->
      <div class="card">
        <h2>🧠 Memoria del Sistema</h2>
        <div class="info-row">
          <span class="info-label">Total:</span>
          <span class="info-value">${infoSistema.memoria.total}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Usada:</span>
          <span class="info-value">${infoSistema.memoria.usada}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Libre:</span>
          <span class="info-value">${infoSistema.memoria.libre}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Uso:</span>
          <span class="info-value">${infoSistema.memoria.porcentajeUso}</span>
        </div>
      </div>
      
      <!-- Información del Proceso (PROCESS) - Comentado -->
      <!--
      <div class="card">
        <h2>🔄 Proceso Node.js</h2>
        <div class="info-row">
          <span class="info-label">PID:</span>
          <span class="info-value">${infoProceso.pid}</span>
        </div>
        <div class="info-row">
          <span class="info-label">PPID:</span>
          <span class="info-value">${infoProceso.ppid}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Versión Node:</span>
          <span class="info-value">${infoProceso.version}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Directorio:</span>
          <span class="info-value">${infoProceso.directorio}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Uptime:</span>
          <span class="info-value">${infoProceso.uptime}s</span>
        </div>
      </div>
      -->
      
      <!-- Información de Disco -->
      <div class="card">
        <h2>💿 Almacenamiento</h2>
        ${infoDisco.map((disco, idx) => `
        <div style="${idx > 0 ? 'margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;' : ''}">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-weight: 600; color: #333;">${disco.dispositivo}</span>
            <span style="font-size: 0.85em; color: #666;">${disco.montaje}</span>
          </div>
          <div class="info-row" style="border: none; padding: 4px 0;">
            <span class="info-label">Tamaño:</span>
            <span class="info-value">${disco.tamano}</span>
          </div>
          <div class="info-row" style="border: none; padding: 4px 0;">
            <span class="info-label">Usado:</span>
            <span class="info-value">${disco.usado}</span>
          </div>
          <div class="info-row" style="border: none; padding: 4px 0;">
            <span class="info-label">Disponible:</span>
            <span class="info-value">${disco.disponible}</span>
          </div>
          <div style="margin-top: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.85em; margin-bottom: 4px;">
              <span>Uso del disco</span>
              <span style="font-weight: 600; color: ${parseFloat(disco.porcentajeUso) > 80 ? '#dc3545' : parseFloat(disco.porcentajeUso) > 60 ? '#ffc107' : '#28a745'};">${disco.porcentajeUso}</span>
            </div>
            <div style="width: 100%; height: 8px; background: #e0e0e0; border-radius: 4px; overflow: hidden;">
              <div style="width: ${disco.porcentajeUso}; height: 100%; background: ${parseFloat(disco.porcentajeUso) > 80 ? '#dc3545' : parseFloat(disco.porcentajeUso) > 60 ? '#ffc107' : '#28a745'}; transition: width 0.3s;"></div>
            </div>
          </div>
        </div>`).join('')}
      </div>
      
      <!-- Memoria del Proceso (PROCESS) -->
      <div class="card">
        <h2>💾 Memoria del Proceso</h2>
        <div class="info-row">
          <span class="info-label">RSS:</span>
          <span class="info-value">${infoProceso.memoria.rss}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Heap Total:</span>
          <span class="info-value">${infoProceso.memoria.heapTotal}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Heap Usado:</span>
          <span class="info-value">${infoProceso.memoria.heapUsed}</span>
        </div>
        <div class="info-row">
          <span class="info-label">CPU User:</span>
          <span class="info-value">${infoProceso.cpu.user}</span>
        </div>
        <div class="info-row">
          <span class="info-label">CPU System:</span>
          <span class="info-value">${infoProceso.cpu.system}</span>
        </div>
      </div>

            <!-- Temperaturas CPU / GPU -->
      <div class="card">
        <h2>🌡️ Temperaturas</h2>

        <div class="info-row">
          <span class="info-label">CPU:</span>
          <span class="info-value" style="font-weight: 700; color: ${colorTemp(temperaturas.cpu.celsius)};">
            ${temperaturas.cpu.celsius != null ? `${temperaturas.cpu.celsius.toFixed(1)} °C` : 'N/A'}
          </span>
        </div>

        <div class="info-row">
          <span class="info-label">GPU:</span>
          <span class="info-value" style="font-weight: 700; color: ${colorTemp(temperaturas.gpu.celsius)};">
            ${temperaturas.gpu.celsius != null ? `${temperaturas.gpu.celsius.toFixed(1)} °C` : 'N/A'}
          </span>
        </div>

        <div style="margin-top: 10px; color: #666; font-size: 0.85em; line-height: 1.4;">
          <div><strong>Fuente CPU:</strong> ${temperaturas.cpu.fuente}</div>
          <div><strong>Fuente GPU:</strong> ${temperaturas.gpu.fuente}${temperaturas.gpu.nombre ? ` (${temperaturas.gpu.nombre})` : ''}</div>
        </div>

        ${temperaturas.warnings?.length ? `
          <div style="margin-top: 12px; padding: 10px; background: #fff3cd; border-radius: 6px; font-size: 0.85em; color: #664d03;">
            ${temperaturas.warnings.map(w => `• ${w}`).join('<br>')}
          </div>
        ` : ''}
      </div>

      
      <!-- Logs (FS) - Comentado -->
      <!--
      <div class="card">
        <h2>📋 Últimos Accesos (Logs FS)</h2>
        <div style="max-height: 300px; overflow-y: auto;">
          ${logs.length > 0 ? logs.map(log => `<div class="log-entry">${log}</div>`).join('') : '<p>No hay logs disponibles</p>'}
        </div>
      </div>
      -->
      
      <!-- Archivos y Carpetas Pesados -->
      <div class="card">
        <h2>🔍 Análisis de Espacio</h2>
        
        <h3 style="color: #555; font-size: 1em; margin-bottom: 10px; margin-top: 0;">📁 Top 5 Carpetas Pesadas</h3>
        <div style="max-height: 150px; overflow-y: auto; margin-bottom: 15px;">
          ${archivosPesados.carpetasPesadas.length > 0 
            ? archivosPesados.carpetasPesadas.map((carpeta, idx) => `
          <div style="background: #f8f9fa; padding: 8px 10px; margin: 5px 0; border-radius: 4px; display: flex; justify-content: space-between; font-size: 0.85em;">
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;" title="${carpeta.ruta}">${carpeta.ruta}</span>
            <span style="font-weight: 600; color: #667eea; margin-left: 10px;">${carpeta.tamano}</span>
          </div>`).join('')
            : '<div style="padding: 10px; text-align: center; color: #999;">⏳ Buscando carpetas pesadas...</div>'
          }
        </div>
        
        ${archivosPesados.archivosPesados.length > 0 ? `
        <h3 style="color: #555; font-size: 1em; margin-bottom: 10px;">📄 Archivos Grandes (> 2GB)</h3>
        <div style="max-height: 150px; overflow-y: auto; margin-bottom: 15px;">
          ${archivosPesados.archivosPesados.map((archivo, idx) => `
          <div style="background: #fff3cd; padding: 8px 10px; margin: 5px 0; border-radius: 4px; display: flex; justify-content: space-between; font-size: 0.85em;">
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;" title="${archivo.ruta}">${archivo.ruta}</span>
            <span style="font-weight: 600; color: #dc3545; margin-left: 10px;">${archivo.tamano}</span>
          </div>`).join('')}
        </div>
        ` : ''}
        
        ${archivosPesados.cachesPesados.length > 0 ? `
        <h3 style="color: #555; font-size: 1em; margin-bottom: 10px;">🗑️ Cachés Pesados</h3>
        <div style="max-height: 150px; overflow-y: auto;">
          ${archivosPesados.cachesPesados.map((cache, idx) => `
          <div style="background: #e3f2fd; padding: 8px 10px; margin: 5px 0; border-radius: 4px; display: flex; justify-content: space-between; font-size: 0.85em;">
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;" title="${cache.ruta}">${cache.ruta}</span>
            <span style="font-weight: 600; color: #1976d2; margin-left: 10px;">${cache.tamano}</span>
          </div>`).join('')}
        </div>
        ` : ''}
        
        ${archivosPesados.carpetasPesadas.length === 0 && archivosPesados.archivosPesados.length === 0 && archivosPesados.cachesPesados.length === 0 ? `
        <p style="text-align: center; color: #999; padding: 20px;">⏳ Analizando espacio... (puede tardar unos segundos)</p>
        ` : ''}
      </div>
      
      <!-- Top 5 Procesos -->
      <div class="card">
        <h2>📊 Top 5 Procesos por Memoria</h2>
        ${infoSistema.memoria.topProcesos.length > 0 ? `
        ${infoSistema.memoria.topProcesos.map((proc, idx) => `
        <div style="background: ${idx === 0 ? '#fff3cd' : '#f8f9fa'}; padding: 12px; margin: 10px 0; border-radius: 6px; border-left: 4px solid ${idx === 0 ? '#ffc107' : '#667eea'};">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-weight: 600; color: #333; font-size: 1em;">${idx + 1}. ${proc.nombre}</span>
            <span style="font-weight: 700; color: #667eea; font-size: 1em;">${proc.memoria}${proc.porcentaje ? ' (' + proc.porcentaje + ')' : ''}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.85em; color: #666;">
            <span>📦 ${proc.aplicacion}</span>
            <span style="background: #e3f2fd; padding: 3px 10px; border-radius: 10px; font-family: monospace; font-weight: 500;">${proc.extension}</span>
          </div>
        </div>`).join('')}
        ` : '<p style="color: #999; text-align: center; padding: 20px;">No hay información de procesos disponible</p>'}
      </div>
    </div>
    
    <!-- Lista de Archivos (FS + PATH) -->
    <div class="card">
      <h2>📂 Archivos en Directorio Actual (comando ls)</h2>
      <div class="file-list">
        ${archivos.slice(0, 20).map(archivo => `
          <div class="file-item">
            <div>
              <span class="file-icon">${archivo.tipo === 'directorio' ? '📁' : '📄'}</span>
              <strong>${archivo.nombre}</strong>
              <span class="badge ${archivo.tipo === 'directorio' ? 'badge-dir' : 'badge-file'}">
                ${archivo.tipo}
              </span>
            </div>
            <div>
              ${archivo.tipo === 'archivo' ? `${(archivo.tamano / 1024).toFixed(2)} KB` : ''}
            </div>
          </div>
        `).join('')}
      </div>
      <p style="margin-top: 15px; color: #666; font-size: 0.9em;">
        Mostrando ${Math.min(archivos.length, 20)} de ${archivos.length} elementos
      </p>
    </div>
    
    <button class="refresh-btn" onclick="location.reload()">🔄 Actualizar Dashboard</button>
    
    <div class="timestamp">
      Última actualización: ${new Date().toLocaleString('es-ES')}
    </div>
  </div>
</body>
</html>
  `;
}

// 8. Crear servidor HTTP
const server = http.createServer((req, res) => {
  const ip = req.socket.remoteAddress;
  
  // Registrar acceso en logs (FS)
  registrarAcceso(req.method, req.url, ip);
  
  console.log(`📨 ${req.method} ${req.url} - IP: ${ip}`);
  
  // Enrutamiento
  if (req.url === '/' || req.url === '/dashboard') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.statusCode = 200;
    res.end(generarDashboardHTML());
  } 
  else if (req.url === '/api/info') {
    // API JSON con toda la información
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({
      sistema: obtenerInfoSistema(),
      proceso: obtenerInfoProceso(),
      logs: obtenerUltimosLogs(5),
      archivos: listarDirectorio(process.cwd()).slice(0, 10)
    }, null, 2));
  }
  else if (req.url === '/api/logs') {
    // Endpoint para ver logs completos
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({
      logs: obtenerUltimosLogs(50)
    }, null, 2));
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<h1>404 - Página no encontrada</h1><a href="/">Ir al Dashboard</a>');
  }
});

// Inicializar
inicializarLogs();

// Iniciar servidor
server.listen(PORT, HOST, () => {
  console.log(`\n✅ MÓDULOS INTEGRADOS:`);
  console.log(`   📁 fs      - Logs y lectura de archivos`);
  console.log(`   🛣️  path   - Manejo de rutas`);
  console.log(`   💻 os      - Información del sistema`);
  console.log(`   🌐 http    - Servidor web`);
  console.log(`   🔄 process - Información del proceso`);
  console.log(`   📂 ls      - Listar directorios\n`);
  console.log(`🚀 Dashboard corriendo en http://${HOST}:${PORT}/`);
  console.log(`📊 API JSON disponible en http://${HOST}:${PORT}/api/info`);
  console.log(`📋 Logs disponibles en http://${HOST}:${PORT}/api/logs`);
  console.log(`\n   Presiona Ctrl+C para detener\n`);
});

// Manejo de cierre graceful
process.on('SIGINT', () => {
  console.log('\n\n⏹️  Cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n\n⏹️  Señal SIGTERM recibida...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});
