# Mercampo - Portal de Pedidos B2B

## 📋 Descripción del Proyecto
Mercampo es una plataforma web diseñada para optimizar la gestión de pedidos mayoristas de productos frescos (frutas, verduras, abarrotes, carnes, etc.). 

Esta solución busca **mejorar el control de calidad y reducir costos operativos** al digitalizar el proceso de aprovisionamiento. Permite a los clientes visualizar el catálogo actualizado, verificar disponibilidad y realizar pedidos de manera rápida y sin errores, eliminando la ineficiencia de los pedidos manuales por teléfono o mensajes.

## 🚀 Funcionalidades Principales
- **Catálogo Digital Completo**: Visualización de productos organizados por categorías (Verduras, Frutas, Tubérculos, Carnes, Lácteos, Abarrotes, etc.).
- **Búsqueda Inteligente**: Filtrado rápido por nombre o código de producto.
- **Carrito de Compras**: Gestión dinámica de cantidades y resumen de pedido antes de confirmar.
- **Control de Stock**: Indicadores visuales de disponibilidad y productos agotados.
- **Integración de Pedidos**: Los pedidos confirmados se envían automáticamente a una hoja de cálculo de Google Sheets para su procesamiento inmediato.

## 🛠️ Stack Tecnológico
El proyecto está construido con tecnologías modernas para asegurar rendimiento y escalabilidad:

- **Frontend**: [React](https://react.dev/) con [TypeScript](https://www.typescriptlang.org/) para una interfaz robusta y segura.
- **Build Tool**: [Vite](https://vitejs.dev/) para un entorno de desarrollo rápido y optimizado.
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) para un diseño moderno, responsivo y minimalista.
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/) para micro-interacciones fluidas que mejoran la experiencia de usuario.
- **Iconos**: [Lucide React](https://lucide.dev/) y sistema de emojis dinámicos para placeholders.
- **Backend (Serverless)**: Google Apps Script (conectado a Google Sheets) actúa como API para recibir los pedidos.

## 💻 Instalación y Ejecución Local

Para ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd Mercampo
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`.

## 🌐 Despliegue (Deploy)

El proyecto es una aplicación estática (SPA), lo que facilita su despliegue en plataformas modernas.

### Proceso de Build
Para generar los archivos de producción:
```bash
npm run build
```
Esto creará una carpeta `dist/` con los archivos optimizados listos para subir.

### Integración Continua (GitHub)
Actualmente, el proyecto está configurado para desplegarse automáticamente al hacer **push** a la rama `main` en GitHub.
1. Realizar cambios en el código.
2. Ejecutar `git add .`, `git commit -m "mensaje"`, y `git push`.
3. La plataforma de hosting conectada (ej. Vercel, Netlify) detectará el cambio, construirá el proyecto y actualizará la versión en vivo.
