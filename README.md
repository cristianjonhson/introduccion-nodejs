# Introducción a Node.js

## 📋 Descripción del Proyecto

Este repositorio contiene ejemplos prácticos y código de referencia para aprender los conceptos fundamentales de Node.js. El proyecto está diseñado para demostrar las diferencias entre los sistemas de módulos CommonJS (CJS) y ES Modules (ESM), proporcionando ejemplos claros y funcionales de cada uno.

## 🚀 Tecnologías

- **Node.js** v18.20.8 o superior
- **JavaScript** (ES6+)
- **Git** para control de versiones

## 📁 Estructura del Proyecto

```
introduccion-nodejs/
├── cjs/                    # Ejemplos de CommonJS
│   ├── index.cjs          # Archivo principal que importa módulos CJS
│   └── math.cjs           # Módulo con funciones matemáticas (CJS)
├── esm/                    # Ejemplos de ES Modules
│   ├── index.mjs          # Archivo principal que importa módulos ESM
│   ├── math.mjs           # Módulo con funciones matemáticas (ESM)
│   └── package.json       # Configuración para habilitar ES Modules
├── extensiones/            # Ejemplos con extensiones .cjs y .mjs
│   ├── cjs-extension/     # Ejemplos con extensión .cjs
│   │   ├── index.cjs      # Archivo principal CommonJS
│   │   └── utils.cjs      # Módulo de utilidades
│   ├── mjs-extension/     # Ejemplos con extensión .mjs
│   │   ├── index.mjs      # Archivo principal ES Modules
│   │   └── utils.mjs      # Módulo de utilidades
│   └── README.md          # Documentación de extensiones
├── modulos-nativos/        # Ejemplos de módulos nativos de Node.js
│   ├── cjs/               # Módulos nativos con CommonJS
│   │   ├── fs-example.cjs  # File System
│   │   ├── ls-example.cjs  # Listar directorios (comando ls)
│   │   ├── path-example.cjs # Path
│   │   ├── os-example.cjs  # Operating System
│   │   ├── http-example.cjs # HTTP Server
│   │   ├── uptime-example.cjs # Uptime del sistema
│   │   └── process-example.cjs # Process (info y control)
│   ├── esm/               # Módulos nativos con ES Modules
│   │   ├── fs-example.mjs  # File System
│   │   ├── ls-example.mjs  # Listar directorios (comando ls)
│   │   ├── path-example.mjs # Path
│   │   ├── os-example.mjs  # Operating System
│   │   ├── http-example.mjs # HTTP Server
│   │   ├── uptime-example.mjs # Uptime del sistema
│   │   ├── process-example.mjs # Process
│   │   └── package.json   # Configuración ES Modules
│   ├── async-sync/        # Patrones asíncronos y Event Loop
│   │   ├── cjs/          # Ejemplos con CommonJS
│   │   │   ├── sincrono.cjs              # Operaciones síncronas
│   │   │   ├── asincrono-callbacks.cjs   # Callbacks
│   │   │   ├── asincrono-promesas.cjs    # Promesas y async/await
│   │   │   ├── promisify-example.cjs     # util.promisify
│   │   │   ├── promisify-custom.cjs      # Funciones personalizadas
│   │   │   ├── iife-example.cjs          # IIFE
│   │   │   └── parallel-example.cjs      # Ejecución paralela
│   │   ├── esm/          # Ejemplos con ES Modules
│   │   │   ├── sincrono.mjs
│   │   │   ├── asincrono-promesas.mjs
│   │   │   ├── promisify-example.mjs
│   │   │   ├── iife-example.mjs
│   │   │   ├── parallel-example.mjs
│   │   │   └── package.json
│   │   ├── CALLBACKS_VS_PROMESAS.md # Guía de callbacks vs promesas
│   │   ├── IIFE.md                   # Guía de IIFE
│   │   ├── PARALLEL.md               # Guía de ejecución paralela
│   │   ├── INTERNALS.md              # Event Loop y Thread Pool
│   │   └── README.md                 # Documentación de async-sync
│   └── README.md          # Documentación de módulos nativos
├── index.js               # Ejemplo básico con globalThis
└── README.md              # Este archivo
```

## 🛠️ Requisitos Previos

Antes de ejecutar este proyecto, asegúrate de tener instalado:

1. **Node.js** (versión 18.x o superior)
   - Descarga desde: https://nodejs.org/
   - Verifica la instalación:
     ```bash
     node --version
     ```

2. **Git** (opcional, para clonar el repositorio)
   - Verifica la instalación:
     ```bash
     git --version
     ```

## ⚙️ Configuración

### Clonar el Repositorio

```bash
git clone https://github.com/cristianjonhson/introduccion-nodejs.git
cd introduccion-nodejs
```

