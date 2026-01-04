# Checklist de Ejemplos HTTP Pendientes

## 📋 Estado del Proyecto

### ✅ Ejemplos Completados

- [x] **Servidor HTTP básico** - Enrutamiento simple con HTML y JSON
- [x] **Manejo de diferentes métodos** - GET básico
- [x] **Respuestas con diferentes Content-Types** - HTML y JSON
- [x] **Manejo de 404** - Página no encontrada

---

## 📝 Ejemplos Pendientes por Implementar

### 🌐 1. Cliente HTTP (hacer peticiones)
- [ ] Crear `http-client-example.cjs` y `.mjs`
- [ ] Implementar `http.get()` para peticiones GET simples
- [ ] Implementar `http.request()` para peticiones POST
- [ ] Ejemplo de consumir una API pública (JSONPlaceholder)
- [ ] Manejo de respuestas con streams
- [ ] Manejo de errores de red
- [ ] Timeout y retry logic básico

**Casos de uso:**
- Consumir APIs REST
- Integración con servicios externos
- Testing de endpoints

---

### 📝 2. Manejo de POST con Body Parsing
- [ ] Crear `http-post-example.cjs` y `.mjs`
- [ ] Leer datos del body de peticiones POST
- [ ] Parsear JSON desde el body
- [ ] Parsear form-data (application/x-www-form-urlencoded)
- [ ] Crear formulario HTML que envía datos
- [ ] Validación básica de datos recibidos
- [ ] Responder con datos procesados

**Casos de uso:**
- Formularios de contacto
- APIs que reciben datos
- Registro/login básico

---

### 📁 3. Streaming de Archivos
- [ ] Crear `http-static-files.cjs` y `.mjs`
- [ ] Servir archivos estáticos (HTML, CSS, JS, imágenes)
- [ ] Usar `fs.createReadStream()` para eficiencia
- [ ] Detectar tipo MIME según extensión
- [ ] Headers apropiados (Content-Type, Cache-Control)
- [ ] Manejo de archivos no encontrados
- [ ] Servir archivos grandes sin cargar en memoria

**Casos de uso:**
- Servidor de archivos estáticos
- Hosting de imágenes
- CDN básico

---

### 📤 4. Upload de Archivos
- [ ] Crear `http-upload-example.cjs` y `.mjs`
- [ ] Recibir archivos mediante POST multipart/form-data
- [ ] Parsear boundary y extraer archivos
- [ ] Guardar archivos en el servidor
- [ ] Validar tipo y tamaño de archivos
- [ ] Crear formulario HTML con `<input type="file">`
- [ ] Mostrar confirmación de upload exitoso

**Casos de uso:**
- Upload de imágenes/documentos
- Procesamiento de archivos
- Sistema de attachments

---

### 🔄 5. Proxy HTTP Simple
- [ ] Crear `http-proxy-example.cjs` y `.mjs`
- [ ] Redirigir peticiones a otro servidor
- [ ] Modificar headers en tránsito
- [ ] Pasar cookies y autenticación
- [ ] Manejo de errores del servidor destino
- [ ] Logging de peticiones proxeadas
- [ ] Ejemplo con API externa real

**Casos de uso:**
- API Gateway básico
- Evitar problemas de CORS
- Load balancing simple

---

### 📡 6. Server-Sent Events (SSE)
- [ ] Crear `http-sse-example.cjs` y `.mjs`
- [ ] Configurar headers para SSE
- [ ] Enviar eventos periódicos al cliente
- [ ] Crear página HTML que recibe eventos
- [ ] Ejemplo de reloj en tiempo real
- [ ] Ejemplo de notificaciones
- [ ] Manejo de desconexión y reconexión

**Casos de uso:**
- Chat en tiempo real
- Notificaciones push
- Dashboard con datos en vivo
- Actualizaciones automáticas

---

### 🛣️ 7. Rutas Dinámicas y Query Strings
- [ ] Crear `http-routing-advanced.cjs` y `.mjs`
- [ ] Parsear URLs con parámetros `/users/:id`
- [ ] Extraer query strings `?name=value&age=25`
- [ ] Función helper para parsear URLs
- [ ] Router simple con RegEx
- [ ] Manejo de rutas anidadas
- [ ] Ejemplo de CRUD básico con rutas RESTful

**Casos de uso:**
- APIs RESTful
- Filtros y búsquedas
- Paginación

---

### 🔒 8. Seguridad y Rate Limiting
- [ ] Crear `http-security-example.cjs` y `.mjs`
- [ ] Implementar rate limiting por IP
- [ ] Headers de seguridad (CORS, CSP, X-Frame-Options)
- [ ] Validación de input básica
- [ ] Sanitización de HTML
- [ ] Logging de peticiones sospechosas
- [ ] Bloqueo temporal de IPs abusivas

**Casos de uso:**
- Protección contra DDoS
- Prevención de scraping
- APIs públicas seguras

---

### 🎨 9. Content Negotiation
- [ ] Crear `http-content-negotiation.cjs` y `.mjs`
- [ ] Detectar `Accept` header
- [ ] Responder con HTML, JSON o XML según cliente
- [ ] Compresión gzip/deflate
- [ ] Soporte para diferentes idiomas
- [ ] Versionado de API

**Casos de uso:**
- APIs que soportan múltiples formatos
- Internacionalización
- Optimización de ancho de banda

---

### 🍪 10. Cookies y Sessions
- [ ] Crear `http-cookies-example.cjs` y `.mjs`
- [ ] Leer cookies del request
- [ ] Establecer cookies en la respuesta
- [ ] Implementar sesiones básicas en memoria
- [ ] Ejemplo de login con sesión
- [ ] Manejo de expiración
- [ ] Cookie seguras (httpOnly, secure)

**Casos de uso:**
- Autenticación básica
- Carritos de compra
- Preferencias de usuario

---

## 📊 Progreso

- **Completados:** 1/11 (9%)
- **Pendientes:** 10/11 (91%)

## 🎯 Prioridad Sugerida

1. 🔥 **Alta prioridad:**
   - Cliente HTTP (muy común)
   - Manejo de POST (esencial para APIs)
   - Rutas dinámicas (fundamental para aplicaciones reales)

2. 🟡 **Media prioridad:**
   - Streaming de archivos (útil y eficiente)
   - Seguridad básica (importante siempre)
   - Cookies y sessions (común en apps web)

3. 🟢 **Baja prioridad:**
   - Upload de archivos (más avanzado)
   - SSE (caso específico)
   - Proxy (uso especializado)
   - Content negotiation (más avanzado)

---

## 📝 Notas

- Cada ejemplo debe tener versión CJS (.cjs) y ESM (.mjs)
- Incluir comentarios explicativos en español
- Agregar ejemplos de uso práctico
- Documentar en el README principal
- Probar cada ejemplo antes de commitear

---

## 🚀 Siguiente Paso

Comenzar con **Cliente HTTP** ya que complementa perfectamente el servidor actual y es muy útil para aprender a consumir APIs.
