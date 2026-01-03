# Operaciones Síncronas vs Asíncronas en Node.js

## 📚 Descripción

Esta carpeta contiene ejemplos que demuestran las diferencias entre operaciones **síncronas** (bloqueantes) y **asíncronas** (no bloqueantes) en Node.js, específicamente con el módulo File System (fs).

## 🔄 Conceptos Fundamentales

### Operaciones Síncronas (Bloqueantes)

Las operaciones síncronas **bloquean** la ejecución del programa hasta que se completan.

**Características:**
- ⏸️ Detienen la ejecución hasta terminar
- 📝 Código más simple y fácil de leer
- ⚠️ Pueden causar problemas de rendimiento
- 🎯 Útiles para scripts simples o tareas de inicialización

**Ejemplo:**
```javascript
const contenido = fs.readFileSync('archivo.txt', 'utf-8');
console.log(contenido); // Se ejecuta DESPUÉS de leer el archivo
```

### Operaciones Asíncronas (No Bloqueantes)

Las operaciones asíncronas **NO bloquean** la ejecución y permiten que el programa continúe.

**Características:**
- ▶️ El programa continúa ejecutándose
- 🚀 Mejor rendimiento y escalabilidad
- 🔄 Requieren callbacks, promesas o async/await
- 💡 Ideales para aplicaciones de producción

**Tres formas de manejar operaciones asíncronas:**

#### 1. Callbacks (tradicional)
```javascript
fs.readFile('archivo.txt', 'utf-8', (err, contenido) => {
  if (err) throw err;
  console.log(contenido);
});
console.log('Este mensaje aparece primero');
```

#### 2. Promesas (moderno)
```javascript
fs.promises.readFile('archivo.txt', 'utf-8')
  .then(contenido => console.log(contenido))
  .catch(err => console.error(err));
```

#### 3. Async/Await (más limpio)
```javascript
async function leer() {
  const contenido = await fs.promises.readFile('archivo.txt', 'utf-8');
  console.log(contenido);
}
```

## 📁 Estructura

```
async-sync/
├── cjs/                              # Ejemplos con CommonJS
│   ├── sincrono.js                  # Operaciones síncronas
│   ├── asincrono-callbacks.js       # Operaciones asíncronas con callbacks
│   ├── asincrono-promesas.js        # Operaciones asíncronas con promesas
│   ├── promisify-example.js         # Ejemplo de util.promisify
│   └── promisify-custom.js          # Funciones personalizadas con promisify
├── esm/                              # Ejemplos con ES Modules
│   ├── sincrono.js                  # Operaciones síncronas
│   ├── asincrono-promesas.js        # Operaciones asíncronas (Top-level await)
│   ├── promisify-example.js         # Ejemplo de util.promisify
│   └── package.json                 # Configuración ES Modules
├── CALLBACKS_VS_PROMESAS.md         # Guía completa de callbacks vs promesas
└── README.md                         # Este archivo
```

## ▶️ Cómo Ejecutar

### Ejemplos CommonJS

```bash
# Operaciones Síncronas
node modulos-nativos/async-sync/cjs/sincrono.js

# Operaciones Asíncronas con Callbacks
node modulos-nativos/async-sync/cjs/asincrono-callbacks.js

# Operaciones Asíncronas con Promesas
node modulos-nativos/async-sync/cjs/asincrono-promesas.js

# util.promisify - Convertir callbacks a promesas
node modulos-nativos/async-sync/cjs/promisify-example.js

# util.promisify - Funciones personalizadas
node modulos-nativos/async-sync/cjs/promisify-custom.js
```

### Ejemplos ES Modules

```bash
# Operaciones Síncronas
node modulos-nativos/async-sync/esm/sincrono.js

# Operaciones Asíncronas con Promesas (Top-level await)
node modulos-nativos/async-sync/esm/asincrono-promesas.js

# util.promisify
node modulos-nativos/async-sync/esm/promisify-example.js
```

## 🔍 Comparación Detallada

### Síncrono vs Asíncrono

| Aspecto | Síncrono | Asíncrono |
|---------|----------|-----------|
| **Ejecución** | Bloqueante | No bloqueante |
| **Orden** | Secuencial garantizado | Puede variar |
| **Rendimiento** | Menor en I/O intensivo | Mejor en I/O intensivo |
| **Complejidad** | Código más simple | Requiere manejo especial |
| **Uso CPU** | Ineficiente (espera) | Eficiente (continúa) |
| **Casos de uso** | Scripts, inicialización | Servidores, apps web |

### Callbacks vs Promesas vs Async/Await

| Característica | Callbacks | Promesas | Async/Await |
|----------------|-----------|----------|-------------|
| **Sintaxis** | Anidado (callback hell) | Encadenado (.then) | Secuencial |
| **Legibilidad** | ⭐⭐ Difícil | ⭐⭐⭐ Buena | ⭐⭐⭐⭐⭐ Excelente |
| **Manejo de errores** | try-catch múltiples | .catch() | try-catch único |
| **Composición** | Difícil | Moderada | Fácil |
| **Soporte** | Tradicional | Node.js 8+ | Node.js 8+ |

