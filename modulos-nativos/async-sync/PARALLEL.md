# Ejecución Paralela en JavaScript/Node.js

## 📚 ¿Qué es la Ejecución Paralela?

La **ejecución paralela** permite ejecutar múltiples operaciones asíncronas **simultáneamente** en lugar de una tras otra, reduciendo significativamente el tiempo total de ejecución.

### Concepto Visual

```
SECUENCIAL (3 segundos total):
Tarea 1 [███████] 1s
        → Tarea 2 [███████] 1s
                  → Tarea 3 [███████] 1s

PARALELO (1 segundo total):
Tarea 1 [███████] 1s
Tarea 2 [███████] 1s
Tarea 3 [███████] 1s
```

## 🎯 Ejecución Secuencial vs Paralela

### Secuencial (Una tras otra)

```javascript
// ❌ Lento: 3 segundos total
const datos1 = await obtenerDatos1(); // 1 segundo
const datos2 = await obtenerDatos2(); // 1 segundo
const datos3 = await obtenerDatos3(); // 1 segundo
```

### Paralela (Simultánea)

```javascript
// ✅ Rápido: 1 segundo total
const [datos1, datos2, datos3] = await Promise.all([
  obtenerDatos1(), // 1 segundo
  obtenerDatos2(), // 1 segundo
  obtenerDatos3()  // 1 segundo
]);
```

## 🛠️ Métodos de Promise para Paralelismo

JavaScript ofrece **4 métodos principales** para manejar múltiples promesas:

### 1. Promise.all()

Espera a que **TODAS** las promesas se resuelvan. Si **UNA falla, TODAS fallan**.

```javascript
const resultados = await Promise.all([
  fetch('/api/users'),
  fetch('/api/products'),
  fetch('/api/orders')
]);

// ✅ Obtienes [users, products, orders]
// ❌ Si una falla, Promise.all rechaza inmediatamente
```

**Cuándo usar:**
- ✅ Necesitas **TODOS** los resultados para continuar
- ✅ Si falta uno, no tiene sentido continuar
- ✅ Quieres fallar rápido si algo sale mal

**Ejemplo real:**
```javascript
// Cargando datos de una página
const [usuario, configuracion, permisos] = await Promise.all([
  obtenerUsuario(userId),
  obtenerConfiguracion(),
  obtenerPermisos(userId)
]);

// Si falta cualquiera, no puedes mostrar la página
```

### 2. Promise.allSettled()

Espera a que **TODAS** las promesas terminen (exitosa o fallidas). **NUNCA rechaza**.

```javascript
const resultados = await Promise.allSettled([
  fetch('/api/users'),      // ✅ Éxito
  fetch('/api/products'),   // ❌ Falla
  fetch('/api/orders')      // ✅ Éxito
]);

// Siempre obtienes un array con el estado de cada promesa
resultados.forEach(resultado => {
  if (resultado.status === 'fulfilled') {
    console.log('✅ Éxito:', resultado.value);
  } else {
    console.log('❌ Error:', resultado.reason);
  }
});
```

**Cuándo usar:**
- ✅ Quieres intentar todas las operaciones
- ✅ Algunos fallos son aceptables
- ✅ Necesitas un reporte de éxitos/fallos
- ✅ No quieres que un fallo detenga todo

**Ejemplo real:**
```javascript
// Enviando notificaciones a múltiples servicios
const resultados = await Promise.allSettled([
  enviarEmail(usuario),
  enviarSMS(usuario),
  enviarPushNotification(usuario),
  enviarSlack(usuario)
]);

// Registrar cuáles funcionaron y cuáles fallaron
const exitosos = resultados.filter(r => r.status === 'fulfilled').length;
console.log(`${exitosos}/4 notificaciones enviadas`);
```

### 3. Promise.race()

Retorna cuando la **PRIMERA** promesa termina (éxito o fallo).

```javascript
const resultado = await Promise.race([
  fetch('https://server1.com/api/data'),
  fetch('https://server2.com/api/data'),
  fetch('https://server3.com/api/data')
]);

// El servidor más rápido gana
// Las otras promesas siguen ejecutándose en segundo plano
```

