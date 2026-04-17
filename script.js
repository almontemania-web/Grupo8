
/* declaracion de variables para recoger los elementos del formulario */
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-registro');
    const inputNombre = document.getElementById('nombre-estudiante');
    const inputMatricula = document.getElementById('matricula-estudiante');
    const inputCorreo = document.getElementById('correo-estudiante');
    const inputFecha = document.getElementById('fecha-nacimiento');
    const inputCurso = document.getElementById('curso-estudiante');
    const mensajeFormulario = document.getElementById('mensaje-formulario');

    /* URL del backend PHP */
    const API_REGISTRAR = 'backend/registrar.php';
    
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
       /* Si todas las validaciones son verdaderas (true), enviamos al servidor */
        if (nombreValido && matriculaValida && correoValido && fechaValida) {

            const nuevoEstudiante = {
                nombre: inputNombre.value.trim(),
                matricula: inputMatricula.value.trim(),
                correo: inputCorreo.value.trim(),
                fechaNacimiento: inputFecha.value,
                curso: inputCurso.value
            };

            /* POST al backend PHP — las credenciales nunca llegan al cliente */
            fetch(API_REGISTRAR, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoEstudiante)
            })
            .then(res => res.json())
            .then(data => {
                    if (data.success) {
                        // Notificación clara
                        mensajeFormulario.innerHTML = `<div class="alert alert-success" role="alert">${data.message || 'Estudiante guardado exitosamente.'}</div>`;
                        mensajeFormulario.style.display = 'block';
                        mensajeFormulario.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // Limpiar campos y mensajes de error
                        formulario.reset();
                        limpiarError(inputNombre, 'error-nombre');
                        limpiarError(inputMatricula, 'error-matricula');
                        limpiarError(inputCorreo, 'error-correo');
                        limpiarError(inputFecha, 'error-fecha');
                        setTimeout(() => {
                            mensajeFormulario.innerHTML = '';
                            mensajeFormulario.style.display = 'none';
                        }, 2000);
                    } else {
                        mensajeFormulario.innerHTML = `<div class="alert alert-danger" role="alert">${data.error || 'Error al registrar.'}</div>`;
                        mensajeFormulario.style.display = 'block';
                    }
            })
            .catch(() => {
                mensajeFormulario.innerHTML = `<div class="alert alert-danger" role="alert">No se pudo conectar con el servidor.</div>`;
            });

        } else {
            mensajeFormulario.innerHTML = `<div class="alert alert-danger" role="alert">Por favor, corrige los errores señalados.</div>`;
        }
    });
});