## 💡 ¿Cuándo usar cada uno?

### Usa Operaciones Síncronas cuando:
- ✅ Escribes scripts simples o comandos CLI
- ✅ Estás en fase de inicialización (cargar config)
- ✅ El orden de ejecución es crítico y simple
- ✅ El rendimiento no es una preocupación
- ✅ Lees archivos pequeños al inicio del programa

### Usa Operaciones Asíncronas cuando:
- ✅ Desarrollas servidores web o APIs
- ✅ Manejas múltiples operaciones de I/O
- ✅ El rendimiento y escalabilidad son importantes
- ✅ Necesitas manejar muchas conexiones simultáneas
- ✅ Trabajas con archivos grandes o múltiples archivos

## 🔧 util.promisify

`util.promisify` es una utilidad que convierte funciones que usan callbacks (patrón error-first) en funciones que devuelven promesas.

### ¿Por qué usar util.promisify?

- ✅ Convierte APIs antiguas con callbacks a promesas
- ✅ Permite usar async/await con código legacy
- ✅ Evita escribir wrappers manualmente
- ✅ Funciona con cualquier función error-first callback

### Ejemplo Básico

```javascript
const util = require('node:util');
const fs = require('node:fs');

// Convertir función con callback a promesa
const readFile = util.promisify(fs.readFile);

// Ahora puedes usar async/await
const contenido = await readFile('archivo.txt', 'utf-8');
console.log(contenido);
```

### Funciones Personalizadas

```javascript
// Tu función con callback
function miOperacion(param, callback) {
  setTimeout(() => {
    if (param) {
      callback(null, 'Éxito');
    } else {
      callback(new Error('Error'));
    }
  }, 1000);
}

// Convertir a promesa
const miOperacionPromise = util.promisify(miOperacion);

// Usar con async/await
const resultado = await miOperacionPromise(true);
```

### Alternativa Moderna: fs/promises

Para fs, es preferible usar el módulo integrado `fs/promises`:

```javascript
// Preferir esto (más moderno)
import fs from 'node:fs/promises';
const data = await fs.readFile('file.txt', 'utf-8');

// En lugar de
import fsCallback from 'node:fs';
import util from 'node:util';
const readFile = util.promisify(fsCallback.readFile);
const data = await readFile('file.txt', 'utf-8');
```

## 🎯 Mejores Prácticas

### Para Código Síncrono
```javascript
// ✅ Bueno: Script simple
const config = fs.readFileSync('config.json', 'utf-8');
const data = JSON.parse(config);
startApp(data);
```

### Para Código Asíncrono

#### ❌ Evitar: Callback Hell
```javascript
// Malo: Callbacks anidados
fs.readFile('1.txt', (err, data1) => {
  fs.readFile('2.txt', (err, data2) => {
    fs.readFile('3.txt', (err, data3) => {
      // ... muy anidado
    });
  });
});
```

#### ✅ Preferir: Async/Await con fs/promises
```javascript
// Bueno: Código limpio y legible
import fs from 'node:fs/promises';

try {
  const data1 = await fs.readFile('1.txt', 'utf-8');
  const data2 = await fs.readFile('2.txt', 'utf-8');
  const data3 = await fs.readFile('3.txt', 'utf-8');
  console.log(data1, data2, data3);
} catch (error) {
  console.error('Error:', error);
}
```

#### ✅ Operaciones Paralelas
```javascript
// Cuando las operaciones son independientes
const [data1, data2, data3] = await Promise.all([
  fs.readFile('1.txt', 'utf-8'),
  fs.readFile('2.txt', 'utf-8'),
  fs.readFile('3.txt', 'utf-8')
]);
```

## 🚀 Ventajas de ES Modules para Async

ES Modules soporta **Top-level await**, permitiendo usar `await` directamente sin función async:

```javascript
// CommonJS - Requiere función async
async function main() {
  const data = await fs.promises.readFile('file.txt');
}
main();

// ES Modules - Top-level await
const data = await fs.promises.readFile('file.txt');
```

## 📊 Rendimiento

**Ejemplo de servidor con 1000 usuarios concurrentes:**

| Operación | Tiempo Síncrono | Tiempo Asíncrono | Ganancia |
|-----------|-----------------|------------------|----------|
| Leer archivo | 10s (bloqueado) | 0.1s (paralelo) | 100x |
| 1000 lecturas | ~10,000s | ~10s | 1000x |

**Conclusión:** Las operaciones asíncronas son cruciales para aplicaciones escalables.

## 📖 Recursos Adicionales

- [Node.js - File System Documentation](https://nodejs.org/api/fs.html)
- [Node.js - fs/promises API](https://nodejs.org/api/fs.html#promises-api)
- [MDN - Async/Await](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)
- [Node.js - Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

## ⚠️ Notas Importantes

1. **fs/promises** es la forma moderna y recomendada para operaciones asíncronas
2. **Top-level await** solo funciona en ES Modules
3. Los métodos síncronos tienen sufijo **Sync** (ej: `readFileSync`)
4. Nunca uses operaciones síncronas en servidores de producción
5. Siempre maneja errores en operaciones asíncronas con try-catch o .catch()