### Sin Configuración Adicional

Este proyecto no requiere instalación de dependencias externas. Los ejemplos utilizan únicamente módulos nativos de Node.js.

## ▶️ Cómo Ejecutar

### Ejemplo Básico con globalThis

```bash
node index.js
```

**Salida esperada:**
```
Hola, Node.js!
```

### Ejemplo CommonJS (CJS)

```bash
node cjs/index.cjs
```

**Salida esperada:**
```
=== Ejemplo CommonJS (CJS) ===
Suma: 5 + 3 = 8
Resta: 5 - 3 = 2
Multiplicación: 5 * 3 = 15
```

### Ejemplo ES Modules (ESM)

```bash
node esm/index.mjs
```

**Salida esperada:**
```
=== Ejemplo ES Modules (ESM) ===
Suma: 5 + 3 = 8
Resta: 5 - 3 = 2
Multiplicación: 5 * 3 = 15
```

### Ejemplos con Extensiones .cjs y .mjs

```bash
# CommonJS forzado con .cjs
node extensiones/cjs-extension/index.cjs

# ES Modules forzado con .mjs
node extensiones/mjs-extension/index.mjs
```

Ver más detalles en [extensiones/README.md](extensiones/README.md)

### Ejemplos de Módulos Nativos

```bash
# Módulo File System (fs)
node modulos-nativos/cjs/fs-example.cjs
node modulos-nativos/esm/fs-example.mjs

# Listar directorios (comando ls)
node modulos-nativos/cjs/ls-example.cjs
node modulos-nativos/esm/ls-example.mjs

# Módulo Path
node modulos-nativos/cjs/path-example.cjs
node modulos-nativos/esm/path-example.mjs

# Módulo Operating System (os)
node modulos-nativos/cjs/os-example.cjs
node modulos-nativos/esm/os-example.mjs

# Uptime del sistema
node modulos-nativos/cjs/uptime-example.cjs
node modulos-nativos/esm/uptime-example.mjs

# Process (información y control del proceso)
node modulos-nativos/cjs/process-example.cjs
node modulos-nativos/esm/process-example.mjs

# Process con argumentos (probar parser)
node modulos-nativos/cjs/process-example.cjs --name Juan --age 25 --verbose

# Servidor HTTP (ejecuta en background)
node modulos-nativos/cjs/http-example.cjs  # Puerto 3000
node modulos-nativos/esm/http-example.mjs  # Puerto 3001
```

### Ejemplos de Patrones Asíncronos

```bash
# Operaciones Síncronas vs Asíncronas
node modulos-nativos/async-sync/cjs/sincrono.cjs
node modulos-nativos/async-sync/cjs/asincrono-callbacks.cjs
node modulos-nativos/async-sync/cjs/asincrono-promesas.cjs

# util.promisify - Convertir callbacks a promesas
node modulos-nativos/async-sync/cjs/promisify-example.cjs
node modulos-nativos/async-sync/cjs/promisify-custom.cjs

# IIFE - Immediately Invoked Function Expression
node modulos-nativos/async-sync/cjs/iife-example.cjs

# Ejecución Paralela - Promise.all, allSettled, race, any
node modulos-nativos/async-sync/cjs/parallel-example.cjs

# ES Modules con Top-level await
node modulos-nativos/async-sync/esm/asincrono-promesas.mjs
node modulos-nativos/async-sync/esm/promisify-example.mjs
node modulos-nativos/async-sync/esm/iife-example.mjs
node modulos-nativos/async-sync/esm/parallel-example.mjs
```

**📚 Guías completas disponibles:**
- [async-sync/README.md](modulos-nativos/async-sync/README.md) - Introducción a patrones asíncronos
- [CALLBACKS_VS_PROMESAS.md](modulos-nativos/async-sync/CALLBACKS_VS_PROMESAS.md) - Callbacks vs Promesas detallado
- [IIFE.md](modulos-nativos/async-sync/IIFE.md) - Guía completa de IIFE
- [PARALLEL.md](modulos-nativos/async-sync/PARALLEL.md) - Ejecución paralela con Promise methods
- [INTERNALS.md](modulos-nativos/async-sync/INTERNALS.md) - Event Loop, Thread Pool y arquitectura de Node.js

Ver más detalles en [modulos-nativos/README.md](modulos-nativos/README.md)

## 📚 Conceptos Principales

### CommonJS (CJS)

- Sistema de módulos **tradicional** de Node.js
- Usa `require()` para importar módulos
- Usa `module.exports` o `exports` para exportar
- Carga **síncrona** de módulos
- Extensión de archivo: `.js`

**Ejemplo:**
```javascript
// Exportar
module.exports = { funcion };

// Importar
const { funcion } = require('./modulo');
```

### ES Modules (ESM)

