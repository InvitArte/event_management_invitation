# EventManagement System Invitation

## Propiedad y Licencia

Copyright (c) 2024 ÁNGEL MARÍA CAPARRÓS CABALLERO. Todos los derechos reservados.

Este software es propiedad exclusiva de ÁNGEL MARÍA CAPARRÓS CABALLERO y está protegido por las leyes de propiedad intelectual. Para más información sobre licencia y uso, consulte los archivos `LICENSE.md`, `NOTICE.md` y `CUSTOM_LICENSE.md`.

## Descripción del Proyecto

Frontend público del EventManagement System, desarrollado con React y Vite. Esta aplicación proporciona una interfaz moderna y eficiente para la visualización de eventos y el registro de invitados. Versión optimizada y simplificada enfocada exclusivamente en la experiencia del invitado.

## Stack Tecnológico

### Core

- React 18.2.0
- Vite 5.0.8

### UI Framework

- Material-UI v5
  - @mui/material: ^5.15.6
  - @mui/icons-material: ^5.15.6
  - @emotion/react: ^11.11.3
  - @emotion/styled: ^11.11.0

### Otras Dependencias Clave

- axios: ^1.6.7 (Cliente HTTP)
- react-router-dom: ^6.22.0 (Routing)
- react-toastify: ^10.0.4 (Notificaciones)
- dayjs: ^1.11.10 (Manejo de fechas)

## Estructura del Proyecto

```
src/
├── assets/                    # Recursos estáticos
│   ├── fonts/                # Fuentes tipográficas
│   └── imgs/                 # Imágenes y fondos
│
├── components/               # Componentes reutilizables
│   ├── common/              # Componentes comunes
│   │   └── LoadingComponent/
│   └── ui/                  # Componentes de interfaz
│
├── config/                  # Configuraciones
│   ├── api.js              # Configuración de API
│   ├── defaults.js         # Configuraciones por defecto
│   └── index.js
│
├── context/                # Contextos de React
│   ├── PublicUserConfigContext.jsx
│   └── index.js
│
├── hooks/                  # Custom hooks
│   ├── useConfirmationModal.js
│   ├── useDemoView.js
│   └── index.js
│
├── services/              # Servicios
│   ├── publicAxiosConfig.js
│   └── index.js
│
├── styles/               # Estilos globales
│   ├── fonts.css
│   └── index.css
│
├── views/               # Vistas principales
│   └── DemoView/       # Vista principal del evento
│       ├── components/ # Componentes específicos
│       │   ├── ConfirmationForm/
│       │   ├── ConfirmationModal/
│       │   ├── DemoHeader/
│       │   └── DemoEventCard/
│       ├── index.jsx
│       └── DemoView.jsx
│
├── App.jsx             # Componente raíz
├── AppContent.jsx      # Contenedor principal
└── main.jsx           # Punto de entrada
```

## Instalación y Configuración

### 1. Requisitos Previos

- Node.js 16.x o superior
- NPM 7.x o superior
- Git

### 2. Configuración Inicial

```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd public-event-frontend

# Instalar dependencias
npm install
```

### 3. Variables de Entorno

Crear archivo `.env` basado en `.env.example`:

```env
VITE_API_URL=http://api.example.com
VITE_APP_ENV=development
```

### 4. Scripts Disponibles

```bash
# Desarrollo
npm run dev        # Inicia servidor de desarrollo

# Construcción
npm run build      # Construye para producción
npm run preview    # Previsualiza build

# Linting
npm run lint       # Ejecuta ESLint
```

## Características Principales

### Funcionalidades

- Visualización de información del evento
- Formulario de confirmación de asistencia
- Gestión de acompañantes
- Selección de menús
- Gestión de alergias
- Opciones de transporte y alojamiento

### Optimizaciones

- Carga optimizada de recursos
- Interfaz responsive
- Validación en tiempo real
- Manejo de errores amigable
- Experiencia de usuario fluida

## Guía de Desarrollo

### Estándares de Código

#### Nomenclatura

- Componentes: PascalCase (ej. `EventCard.jsx`)
- Hooks: camelCase con 'use' prefix (ej. `useConfirmationModal.js`)
- Utilidades: camelCase (ej. `formatDate.js`)

#### Estructura de Componentes

```jsx
import React from "react";
import PropTypes from "prop-types";

const ComponentName = ({ prop1, prop2 }) => {
  // Lógica del componente
  return <div>// JSX</div>;
};

ComponentName.propTypes = {
  prop1: PropTypes.string.required,
  prop2: PropTypes.number,
};

export default ComponentName;
```

### Buenas Prácticas

1. **Componentes**

   - Usar componentes funcionales
   - Implementar PropTypes
   - Mantener componentes pequeños y focalizados

2. **Estado**

   - Usar hooks de React
   - Gestión eficiente del estado
   - Implementar memorización cuando sea necesario

3. **Performance**
   - Lazy loading cuando sea apropiado
   - Optimización de imágenes
   - Evitar re-renders innecesarios

## Seguridad

- Validación de entrada
- Sanitización de datos
- Protección contra XSS
- Prevención de spam

## CI/CD

- GitHub Actions para CI
- Despliegue automático
- Verificación de código
- Tests automáticos

## Soporte y Contacto

Para cuestiones relacionadas con el desarrollo y mantenimiento:

- **Desarrollador Principal**: Ángel María Caparrós Caballero
- **Email**: angel.ccapb@gmail.com

EventManagement System Frontend Público - Versión [0.1.0]
Copyright © 2024 Ángel María Caparrós Caballero. Todos los derechos reservados.
