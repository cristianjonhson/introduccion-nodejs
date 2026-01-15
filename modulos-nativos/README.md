````md
# Módulos Nativos de Node.js

## 📚 Descripción

Este directorio contiene ejemplos prácticos de los módulos nativos más utilizados de Node.js, mostrando cómo importarlos tanto en **CommonJS** como en **ES Modules**.

Incluye una **Aplicación Completa (Dashboard de Monitoreo del Sistema)** que integra todos los módulos nativos principales en un solo proyecto.

---

## 📦 Módulos Nativos Incluidos

### 1) **fs** (File System)
Permite trabajar con el sistema de archivos: crear, leer, escribir y eliminar archivos y directorios.

**Operaciones demostradas:**
- Crear directorios
- Escribir archivos
- Leer archivos
- Agregar contenido
- Obtener información de archivos
- Eliminar archivos y directorios
- **Listar directorios (comando ls)**: `readdirSync()`, `statSync()`, filtrar, ordenar, recursivo

---

### 2) **path**
Utilidades para trabajar con rutas de archivos y directorios de forma independiente del sistema operativo.

**Operaciones demostradas:**
- Analizar rutas (`dirname`, `basename`, `extname`)
- Construir rutas (`join`, `resolve`)
- Normalizar rutas
- Calcular rutas relativas
- Información del sistema de archivos

---

### 3) **os** (Operating System)
Proporciona información sobre el sistema operativo y recursos del sistema.

**Información disponible:**
- Sistema operativo y arquitectura
- Información de red y hostname
- CPU (modelo, núcleos, velocidad)
- **Detalles por núcleo** (tiempos de `user`, `system`, `idle` y porcentaje de uso)
- **Resumen de uso promedio** de CPU
- Memoria (total, libre, usada)
- Usuario actual
- Uptime del sistema

---

### 4) **http** (Hypertext Transfer Protocol)
Permite crear servidores HTTP y manejar solicitudes y respuestas.

**Funcionalidades demostradas:**
- Creación de un servidor HTTP básico
- Manejo de solicitudes y respuestas
- Registro de accesos en un archivo de logs
- Generación de un dashboard HTML con información del sistema

---

### 5) **uptime** (os + process)
Muestra información detallada sobre el tiempo de actividad del sistema y procesos.

**Información disponible:**
- Uptime del sistema en varios formatos
- Fecha y hora de inicio del sistema
- Uptime del proceso Node.js
- Comparación de tiempos
- Información adicional del sistema

---

### 6) **process**
Proporciona información y control sobre el proceso actual de Node.js.

**Funcionalidades demostradas:**
- Obtención de estadísticas del proceso (uso de memoria, CPU, etc.)
- Manejo de señales para cierre controlado del servidor

---

## 📁 Estructura

```txt
modulos-nativos/
├── cjs/                         # Ejemplos con CommonJS
│   ├── fs-example.cjs           # File System
│   ├── ls-example.cjs           # Listar directorios (comando ls)
│   ├── path-example.cjs         # Path
│   ├── os-example.cjs           # Operating System
│   ├── http-example.cjs         # HTTP Server
│   ├── uptime-example.cjs       # Uptime del sistema
│   ├── process-example.cjs      # Process (información y control del proceso)
│   └── app-completa.cjs         # 🌟 Aplicación que integra TODOS los módulos
├── esm/                         # Ejemplos con ES Modules
│   ├── fs-example.mjs           # File System
│   ├── ls-example.mjs           # Listar directorios (comando ls)
│   ├── path-example.mjs         # Path
│   ├── os-example.mjs           # Operating System
│   ├── http-example.mjs         # HTTP Server
│   ├── uptime-example.mjs       # Uptime del sistema
│   ├── process-example.mjs      # Process
│   ├── app-completa.mjs         # 🌟 Aplicación que integra TODOS los módulos
│   └── package.json             # Habilita ES Modules
├── async-sync/                  # Ejemplos de patrones asíncronos
│   ├── cjs/                     # Ejemplos con CommonJS
│   │   ├── sincrono.cjs                 # Operaciones síncronas (bloqueantes)
│   │   ├── asincrono-callbacks.cjs      # Operaciones asíncronas con callbacks
│   │   ├── asincrono-promesas.cjs       # Operaciones asíncronas con promesas
│   │   ├── promisify-example.cjs        # util.promisify básico
│   │   ├── promisify-custom.cjs         # util.promisify con funciones personalizadas
│   │   ├── iife-example.cjs             # IIFE (Immediately Invoked Function Expression)
│   │   └── parallel-example.cjs         # Ejecución paralela vs secuencial
│   ├── esm/                     # Ejemplos con ES Modules
│   │   ├── sincrono.mjs                 # Operaciones síncronas
│   │   ├── asincrono-promesas.mjs       # Operaciones asíncronas con Top-level await
│   │   ├── promisify-example.mjs        # util.promisify con ESM
│   │   ├── iife-example.mjs             # IIFE con Top-level await
│   │   ├── parallel-example.mjs         # Ejecución paralela con Top-level await
│   │   └── package.json                 # Configuración ES Modules
│   ├── CALLBACKS_VS_PROMESAS.md         # Guía completa de callbacks vs promesas
│   ├── IIFE.md                          # Guía completa de IIFE
│   ├── PARALLEL.md                      # Guía completa de ejecución paralela
│   ├── INTERNALS.md                     # Cómo funciona Node.js por dentro
│   └── README.md                        # Documentación de patrones asíncronos
└── README.md                     # Este archivo
````

---

## ▶️ Cómo Ejecutar

### 🌟 Aplicación Completa (Integra TODOS los módulos)

**Dashboard de Monitoreo del Sistema** - Aplicación web que integra todos los módulos nativos en un solo proyecto:

```bash
# CommonJS (Puerto 3000)
node modulos-nativos/cjs/app-completa.cjs

