# 🎉 Invitación de Cumpleaños - Landing Page

Landing page moderna y minimalista para invitaciones de cumpleaños, creada con React + Tailwind CSS + Framer Motion.

## ✨ Características

- 🎨 Diseño minimalista y elegante con paleta de colores pastel
- 📱 Completamente responsive (mobile-first)
- 🖼️ Galería de fotos estilo Polaroid con animaciones
- 📍 Integración con Google Maps para ubicación
- 💬 Botón de confirmación por WhatsApp
- 🔗 Opción para compartir la invitación
- ⚡ Animaciones suaves con Framer Motion
- 🎯 Fácil personalización desde un solo objeto CONFIG

## 🚀 Instalación y Ejecución

### Requisitos previos
- Node.js 16+ instalado
- npm o yarn

### Pasos para ejecutar

1. **Instalar dependencias:**
```bash
npm install
```

2. **Ejecutar en modo desarrollo:**
```bash
npm run dev
```

3. **Construir para producción:**
```bash
npm run build
```

4. **Previsualizar build de producción:**
```bash
npm run preview
```

## 🎨 Personalización

Para personalizar la invitación, edita el objeto `CONFIG` en `src/App.jsx`:

```javascript
const CONFIG = {
  nombre: "Sofía",                    // Nombre del cumpleañero/a
  fecha: "15 de Diciembre, 2024",     // Fecha del evento
  hora: "18:00 hs",                   // Hora del evento
  
  ubicacion: {
    nombre: "Salón de Eventos La Terraza",
    direccion: "Av. Principal 1234, Tucumán",
    googleMapsUrl: "https://maps.google.com/..." // URL de Google Maps
  },
  
  whatsapp: {
    numero: "5493811234567",          // Formato: 549 + código área + número
    mensaje: "¡Hola! Confirmo mi asistencia al cumple 🎉"
  },
  
  imagenes: [
    "url-imagen-1.jpg",               // Array de URLs de imágenes
    "url-imagen-2.jpg",
    // ... más imágenes
  ]
};
```

### 📝 Notas importantes:

- **Número de WhatsApp:** Usar formato internacional sin espacios ni guiones (ej: `5493811234567`)
- **Imágenes:** Puedes usar URLs de Unsplash, Imgur, o subirlas a tu hosting
- **Google Maps:** Genera la URL desde Google Maps > Compartir > Copiar enlace

## 🎨 Paleta de Colores

La landing usa una paleta de colores neutros y pasteles:

- **Beige:** `#fdfcfb`, `#faf8f5`, `#f5f1ea`
- **Pastel Pink:** `#ffd6d6`
- **Pastel Peach:** `#ffe8d6`
- **Pastel Cream:** `#fff5e1`

Puedes modificar los colores en `tailwind.config.js`.

## 📦 Estructura del Proyecto

```
invitapp/
├── src/
│   ├── App.jsx          # Componente principal con toda la landing
│   ├── App.css          # Estilos personalizados (Polaroid, animaciones)
│   ├── index.css        # Estilos globales + Tailwind imports
│   └── main.jsx         # Punto de entrada de React
├── index.html           # HTML base
├── package.json         # Dependencias
├── tailwind.config.js   # Configuración de Tailwind
├── vite.config.js       # Configuración de Vite
└── postcss.config.js    # Configuración de PostCSS
```

## 🌐 Despliegue

Puedes desplegar esta landing en:

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Conecta tu repositorio Git
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages
```bash
npm run build
# Sube la carpeta dist/ a GitHub Pages
```

## 🎯 Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **Tailwind CSS** - Framework de CSS utility-first
- **Framer Motion** - Animaciones fluidas
- **Vite** - Build tool y dev server
- **Google Fonts** - Tipografías Poppins y Playfair Display

## 📱 Características Responsive

La landing está optimizada para todos los dispositivos:
- 📱 Mobile: 320px - 768px
- 💻 Tablet: 768px - 1024px
- 🖥️ Desktop: 1024px+

## 🤝 Soporte

Si tienes alguna pregunta o problema, puedes:
1. Revisar este README
2. Verificar que todas las dependencias estén instaladas
3. Asegurarte de estar usando Node.js 16+

## 📄 Licencia

Este proyecto es de uso libre. Puedes personalizarlo y usarlo para tus propias invitaciones.

---

**¡Disfruta creando tu invitación! 🎉**