**Cuándo usar:**
- ✅ Te sirve con la primera respuesta
- ✅ Timeout de operaciones
- ✅ Múltiples fuentes de datos (la más rápida gana)
- ✅ Redundancia de servidores

**Ejemplo real - Timeout:**
```javascript
function conTimeout(promesa, ms) {
  const timeout = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  
  return Promise.race([promesa, timeout]);
}

// Falla si tarda más de 5 segundos
const datos = await conTimeout(
  fetch('/api/data'),
  5000
);
```

**Ejemplo real - Múltiples APIs:**
```javascript
// Obtener tasa de cambio del servidor más rápido
const tasaCambio = await Promise.race([
  fetch('https://api1.exchangerate.com/rate'),
  fetch('https://api2.exchangerate.com/rate'),
  fetch('https://api3.exchangerate.com/rate')
]);
```

### 4. Promise.any()

Retorna cuando la **PRIMERA** promesa se **resuelve exitosamente**. Ignora rechazos hasta que una tenga éxito.

```javascript
const resultado = await Promise.any([
  fetch('https://server1.com/api/data'), // ❌ Falla
  fetch('https://server2.com/api/data'), // ✅ Éxito
  fetch('https://server3.com/api/data')  // ✅ Éxito (pero llega tarde)
]);

// Retorna el resultado del server2 (primera exitosa)
// Solo falla si TODAS las promesas fallan
```

**Cuándo usar:**
- ✅ Te sirve con **UNA** respuesta exitosa
- ✅ Redundancia/fallback entre servicios
- ✅ Ignorar fallos temporales
- ✅ Múltiples fuentes, te sirve la primera que funcione

**Ejemplo real - Fallback:**
```javascript
// Intentar cargar imagen desde múltiples CDNs
const imagen = await Promise.any([
  fetch('https://cdn1.com/image.jpg'),  // ❌ CDN1 caído
  fetch('https://cdn2.com/image.jpg'),  // ✅ CDN2 funciona
  fetch('https://cdn3.com/image.jpg')   // ✅ CDN3 funciona (backup)
]);

// Si TODOS los CDN fallan, entonces Promise.any rechaza
```

## 📊 Tabla Comparativa

| Método | Resuelve cuando... | Rechaza cuando... | Uso común |
|--------|-------------------|-------------------|-----------|
| **Promise.all()** | TODAS exitosas | UNA falla | Necesitas todos los datos |
| **Promise.allSettled()** | TODAS terminan | NUNCA | Quieres intentar todas |
| **Promise.race()** | Primera termina | Primera falla | Timeout, la más rápida |
| **Promise.any()** | Primera exitosa | TODAS fallan | Fallback, redundancia |

## 💡 Ejemplos Prácticos Detallados

### Ejemplo 1: Cargar Dashboard

```javascript
// ❌ MAL: Secuencial (lento)
async function cargarDashboard() {
  const usuario = await obtenerUsuario();        // 500ms
  const estadisticas = await obtenerStats();     // 800ms
  const notificaciones = await obtenerNotifs();  // 300ms
  // Total: 1600ms
}

// ✅ BIEN: Paralelo (rápido)
async function cargarDashboard() {
  const [usuario, estadisticas, notificaciones] = await Promise.all([
    obtenerUsuario(),       // 500ms
    obtenerStats(),         // 800ms
    obtenerNotifs()         // 300ms
  ]);
  // Total: 800ms (el más lento)
}
```

### Ejemplo 2: Procesamiento de Imágenes

```javascript
// Procesar múltiples imágenes en paralelo
const imagenes = ['img1.jpg', 'img2.jpg', 'img3.jpg'];

// Secuencial: 3 segundos
for (const img of imagenes) {
  await procesarImagen(img); // 1 segundo cada una
}

// Paralelo: 1 segundo
await Promise.all(
  imagenes.map(img => procesarImagen(img))
);
```

### Ejemplo 3: APIs con Fallback

