
/* declaracion de variables para recoger los elementos del formulario */
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-registro');
    const inputNombre = document.getElementById('nombre-estudiante');
    const inputMatricula = document.getElementById('matricula-estudiante');
    const inputCorreo = document.getElementById('correo-estudiante');
    const inputFecha = document.getElementById('fecha-nacimiento');
    const inputCurso = document.getElementById('curso-estudiante');
    const mensajeFormulario = document.getElementById('mensaje-formulario');

    /* Recuperamos los estudiantes guardados en LocalStorage. */
    /* Si no hay datos, inicializamos un arreglo vacío []. */

    let estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
    
    /* Función para mostrar mensajes de error dinámicos */
    const mostrarError = (input, idSpan, mensaje) => {
        const span = document.getElementById(idSpan);
        input.classList.add('input-error');
        span.innerHTML = mensaje;
        span.classList.add('visible');
    };
    /* Función para limpiar los mensajes de error cuando el dato es correcto */
    const limpiarError = (input, idSpan) => {
        const span = document.getElementById(idSpan);
        input.classList.remove('input-error');
        span.innerHTML = '';
        span.classList.remove('visible');
    };
    /*  FUNCIONES DE VALIDACIÓN ESPECÍFICAS */
    const validarNombre = () => {
        if (inputNombre.value.trim().length < 3) {
            mostrarError(inputNombre, 'error-nombre', 'El nombre debe tener al menos 3 caracteres.');
            return false;
        }
        limpiarError(inputNombre, 'error-nombre');
        return true;
    };

    const validarMatricula = () => {
        if (inputMatricula.value.trim().length < 4) {
            mostrarError(inputMatricula, 'error-matricula', 'La matrícula es obligatoria (mínimo 4 caracteres).');
            return false;
        }
        limpiarError(inputMatricula, 'error-matricula');
        return true;
    };

    const validarCorreo = () => {
        /* Expresión regular para verificar el formato de correo electrónico (texto@texto.texto) */
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(inputCorreo.value.trim())) {
            mostrarError(inputCorreo, 'error-correo', 'Introduce un formato de correo válido.');
            return false;
        }
        limpiarError(inputCorreo, 'error-correo');
        return true;
    };

    const validarFecha = () => {
        if (!inputFecha.value) {
            mostrarError(inputFecha, 'error-fecha', 'La fecha de nacimiento es obligatoria.');
            return false;
        }
        limpiarError(inputFecha, 'error-fecha');
        return true;
    };
    /* Escuchamos el evento 'input' (cada vez que el usuario teclea) para validar inmediatamente */
    inputNombre.addEventListener('input', validarNombre);
    inputMatricula.addEventListener('input', validarMatricula);
    inputCorreo.addEventListener('input', validarCorreo);
    inputFecha.addEventListener('input', validarFecha);

    formulario.addEventListener('submit', (evento) => {
        /*Evitamos que la página se recargue al enviar el formulario */
        evento.preventDefault();

        const nombreValido = validarNombre();
        const matriculaValida = validarMatricula();
        const correoValido = validarCorreo();
        const fechaValida = validarFecha();
       /* Si todas las validaciones son verdaderas (true), procedemos a guardar */
        if (nombreValido && matriculaValida && correoValido && fechaValida) {
            /* Creamos un objeto con los datos del nuevo estudiante */
            const nuevoEstudiante = {
                nombre: inputNombre.value.trim(),
                matricula: inputMatricula.value.trim(),
                correo: inputCorreo.value.trim(),
                fechaNacimiento: inputFecha.value,
                curso: inputCurso.value
            };
                /* Agregamos el nuevo estudiante al arreglo y lo guardamos en LocalStorage */
            estudiantes.push(nuevoEstudiante);
            localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
            /* Mostramos mensaje de éxito y limpiamos el formulario */
            mensajeFormulario.innerHTML = '¡Estudiante registrado con éxito!';
            mensajeFormulario.classList.remove('error');
            mensajeFormulario.classList.add('success');
            formulario.reset();
        } else {
            /* Si hay errores, mostramos un mensaje general de error */
            mensajeFormulario.innerHTML = 'Por favor, corrige los errores señalados.';
            mensajeFormulario.classList.remove('success');
            mensajeFormulario.classList.add('error');
        }
    });
});