# ES Modules (Puerto 3001)
node modulos-nativos/esm/app-completa.mjs
```

---

## ✅ Características de la Aplicación Completa

* ✅ **fs** - Sistema de logs de acceso
* ✅ **path** - Manejo de rutas de archivos
* ✅ **os** - Información del sistema operativo (versión detallada, carga promedio)
* ✅ **http** - Servidor web con dashboard HTML
* ✅ **process** - Monitoreo del proceso Node.js
* ✅ **ls** - Listar archivos del directorio actual
* ✅ **child_process** - Top 5 procesos por memoria con detección de aplicaciones
* ✅ **Almacenamiento** - Información de disco (uso, disponible, particiones)
* ✅ **Análisis de Espacio** - Carpetas pesadas, archivos grandes >2GB, cachés pesados
* ✅ **Temperaturas (macOS)** - Lectura de temperatura **CPU (package)** y **GPU (si está disponible)**:

  * **CPU (package)**: usa `osx-cpu-temp` como fuente principal/fallback (temperatura del package/die)
  * **GPU**: intenta detectar temperatura vía `iSMC` (si el equipo expone sensores); si no, muestra `N/A`
  * **Nombre de GPU**: muestra el modelo detectado (ej: *Intel UHD Graphics 630*) usando `system_profiler`
  * **Por núcleo**: si existen sensores `Core X` vía `iSMC`, se listan; si no, se informa que no está disponible
  * **Warnings**: muestra advertencias cuando `iSMC` no entrega datos parseables (sin romper el dashboard)

---

## 🌡️ Temperaturas (macOS)

La app incluye una tarjeta de **Temperaturas** en el dashboard:

* **CPU (package)**: se obtiene con `osx-cpu-temp` (ej: `54.1 °C`).
* **GPU**: se intenta obtener con `iSMC` (si el equipo expone sensores). Si no existe sensor, se muestra **N/A**, pero igual se muestra el **nombre/modelo de la GPU**.
* **Por núcleo**: solo aparece si el hardware expone sensores tipo **Core 0, Core 1, ...** (no todos los Macs lo hacen).

📌 Ejemplo real:

* CPU (package): `54.1 °C`
* GPU: `N/A (Intel UHD Graphics 630)`
* Fuente CPU: `osx-cpu-temp`
* Fuente GPU: `N/A`

---

## 🛠️ Opcional: herramientas para Temperaturas

En macOS, para mostrar temperatura CPU (package):

```bash
# Instalar osx-cpu-temp (si ya lo tienes, omite)
brew install osx-cpu-temp
```

Para intentar leer sensores adicionales (CPU por núcleo / GPU si el hardware lo expone):

```bash
# Instalar iSMC (requiere Go)
brew install go
CGO_ENABLED=1 go install github.com/dkorunic/iSMC@latest

# Asegurar el PATH (zsh)
echo 'export PATH="$HOME/go/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

> Nota: En algunos modelos Intel, **la temperatura GPU y/o por núcleo puede no estar disponible** aunque iSMC esté instalado.

---

## 🌐 Endpoints disponibles

* `http://localhost:3000/` - Dashboard visual interactivo con:

  * 💻 **Sistema Operativo**: Versión detallada, kernel, arquitectura, hostname
  * ⚡ **Procesador**: Modelo, núcleos, velocidad, carga promedio, uso por núcleo
  * 🧠 **Memoria**: Total, usada, libre
  * 📊 **Top 5 Procesos**: Procesos con mayor consumo de memoria (con detección de aplicación)
  * 💾 **Almacenamiento**: Uso de disco, disponible, particiones
  * 🔍 **Análisis de Espacio**:

    * Top 5 carpetas pesadas en tu directorio home
    * Archivos grandes mayores a 2GB
    * Cachés pesados (.cache, .npm, .cargo, VS Code, etc.)
  * 🌡️ **Temperaturas (macOS)**: CPU (package) y GPU (si hay sensores disponibles)
  * 📝 **Archivos**: Listado del directorio actual
* `http://localhost:3000/api/info` - API JSON con toda la información *(recomendado incluir `temperaturas` si lo habilitaste en el endpoint)*
* `http://localhost:3000/api/logs` - Últimos 50 logs de acceso

