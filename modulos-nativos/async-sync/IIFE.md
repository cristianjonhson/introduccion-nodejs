# IIFE - Immediately Invoked Function Expression

## 📚 ¿Qué es una IIFE?

**IIFE** (Immediately Invoked Function Expression) es una función JavaScript que se ejecuta inmediatamente después de ser definida.

### Sintaxis Básica

```javascript
(function() {
  // Código que se ejecuta inmediatamente
})();
```

## 🎯 Propósito y Ventajas

### 1. **Crear Scope Privado**

Evita contaminar el scope global con variables temporales:

```javascript
// Sin IIFE - contamina el scope global
var temp = 'valor temporal';
console.log(temp);
// temp sigue existiendo

// Con IIFE - scope privado
(function() {
  var temp = 'valor temporal';
  console.log(temp);
})();
// temp no existe fuera de la IIFE
```

### 2. **Ejecución Inmediata**

El código se ejecuta sin necesidad de llamar a la función:

```javascript
// Función normal - requiere llamada
function init() {
  console.log('Inicializado');
}
init(); // Debes llamarla

// IIFE - se ejecuta automáticamente
(function() {
  console.log('Inicializado');
})();
```

### 3. **Evitar Conflictos de Nombres**

Protege contra sobrescritura de variables:

```javascript
var nombre = 'Global';

(function() {
  var nombre = 'Local'; // No afecta a la variable global
  console.log(nombre); // 'Local'
})();

console.log(nombre); // 'Global'
```

## 📖 Variaciones de Sintaxis

### 1. Sintaxis Estándar

```javascript
// Paréntesis alrededor de la función
(function() {
  console.log('IIFE estándar');
})();

// Paréntesis alrededor de todo
(function() {
  console.log('IIFE alternativa');
}());
```

### 2. Con Arrow Functions

```javascript
// Arrow function IIFE
(() => {
  console.log('Arrow IIFE');
})();

// Arrow function con parámetros
((nombre) => {
  console.log(`Hola, ${nombre}`);
})('Node.js');
```

### 3. IIFE Asíncrona

```javascript
// CommonJS
(async function() {
  const data = await fetchData();
  console.log(data);
})();

// ES Modules con Top-level await
await (async () => {
  const data = await fetchData();
  console.log(data);
})();
```

### 4. IIFE con Retorno

```javascript
const resultado = (function(a, b) {
  return a + b;
})(5, 3);

console.log(resultado); // 8
```

## 🔨 Casos de Uso Comunes

### 1. Module Pattern (Patrón Módulo)

Crear módulos con métodos públicos y privados:

```javascript
const miModulo = (function() {
  // Variables privadas
  let contador = 0;
  const apiKey = 'secreto';
  
  // Funciones privadas
  function validar() {
    return contador >= 0;
  }
  
  // API pública
  return {
    incrementar: function() {
      if (validar()) {
        contador++;
      }
      return contador;
    },
    decrementar: function() {
      contador--;
      return contador;
    },
    obtener: function() {
      return contador;
    }
  };
})();

// Uso
miModulo.incrementar(); // 1
miModulo.incrementar(); // 2
console.log(miModulo.obtener()); // 2
// apiKey no es accesible desde fuera
```

### 2. Inicialización de Aplicación

```javascript
const app = (function() {
  console.log('Cargando configuración...');
  
  const config = {
    env: process.env.NODE_ENV || 'development',
    port: 3000,
    apiUrl: 'http://localhost:3000/api'
  };
  
  console.log('Configuración cargada:', config);
  
  return {
    config,
    start: function() {
      console.log(`Servidor iniciado en puerto ${config.port}`);
    }
  };
})();

app.start();
```

### 3. Evitar Polución del Scope Global

```javascript
// ❌ Mal: Variables globales
var usuarios = [];
var productos = [];

function cargarUsuarios() { /* ... */ }
function cargarProductos() { /* ... */ }

// ✅ Bien: Todo dentro de IIFE
(function() {
  var usuarios = [];
  var productos = [];
  
  function cargarUsuarios() { /* ... */ }
  function cargarProductos() { /* ... */ }
  
  // Código de inicialización
  cargarUsuarios();
  cargarProductos();
})();
```

### 4. Configuración Condicional

```javascript
const configuracion = (function() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    return {
      apiUrl: 'http://localhost:3000',
      debug: true,
      logLevel: 'verbose'
    };
  } else {
    return {
      apiUrl: 'https://api.produccion.com',
      debug: false,
      logLevel: 'error'
    };
  }
})();

console.log(configuracion);
```

### 5. Contador Privado (Closure)

