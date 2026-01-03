# Callbacks vs Promesas en Node.js

## 📋 Introducción

Este documento explica las diferencias fundamentales entre **callbacks** y **promesas**, dos formas de manejar operaciones asíncronas en JavaScript/Node.js.

## 🔄 ¿Qué es un Callback?

Un **callback** es una función que se pasa como argumento a otra función y se ejecuta después de que se complete una operación.

### Ejemplo Básico

```javascript
// La función callback
function saludar(nombre) {
  console.log('¡Hola, ' + nombre + '!');
}

// Función que recibe un callback
function procesarUsuario(nombre, callback) {
  console.log('Procesando usuario...');
  callback(nombre); // Ejecuta el callback
}

// Uso
procesarUsuario('Juan', saludar);
// Output:
// Procesando usuario...
// ¡Hola, Juan!
```

### Callbacks en Operaciones Asíncronas

```javascript
// Patrón error-first callback
fs.readFile('archivo.txt', 'utf-8', function(error, contenido) {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Contenido:', contenido);
});

console.log('Este mensaje aparece PRIMERO');
```

## 🎯 ¿Qué es una Promesa?

Una **promesa** es un objeto que representa el resultado eventual de una operación asíncrona. Puede estar en uno de tres estados:

- **pending** (pendiente) - La operación aún no ha terminado
- **fulfilled** (cumplida) - La operación se completó con éxito
- **rejected** (rechazada) - La operación falló

### Ejemplo Básico

```javascript
const promesa = fs.promises.readFile('archivo.txt', 'utf-8');

promesa
  .then(contenido => {
    console.log('Contenido:', contenido);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Con Async/Await

```javascript
async function leerArchivo() {
  try {
    const contenido = await fs.promises.readFile('archivo.txt', 'utf-8');
    console.log('Contenido:', contenido);
  } catch (error) {
    console.error('Error:', error);
  }
}

leerArchivo();
```

## 🔍 Comparación Detallada

### 1. Sintaxis y Legibilidad

#### Callbacks - Callback Hell ❌

```javascript
// Callbacks anidados = difícil de leer y mantener
fs.readFile('1.txt', 'utf-8', (err, data1) => {
  if (err) return console.error(err);
  
  fs.readFile('2.txt', 'utf-8', (err, data2) => {
    if (err) return console.error(err);
    
    fs.readFile('3.txt', 'utf-8', (err, data3) => {
      if (err) return console.error(err);
      
      console.log(data1, data2, data3);
    });
  });
});
```

#### Promesas - Encadenamiento Limpio ✅

```javascript
// Encadenamiento horizontal
fs.promises.readFile('1.txt', 'utf-8')
  .then(data1 => {
    console.log('Archivo 1:', data1);
    return fs.promises.readFile('2.txt', 'utf-8');
  })
  .then(data2 => {
    console.log('Archivo 2:', data2);
    return fs.promises.readFile('3.txt', 'utf-8');
  })
  .then(data3 => {
    console.log('Archivo 3:', data3);
  })
  .catch(err => console.error('Error:', err));
```

#### Async/Await - Código Secuencial ⭐

```javascript
// Código que parece síncrono pero es asíncrono
async function leerArchivos() {
  try {
    const data1 = await fs.promises.readFile('1.txt', 'utf-8');
    const data2 = await fs.promises.readFile('2.txt', 'utf-8');
    const data3 = await fs.promises.readFile('3.txt', 'utf-8');
    
    console.log(data1, data2, data3);
  } catch (err) {
    console.error('Error:', err);
  }
}

leerArchivos();
```

### 2. Manejo de Errores

#### Callbacks

```javascript
// Error en CADA callback
fs.readFile('file1.txt', (err, data1) => {
  if (err) { console.error(err); return; }
  
  fs.readFile('file2.txt', (err, data2) => {
    if (err) { console.error(err); return; }
    
    fs.readFile('file3.txt', (err, data3) => {
      if (err) { console.error(err); return; }
      // Usar datos...
    });
  });
});
```

#### Promesas

```javascript
// UN SOLO .catch() para todos los errores
fs.promises.readFile('file1.txt')
  .then(data1 => fs.promises.readFile('file2.txt'))
  .then(data2 => fs.promises.readFile('file3.txt'))
  .then(data3 => {
    // Usar datos...
  })
  .catch(err => {
    // Maneja CUALQUIER error de la cadena
    console.error('Error:', err);
  });