```javascript
// Intenta múltiples APIs, usa la primera que funcione
async function obtenerDatosConFallback() {
  try {
    return await Promise.any([
      fetch('https://api-principal.com/data'),
      fetch('https://api-backup1.com/data'),
      fetch('https://api-backup2.com/data')
    ]);
  } catch (error) {
    throw new Error('Todas las APIs fallaron');
  }
}
```

### Ejemplo 4: Timeout Genérico

```javascript
function conTimeout(promesa, ms, mensajeError = 'Timeout') {
  return Promise.race([
    promesa,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error(mensajeError)), ms)
    )
  ]);
}

// Uso
try {
  const datos = await conTimeout(
    fetch('/api/data'),
    5000,
    'La petición tardó más de 5 segundos'
  );
} catch (error) {
  console.error(error.message);
}
```

### Ejemplo 5: Notificaciones Múltiples

```javascript
async function notificarUsuario(usuario, mensaje) {
  // Intentar todos los métodos, reportar éxitos/fallos
  const resultados = await Promise.allSettled([
    enviarEmail(usuario.email, mensaje),
    enviarSMS(usuario.telefono, mensaje),
    enviarPush(usuario.deviceId, mensaje),
    enviarWhatsApp(usuario.whatsapp, mensaje)
  ]);
  
  // Analizar resultados
  const exitosos = resultados.filter(r => r.status === 'fulfilled');
  const fallidos = resultados.filter(r => r.status === 'rejected');
  
  console.log(`Notificaciones enviadas: ${exitosos.length}/4`);
  
  if (fallidos.length > 0) {
    console.log('Fallos:', fallidos.map(f => f.reason.message));
  }
  
  return exitosos.length > 0; // Al menos una notificación exitosa
}
```

## ⚡ Control de Concurrencia

A veces no quieres ejecutar **TODAS** las tareas al mismo tiempo (por ejemplo, limitar peticiones a una API).

### Procesamiento en Lotes

```javascript
async function procesarEnLotes(tareas, tamanoLote) {
  const resultados = [];
  
  // Procesar en grupos de N tareas a la vez
  for (let i = 0; i < tareas.length; i += tamanoLote) {
    const lote = tareas.slice(i, i + tamanoLote);
    const resultadosLote = await Promise.all(lote);
    resultados.push(...resultadosLote);
  }
  
  return resultados;
}

// Ejemplo: Procesar 100 archivos, 10 a la vez
const archivos = [...]; // 100 archivos
const resultados = await procesarEnLotes(
  archivos.map(archivo => () => procesarArchivo(archivo)),
  10 // 10 archivos simultáneos máximo
);
```

### Pool de Promesas

```javascript
class PromisePool {
  constructor(concurrencia) {
    this.concurrencia = concurrencia;
    this.enEjecucion = 0;
    this.cola = [];
  }
  
  async ejecutar(promesaFn) {
    while (this.enEjecucion >= this.concurrencia) {
      await Promise.race(this.cola);
    }
    
    this.enEjecucion++;
    
    const promesa = promesaFn()
      .finally(() => {
        this.enEjecucion--;
        const index = this.cola.indexOf(promesa);
        this.cola.splice(index, 1);
      });
    
    this.cola.push(promesa);
    
    return promesa;
  }
}

// Uso
const pool = new PromisePool(5); // Máximo 5 simultáneas

const tareas = Array.from({ length: 20 }, (_, i) => 
  () => obtenerDatos(i)
);

const resultados = await Promise.all(
  tareas.map(tarea => pool.ejecutar(tarea))
);
```

## 🎯 Mejores Prácticas

### ✅ DO (Hacer)

```javascript
// 1. Usar Promise.all para operaciones independientes
const [users, posts, comments] = await Promise.all([
  getUsers(),
  getPosts(),
  getComments()
]);

// 2. Usar Promise.allSettled cuando algunos fallos son OK
const resultados = await Promise.allSettled([
  enviarEmail(),
  actualizarCache(),
  registrarAnalytics()
]);

// 3. Implementar timeouts con Promise.race
const datos = await Promise.race([
  fetchData(),
  timeout(5000)
]);

// 4. Usar Promise.any para redundancia
const respuesta = await Promise.any([
  fetchFromPrimary(),
  fetchFromBackup(),
  fetchFromCache()
]);

// 5. Limitar concurrencia para muchas tareas
await procesarEnLotes(tareas, 10);
```

