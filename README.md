# Prueba Tecnica ImagineCX

Una aplicación de administración de contactos que permite agregar, editar, buscar y eliminar contactos. Construida en React, utiliza Vite para un desarrollo rápido y optimizado. Esta guía proporciona todos los pasos necesarios para instalar, usar y entender la arquitectura del proyecto.

## Índice

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Beneficios de Vite](#beneficios-de-vite)
4. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
5. [Requisitos Previos](#requisitos-previos)
6. [Instalación](#instalación)
7. [Uso](#uso)
8. [Funciones de la Aplicación](#funciones-de-la-aplicación)
9. [Contribuir](#contribuir)
10. [Licencia](#licencia)

## Descripción del Proyecto

Esta aplicación permite gestionar una lista de contactos almacenados en IndexedDB mediante Dexie.js. El usuario puede:
- Crear nuevos contactos
- Editar contactos existentes
- Eliminar contactos
- Buscar contactos por nombre, ciudad, teléfono y correo electrónico

Es una solución eficaz para organizar y acceder a los datos de contactos de forma rápida.

## Tecnologías Utilizadas

- **React**: Para construir la interfaz de usuario.
- **Vite**: Un entorno de desarrollo rápido y ligero.
- **Dexie.js**: Para la gestión de datos en IndexedDB.
- **Bootstrap**: Para el diseño y estilo de la interfaz de usuario.

## Beneficios de Vite

### ¿Por qué Vite?
Vite es una herramienta de desarrollo rápida y eficiente que se diferencia de Webpack y otras herramientas tradicionales. Fue diseñada para aprovechar las capacidades modernas del navegador y optimizar el flujo de trabajo del desarrollador.

### Ventajas de Usar Vite:
1. **Arranque Rápido**: Vite compila los módulos solo cuando son necesarios, reduciendo drásticamente el tiempo de arranque.
2. **Hot Module Replacement (HMR)**: Actualización en tiempo real de los módulos en desarrollo, sin necesidad de recargar la página.
3. **Optimización de Dependencias**: Compila dependencias en módulos de ESM, optimizando el rendimiento en tiempo de desarrollo y reduciendo el tamaño de los builds de producción.
4. **Build Eficiente**: Produce un código optimizado para producción de forma rápida y con un resultado más compacto.

## Arquitectura del Proyecto

El proyecto sigue una estructura modular, con componentes reutilizables y organizados para facilitar el mantenimiento:

src/ ├── api/ # Lógica para interacciones con la base de datos (Dexie.js) ├── components/ # Componentes de React, organizados según funcionalidades ├── db/ # Configuración de la base de datos (IndexedDB con Dexie.js) ├── styles/ # Archivos de estilos globales y específicos ├── App.tsx # Componente raíz de la aplicación ├── main.tsx # Punto de entrada de Vite └── index.html # Archivo principal HTML



### Componentes Principales
- **NewContact**: Formulario para crear nuevos contactos.
- **SearchFilters**: Componentes de filtro y búsqueda de contactos.
- **AllApp**: Componente principal que gestiona la lógica de creación y visualización de contactos.

## Requisitos Previos

- **Node.js** (>= 14.0.0)
- **npm** o **yarn**

Para verificar la instalación de Node y npm:
```bash
node -v
npm -v


## Instalación

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tuusuario/agenda-contactos.git
   cd agenda-contactos

```Instala las dependencias:
npm install




```

##
Uso
La aplicación permite gestionar contactos mediante varias funcionalidades:

Crear Contacto: Presiona el botón "Crear Contacto", rellena el formulario y guarda. El nuevo contacto se agregará a la lista.
Buscar Contacto: Usa los filtros para buscar contactos por nombre, ciudad, teléfono o correo electrónico.
Editar Contacto: Selecciona el ícono de lápiz en un contacto para modificar su información.
Eliminar Contacto: Selecciona el ícono de basura en un contacto para eliminarlo.
Funciones de la Aplicación
Formulario de Creación de Contacto: Permite ingresar el nombre, correo, teléfono y ciudad del contacto. Al enviarlo, se guarda en IndexedDB.
Filtro de Búsqueda: Filtra la lista de contactos según el valor ingresado en el campo de búsqueda.
Edición de Contacto: Los contactos pueden ser editados y guardados nuevamente.
Eliminación de Contacto: Los contactos se eliminan permanentemente de IndexedDB.


Este formato es claro y fácil de seguir para cualquier usuario o colaborador que desee instalar y utilizar la aplicación. 


