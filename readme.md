# Gestor de Tareas CLI

Una aplicación de línea de comandos (CLI) en Node.js para gestionar tareas pendientes. Permite agregar, listar, marcar como completadas y eliminar tareas. Las tareas se almacenan en un archivo JSON para persistencia de datos.

## Características

- **Agregar tareas**: Añade nuevas tareas a la lista.
- **Listar tareas**: Muestra todas las tareas con su estado (completada o pendiente).
- **Marcar como completada**: Cambia el estado de una tarea a completada.
- **Eliminar tareas**: Elimina una tarea de la lista.
- **Persistencia de datos**: Las tareas se guardan en un archivo `tasks.json`.

## Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/gestor-tareas.git
   cd gestor-tareas

   Uso
Ejecuta la aplicación:

bash
Escribir: 
node index.js
Sigue las instrucciones en la terminal:

Agregar tarea: Selecciona "Agregar tarea" e ingresa la descripción de la tarea.

Listar tareas: Selecciona "Listar tareas" para ver todas las tareas.

Marcar como completada: Selecciona "Marcar tarea como completada" y elige el número de la tarea.

Eliminar tarea: Selecciona "Eliminar tarea" y elige el número de la tarea.

Salir: Selecciona "Salir" para cerrar la aplicación.

Estructura del Proyecto
Copy
gestor-tareas/
├── index.js          # Código principal de la aplicación
├── tasks.json        # Archivo donde se almacenan las tareas
├── package.json      # Configuración del proyecto y dependencias
├── README.md         # Documentación del proyecto
└── node_modules/     # Dependencias instaladas