### ❌ DON'T (No hacer)

```javascript
// 1. No usar Promise.all cuando hay dependencias
// ❌ MAL
const [usuario, pedidos] = await Promise.all([
  obtenerUsuario(userId),
  obtenerPedidos(userId) // Depende del usuario
]);

// ✅ BIEN
const usuario = await obtenerUsuario(userId);
const pedidos = await obtenerPedidos(usuario.id);

// 2. No usar await en un loop para tareas independientes
// ❌ MAL: Secuencial
for (const id of ids) {
  await procesarId(id);
}

// ✅ BIEN: Paralelo
await Promise.all(ids.map(id => procesarId(id)));

// 3. No ignorar errores en Promise.all
// ❌ MAL
await Promise.all([...tareas]); // Si una falla, pierdes todo

// ✅ BIEN: Usa allSettled si algunos fallos son OK
const resultados = await Promise.allSettled([...tareas]);

// 4. No lanzar demasiadas peticiones simultáneas
// ❌ MAL: 1000 peticiones al mismo tiempo
await Promise.all(
  muchasUrls.map(url => fetch(url))
);

// ✅ BIEN: Limitar a 10 simultáneas
await procesarEnLotes(
  muchasUrls.map(url => () => fetch(url)),
  10
);
```

## 🔍 Debugging y Manejo de Errores

### Identificar qué promesa falló con Promise.all

```javascript
// ❌ Difícil de debug
await Promise.all([
  operacion1(),
  operacion2(),
  operacion3()
]);

// ✅ Mejor: Agregar contexto
await Promise.all([
  operacion1().catch(err => Promise.reject(`Op1: ${err.message}`)),
  operacion2().catch(err => Promise.reject(`Op2: ${err.message}`)),
  operacion3().catch(err => Promise.reject(`Op3: ${err.message}`))
]);

// ✅ Aún mejor: Usar allSettled y manejar individualmente
const resultados = await Promise.allSettled([
  { nombre: 'Op1', promesa: operacion1() },
  { nombre: 'Op2', promesa: operacion2() },
  { nombre: 'Op3', promesa: operacion3() }
]);

resultados.forEach((resultado, index) => {
  if (resultado.status === 'rejected') {
    console.error(`Falló ${resultado.nombre}:`, resultado.reason);
  }
});
```

## 📈 Medición de Performance

```javascript
async function medirParalelo() {
  console.time('Secuencial');
  await tarea1();
  await tarea2();
  await tarea3();
  console.timeEnd('Secuencial'); // ~3000ms
  
  console.time('Paralelo');
  await Promise.all([tarea1(), tarea2(), tarea3()]);
  console.timeEnd('Paralelo'); // ~1000ms
  
  console.log('Mejora: 3x más rápido');
}
```

## 🔗 Recursos Adicionales

- [MDN - Promise.all()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [MDN - Promise.allSettled()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [MDN - Promise.race()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
- [MDN - Promise.any()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)
- [JavaScript.info - Promise API](https://javascript.info/promise-api)

## 📝 Conclusión

La ejecución paralela es una herramienta **poderosa** para mejorar el rendimiento:

**Usa Promise.all() cuando:**
- 🎯 Necesitas TODOS los resultados
- 🚫 Un fallo significa que todo falla

**Usa Promise.allSettled() cuando:**
- 🛡️ Quieres intentar todas las operaciones
- ✅ Algunos fallos son aceptables

**Usa Promise.race() cuando:**
- ⏱️ Te sirve la primera respuesta
- 🏁 Implementar timeouts

**Usa Promise.any() cuando:**
- 🎯 Te sirve UNA respuesta exitosa
- 🔄 Implementar fallbacks/redundancia

**Ventaja principal:** Reducir tiempos de ejecución de **segundos a milisegundos** para operaciones independientes.
