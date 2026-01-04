# Cómo Funciona Node.js Por Dentro: De Síncrono a Paralelo

## 📚 Índice

1. [Arquitectura de Node.js](#arquitectura-de-nodejs)
2. [Event Loop - El Corazón de Node.js](#event-loop)
3. [Ejecución Síncrona](#ejecución-síncrona)
4. [Callbacks y Operaciones Asíncronas](#callbacks-y-operaciones-asíncronas)
5. [Ejecución Secuencial con Async/Await](#ejecución-secuencial-con-asyncawait)
6. [Ejecución Paralela](#ejecución-paralela)
7. [Comparación y Recomendaciones](#comparación-y-recomendaciones)

---

## Arquitectura de Node.js

Node.js está construido sobre **V8** (motor de JavaScript de Chrome) y **libuv** (biblioteca de I/O asíncrono).

### Componentes Principales

```
┌─────────────────────────────────────────────────┐
│                JavaScript Code                   │
│                 (Tu aplicación)                  │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│              V8 JavaScript Engine                │
│           (Ejecuta código JavaScript)            │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│               Node.js Bindings                   │
│        (fs, http, crypto, path, etc.)           │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│                    libuv                         │
│    (Event Loop + Thread Pool + I/O async)       │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│           Sistema Operativo                      │
│     (File System, Network, Processes)           │
└─────────────────────────────────────────────────┘
```

### Conceptos Clave

#### 1. **Call Stack (Pila de Llamadas)**
- Estructura LIFO (Last In, First Out)
- Rastrea qué función se está ejecutando
- Solo puede ejecutar **UNA función a la vez** (single-threaded)

#### 2. **Event Loop (Bucle de Eventos)**
- Mecanismo que permite operaciones no bloqueantes
- Monitorea el Call Stack y las colas de tareas
- Ejecuta callbacks cuando las operaciones asíncronas terminan

#### 3. **Task Queue / Callback Queue**
- Cola de tareas pendientes
- Callbacks de operaciones completadas esperan aquí
- El Event Loop mueve tareas de aquí al Call Stack

#### 4. **Thread Pool (Pool de Hilos)**
- Por defecto: 4 hilos (configurable con `UV_THREADPOOL_SIZE`)
- Maneja operaciones pesadas (fs, crypto, DNS lookup)
- No todas las operaciones asíncronas usan el thread pool

---

## Event Loop

El Event Loop es el corazón de Node.js. Permite operaciones asíncronas en un entorno single-threaded.

### Fases del Event Loop

```
   ┌───────────────────────────┐
┌─>│           timers          │  setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  I/O callbacks pendientes
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  Interno
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │  Recupera eventos I/O
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │  setImmediate
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │      close callbacks      │  socket.on('close')
│  └─────────────┬─────────────┘
└────────────────┘
```

### Regla del Event Loop

**El Event Loop solo ejecuta código del Call Stack cuando este está vacío.**

---

## Ejecución Síncrona

### ¿Cómo Funciona?

El código se ejecuta línea por línea, **bloqueando** todo hasta terminar.

### Diagrama de Flujo

```javascript
console.log('1');
const data = fs.readFileSync('archivo.txt'); // BLOQUEA
console.log('2');
```

```
┌─────────────────────────────────────────┐
│           Call Stack                     │
├─────────────────────────────────────────┤
│  1. console.log('1')       [EJECUTANDO] │
└─────────────────────────────────────────┘
          ↓ (completa)
┌─────────────────────────────────────────┐
│  2. fs.readFileSync()      [BLOQUEANDO] │ ← Aquí se DETIENE
│     Leyendo archivo...                   │   TODO el programa
│     Esperando...                         │
│     [████████░░░░░░░░░░░] 50%          │
└─────────────────────────────────────────┘
          ↓ (después de 1 segundo)
┌─────────────────────────────────────────┐
│  3. console.log('2')       [EJECUTANDO] │
└─────────────────────────────────────────┘
```

### Lo Que Pasa Internamente

1. **Call Stack ejecuta `console.log('1')`** → Imprime y sale
2. **Call Stack ejecuta `fs.readFileSync()`**
   - Node.js llama al sistema operativo
   - **El hilo principal ESPERA** la respuesta (bloqueado)
   - No puede procesar nada más
   - Event Loop está **parado**
3. **Después de 1s, el archivo se lee** → Retorna datos
4. **Call Stack ejecuta `console.log('2')`** → Imprime y sale

### Timeline

```
t=0ms:     console.log('1')           ✅
t=1ms:     fs.readFileSync() INICIA  ⏸️  [BLOQUEA TODO]
t=1001ms:  fs.readFileSync() TERMINA ✅
t=1002ms:  console.log('2')          ✅
```

### Ventajas

✅ **Código simple y fácil de entender**
✅ **Flujo lineal y predecible**
✅ **Sin problemas de race conditions**
✅ **Útil para scripts simples**

### Desventajas

❌ **Bloquea el Event Loop**
❌ **Inutiliza el servidor durante la operación**
❌ **Horrible para producción**
❌ **No puede manejar concurrencia**
❌ **Performance terrible con múltiples operaciones**

### Cuándo Usar

- ✅ Scripts de inicialización (solo una vez)
- ✅ CLI tools simples
- ✅ Cargar configuración al inicio
- ❌ **NUNCA en servidores web**
- ❌ **NUNCA en APIs**

---

## Callbacks y Operaciones Asíncronas

### ¿Cómo Funciona?

Las operaciones se delegan al **sistema operativo** o **thread pool**, y Node.js continúa ejecutando código. Cuando termina, el callback se ejecuta.

### Diagrama de Flujo

```javascript
console.log('1');
fs.readFile('archivo.txt', (err, data) => {
  console.log('3 - Archivo leído');
});
console.log('2');
```

```
┌─────────────────────────────────────────────────────────────┐
│                        Call Stack                            │
├─────────────────────────────────────────────────────────────┤
│  1. console.log('1')                          [EJECUTA] ✅  │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  2. fs.readFile()                             [DELEGA]  ⚡  │
│     → Envía operación al Thread Pool                        │
│     → Registra callback en tabla de callbacks               │
│     → SALE DEL CALL STACK inmediatamente                    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  3. console.log('2')                          [EJECUTA] ✅  │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│              Call Stack está VACÍO                           │
│              Event Loop ESPERA eventos                       │
└─────────────────────────────────────────────────────────────┘

     [Mientras tanto, en el Thread Pool...]
     
┌─────────────────────────────────────────────────────────────┐
│                      Thread Pool                             │
├─────────────────────────────────────────────────────────────┤
│  Thread 1: Leyendo archivo... [████████░░░░] 60%           │
│  Thread 2: (disponible)                                      │
│  Thread 3: (disponible)                                      │
│  Thread 4: (disponible)                                      │
└─────────────────────────────────────────────────────────────┘
                          ↓ (1 segundo después)
┌─────────────────────────────────────────────────────────────┐
│  Thread 1: ¡Terminó! → Envía callback a Task Queue          │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                      Task Queue                              │
├─────────────────────────────────────────────────────────────┤
│  [callback de fs.readFile] ← Esperando                      │
└─────────────────────────────────────────────────────────────┘
                          ↓ (Event Loop detecta)
┌─────────────────────────────────────────────────────────────┐
│                      Call Stack                              │
├─────────────────────────────────────────────────────────────┤
│  4. callback(err, data)                       [EJECUTA] ✅  │
│     console.log('3 - Archivo leído')                        │
└─────────────────────────────────────────────────────────────┘
```

### Timeline Detallado

```
t=0ms:      console.log('1')                    ✅ (Call Stack)
t=1ms:      fs.readFile() INICIA                ⚡ (delega a Thread Pool)
t=2ms:      fs.readFile() SALE del Call Stack   ✅
t=3ms:      console.log('2')                    ✅ (Call Stack)
t=4ms:      Call Stack VACÍO                    💤 (Event Loop espera)

[Thread Pool trabaja en paralelo...]
t=5ms:      Thread 1: Leyendo archivo...        🔄
t=100ms:    Thread 1: Leyendo archivo...        🔄
t=500ms:    Thread 1: Leyendo archivo...        🔄

t=1001ms:   Thread 1: ¡TERMINADO!               ✅
t=1002ms:   Callback → Task Queue               📋
t=1003ms:   Event Loop → mueve callback         ⬆️
t=1004ms:   console.log('3 - Archivo leído')    ✅ (Call Stack)
```

### Proceso Interno Paso a Paso

1. **`console.log('1')`** → Call Stack → Ejecuta → Sale
2. **`fs.readFile()`** → Call Stack
   - Node.js registra el callback
   - Delega la lectura al **Thread Pool** (libuv)
   - **Sale inmediatamente del Call Stack** (no bloquea)
3. **`console.log('2')`** → Call Stack → Ejecuta → Sale
4. **Call Stack vacío** → Event Loop entra en fase "poll"
5. **Thread Pool trabaja** en segundo plano (hilo separado)
6. **Archivo leído** → Thread Pool notifica a libuv
7. **libuv coloca el callback** en la Task Queue
8. **Event Loop detecta** Call Stack vacío + callback en cola
9. **Callback se mueve** al Call Stack
10. **`console.log('3 - Archivo leído')`** → Ejecuta

### Ventajas

✅ **No bloquea el Event Loop**
✅ **Permite concurrencia**
✅ **Puede manejar miles de operaciones simultáneas**
✅ **Ideal para I/O (archivos, red, base de datos)**
✅ **Aprovecha el Thread Pool**

### Desventajas

❌ **Callback Hell (pirámide de la muerte)**
❌ **Código difícil de leer**
❌ **Manejo de errores complicado**
❌ **Difícil de debugear**

### Cuándo Usar

- ✅ APIs y servidores web
- ✅ Operaciones I/O pesadas
- ✅ Cuando necesitas concurrencia
- ⚠️ Mejor usar Promises/async-await en código moderno

---

## Ejecución Secuencial con Async/Await

### ¿Cómo Funciona?

**Async/await** es **syntax sugar** sobre Promises. Por dentro, sigue siendo asíncrono, pero **parece** código síncrono.

### Diagrama de Flujo

```javascript
async function procesar() {
  console.log('1');
  const data1 = await leerArchivo1(); // 1 segundo
  console.log('2');
  const data2 = await leerArchivo2(); // 1 segundo
  console.log('3');
}
```

```
┌─────────────────────────────────────────────────────────────┐
│                      Call Stack                              │
├─────────────────────────────────────────────────────────────┤
│  1. procesar() - console.log('1')            [EJECUTA] ✅   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  2. await leerArchivo1()                                     │
│     → Crea Promise                                           │
│     → PAUSA la función procesar()                           │
│     → SALE del Call Stack                                   │
│     → Event Loop puede ejecutar otro código                 │
└─────────────────────────────────────────────────────────────┘
                          ↓
     [Thread Pool lee archivo1 durante 1 segundo...]
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  3. Promise de leerArchivo1() se RESUELVE                   │
│     → Event Loop REANUDA procesar()                         │
│     → data1 = resultado                                      │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  4. console.log('2')                         [EJECUTA] ✅   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  5. await leerArchivo2()                                     │
│     → Crea Promise                                           │
│     → PAUSA la función procesar()                           │
│     → SALE del Call Stack                                   │
└─────────────────────────────────────────────────────────────┘
                          ↓
     [Thread Pool lee archivo2 durante 1 segundo...]
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  6. Promise de leerArchivo2() se RESUELVE                   │
│     → Event Loop REANUDA procesar()                         │
│     → data2 = resultado                                      │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  7. console.log('3')                         [EJECUTA] ✅   │
└─────────────────────────────────────────────────────────────┘
```

### Timeline Detallado

```
t=0ms:      console.log('1')                    ✅
t=1ms:      await leerArchivo1()                ⏸️  (pausa, NO bloquea)
            → procesar() SALE del Call Stack
            → Event Loop LIBRE para otros códigos

[Thread Pool trabaja...]
t=2ms:      Thread 1: Leyendo archivo1...       🔄
t=500ms:    Thread 1: Leyendo archivo1...       🔄

t=1001ms:   archivo1 LISTO                      ✅
t=1002ms:   procesar() REANUDA                  ▶️
t=1003ms:   console.log('2')                    ✅
t=1004ms:   await leerArchivo2()                ⏸️  (pausa, NO bloquea)
            → procesar() SALE del Call Stack

[Thread Pool trabaja...]
t=1005ms:   Thread 1: Leyendo archivo2...       🔄
t=1500ms:   Thread 1: Leyendo archivo2...       🔄

t=2004ms:   archivo2 LISTO                      ✅
t=2005ms:   procesar() REANUDA                  ▶️
t=2006ms:   console.log('3')                    ✅
```

**TIEMPO TOTAL: ~2 segundos** (1s + 1s, secuencial)

### Diferencia Clave: Secuencial NO es Síncrono

```
SÍNCRONO (readFileSync):
├─ Bloquea el Event Loop ❌
├─ No puede ejecutar nada más
└─ Hilo principal CONGELADO

SECUENCIAL (await):
├─ NO bloquea el Event Loop ✅
├─ Puede ejecutar otro código
├─ Pero ESPERA cada operación antes de continuar
└─ Hilo principal LIBRE
```

### Ventajas

✅ **Código limpio y legible** (parece síncrono)
✅ **No bloquea el Event Loop**
✅ **Manejo de errores con try/catch**
✅ **Fácil de debugear**
✅ **Evita callback hell**
✅ **Más fácil razonar sobre el flujo**

### Desventajas

❌ **Más lento que paralelo** (si las operaciones son independientes)
❌ **Espera cada operación antes de continuar**
❌ **No aprovecha operaciones simultáneas**

### Cuándo Usar

- ✅ Cuando una operación **DEPENDE** de la anterior
- ✅ Flujo secuencial necesario
- ✅ Código que debe ser legible
- ✅ Cuando el orden importa

```javascript
// ✅ BIEN: Secuencial necesario (dependen entre sí)
const usuario = await obtenerUsuario(id);
const pedidos = await obtenerPedidos(usuario.id); // Depende de usuario
const detalles = await obtenerDetalles(pedidos[0].id); // Depende de pedidos
```

---

## Ejecución Paralela

### ¿Cómo Funciona?

Lanza **múltiples operaciones asíncronas al mismo tiempo** y espera que **TODAS** terminen.

### Diagrama de Flujo

```javascript
async function procesar() {
  console.log('1');
  
  const [data1, data2, data3] = await Promise.all([
    leerArchivo1(), // 1 segundo
    leerArchivo2(), // 1 segundo
    leerArchivo3()  // 1 segundo
  ]);
  
  console.log('2');
}
```

```
┌─────────────────────────────────────────────────────────────┐
│                      Call Stack                              │
├─────────────────────────────────────────────────────────────┤
│  1. console.log('1')                         [EJECUTA] ✅   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  2. Promise.all([...])                                       │
│     → Crea 3 Promises SIMULTÁNEAMENTE                       │
│     → leerArchivo1() → Thread Pool (Thread 1)               │
│     → leerArchivo2() → Thread Pool (Thread 2)               │
│     → leerArchivo3() → Thread Pool (Thread 3)               │
│     → SALE del Call Stack (no bloquea)                      │
└─────────────────────────────────────────────────────────────┘
                          ↓
     [Los 3 Thread Pool trabajan EN PARALELO]
     
┌─────────────────────────────────────────────────────────────┐
│                      Thread Pool                             │
├─────────────────────────────────────────────────────────────┤
│  Thread 1: Leyendo archivo1... [████████░░] 60%            │
│  Thread 2: Leyendo archivo2... [███████░░░] 50%            │
│  Thread 3: Leyendo archivo3... [█████░░░░░] 40%            │
│  Thread 4: (disponible)                                      │
└─────────────────────────────────────────────────────────────┘
                          ↓ (1 segundo después)
┌─────────────────────────────────────────────────────────────┐
│  Thread 1: ¡TERMINADO! → Resuelve Promise 1                 │
│  Thread 2: ¡TERMINADO! → Resuelve Promise 2                 │
│  Thread 3: ¡TERMINADO! → Resuelve Promise 3                 │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  3. Promise.all() se RESUELVE                                │
│     → Retorna [data1, data2, data3]                         │
│     → Event Loop REANUDA procesar()                         │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  4. console.log('2')                         [EJECUTA] ✅   │
└─────────────────────────────────────────────────────────────┘
```

### Timeline Detallado

```
t=0ms:      console.log('1')                    ✅

t=1ms:      Promise.all() INICIA                🚀
            → leerArchivo1() → Thread 1         🔄
            → leerArchivo2() → Thread 2         🔄
            → leerArchivo3() → Thread 3         🔄
            
t=2ms:      procesar() SALE del Call Stack      ⏸️

[Los 3 Threads trabajan SIMULTÁNEAMENTE]
t=3ms:      Thread 1: Leyendo... [20%]          🔄
            Thread 2: Leyendo... [20%]          🔄
            Thread 3: Leyendo... [20%]          🔄

t=500ms:    Thread 1: Leyendo... [50%]          🔄
            Thread 2: Leyendo... [50%]          🔄
            Thread 3: Leyendo... [50%]          🔄

t=1001ms:   Thread 1: ✅ TERMINADO
            Thread 2: ✅ TERMINADO
            Thread 3: ✅ TERMINADO

t=1002ms:   Promise.all() se RESUELVE           ✅
t=1003ms:   procesar() REANUDA                  ▶️
t=1004ms:   console.log('2')                    ✅
```

**TIEMPO TOTAL: ~1 segundo** (todas en paralelo, espera la más lenta)

### Comparación Visual: Secuencial vs Paralelo

```
SECUENCIAL (await uno por uno):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tarea 1: [████████████] 1s
                        → Tarea 2: [████████████] 1s
                                                  → Tarea 3: [████████████] 1s
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIEMPO TOTAL: 3 segundos


PARALELO (Promise.all):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tarea 1: [████████████] 1s
Tarea 2: [████████████] 1s
Tarea 3: [████████████] 1s
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIEMPO TOTAL: 1 segundo (3x más rápido)
```

### Ventajas

✅ **MUCHO MÁS RÁPIDO** para operaciones independientes
✅ **Mejor uso del Thread Pool**
✅ **Aprovecha múltiples hilos**
✅ **Reduce latencia total**
✅ **Mejor throughput**
✅ **Escalabilidad mejorada**

### Desventajas

❌ **Consume más recursos simultáneamente**
❌ **Puede saturar el Thread Pool**
❌ **No útil si hay dependencias entre operaciones**
❌ **Si una falla, Promise.all falla (usar allSettled)**

### Cuándo Usar

- ✅ Operaciones **INDEPENDIENTES** entre sí
- ✅ Múltiples peticiones API
- ✅ Leer múltiples archivos
- ✅ Procesar múltiples imágenes
- ✅ Consultas a múltiples bases de datos

```javascript
// ✅ BIEN: Operaciones independientes (paralelo es mejor)
const [usuarios, productos, categorias] = await Promise.all([
  obtenerUsuarios(),
  obtenerProductos(),
  obtenerCategorias()
]);

// ❌ MAL: Tienen dependencias (secuencial es necesario)
const [usuario, pedidos] = await Promise.all([
  obtenerUsuario(id),
  obtenerPedidos(id) // No depende del resultado de obtenerUsuario
]);
```

---

## Comparación y Recomendaciones

### Tabla Comparativa Completa

| Aspecto | Síncrono | Callbacks | Secuencial (await) | Paralelo (Promise.all) |
|---------|----------|-----------|-------------------|----------------------|
| **Bloquea Event Loop** | ❌ SÍ | ✅ NO | ✅ NO | ✅ NO |
| **Legibilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Velocidad (operaciones independientes)** | 🐌 Lento | 🚀 Rápido | 🐢 Lento | 🚀🚀 Muy Rápido |
| **Concurrencia** | ❌ Ninguna | ✅ Alta | ⚠️ Baja | ✅ Máxima |
| **Uso del Thread Pool** | ❌ No usa | ✅ Sí | ✅ Sí (uno a la vez) | ✅ Sí (múltiples) |
| **Complejidad de código** | ⭐ Muy simple | ⭐⭐⭐⭐⭐ Complejo | ⭐⭐ Simple | ⭐⭐⭐ Moderado |
| **Manejo de errores** | ⭐⭐⭐⭐ try/catch | ⭐⭐ if(err) | ⭐⭐⭐⭐⭐ try/catch | ⭐⭐⭐⭐ try/catch |
| **Uso en producción** | ❌ Evitar | ✅ Sí (legacy) | ✅ Sí | ✅ Sí |
| **Debugging** | ⭐⭐⭐⭐⭐ Fácil | ⭐⭐ Difícil | ⭐⭐⭐⭐ Fácil | ⭐⭐⭐ Moderado |

### Rendimiento Comparado

```
ESCENARIO: Leer 3 archivos (1 segundo cada uno)

┌────────────────────────────────────────────────────────┐
│                    SÍNCRONO                             │
│  readFileSync('1') → readFileSync('2') → readFileSync('3')
│  [████] 1s + [████] 1s + [████] 1s = 3 segundos       │
│  Event Loop: ❌ BLOQUEADO TODO EL TIEMPO               │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                  CALLBACKS / SECUENCIAL                 │
│  await read('1') → await read('2') → await read('3')   │
│  [████] 1s + [████] 1s + [████] 1s = 3 segundos       │
│  Event Loop: ✅ LIBRE (puede procesar otros requests)  │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                     PARALELO                            │
│  Promise.all([read('1'), read('2'), read('3')])        │
│  [████] 1s (todas simultáneamente) = 1 segundo         │
│  Event Loop: ✅ LIBRE                                  │
│  Mejora: 3x más rápido                                 │
└────────────────────────────────────────────────────────┘
```

### Ejemplo Real: Servidor Web

Imagina un servidor recibiendo **100 requests simultáneos**:

#### Con Código Síncrono ❌

```javascript
// ❌ DESASTRE
app.get('/usuarios', (req, res) => {
  const usuarios = fs.readFileSync('usuarios.json'); // 100ms
  res.json(usuarios);
});
```

```
Request 1:  [████████] 100ms
Request 2:              [████████] 100ms (esperó 100ms)
Request 3:                          [████████] 100ms (esperó 200ms)
...
Request 100:                                     [████████] 100ms (esperó 9900ms)

TIEMPO TOTAL: 10 segundos
Usuarios felices: 0
```

#### Con Código Asíncrono ✅

```javascript
// ✅ EXCELENTE
app.get('/usuarios', async (req, res) => {
  const usuarios = await fs.promises.readFile('usuarios.json');
  res.json(usuarios);
});
```

```
Request 1:  [████████] 100ms
Request 2:  [████████] 100ms (simultáneo)
Request 3:  [████████] 100ms (simultáneo)
...
Request 100: [████████] 100ms (simultáneo)

TIEMPO TOTAL: ~100ms (con Thread Pool de 4 hilos, ~2.5s)
Usuarios felices: 100
```

### Árbol de Decisión

```
┌─────────────────────────────────────────────┐
│   ¿Qué patrón de ejecución usar?            │
└─────────────────┬───────────────────────────┘
                  │
         ┌────────┴────────┐
         │ ¿Es un servidor │
         │   o API?        │
         └────────┬────────┘
                  │
         ┌────────┴────────┐
         │      NO         │    SÍ
         │   (script)      │
         └────────┬────────┘
                  │                  │
         ┌────────┴────────┐        │
         │ ¿Se ejecuta     │        │
         │  solo 1 vez?    │        │
         └────────┬────────┘        │
                  │                  │
         ┌────────┴────────┐        │
         │      SÍ         │    NO  │
         │                 │        │
      ✅ Síncrono OK    ❌ Async    │
                                    │
                           ┌────────┴────────┐
                           │ ¿Hay múltiples  │
                           │  operaciones?   │
                           └────────┬────────┘
                                    │
                           ┌────────┴────────┐
                           │       NO        │    SÍ
                           │                 │
                        ✅ await          ┌──┴──────┐
                                          │ ¿Son    │
                                          │ indep.? │
                                          └──┬──────┘
                                             │
                                    ┌────────┴────────┐
                                    │      SÍ         │   NO
                                    │                 │
                              ✅ Promise.all()    ✅ await seq.
```

### Reglas de Oro

1. **NUNCA uses código síncrono en servidores web/APIs**
   ```javascript
   // ❌ NUNCA
   const data = fs.readFileSync('file.txt');
   
   // ✅ SIEMPRE
   const data = await fs.promises.readFile('file.txt');
   ```

2. **Si operaciones son independientes → Paralelo**
   ```javascript
   // ✅ BIEN: 3x más rápido
   const [users, posts, comments] = await Promise.all([
     getUsers(),
     getPosts(),
     getComments()
   ]);
   ```

3. **Si hay dependencias → Secuencial**
   ```javascript
   // ✅ CORRECTO
   const user = await getUser(id);
   const orders = await getOrders(user.id); // Depende de user
   ```

4. **Limita concurrencia si es necesario**
   ```javascript
   // ❌ MAL: 10000 operaciones simultáneas (saturación)
   await Promise.all(
     muchasOperaciones.map(op => procesar(op))
   );
   
   // ✅ BIEN: 10 a la vez
   await procesarEnLotes(muchasOperaciones, 10);
   ```

---

## 🎯 Conclusión

### Por Detrás (Internals)

1. **Node.js es single-threaded** para JavaScript, pero usa **Thread Pool** (libuv) para I/O
2. **Event Loop** es el corazón: mueve callbacks de Task Queue a Call Stack
3. **Operaciones asíncronas** NO bloquean el Event Loop → concurrencia masiva
4. **Thread Pool** (4 hilos por defecto) maneja operaciones pesadas en paralelo

### Estrategia Recomendada

```javascript
// 🏆 PATRÓN IDEAL

// 1. Operaciones independientes → Paralelo
const [config, permisos, preferencias] = await Promise.all([
  cargarConfig(),
  cargarPermisos(userId),
  cargarPreferencias(userId)
]);

// 2. Operaciones dependientes → Secuencial
const usuario = await obtenerUsuario(userId);
const pedidos = await obtenerPedidos(usuario.id);

// 3. Mezcla: Paralelo donde se puede, secuencial donde se debe
const usuario = await obtenerUsuario(userId);

const [pedidos, facturas, direcciones] = await Promise.all([
  obtenerPedidos(usuario.id),
  obtenerFacturas(usuario.id),
  obtenerDirecciones(usuario.id)
]);
```

### Ventajas Finales

**Código Asíncrono con Paralelo cuando es posible:**
- ✅ **10-100x** más throughput que síncrono
- ✅ **Miles de requests** simultáneos
- ✅ **Event Loop libre** para procesar más trabajo
- ✅ **Mejor experiencia de usuario** (menor latencia)
- ✅ **Uso eficiente** del Thread Pool

**¡Node.js fue diseñado para brillar con código asíncrono!** 🚀
