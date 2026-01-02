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

## 📁 Estructura

```
modulos-nativos/
├── cjs/                      # Ejemplos con CommonJS
│   ├── fs-example.js        # File System
│   ├── path-example.js      # Path
│   ├── os-example.js        # Operating System
│   └── http-example.js      # HTTP Server
├── esm/                      # Ejemplos con ES Modules
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

# HTTP Server (ejecuta en background)
node modulos-nativos/cjs/http-example.js
# Visita: http://localhost:3000
```

### Ejemplos ES Modules

```bash
# File System
node modulos-nativos/esm/fs-example.js

# Path
node modulos-nativos/esm/path-example.js

# Operating System
node modulos-nativos/esm/os-example.js

# HTTP Server (ejecuta en background)
node modulos-nativos/esm/http-example.js
# Visita: http://localhost:3001
```

## 🔍 Diferencias en la Importación

### CommonJS
```javascript
const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');

// __dirname y __filename disponibles automáticamente
console.log(__dirname);
console.log(__filename);
```

### ES Modules
```javascript
import fs from 'fs';
import path from 'path';
import os from 'os';
import http from 'http';
import { fileURLToPath } from 'url';

// __dirname y __filename deben recrearse
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
