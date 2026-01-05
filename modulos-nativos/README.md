# Módulos Nativos de Node.js

## 📚 Descripción

Este directorio contiene ejemplos prácticos de los módulos nativos más utilizados de Node.js, mostrando cómo importarlos tanto en **CommonJS** como en **ES Modules**.

## 📦 Módulos Nativos Incluidos

### 1. **fs** (File System)
Permite trabajar con el sistema de archivos: crear, leer, escribir y eliminar archivos y directorios.

**Operaciones demostradas:**
- Crear directorios
- Escribir archivos
- Leer archivos
- Agregar contenido
- Obtener información de archivos
- Eliminar archivos y directorios
- **Listar directorios** (comando ls): readdirSync(), statSync(), filtrar, ordenar, recursivo

### 2. **path**
Utilidades para trabajar con rutas de archivos y directorios de forma independiente del sistema operativo.

**Operaciones demostradas:**
- Analizar rutas (dirname, basename, extname)
- Construir rutas (join, resolve)
- Normalizar rutas
- Calcular rutas relativas
- Información del sistema de archivos

### 3. **os** (Operating System)
Proporciona información sobre el sistema operativo y recursos del sistema.

**Información disponible:**
- Sistema operativo y arquitectura
- Información de red y hostname
- CPU (modelo, núcleos, velocidad)
- **Detalles por núcleo** (tiempos de user, system, idle y porcentaje de uso)
- **Resumen de uso promedio** de CPU
- Memoria (total, libre, usada)
- Usuario actual
- Uptime del sistema

### 4. **http**
Permite crear servidores HTTP y realizar peticiones HTTP.

**Características demostradas:**
- Crear servidor HTTP básico
- Enrutamiento simple
- Respuestas HTML y JSON
- Manejo de errores 404
- Configuración de headers

### 5. **uptime** (os + process)
Muestra información detallada sobre el tiempo de actividad del sistema y procesos.

**Información disponible:**
- Uptime del sistema en varios formatos
- Fecha y hora de inicio del sistema
- Uptime del proceso Node.js
- Comparación de tiempos
- Información adicional del sistema

### 6. **process**
Proporciona información y control sobre el proceso actual de Node.js.

**Información disponible:**
- PID y PPID del proceso
- Versión de Node.js y dependencias
- Plataforma y arquitectura
- Argumentos de línea de comandos (process.argv)
- Variables de entorno (process.env)
- Uso de memoria y CPU
- Directorio de trabajo (cwd)
- Eventos del proceso (exit, SIGINT, SIGTERM, etc.)
- Streams estándar (stdin, stdout, stderr)
- Manejo de señales del sistema

## 📁 Estructura

```
modulos-nativos/
├── cjs/                      # Ejemplos con CommonJS
│   ├── fs-example.cjs        # File System
│   ├── ls-example.cjs        # Listar directorios (comando ls)
│   ├── path-example.cjs      # Path
│   ├── os-example.cjs        # Operating System
│   ├── http-example.cjs      # HTTP Server
│   ├── uptime-example.cjs    # Uptime del sistema
│   ├── process-example.cjs   # Process (información y control del proceso)
│   └── app-completa.cjs      # 🌟 Aplicación que integra TODOS los módulos
├── esm/                      # Ejemplos con ES Modules
│   ├── fs-example.mjs        # File System
│   ├── ls-example.mjs        # Listar directorios (comando ls)
│   ├── path-example.mjs      # Path
│   ├── os-example.mjs        # Operating System
│   ├── http-example.mjs      # HTTP Server
│   ├── uptime-example.mjs    # Uptime del sistema
│   ├── process-example.mjs   # Process
│   ├── app-completa.mjs      # 🌟 Aplicación que integra TODOS los módulos
│   └── package.json         # Habilita ES Modules
├── async-sync/               # Ejemplos de patrones asíncronos
│   ├── cjs/                 # Ejemplos con CommonJS
│   │   ├── sincrono.cjs              # Operaciones síncronas (bloqueantes)
│   │   ├── asincrono-callbacks.cjs   # Operaciones asíncronas con callbacks
│   │   ├── asincrono-promesas.cjs    # Operaciones asíncronas con promesas
│   │   ├── promisify-example.cjs     # util.promisify básico
│   │   ├── promisify-custom.cjs      # util.promisify con funciones personalizadas
│   │   ├── iife-example.cjs          # IIFE (Immediately Invoked Function Expression)
│   │   └── parallel-example.cjs      # Ejecución paralela vs secuencial
│   ├── esm/                 # Ejemplos con ES Modules
   │   ├── sincrono.mjs              # Operaciones síncronas
   │   ├── asincrono-promesas.mjs    # Operaciones asíncronas con Top-level await
   │   ├── promisify-example.mjs     # util.promisify con ESM
   │   ├── iife-example.mjs          # IIFE con Top-level await
   │   ├── parallel-example.mjs      # Ejecución paralela con Top-level await
│   │   └── package.json             # Configuración ES Modules
│   ├── CALLBACKS_VS_PROMESAS.md     # Guía completa de callbacks vs promesas
│   ├── IIFE.md                      # Guía completa de IIFE
│   ├── PARALLEL.md                  # Guía completa de ejecución paralela
│   ├── INTERNALS.md                 # Cómo funciona Node.js por dentro
│   └── README.md                    # Documentación de patrones asíncronos
└── README.md                # Este archivo
```
│   ├── fs-example.js        # File System
│   ├── path-example.js      # Path
│   ├── os-example.js        # Operating System
│   ├── http-example.js      # HTTP Server
│   └── package.json         # Habilita ES Modules
└── README.md                # Este archivo
```

## ▶️ Cómo Ejecutar

### 🌟 Aplicación Completa (Integra TODOS los módulos)

**Dashboard de Monitoreo del Sistema** - Aplicación web que integra todos los módulos nativos en un solo proyecto:

```bash
# CommonJS (Puerto 3000)
node modulos-nativos/cjs/app-completa.cjs

