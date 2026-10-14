# Portafolio Ejecutivo de Azul Ruiz

Sitio web personal, portafolio y catálogo profesional de nivel ultra-premium, 100% responsive (Mobile-First y Desktop) y listo para alojar en GitHub Pages.

## �estructura del Proyecto

```
portfolio-azul-ruiz/
├── index.html        - estructura semántica HTML5 con todas las secciones
├── css/styles.css    - estilos visuales glassmorphism, animaciones, paleta de colores
├── js/data.js        - datos centralizados (perfil, experiencia, catálogo, etc.)
├── js/app.js         - lógica interactiva (renderizado, filtros, tema, modals, QR/vCard)
├── assets/
│   ├── foto-azul.jpg       - foto de perfil
│   ├── CV_Azul_Ruiz_Virtual.pdf  - CV digital/ATS
│   ├── CV_Azul_Ruiz_Impresion.pdf  - CV impresión/diseño
│   └── favicon.svg       - favicon azul marino con iniciales "AR"
└── README.md         - documentación del proyecto
```

## �cómo agregar nuevos ítems al catálogo

El catálogo es escalable y alimentado desde `js/data.js`. Para agregar un nuevo elemento:

1. **Abre** `js/data.js`
2. **Agrega** un nuevo objeto al arreglo `PORTFOLIO_ITEMS` siguiendo este formato:

```javascript
{
  id: 'único',           // identificador único (string)
  titulo: 'Título',      // título principal
  categoria: 'categoria',// 'gestion-excel', 'academico-economico', 'oratoria-liderazgo'
  etiqueta: 'Etiqueta',  // etiqueta que aparecerá en la tarjeta
  preview: 'Vista previa', // descripción corta que aparecerá en la grilla
  detalles?: [],        // array de strings (opcional) - características detalladas
  modal?: {             // objeto modal (opcional)
    titulo: 'Título modal',
    categoria: 'categoría',
    vistaPrevia: 'Vista previa',
    descripcion: 'Descripción larga',
    tecnologias: ['tec1', 'tec2']
  }
}
```

3. **Personaliza** los colores de categoría en `js/app.js` (función `filtrarPortafolio` o el switch de renderizado) si es necesario.
4. **Guarda** el archivo - el renderizado dinámico en el navegador se actualizará automáticamente.

### Categorías disponibles:
- `gestion-excel` - Tarjeta con tono azul institucional
- `academico-economico` - Tarjeta with tono esmeralda
- `oratoria-liderazgo` - Tarjeta con tono morado
- `todos` - Muestra todos los items

## �ejecución local (servidor de prueba)

Para levantar el servidor local y probar todas las interactividades:

### Opción A: Python (recomendado)

1. Asegúrate de tener Python instalado (versión 3.7+)
2. Navega al directorio del proyecto
3. Ejecuta:

```bash
python -m http.server --directory . --port 8000
```

4. Abre tu navegador en `http://localhost:8000`
5. Todas las funcionalidades estarán operativas:
   - Toggle Dark/Light Mode con persistencia en localStorage
   - Filtros del catálogo y simulador Excel
   - Modales al hacer clic en elementos del catálogo
   - Toast notification al copiar email
   - Menú móvil responsive
   - Tarjeta QR y descarga vCard

### Opción B: Node.js

```bash
npx serve .
```

### Opción C: VS Code Live Server

Si tienes la extensión "Live Server" instalada, simplemente haz clic en el botón "Go Live" en la esquina inferior derecha.

## �colores de la paleta

- **Modo Claro:** `#F8FAFC` (fondo), `#FFFFFF` (tarjetas), `#0F172A` (texto principal)
- **Modo Oscuro:** `#0B0F19` (fondo), `#111827` (tarjetas), `#F8FAFC` (texto principal)
- Acentos: `#1E3A8A` (Navy), `#2563EB` (Royal Blue), `#10B981` (Esmeralda)

## �navegación

Las secciones del sitio están ancladas en elNavbar y pueden navegarse mediante enlaces internos:
- `#about` - Sobre Mí
- `#experience` - Experiencia
- `#simulator` - Simulador Excel
- `#catalogo` - Catálogo
- `#education` - Educación
- `#contacto` - Contacto

## �features principales

- ✅ Light Mode ejecutivo impecable por defecto
- ✅ Modo oscuro alternativo con toggle persistente
- ✅ Navbar glassmorphism flotante
- ✅ Hero section con badges animados y chips de cargos
- ✅ Simulador interactivo de planilla de control de cobros en Excel
- ✅ Catálogo filtrable con 4 categorías
- ✅ Modales detalles para cada item del catálogo
- ✅ Bento Grid de pilares fundamentales
- ✅ Flujo de proceso administrativo en 4 etapas
- ✅ Tarjeta QR corporativa con código QR a LinkedIn
- ✅ Descarga dinámica de archivo vCard (.vcf)
- ✅ Intersection Observer para animaciones al scroll
- ✅ 100% responsive (Mobile-First)
- ✅ Google Fonts: Plus Jakarta Sans, Instrument Serif, JetBrains Mono
- ✅ Lucide Icons completamente funcionales
- ✅ SEO metaetiquetas y OpenGraph configuradas