- Sistema de módulos **moderno** de JavaScript (estándar ECMAScript)
- Usa `import` para importar módulos
- Usa `export` para exportar
- Carga **asíncrona** de módulos
- Requiere `"type": "module"` en `package.json` o extensión `.mjs`
- Soporta **Top-level await** (await sin función async)

**Ejemplo:**
```javascript
// Exportar
export function funcion() { }

// Importar
import { funcion } from './modulo.js';

// Top-level await (solo en ES Modules)
const data = await fetch('https://api.example.com');
```

### Patrones Asíncronos en Node.js

Node.js utiliza un modelo de **I/O no bloqueante** basado en el **Event Loop**:

#### **1. Código Síncrono (Bloqueante)**
```javascript
const data = fs.readFileSync('file.txt'); // ❌ Bloquea el Event Loop
```

#### **2. Callbacks (Asíncrono tradicional)**
```javascript
fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

#### **3. Promesas y async/await (Asíncrono moderno)**
```javascript
// Secuencial
const data = await fs.promises.readFile('file.txt');

// Paralelo (3x más rápido para operaciones independientes)
const [data1, data2, data3] = await Promise.all([
  readFile1(),
  readFile2(),
  readFile3()
]);
```

#### **4. IIFE (Immediately Invoked Function Expression)**
```javascript
(function() {
  console.log('Se ejecuta inmediatamente');
})();
```

**📖 Para entender cómo funciona Node.js internamente:**
- Event Loop y Thread Pool → [INTERNALS.md](modulos-nativos/async-sync/INTERNALS.md)
- Callbacks vs Promesas → [CALLBACKS_VS_PROMESAS.md](modulos-nativos/async-sync/CALLBACKS_VS_PROMESAS.md)
- Ejecución Paralela → [PARALLEL.md](modulos-nativos/async-sync/PARALLEL.md)
- IIFE → [IIFE.md](modulos-nativos/async-sync/IIFE.md)

### globalThis

- Objeto global **unificado** que funciona en cualquier entorno JavaScript
- En Node.js equivale a `global`
- En navegadores equivale a `window`
- Proporciona una forma consistente de acceder al objeto global

## 🔍 Diferencias Clave

| Característica | CommonJS | ES Modules |
|----------------|----------|------------|
| Sintaxis import | `require()` | `import` |
| Sintaxis export | `module.exports` | `export` |
| Carga | Síncrona | Asíncrona |
| Scope | Dinámico | Estático |
| Extensión archivo | `.js` | `.js` + config o `.mjs` |
| Compatibilidad | Node.js tradicional | Node.js moderno + navegadores |
| Top-level await | ❌ No | ✅ Sí |

## ⚡ Patrones de Ejecución

| Patrón | Velocidad | Bloquea Event Loop | Cuándo usar |
|--------|-----------|-------------------|-------------|
| **Síncrono** | 🐌 Lento | ❌ Sí (malo) | Solo scripts de inicialización |
| **Callbacks** | 🚀 Rápido | ✅ No | Legacy code, APIs antiguas |
| **Secuencial (await)** | 🐢 Moderado | ✅ No | Operaciones con dependencias |
| **Paralelo (Promise.all)** | 🚀🚀 Muy rápido | ✅ No | Operaciones independientes |

### Ejemplo de Mejora de Performance

```javascript
// ❌ Secuencial: 3 segundos
const user = await getUser();
const posts = await getPosts();
const comments = await getComments();

// ✅ Paralelo: 1 segundo (3x más rápido)
const [user, posts, comments] = await Promise.all([
  getUser(),
  getPosts(),
  getComments()
]);
```

## � Mejores Prácticas

### Prefijo `node:` para Módulos Nativos

Desde **Node.js 16+**, se recomienda usar el prefijo `node:` al importar módulos nativos:

```javascript
// ✅ Recomendado (Node.js 16+)
const fs = require('node:fs');
import fs from 'node:fs';

// ❌ Forma antigua (aún funciona)
const fs = require('fs');
import fs from 'fs';
```

**Ventajas:**
- Distingue claramente módulos nativos de paquetes de terceros
- Evita conflictos de nombres
- Mejora el rendimiento
- Es el estándar oficial de Node.js

Todos los ejemplos en este repositorio usan esta práctica.

## �📖 Recursos Adicionales

- [Documentación oficial de Node.js](https://nodejs.org/docs/latest/api/)
- [MDN - JavaScript Modules](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules)
- [Node.js - Modules: CommonJS vs ESM](https://nodejs.org/api/modules.html)

## 👤 Autor

**cristianjonhson**
- GitHub: [@cristianjonhson](https://github.com/cristianjonhson)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

---

⭐ Si este proyecto te resulta útil, no olvides darle una estrella en GitHub!