# ES Modules (Puerto 3001)
node modulos-nativos/esm/app-completa.mjs
```

**Características:**
- ✅ **fs** - Sistema de logs de acceso
- ✅ **path** - Manejo de rutas de archivos
- ✅ **os** - Información del sistema operativo (versión detallada, carga promedio)
- ✅ **http** - Servidor web con dashboard HTML
- ✅ **process** - Monitoreo del proceso Node.js
- ✅ **ls** - Listar archivos del directorio actual
- ✅ **child_process** - Top 5 procesos por memoria con detección de aplicaciones
- ✅ **Almacenamiento** - Información de disco (uso, disponible, particiones)
- ✅ **Análisis de Espacio** - Carpetas pesadas, archivos grandes >2GB, cachés pesados

**Endpoints disponibles:**
- `http://localhost:3000/` - Dashboard visual interactivo con:
  - 💻 **Sistema Operativo**: Versión detallada, kernel, arquitectura, hostname
  - ⚡ **Procesador**: Modelo, núcleos, velocidad, carga promedio, uso por núcleo
  - 🧠 **Memoria**: Total, usada, libre, swap con indicadores visuales
  - 📁 **Top 5 Procesos**: Procesos con mayor consumo de memoria (con detección de aplicación)
  - 💾 **Almacenamiento**: Uso de disco, disponible, particiones
  - 🔍 **Análisis de Espacio**: 
    - Top 5 carpetas pesadas en tu directorio home
    - Archivos grandes mayores a 2GB
    - Cachés pesados (.cache, .npm, .cargo, VS Code, etc.)
  - 📝 **Archivos**: Listado del directorio actual
- `http://localhost:3000/api/info` - API JSON con toda la información
- `http://localhost:3000/api/logs` - Últimos 50 logs de acceso

---

### Ejemplos CommonJS

```bash
# File System
node modulos-nativos/cjs/fs-example.cjs

# Listar directorios (comando ls)
node modulos-nativos/cjs/ls-example.cjs

# Path
node modulos-nativos/cjs/path-example.cjs

# Operating System
node modulos-nativos/cjs/os-example.cjs

# Uptime del sistema
node modulos-nativos/cjs/uptime-example.cjs

# Process (información y control del proceso)
node modulos-nativos/cjs/process-example.cjs

# Probar con argumentos
node modulos-nativos/cjs/process-example.cjs --name Juan --age 25 --verbose

# HTTP Server (ejecuta en background)
node modulos-nativos/cjs/http-example.cjs
# Visita: http://localhost:3000
```

### Ejemplos de Patrones Asíncronos

```bash
# Operaciones síncronas vs asíncronas
node modulos-nativos/async-sync/cjs/sincrono.cjs
node modulos-nativos/async-sync/cjs/asincrono-callbacks.cjs
node modulos-nativos/async-sync/cjs/asincrono-promesas.cjs

# util.promisify (convertir callbacks a promesas)
node modulos-nativos/async-sync/cjs/promisify-example.cjs
node modulos-nativos/async-sync/cjs/promisify-custom.cjs

# IIFE (Immediately Invoked Function Expression)
node modulos-nativos/async-sync/cjs/iife-example.cjs

# Ejecución Paralela (Promise.all, allSettled, race, any)
node modulos-nativos/async-sync/cjs/parallel-example.cjs
```

Ver documentación detallada en [async-sync/README.md](async-sync/README.md)

**Guías completas disponibles:**
- [CALLBACKS_VS_PROMESAS.md](async-sync/CALLBACKS_VS_PROMESAS.md) - Diferencias entre callbacks y promesas
- [IIFE.md](async-sync/IIFE.md) - Guía completa de IIFE
- [PARALLEL.md](async-sync/PARALLEL.md) - Ejecución paralela con Promise.all, allSettled, race, any
- [INTERNALS.md](async-sync/INTERNALS.md) - Cómo funciona Node.js por dentro (Event Loop, Thread Pool)

