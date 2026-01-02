# Extensiones de Archivo: .cjs y .mjs

## 📌 ¿Por qué usar extensiones específicas?

Node.js permite forzar el sistema de módulos usando extensiones de archivo específicas:

- **`.cjs`** → Fuerza CommonJS (siempre usa `require`)
- **`.mjs`** → Fuerza ES Modules (siempre usa `import`)
- **`.js`** → Depende de la configuración en `package.json`

## 🔧 Cuándo usar cada extensión

### `.cjs` (CommonJS)
Usa `.cjs` cuando:
- Tu proyecto tiene `"type": "module"` en `package.json` pero necesitas un archivo CommonJS
- Quieres ser explícito sobre el uso de CommonJS
- Necesitas compatibilidad con herramientas antiguas

### `.mjs` (ES Modules)
Usa `.mjs` cuando:
- Tu proyecto NO tiene `"type": "module"` pero quieres usar ES Modules en archivos específicos
- Quieres ser explícito sobre el uso de ES Modules
- No quieres agregar configuración en `package.json`

## 📂 Estructura de Ejemplos

```
extensiones/
├── cjs-extension/          # Ejemplos con .cjs
│   ├── index.cjs          # Archivo principal
│   └── utils.cjs          # Módulo de utilidades
├── mjs-extension/          # Ejemplos con .mjs
│   ├── index.mjs          # Archivo principal
│   └── utils.mjs          # Módulo de utilidades
└── README.md              # Este archivo
```

## ▶️ Ejecutar los Ejemplos

### Ejemplo con .cjs
```bash
node extensiones/cjs-extension/index.cjs
```

**Salida esperada:**
```
=== Ejemplo con extensión .cjs ===
¡Hola, Node.js!
¡Adiós, CommonJS!

Operaciones matemáticas:
10 + 5 = 15
10 - 5 = 5
10 * 5 = 50
10 / 5 = 2
```

### Ejemplo con .mjs
```bash
node extensiones/mjs-extension/index.mjs
```

**Salida esperada:**
```
=== Ejemplo con extensión .mjs ===
¡Hola, Node.js!
¡Adiós, ES Modules!

Operaciones matemáticas:
10 + 5 = 15
10 - 5 = 5
10 * 5 = 50
10 / 5 = 2
```

## 📊 Comparación

| Característica | .js | .cjs | .mjs |
|----------------|-----|------|------|
| Depende de config | ✅ Sí | ❌ No | ❌ No |
| Fuerza CommonJS | ❌ No | ✅ Sí | ❌ No |
| Fuerza ES Modules | ❌ No | ❌ No | ✅ Sí |
| Necesita package.json | ✅ A veces | ❌ No | ❌ No |
| Explícito | ❌ No | ✅ Sí | ✅ Sí |

## 💡 Mejores Prácticas

1. **Usa `.js` con configuración** para proyectos nuevos y consistentes
2. **Usa `.cjs` o `.mjs`** cuando necesites mezclar sistemas de módulos
3. **Sé consistente** dentro de cada proyecto
4. **Documenta** qué sistema usas en tu README

## 🔗 Ventajas de las Extensiones Explícitas

✅ **Claridad**: Se ve inmediatamente qué sistema usa el archivo  
✅ **Flexibilidad**: Puedes mezclar CommonJS y ESM en el mismo proyecto  
✅ **Sin configuración**: No necesitas `package.json` para que funcionen  
✅ **Compatibilidad**: Funciona en todas las versiones modernas de Node.js

## ⚠️ Consideraciones

- Los archivos `.mjs` **deben** incluir la extensión al importar:
  ```javascript
  import { funcion } from './modulo.mjs'; // ✅ Correcto
  import { funcion } from './modulo';     // ❌ Error
  ```

- Los archivos `.cjs` funcionan como siempre:
  ```javascript
  const modulo = require('./modulo.cjs'); // ✅ Correcto
  const modulo = require('./modulo');     // ✅ También funciona
  ```
