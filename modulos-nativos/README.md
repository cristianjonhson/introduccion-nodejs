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
│   ├── fs-example.js        # File System
│   ├── path-example.js      # Path
│   ├── os-example.js        # Operating System
│   ├── http-example.js      # HTTP Server
│   ├── uptime-example.js    # Uptime del sistema
│   └── process-example.js   # Process (información y control del proceso)
├── esm/                      # Ejemplos con ES Modules
│   ├── fs-example.js        # File System
│   ├── path-example.js      # Path
│   ├── os-example.js        # Operating System
│   ├── http-example.js      # HTTP Server
│   ├── uptime-example.js    # Uptime del sistema
│   ├── process-example.js   # Process
│   └── package.json         # Habilita ES Modules
├── async-sync/               # Ejemplos de patrones asíncronos
│   ├── cjs/                 # Ejemplos con CommonJS
│   │   ├── sincrono.js              # Operaciones síncronas (bloqueantes)
│   │   ├── asincrono-callbacks.js   # Operaciones asíncronas con callbacks
│   │   ├── asincrono-promesas.js    # Operaciones asíncronas con promesas
│   │   ├── promisify-example.js     # util.promisify básico
│   │   ├── promisify-custom.js      # util.promisify con funciones personalizadas
│   │   ├── iife-example.js          # IIFE (Immediately Invoked Function Expression)
│   │   └── parallel-example.js      # Ejecución paralela vs secuencial
│   ├── esm/                 # Ejemplos con ES Modules
│   │   ├── sincrono.js              # Operaciones síncronas
│   │   ├── asincrono-promesas.js    # Operaciones asíncronas con Top-level await
│   │   ├── promisify-example.js     # util.promisify con ESM
│   │   ├── iife-example.js          # IIFE con Top-level await
│   │   ├── parallel-example.js      # Ejecución paralela con Top-level await
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

### Ejemplos CommonJS

```bash
# File System
node modulos-nativos/cjs/fs-example.js

# Path
node modulos-nativos/cjs/path-example.js

# Operating System
node modulos-nativos/cjs/os-example.js

# Uptime del sistema
node modulos-nativos/cjs/uptime-example.js

# Process (información y control del proceso)
node modulos-nativos/cjs/process-example.js

# Probar con argumentos
node modulos-nativos/cjs/process-example.js --name Juan --age 25 --verbose

# HTTP Server (ejecuta en background)
node modulos-nativos/cjs/http-example.js
# Visita: http://localhost:3000
```

### Ejemplos de Patrones Asíncronos

```bash
# Operaciones síncronas vs asíncronas
node modulos-nativos/async-sync/cjs/sincrono.js
node modulos-nativos/async-sync/cjs/asincrono-callbacks.js
node modulos-nativos/async-sync/cjs/asincrono-promesas.js

# util.promisify (convertir callbacks a promesas)
node modulos-nativos/async-sync/cjs/promisify-example.js
node modulos-nativos/async-sync/cjs/promisify-custom.js

# IIFE (Immediately Invoked Function Expression)
node modulos-nativos/async-sync/cjs/iife-example.js

# Ejecución Paralela (Promise.all, allSettled, race, any)
node modulos-nativos/async-sync/cjs/parallel-example.js
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
node modulos-nativos/esm/fs-example.js

# Path
node modulos-nativos/esm/path-example.js

# Operating System
node modulos-nativos/esm/os-example.js

# Uptime del sistema
node modulos-nativos/esm/uptime-example.js

# Process (información y control del proceso)
node modulos-nativos/esm/process-example.js

# HTTP Server (ejecuta en background)
node modulos-nativos/esm/http-example.js
# Visita: http://localhost:3001
```

### Ejemplos de Patrones Asíncronos (ES Modules)

```bash
# Operaciones síncronas vs asíncronas
node modulos-nativos/async-sync/esm/sincrono.js
node modulos-nativos/async-sync/esm/asincrono-promesas.js

# util.promisify con Top-level await
node modulos-nativos/async-sync/esm/promisify-example.js

# IIFE con Top-level await
node modulos-nativos/async-sync/esm/iife-example.js

# Ejecución Paralela con Top-level await
node modulos-nativos/async-sync/esm/parallel-example.js
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
