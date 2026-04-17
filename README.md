🎓 Sistema de Registro de Estudiantes - Grupo 8

Este es un panel universitario interactivo diseñado para la gestión y registro de estudiantes en diversos cursos técnicos. El proyecto se enfoca en ofrecer una interfaz limpia, profesional y responsiva, utilizando una paleta de colores institucional, incorporando validaciones dinámicas y almacenamiento local de datos.

💻 Lista de participantes del proyecto:
<<<<<<< HEAD
Jeancarlos Almonte
Ramón Antonio Ureña Brito
Danny Rodriguez 
Eduardo Ferreras De los Santos 
Angel Camilo Medina Fernandez 
Smarlim Mejía Cabrera 
Jensy Fernando Ovalles Hernández
=======
 Jeancarlos Almonte
 Ramón Antonio Ureña Brito
 Danny Rodriguez 
 Eduardo Ferreras De los Santos
 Angel Camilo Medina Fernandez
 Smarlim Mejía Cabrera
 Jensy Fernando Ovalles Hernández
>>>>>>> 027e23df8f4aa0c9787cdc3936092704bc0a64b7

🎛️ Características
Panel de Control (Dashboard): Visualización de bienvenida, catálogo de cursos ofrecidos y una tabla dinámica que muestra los estudiantes registrados.
Formulario de Registro: Sistema de captura de datos interactivo.
Validación en Tiempo Real: Verificación inmediata de campos vacíos, longitud mínima y formato de correo electrónico sin recargar la página, brindando retroalimentación visual al usuario.
Persistencia de Datos: Uso de `LocalStorage` y arreglos de objetos para almacenar temporalmente los registros de los estudiantes directamente en el navegador.
Diseño Responsivo: Adaptabilidad garantizada para dispositivos móviles, tablets y monitores de escritorio.
Navegación Intuitiva: Menú centralizado para alternar fácilmente entre el inicio y el registro.

🛠️ Tecnologías Utilizadas
HTML5: Estructura semántica del contenido.
CSS3: Estilo personalizado utilizando variables para colores institucionales (`--primary-color: #0b1838` & `--secondary-color: #F68121`) y Flexbox para el diseño adaptable.
JavaScript (Vanilla JS): Manipulación del DOM, manejo de eventos (`input`, `submit`), inyección de HTML dinámico y gestión de almacenamiento local (`JSON.parse`, `JSON.stringify`).

📂 Estructura del Proyecto:

Grupo8/
├── Dashboard.html   # Página principal, catálogo de cursos y tabla de registros
├── registro.html    # Formulario interactivo de inscripción de estudiantes
├── style.css        # Hoja de estilos centralizada
├── script.js        # Lógica de validación de formulario y guardado en LocalStorage
├── dashboard.js     # Lógica de recuperación de datos y creación de tabla dinámica
└── Grupo8.png       # Identidad visual del proyecto

🎨 Interfaz y Diseño
El proyecto utiliza una combinación de colores del campus virtual:

Azul Primario (#0b1838):Utilizado en encabezados, pies de página y encabezados de tablas para transmitir seriedad.
Naranja Secundario (#F68121): Utilizado en la barra de navegación y botones interactivos para resaltar la acción.
Alertas Dinámicas: Uso de colores semánticos (rojo para errores, verde para éxito) que aparecen dinámicamente en el formulario.
Sección de Cursos y Tablas: Cada artículo cuenta con sombreado dinámico (`box-shadow`), bordes redondeados y efectos `hover` en las filas de las tablas para una experiencia de usuario moderna.

🆕 Notas del Parche (Versión 2.0)

Respecto a la versión anterior (Etapa 1: Maquetación estática), se han implementado las siguientes mejoras para dotar al proyecto de interactividad del lado del cliente:
<<<<<<< HEAD

Validaciones en tiempo real Se programó la verificación instantánea de los datos del formulario mediante JavaScript (campos vacíos, formato de correo electrónico y longitud mínima de caracteres).
Manipulación dinámica del DOM Se integró la capacidad de mostrar mensajes de éxito o error y aplicar estilos de validación sin recargar la página, utilizando funciones nativas como `getElementById()`, `querySelector()`, `innerHTML` y `classList`.
Persistencia temporal de datos Se reemplazó el comportamiento por defecto del formulario para guardar la información capturada utilizando arreglos de objetos dentro del `LocalStorage` del navegador.
Generación de contenido dinámico Se añadió una tabla en el panel de inicio (Dashboard) que lee los datos del `LocalStorage` y construye sus filas automáticamente para mostrar a los estudiantes registrados.

Refactorización de la Interfaz
Se realizó la migración del diseño personalizado hacia un Framework CSS (Bootstrap, Tailwind CSS o Foundation) con el objetivo de estandarizar los componentes visuales, mejorar la consistencia del diseño y optimizar la adaptabilidad en diferentes dispositivos. Esto permite una interfaz más profesional, mantenible y escalable, reduciendo la duplicación de estilos y facilitando futuras mejoras.

Implementación completa del ciclo CRUD
Se amplió la funcionalidad del sistema para soportar todas las operaciones del ciclo CRUD:

Create: Registro de nuevos estudiantes desde el formulario.
Read: Visualización dinámica de los datos en el Dashboard.
Update: Edición de la información de estudiantes ya registrados.
Delete: Eliminación de registros existentes.

Esto transforma el sistema en una herramienta completamente funcional para la gestión de estudiantes, permitiendo la manipulación total de los datos desde la interfaz.

Sistema de autenticación básico
Se integró un sistema de autenticación que permite controlar el acceso al sistema mediante el uso de sesiones del lado del servidor. Se implementaron mecanismos como:

Inicialización de sesiones con session_start()
Uso de variables de sesión ($_SESSION) para almacenar el estado del usuario
Formulario de inicio de sesión (Login)
Funcionalidad de cierre de sesión (Logout)

Con esta mejora, se restringe el acceso a usuarios autenticados, incrementando la seguridad del sistema y protegiendo la información gestionada.
=======
add
Validaciones en tiempo real Se programó la verificación instantánea de los datos del formulario mediante JavaScript (campos vacíos, formato de correo electrónico y longitud mínima de caracteres).
Manipulación dinámica del DOM Se integró la capacidad de mostrar mensajes de éxito o error y aplicar estilos de validación sin recargar la página, utilizando funciones nativas como `getElementById()`, `querySelector()`, `innerHTML` y `classList`.
Persistencia temporal de datos Se reemplazó el comportamiento por defecto del formulario para guardar la información capturada utilizando arreglos de objetos dentro del `LocalStorage` del navegador.
Generación de contenido dinámico Se añadió una tabla en el panel de inicio (Dashboard) que lee los datos del `LocalStorage` y construye sus filas automáticamente para mostrar a los estudiantes registrados.
>>>>>>> 027e23df8f4aa0c9787cdc3936092704bc0a64b7