```

#### Async/Await

```javascript
// try-catch tradicional
async function leerArchivos() {
  try {
    const data1 = await fs.promises.readFile('file1.txt');
    const data2 = await fs.promises.readFile('file2.txt');
    const data3 = await fs.promises.readFile('file3.txt');
    // Usar datos...
  } catch (err) {
    // Captura cualquier error
    console.error('Error:', err);
  }
}
```

### 3. Composición y Operaciones Paralelas

#### Callbacks - Difícil ❌

```javascript
// Ejecutar múltiples operaciones en paralelo es complicado
let completadas = 0;
const resultados = [];

fs.readFile('1.txt', (err, data1) => {
  if (err) return console.error(err);
  resultados[0] = data1;
  completadas++;
  if (completadas === 3) procesarResultados(resultados);
});

fs.readFile('2.txt', (err, data2) => {
  if (err) return console.error(err);
  resultados[1] = data2;
  completadas++;
  if (completadas === 3) procesarResultados(resultados);
});

fs.readFile('3.txt', (err, data3) => {
  if (err) return console.error(err);
  resultados[2] = data3;
  completadas++;
  if (completadas === 3) procesarResultados(resultados);
});
```

#### Promesas - Fácil ✅

```javascript
// Promise.all - Ejecuta todas en paralelo
Promise.all([
  fs.promises.readFile('1.txt', 'utf-8'),
  fs.promises.readFile('2.txt', 'utf-8'),
  fs.promises.readFile('3.txt', 'utf-8')
])
  .then(([data1, data2, data3]) => {
    console.log('Todos los archivos leídos:', data1, data2, data3);
  })
  .catch(err => console.error('Error:', err));

// Con async/await
async function leerTodos() {
  try {
    const [data1, data2, data3] = await Promise.all([
      fs.promises.readFile('1.txt', 'utf-8'),
      fs.promises.readFile('2.txt', 'utf-8'),
      fs.promises.readFile('3.txt', 'utf-8')
    ]);
    console.log(data1, data2, data3);
  } catch (err) {
    console.error('Error:', err);
  }
}
```

### 4. Retorno de Valores

#### Callbacks

```javascript
// No devuelven nada útil
const resultado = fs.readFile('file.txt', (err, data) => {
  console.log(data);
});

console.log(resultado); // undefined
```

#### Promesas

```javascript
// Devuelven una Promise que puedes manipular
const promesa = fs.promises.readFile('file.txt', 'utf-8');

console.log(promesa); // Promise { <pending> }

promesa.then(data => console.log(data));

// Puedes pasar la promesa, guardarla, encadenarla
const otraPromesa = promesa.then(data => data.toUpperCase());
```

### 5. Control de Flujo

#### Promesas tienen utilidades poderosas:

```javascript
// Promise.all - Espera a que TODAS se completen
Promise.all([promesa1, promesa2, promesa3])
  .then(resultados => console.log(resultados));

// Promise.race - Retorna la primera que se complete
Promise.race([promesa1, promesa2, promesa3])
  .then(primera => console.log('Primera:', primera));

// Promise.allSettled - Espera a todas, sin importar si fallan
Promise.allSettled([promesa1, promesa2, promesa3])
  .then(resultados => {
    resultados.forEach(resultado => {
      if (resultado.status === 'fulfilled') {
        console.log('Éxito:', resultado.value);
      } else {
        console.log('Fallo:', resultado.reason);
      }
    });
  });

// Promise.any - Primera que tenga éxito
Promise.any([promesa1, promesa2, promesa3])
  .then(primera => console.log('Primera exitosa:', primera));
