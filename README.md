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
│   ├── index.js           # Archivo principal que importa módulos CJS
│   └── math.js            # Módulo con funciones matemáticas (CJS)
├── esm/                    # Ejemplos de ES Modules
│   ├── index.js           # Archivo principal que importa módulos ESM
│   ├── math.js            # Módulo con funciones matemáticas (ESM)
│   └── package.json       # Configuración para habilitar ES Modules
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
node cjs/index.js
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
node esm/index.js
```

**Salida esperada:**
```
=== Ejemplo ES Modules (ESM) ===
Suma: 5 + 3 = 8
Resta: 5 - 3 = 2
Multiplicación: 5 * 3 = 15
```

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

**Ejemplo:**
```javascript
// Exportar
export function funcion() { }

// Importar
import { funcion } from './modulo.js';
```

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

## 📖 Recursos Adicionales

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