---

## ✅ Mejoras recientes (robustez del dashboard)

* Evita que el dashboard falle si una temperatura no es numérica (formateo robusto de °C).
* Corrección de mapeo de campos en la tarjeta de Temperaturas (CPU/GPU).
* Eliminación de duplicación visual en “Fuente GPU” (GPU y fuente separadas correctamente).
* Mensajes informativos cuando el equipo no expone sensores por núcleo / GPU.
* Manejo de `iSMC` sin datos parseables (warnings sin romper la UI).

---

## ▶️ Ejemplos CommonJS

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

# HTTP Server
node modulos-nativos/cjs/http-example.cjs
# Visita: http://localhost:3000
```

---

## ⚡ Ejemplos de Patrones Asíncronos (CommonJS)

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

Ver documentación detallada en `modulos-nativos/async-sync/README.md`

**Guías completas disponibles:**

* `async-sync/CALLBACKS_VS_PROMESAS.md` - Diferencias entre callbacks y promesas
* `async-sync/IIFE.md` - Guía completa de IIFE
* `async-sync/PARALLEL.md` - Ejecución paralela con Promise.all, allSettled, race, any
* `async-sync/INTERNALS.md` - Cómo funciona Node.js por dentro (Event Loop, Thread Pool)

---

## ▶️ Ejemplos ES Modules

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

# HTTP Server
node modulos-nativos/esm/http-example.mjs
# Visita: http://localhost:3001
```

---

## ⚡ Ejemplos de Patrones Asíncronos (ES Modules)

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

---

## 🔍 Diferencias en la Importación

### CommonJS

```js
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

```js
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

---

## 💡 ¿Por qué usar el prefijo `node:`?

Desde **Node.js 16** se recomienda usar el prefijo `node:` al importar módulos nativos.

**Ventajas:**

* ✅ **Claridad**: Distingue claramente módulos nativos de paquetes de terceros
* ✅ **Seguridad**: Evita conflictos si instalas un paquete con el mismo nombre
* ✅ **Performance**: Evita búsquedas innecesarias
* ✅ **Estándar**: Práctica moderna recomendada

**Ejemplo:**

```js
// ❌ Forma antigua (aún funciona pero no recomendada)
const fs = require('fs');
import fs from 'fs';

// ✅ Forma moderna recomendada (Node.js 16+)
const fs = require('node:fs');
import fs from 'node:fs';
```

---

## 💡 Diferencias Clave

| Aspecto         | CommonJS        | ES Modules       |
| --------------- | --------------- | ---------------- |
| Sintaxis import | `require()`     | `import`         |
| __dirname       | ✅ Disponible    | ❌ Debe recrearse |
| __filename      | ✅ Disponible    | ❌ Debe recrearse |
| import.meta.url | ❌ No disponible | ✅ Disponible     |
| Top-level await | ❌ No            | ✅ Sí             |

---

## 📖 Módulos Nativos Comunes (extra)

| Módulo          | Descripción                        |
| --------------- | ---------------------------------- |
| `fs/promises`   | Versión con promesas del módulo fs |
| `crypto`        | Funciones criptográficas           |
| `events`        | Emisor de eventos                  |
| `stream`        | Manejo de streams                  |
| `util`          | Utilidades diversas                |
| `url`           | Parseo y formato de URLs           |
| `querystring`   | Parseo de query strings            |
| `child_process` | Crear procesos hijos               |
| `cluster`       | Crear procesos Node.js clonados    |
| `zlib`          | Compresión/descompresión           |
| `buffer`        | Manejo de datos binarios           |
| `timers`        | Funciones de temporización         |

---

## 🔗 Recursos Adicionales

* Documentación oficial de módulos nativos: [https://nodejs.org/docs/latest/api/](https://nodejs.org/docs/latest/api/)
* fs: [https://nodejs.org/api/fs.html](https://nodejs.org/api/fs.html)
* path: [https://nodejs.org/api/path.html](https://nodejs.org/api/path.html)
* os: [https://nodejs.org/api/os.html](https://nodejs.org/api/os.html)
* http: [https://nodejs.org/api/http.html](https://nodejs.org/api/http.html)

---

## ⚠️ Notas Importantes

1. **__dirname y __filename**: En ES Modules no están disponibles por defecto, debes recrearlos usando `import.meta.url`.

2. **Extensiones de archivo (ESM)**: Los imports en ES Modules normalmente deben incluir extensión `.js` (según config / runtime).

3. **Promesas**: Muchos módulos nativos tienen versiones basadas en promesas (ej: `fs/promises`).

4. **Puertos**: Los ejemplos del servidor usan puertos diferentes:

   * CJS: **3000**
   * ESM: **3001**
     (puedes ejecutarlos simultáneamente)

5. **Temperaturas en macOS**:

   * `osx-cpu-temp` da **CPU package** (no por núcleo).
   * `iSMC` puede o no exponer sensores dependiendo del modelo/hardware.