```

## 📊 Tabla Comparativa Completa

| Característica | Callbacks | Promesas | Async/Await |
|----------------|-----------|----------|-------------|
| **Legibilidad** | ⭐⭐ Difícil con anidación | ⭐⭐⭐ Mejor con .then() | ⭐⭐⭐⭐⭐ Excelente |
| **Manejo de errores** | 🔴 Repetitivo en cada callback | ✅ .catch() centralizado | ✅ try-catch tradicional |
| **Callback Hell** | ❌ Sí, muy común | ✅ Evita anidación | ✅ Código lineal |
| **Composición** | ❌ Muy difícil | ✅ Promise.all, race, etc. | ✅ Fácil con await |
| **Operaciones paralelas** | ❌ Complicado | ✅ Promise.all() | ✅ await Promise.all() |
| **Retorno de valor** | ❌ undefined | ✅ Promise object | ✅ Valor directo |
| **Debugging** | 🔴 Stack traces confusos | ⚠️ Mejor pero no perfecto | ✅ Stack traces claros |
| **Compatibilidad** | ✅ Desde siempre | ✅ Node.js 0.12+ | ✅ Node.js 8+ |
| **Performance** | ⭐⭐⭐ Rápido | ⭐⭐⭐ Rápido | ⭐⭐⭐ Rápido |
| **Cancelación** | ⚠️ Manual | ⚠️ Limitada | ⚠️ Limitada |

## 💡 ¿Cuándo usar cada uno?

### Usa Callbacks cuando:
- ❌ (Prácticamente nunca en código moderno)
- Trabajas con APIs muy antiguas que no soportan promesas
- Implementas event listeners (como EventEmitter)

### Usa Promesas cuando:
- ✅ Necesitas composición compleja (Promise.all, Promise.race)
- ✅ Trabajas con código que devuelve promesas
- ✅ Quieres código más funcional con .then()

### Usa Async/Await cuando:
- ✅ **SIEMPRE que puedas** (es la forma moderna recomendada)
- ✅ Quieres código que parezca síncrono
- ✅ Necesitas mejor legibilidad
- ✅ Quieres debugging más fácil

## 🚀 Ejemplos Prácticos

### Convertir Callback a Promesa

```javascript
// Función con callback (antigua)
function leerArchivoCallback(ruta, callback) {
  fs.readFile(ruta, 'utf-8', callback);
}

// Convertir a promesa
function leerArchivoPromesa(ruta) {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, 'utf-8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// Uso
leerArchivoPromesa('file.txt')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Usar util.promisify para convertir automáticamente

```javascript
const util = require('node:util');
const fs = require('node:fs');

// Convertir función con callback a promesa
const readFilePromise = util.promisify(fs.readFile);

// Ahora puedes usar async/await
async function leer() {
  const data = await readFilePromise('file.txt', 'utf-8');
  console.log(data);
}
```

## 📖 Mejores Prácticas

### ✅ DO (Hacer)

```javascript
// 1. Usa async/await en código moderno
async function procesarDatos() {
  const data = await obtenerDatos();
  return procesarData(data);
}

// 2. Siempre maneja errores
async function seguro() {
  try {
    const data = await operacionRiesgosa();
  } catch (error) {
    console.error('Error:', error);
  }
}

// 3. Usa Promise.all para operaciones paralelas
const [usuarios, productos] = await Promise.all([
  obtenerUsuarios(),
  obtenerProductos()
]);
```

### ❌ DON'T (No hacer)

```javascript
// 1. No mezcles callbacks y promesas sin razón
async function malo() {
  fs.readFile('file.txt', (err, data) => { // ❌ Callback dentro de async
    console.log(data);
  });
}

// 2. No olvides el await
async function olvidoAwait() {
  const promesa = obtenerDatos(); // ❌ Falta await
  console.log(promesa); // Promise object, no el valor
}

// 3. No hagas promesas secuenciales si pueden ser paralelas
// ❌ Lento (secuencial)
const data1 = await obtener1();
const data2 = await obtener2();

// ✅ Rápido (paralelo)
const [data1, data2] = await Promise.all([obtener1(), obtener2()]);
```

## 🔗 Recursos Adicionales

- [MDN - Promesas](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN - Async/Await](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)
- [Node.js - util.promisify](https://nodejs.org/api/util.html#utilpromisifyoriginal)
- [Node.js - fs/promises](https://nodejs.org/api/fs.html#promises-api)

## 📝 Conclusión

**Recomendación actual (2026):**
- ✅ Usa **Async/Await** como estándar
- ✅ Usa **Promesas** cuando necesites composición avanzada
- ❌ Evita **Callbacks** excepto para eventos

El ecosistema de Node.js ha evolucionado hacia promesas y async/await por una razón: código más limpio, mantenible y fácil de entender.
