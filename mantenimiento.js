// ============================================================
// mantenimiento.js  —  CRUD completo de estudiantes
// GET (listar) · POST actualizar (editar) · POST eliminar (borrar)
// ============================================================

const API_BASE = 'backend/';

// ── Referencias DOM ──────────────────────────────────────────
const estadoCarga      = document.getElementById('estado-carga');
const tabla            = document.getElementById('tabla-estudiantes');
const cuerpoTabla      = document.getElementById('cuerpo-tabla');

const modalEditar      = document.getElementById('modal-editar');
const formEditar       = document.getElementById('form-editar');
const btnCancelarEditar = document.getElementById('btn-cancelar-editar');

const modalEliminar    = document.getElementById('modal-eliminar');
const confirmNombre    = document.getElementById('confirm-nombre');
const btnCancelarElim  = document.getElementById('btn-cancelar-eliminar');
const btnConfirmarElim = document.getElementById('btn-confirmar-eliminar');

const toast = document.getElementById('toast');

// ID a eliminar (guardado al abrir el modal)
let idAEliminar = null;

// ── Utilidad: Toast de notificación ──────────────────────────
function mostrarToast(mensaje, tipo = 'success') {
    toast.textContent = mensaje;
    toast.className = tipo;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3500);
}

// ── Utilidad: Nombre legible del curso ───────────────────────
const nombreCurso = {
    'diseno-web':    'Diseño Web',
    'programacion':  'Programación',
    'diseno-grafico':'Diseño Gráfico'
};

// ── READ: cargar y renderizar tabla ──────────────────────────
function cargarEstudiantes() {
    estadoCarga.style.display = 'block';
    tabla.style.display = 'none';
    cuerpoTabla.innerHTML = '';

    fetch(API_BASE + 'estudiantes.php')
        .then(res => {
            if (!res.ok) throw new Error('Error del servidor.');
            return res.json();
        })
        .then(estudiantes => {
            estadoCarga.style.display = 'none';

            if (!Array.isArray(estudiantes) || estudiantes.length === 0) {
                estadoCarga.textContent = 'No hay estudiantes registrados.';
                estadoCarga.style.display = 'block';
                return;
            }

            tabla.style.display = 'table';
            estudiantes.forEach((est, index) => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${est.nombre}</td>
                    <td>${est.matricula}</td>
                    <td>${est.correo}</td>
                    <td>${est.fecha_nacimiento}</td>
                    <td>${nombreCurso[est.curso] || est.curso}</td>
                    <td>
                        <button class="btn-editar"
                            data-id="${est.id}"
                            data-nombre="${est.nombre}"
                            data-matricula="${est.matricula}"
                            data-correo="${est.correo}"
                            data-fecha="${est.fecha_nacimiento}"
                            data-curso="${est.curso}">
                            Editar
                        </button>
                        <button class="btn-eliminar"
                            data-id="${est.id}"
                            data-nombre="${est.nombre}">
                            Eliminar
                        </button>
                    </td>
                `;
                cuerpoTabla.appendChild(fila);
            });

            // Asignar eventos a botones recién creados
            document.querySelectorAll('.btn-editar').forEach(btn => {
                btn.addEventListener('click', abrirModalEditar);
            });
            document.querySelectorAll('.btn-eliminar').forEach(btn => {
                btn.addEventListener('click', abrirModalEliminar);
            });
        })
        .catch(() => {
            estadoCarga.textContent = 'Error: no se pudo conectar con el servidor.';
            estadoCarga.style.color = 'red';
        });
}

// ── Abrir modal EDITAR ────────────────────────────────────────
function abrirModalEditar(e) {
    const btn = e.currentTarget;
    document.getElementById('edit-id').value        = btn.dataset.id;
    document.getElementById('edit-nombre').value    = btn.dataset.nombre;
    document.getElementById('edit-matricula').value = btn.dataset.matricula;
    document.getElementById('edit-correo').value    = btn.dataset.correo;
    document.getElementById('edit-fecha').value     = btn.dataset.fecha;
    document.getElementById('edit-curso').value     = btn.dataset.curso;
    modalEditar.classList.add('active');
}

// ── Cerrar modal editar ───────────────────────────────────────
btnCancelarEditar.addEventListener('click', () => {
    modalEditar.classList.remove('active');
});
modalEditar.addEventListener('click', e => {
    if (e.target === modalEditar) modalEditar.classList.remove('active');
});

// ── UPDATE: guardar cambios del formulario ────────────────────
formEditar.addEventListener('submit', e => {
    e.preventDefault();

    const payload = {
        id:              document.getElementById('edit-id').value,
        nombre:          document.getElementById('edit-nombre').value.trim(),
        matricula:       document.getElementById('edit-matricula').value.trim(),
        correo:          document.getElementById('edit-correo').value.trim(),
        fechaNacimiento: document.getElementById('edit-fecha').value,
        curso:           document.getElementById('edit-curso').value
    };

    fetch(API_BASE + 'actualizar.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        modalEditar.classList.remove('active');
        if (data.success) {
            mostrarToast(data.message, 'success');
            cargarEstudiantes();   // Refresca la tabla
        } else {
            mostrarToast(data.error || 'Error al actualizar.', 'error');
        }
    })
    .catch(() => mostrarToast('No se pudo conectar con el servidor.', 'error'));
});

// ── Abrir modal ELIMINAR ──────────────────────────────────────
function abrirModalEliminar(e) {
    const btn = e.currentTarget;
    idAEliminar = btn.dataset.id;
    confirmNombre.textContent = btn.dataset.nombre;
    modalEliminar.classList.add('active');
}

// ── Cerrar modal eliminar ─────────────────────────────────────
btnCancelarElim.addEventListener('click', () => {
    modalEliminar.classList.remove('active');
    idAEliminar = null;
});
modalEliminar.addEventListener('click', e => {
    if (e.target === modalEliminar) {
        modalEliminar.classList.remove('active');
        idAEliminar = null;
    }
});

// ── DELETE: confirmar y borrar ────────────────────────────────
btnConfirmarElim.addEventListener('click', () => {
    if (!idAEliminar) return;

    fetch(API_BASE + 'eliminar.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: idAEliminar })
    })
    .then(res => res.json())
    .then(data => {
        modalEliminar.classList.remove('active');
        idAEliminar = null;
        if (data.success) {
            mostrarToast(data.message, 'success');
            cargarEstudiantes();   // Refresca la tabla
        } else {
            mostrarToast(data.error || 'Error al eliminar.', 'error');
        }
    })
    .catch(() => mostrarToast('No se pudo conectar con el servidor.', 'error'));
});

// ── Iniciar carga al cargar la página ────────────────────────
cargarEstudiantes();