### Ejemplos ES Modules

```bash
# File System
node modulos-nativos/esm/fs-example.mjs

# Listar directorios (comando ls)
node modulos-nativos/esm/ls-example.mjs

# Path
node modulos-nativos/esm/path-example.mjs

# Operating System
node modulos-nativos/esm/os-example.mjs

# Uptime del sistema
node modulos-nativos/esm/uptime-example.mjs

# Process (información y control del proceso)
node modulos-nativos/esm/process-example.mjs

# HTTP Server (ejecuta en background)
node modulos-nativos/esm/http-example.mjs
# Visita: http://localhost:3001
```

### Ejemplos de Patrones Asíncronos (ES Modules)

```bash
# Operaciones síncronas vs asíncronas
node modulos-nativos/async-sync/esm/sincrono.mjs
node modulos-nativos/async-sync/esm/asincrono-promesas.mjs

# util.promisify con Top-level await
node modulos-nativos/async-sync/esm/promisify-example.mjs

# IIFE con Top-level await
node modulos-nativos/async-sync/esm/iife-example.mjs

# Ejecución Paralela con Top-level await
node modulos-nativos/async-sync/esm/parallel-example.mjs
```

## 🔍 Diferencias en la Importación

### CommonJS
```javascript
// ✅ Buena práctica: usar prefijo node: (desde Node.js 16+)
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');

// __dirname y __filename disponibles automáticamente
console.log(__dirname);
console.log(__filename);
```

### ES Modules
```javascript
// ✅ Buena práctica: usar prefijo node: (desde Node.js 16+)
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

// __dirname y __filename deben recrearse
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

### 💡 ¿Por qué usar el prefijo `node:`?

Desde **Node.js 16** se recomienda usar el prefijo `node:` al importar módulos nativos:

**Ventajas:**
- ✅ **Claridad**: Distingue claramente módulos nativos de paquetes de terceros
- ✅ **Seguridad**: Evita conflictos si instalas un paquete con el mismo nombre
- ✅ **Performance**: Mejora ligeramente el rendimiento al evitar búsquedas innecesarias
- ✅ **Estándar**: Es la práctica recomendada oficial de Node.js

**Ejemplo:**
```javascript
// ❌ Forma antigua (aún funciona pero no recomendada)
const fs = require('fs');
import fs from 'fs';

// ✅ Forma moderna recomendada (Node.js 16+)
const fs = require('node:fs');
import fs from 'node:fs';
```

## 💡 Diferencias Clave

| Aspecto | CommonJS | ES Modules |
|---------|----------|------------|
| Sintaxis import | `require()` | `import` |
| __dirname | ✅ Disponible | ❌ Debe recrearse |
| __filename | ✅ Disponible | ❌ Debe recrearse |
| import.meta.url | ❌ No disponible | ✅ Disponible |
| Top-level await | ❌ No | ✅ Sí |

## 📖 Módulos Nativos Comunes

Además de los ejemplos incluidos, Node.js tiene muchos otros módulos nativos útiles:

| Módulo | Descripción |
|--------|-------------|
| `fs/promises` | Versión con promesas del módulo fs |
| `crypto` | Funciones criptográficas |
| `events` | Emisor de eventos |
| `stream` | Manejo de streams |
| `util` | Utilidades diversas |
| `url` | Parseo y formato de URLs |
| `querystring` | Parseo de query strings |
| `child_process` | Crear procesos hijos |
| `cluster` | Crear procesos Node.js clonados |
| `zlib` | Compresión/descompresión |
| `buffer` | Manejo de datos binarios |
| `timers` | Funciones de temporización |

## 🔗 Recursos Adicionales

- [Documentación oficial de módulos nativos](https://nodejs.org/docs/latest/api/)
- [Node.js fs module](https://nodejs.org/api/fs.html)
- [Node.js path module](https://nodejs.org/api/path.html)
- [Node.js os module](https://nodejs.org/api/os.html)
- [Node.js http module](https://nodejs.org/api/http.html)

## ⚠️ Notas Importantes

1. **__dirname y __filename**: En ES Modules no están disponibles por defecto, debes recrearlos usando `import.meta.url`

2. **Extensiones de archivo**: Los imports en ES Modules deben incluir la extensión `.js`

3. **Promesas**: Muchos módulos nativos ahora tienen versiones basadas en promesas (ej: `fs/promises`)

4. **Servidores HTTP**: Los ejemplos de servidor HTTP usan puertos diferentes (3000 para CJS, 3001 para ESM) para que puedas ejecutarlos simultáneamente

5. **Archivos temporales**: Los ejemplos de `fs` crean y eliminan archivos temporales automáticamente
