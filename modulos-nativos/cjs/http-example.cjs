// Ejemplo de módulo nativo: HTTP con CommonJS

const http = require('node:http');

console.log('=== Módulo http - CommonJS ===\n');

const PORT = 3000;
const HOST = 'localhost';

// Crear un servidor HTTP básico
const server = http.createServer((req, res) => {
  console.log(`📨 Petición recibida: ${req.method} ${req.url}`);

  // Configurar headers
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // Enrutamiento simple
  if (req.url === '/') {
    res.statusCode = 200;
    res.end(`
      <html>
        <head><title>Servidor Node.js</title></head>
        <body>
          <h1>¡Hola desde Node.js!</h1>
          <p>Este es un servidor HTTP básico usando CommonJS</p>
          <ul>
            <li><a href="/about">Acerca de</a></li>
            <li><a href="/api">API</a></li>
          </ul>
        </body>
      </html>
    `);
  } else if (req.url === '/about') {
    res.statusCode = 200;
    res.end(`
      <html>
        <head><title>Acerca de</title></head>
        <body>
          <h1>Acerca de este servidor</h1>
          <p>Servidor HTTP creado con Node.js y CommonJS</p>
          <a href="/">Volver al inicio</a>
        </body>
      </html>
    `);
  } else if (req.url === '/api') {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({
      mensaje: 'API endpoint',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    }));
  } else {
    res.statusCode = 404;
    res.end(`
      <html>
        <head><title>404 Not Found</title></head>
        <body>
          <h1>404 - Página no encontrada</h1>
          <p>La ruta "${req.url}" no existe</p>
          <a href="/">Volver al inicio</a>
        </body>
      </html>
    `);
  }
});

// Iniciar el servidor
server.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}/`);
  console.log('   Presiona Ctrl+C para detener el servidor\n');
});

// Manejo de errores
server.on('error', (err) => {
  console.error('❌ Error en el servidor:', err.message);
});
