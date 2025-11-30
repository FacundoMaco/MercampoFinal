# Contexto Total de la Solución: Mercampo B2B

Este documento consolida toda la información técnica, de diseño y funcional del proyecto **Mercampo** para facilitar su iteración o migración.

## 1. Identidad Visual y UI/UX

El diseño actual utiliza un enfoque **"Fresh & Clean"** orientado a productos agrícolas, con toques modernos de UI.

### 🎨 Paleta de Colores
*   **Primario (Brand)**: Emerald (`#10b981`, `var(--emerald-500)`) y Teal (`#14b8a6`, `var(--teal-500)`).
*   **Fondo**: Slate-50 (`#f8fafc`) con gradientes sutiles (`from-slate-50 via-emerald-50/30 to-teal-50/50`).
*   **Texto**: Slate-800 (Principal), Slate-500 (Secundario).
*   **Acentos**: Sombras suaves en Emerald, bordes redondeados.

### 🔤 Tipografía
*   **Principal**: `DM Sans` (Moderna, legible, amigable).
*   **Datos/Técnico**: `JetBrains Mono` (Para códigos, IDs).

### 🧩 Componentes Clave
*   **Tarjetas de Producto**: Diseño limpio, imagen destacada, controles de cantidad interactivos.
*   **Navegación**: Header "Glassmorphism" (`bg-white/80 backdrop-blur-lg`).
*   **Móvil First**: Panel de resumen "Slide-up" (`fixed bottom-0`), botones de acción grandes (44px+).
*   **Animaciones**: `framer-motion` para entradas suaves (`fadeInUp`), transiciones de listas y feedback visual.

### 💡 Detalles de UX
*   **Feedback Inmediato**: Contadores de items en carrito, estados de carga (`isSaving`).
*   **Micro-interacciones**: Hover effects en botones, sliders personalizados.
*   **Accesibilidad**: Focus states claros (`outline-emerald-500`), contraste suficiente.

---

## 2. Integración con Google Sheets

La "backend" de la aplicación es una hoja de cálculo de Google, conectada a través de Google Apps Script.

### 🏗️ Arquitectura
1.  **Frontend (React)**: Recopila el pedido y genera un JSON.
2.  **Transporte**: `fetch` POST request a la URL del Web App de Google Apps Script.
3.  **Backend (GAS)**: Recibe el POST (`doPost`), parsea el JSON y escribe en la hoja.

### 📜 Google Apps Script (Código Base)
El script debe publicarse como **Web App** con permisos de ejecución "Anyone" (o "Anyone with Google account").

```javascript
function doPost(e) {
  try {
    const SPREADSHEET_ID = 'TU_SPREADSHEET_ID'; // ID de la hoja
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Headers automáticos si está vacío
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['ID Pedido', 'Fecha/Hora', 'ClienteID', 'ProductoID', 'ProductoNombre', 'Presentación', 'Cantidad', 'Unidad', 'Observaciones', 'Estado']);
    }
    
    const data = JSON.parse(e.postData.contents);
    
    data.forEach(line => {
      sheet.appendRow([
        line['ID Pedido'],
        line['Fecha/Hora'],
        line['ClienteID'],
        line['ProductoID'],
        line['ProductoNombre'],
        line['Presentación'],
        line['Cantidad'],
        line['Unidad'],
        line['Observaciones'],
        line['Estado']
      ]);
    });
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 🔌 Conexión desde React
Debido a **CORS**, la petición desde el navegador a Google Apps Script suele ser opaca.

**Estrategia de Envío:**
1.  Usar `FormData` o `JSON.stringify` en el body.
2.  Configurar `mode: 'no-cors'`.
3.  **Importante**: Con `no-cors`, no podemos leer la respuesta JSON (status 200 ok, pero body ilegible). Asumimos éxito si no hay error de red.

```javascript
const GOOGLE_SHEETS_WEB_APP_URL = 'TU_SCRIPT_URL_EXEC';

// Envío
await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
  method: 'POST',
  mode: 'no-cors',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(orderLines)
});
```

---

## 3. Estructura de Datos

### Modelo de Producto (Frontend)
```javascript
{
  id: "VER-001",
  name: "Papa Amarilla Tumbay",
  category: "Verduras",
  price: 0, // Si aplica
  unit: "Kg",
  image: "/path/to/image.jpg"
}
```

### Modelo de Pedido (Payload a Sheets)
Se envía un array de objetos, donde cada objeto es una línea del pedido.

```json
[
  {
    "ID Pedido": "ORD-123456",
    "Fecha/Hora": "2025-11-29T12:00:00.000Z",
    "ClienteID": "cliente@ejemplo.com",
    "ProductoID": "VER-001",
    "ProductoNombre": "Papa Amarilla",
    "Cantidad": 5,
    "Unidad": "Kg",
    "Estado": "Pendiente"
  }
]
```

---

## 4. Funcionalidades Críticas

1.  **Búsqueda y Filtrado**:
    *   Búsqueda por texto (nombre o ID).
    *   Filtrado por categorías (pills horizontales).
2.  **Gestión de Pedido**:
    *   Agregar items desde la tarjeta.
    *   Editar cantidad si el item ya existe.
    *   Eliminar items desde el resumen.
3.  **Confirmación**:
    *   Validación de Términos y Condiciones (Checkbox obligatorio).
    *   Modal de éxito con ID de pedido generado.
4.  **Persistencia (Opcional)**:
    *   Actualmente el estado es local (`useState`). Para persistencia entre recargas, considerar `localStorage`.

## 5. Próximos Pasos (Iteración)

*   **Autenticación**: Implementar login real de clientes (actualmente `defaultClient`).
*   **Precios**: Integrar lista de precios dinámica desde otra hoja de Sheets.
*   **Historial**: Leer pedidos anteriores desde Sheets (requiere GET request y manejo de CORS más complejo o proxy).
