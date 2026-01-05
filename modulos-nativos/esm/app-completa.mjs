// Aplicación Completa - Integración de TODOS los módulos nativos - ES Modules
// Dashboard de Monitoreo del Sistema

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('=== 🚀 Sistema de Monitoreo Integral - ES Modules ===\n');

// Configuración
const PORT = 3001;
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

// 7. Generar HTML del dashboard
function generarDashboardHTML() {
  const infoSistema = obtenerInfoSistema();
  const infoProceso = obtenerInfoProceso();
  const logs = obtenerUltimosLogs(10);
  const archivos = listarDirectorio(process.cwd());
  
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard de Monitoreo - ES Modules</title>
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
    <h1>🖥️ Dashboard de Monitoreo del Sistema <span class="badge-esm">ES Modules</span></h1>
    
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
      
      <!-- Información del Proceso (PROCESS) -->
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
      
      <!-- Logs (FS) - Comentado -->
      <!--
      <div class="card">
        <h2>📋 Últimos Accesos (Logs FS)</h2>
        <div style="max-height: 300px; overflow-y: auto;">
          ${logs.length > 0 ? logs.map(log => `<div class="log-entry">${log}</div>`).join('') : '<p>No hay logs disponibles</p>'}
        </div>
      </div>
      -->
      
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
