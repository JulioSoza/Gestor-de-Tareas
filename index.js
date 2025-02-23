console.log("¡Gestor de tareas.");

// Importamos los módulos necesarios
const fs = require('fs'); // Para manejar archivos
const prompts = require('prompts'); // Para interactuar con el usuario
const chalk = require('chalk'); // Para dar estilo a los mensajes en la terminal

// Definimos el archivo donde se guardarán las tareas
const TASKS_FILE = 'tasks.json';

// Función para cargar las tareas desde el archivo JSON
function loadTasks() {
    // Si el archivo no existe, devolvemos un array vacío
    if (!fs.existsSync(TASKS_FILE)) {
        return [];
    }
    // Leemos el archivo y lo convertimos a un objeto JavaScript
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(data);
}

// Función para guardar las tareas en el archivo JSON
function saveTasks(tasks) {
    // Convertimos el array de tareas a formato JSON y lo guardamos en el archivo
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// Función para mostrar el menú principal
async function showMenu() {
    // Usamos prompts para mostrar un menú interactivo
    const { action } = await prompts({
        type: 'select',
        name: 'action',
        message: '¿Qué quieres hacer?',
        choices: [
            { title: 'Listar tareas', value: 'list' },
            { title: 'Agregar tarea', value: 'add' },
            { title: 'Marcar tarea como completada', value: 'complete' },
            { title: 'Eliminar tarea', value: 'delete' },
            { title: 'Salir', value: 'exit' }
        ]
    });

    return action; // Retornamos la acción seleccionada por el usuario
}

// Función para listar todas las tareas
function listTasks(tasks) {
    console.log(chalk.bold.blue('\nTareas:\n')); // Título en azul y negrita
    tasks.forEach((task, index) => {
        // Mostramos cada tarea con un ícono de check (✓) o cruz (✗) según su estado
        const status = task.completed ? chalk.green('✓') : chalk.red('✗');
        console.log(`${index + 1}. ${status} ${task.description}`);
    });
    console.log(''); // Espacio adicional para mejor legibilidad
}

// Función para agregar una nueva tarea
async function addTask(tasks) {
    // Pedimos al usuario que ingrese la descripción de la tarea
    const { description } = await prompts({
        type: 'text',
        name: 'description',
        message: 'Descripción de la tarea:'
    });

    // Añadimos la tarea al array con el estado "completada" en false
    tasks.push({ description, completed: false });
    saveTasks(tasks); // Guardamos las tareas en el archivo
    console.log(chalk.green('Tarea agregada con éxito!\n')); // Mensaje de éxito
}

// Función para marcar una tarea como completada
async function completeTask(tasks) {
    listTasks(tasks); // Mostramos las tareas para que el usuario elija
    const { index } = await prompts({
        type: 'number',
        name: 'index',
        message: 'Número de la tarea a marcar como completada:',
        validate: value => value > 0 && value <= tasks.length ? true : 'Número inválido'
    });

    // Marcamos la tarea como completada
    tasks[index - 1].completed = true;
    saveTasks(tasks); // Guardamos los cambios
    console.log(chalk.green('Tarea marcada como completada!\n')); // Mensaje de éxito
}

// Función para eliminar una tarea
async function deleteTask(tasks) {
    listTasks(tasks); // Mostramos las tareas para que el usuario elija
    const { index } = await prompts({
        type: 'number',
        name: 'index',
        message: 'Número de la tarea a eliminar:',
        validate: value => value > 0 && value <= tasks.length ? true : 'Número inválido'
    });

    // Eliminamos la tarea seleccionada
    tasks.splice(index - 1, 1);
    saveTasks(tasks); // Guardamos los cambios
    console.log(chalk.green('Tarea eliminada con éxito!\n')); // Mensaje de éxito
}

// Función principal que ejecuta la aplicación
async function main() {
    let tasks = loadTasks(); // Cargamos las tareas al iniciar

    // Bucle infinito para mantener la aplicación en ejecución
    while (true) {
        const action = await showMenu(); // Mostramos el menú y esperamos la acción del usuario

        // Si el usuario elige "Salir", terminamos el bucle
        if (action === 'exit') {
            console.log(chalk.yellow('Saliendo...'));
            break;
        }

        // Ejecutamos la acción seleccionada por el usuario
        switch (action) {
            case 'list':
                listTasks(tasks);
                break;
            case 'add':
                await addTask(tasks);
                break;
            case 'complete':
                await completeTask(tasks);
                break;
            case 'delete':
                await deleteTask(tasks);
                break;
        }
    }
}

// Llamamos a la función principal para iniciar la aplicación
main();