```javascript
const contador = (function() {
  let count = 0;
  
  return {
    incrementar: () => ++count,
    decrementar: () => --count,
    reset: () => count = 0,
    valor: () => count
  };
})();

contador.incrementar(); // 1
contador.incrementar(); // 2
console.log(contador.valor()); // 2
// No hay forma de acceder directamente a 'count'
```

## ⚡ IIFE en el Mundo Moderno

### Antes (Pre-ES6)

IIFE eran cruciales para:
- Crear módulos
- Evitar colisión de variables
- Scope privado

```javascript
// Patrón común en jQuery plugins
(function($) {
  $.fn.miPlugin = function() {
    // Plugin code
  };
})(jQuery);
```

### Ahora (ES6+)

Con ES Modules, muchos usos de IIFE ya no son necesarios:

```javascript
// ES Modules ya proveen scope aislado
// No necesitas IIFE para esto
export const miVariable = 'valor';

export function miFuncion() {
  // Esta función no contamina el scope global
}
```

### Cuándo Usar IIFE Hoy

✅ **Sí usar IIFE cuando:**
- Necesitas ejecutar código de inicialización inmediatamente
- Quieres crear closures con estado privado
- Trabajas con código que no usa módulos
- Necesitas aislar scope en código inline (ej: scripts en HTML)
- Quieres código que se auto-ejecute

❌ **No necesitas IIFE cuando:**
- Usas ES Modules (ya tienen scope aislado)
- Puedes usar funciones normales y llamarlas
- El código está en un módulo separado

## 📊 Comparación

| Aspecto | IIFE | Función Normal | ES Module |
|---------|------|----------------|-----------|
| **Ejecución** | Inmediata | Manual | Import manual |
| **Scope** | Privado | Compartido | Privado |
| **Reutilizable** | ❌ No | ✅ Sí | ✅ Sí |
| **Retorno** | ✅ Sí | ✅ Sí | ✅ Sí (export) |
| **Sintaxis** | Compleja | Simple | Moderna |

## 💡 Ejemplos Prácticos

### Singleton Pattern

```javascript
const Singleton = (function() {
  let instance;
  
  function createInstance() {
    return {
      nombre: 'Única Instancia',
      obtenerNombre: function() {
        return this.nombre;
      }
    };
  }
  
  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const obj1 = Singleton.getInstance();
const obj2 = Singleton.getInstance();
console.log(obj1 === obj2); // true - misma instancia
```

### Loop con Closure (Problema Clásico)

```javascript
// ❌ Problema: var no tiene block scope
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Imprime: 3, 3, 3
  }, 1000);
}

// ✅ Solución 1: IIFE
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // Imprime: 0, 1, 2
    }, 1000);
  })(i);
}

// ✅ Solución 2: let (ES6+)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Imprime: 0, 1, 2
  }, 1000);
}
```

## 🎓 Mejores Prácticas

### ✅ DO (Hacer)

```javascript
// 1. Usa IIFE para código de inicialización
(function() {
  console.log('App inicializada');
  configurarEventos();
  cargarDatos();
})();

// 2. Usa IIFE para crear closures
const cache = (function() {
  const storage = {};
  return {
    get: (key) => storage[key],
    set: (key, value) => storage[key] = value
  };
})();

// 3. Usa arrow functions para IIFE modernas
(() => {
  const mensaje = 'IIFE moderna';
  console.log(mensaje);
})();
```

### ❌ DON'T (No hacer)

```javascript
// 1. No uses IIFE cuando una función normal es suficiente
// ❌ Innecesario
(function procesar() {
  console.log('Procesando...');
})();

// ✅ Mejor
function procesar() {
  console.log('Procesando...');
}
procesar();

// 2. No abuses de IIFE en código con módulos ES6
// ❌ Redundante en un módulo
(function() {
  export const data = 'valor'; // Error: export dentro de IIFE
})();

// ✅ Mejor
export const data = 'valor';
```

## 🔗 Recursos Adicionales

- [MDN - IIFE](https://developer.mozilla.org/es/docs/Glossary/IIFE)
- [JavaScript.info - Function Expressions](https://javascript.info/function-expressions)
- [You Don't Know JS - Scope & Closures](https://github.com/getify/You-Dont-Know-JS)

## 📝 Conclusión

**IIFE** siguen siendo útiles en JavaScript moderno, especialmente para:
- Inicialización inmediata
- Creación de closures con estado privado
- Patrón módulo en entornos sin ES Modules

Sin embargo, con ES Modules y `let`/`const`, muchos casos de uso históricos de IIFE ya no son necesarios.

**Recomendación:**
- Usa IIFE cuando necesites ejecución inmediata o closures
- Prefiere ES Modules para organización de código
- Usa `let`/`const` en lugar de IIFE solo para scope
