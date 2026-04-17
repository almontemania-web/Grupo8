// ============================================================
// dashboard.js  —  READ: carga la tabla de estudiantes desde el servidor
// Llama a backend/estudiantes.php via GET (SELECT)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const API_ESTUDIANTES = 'backend/estudiantes.php';
    const contenedorTabla  = document.getElementById('contenedor-tabla');

    if (!contenedorTabla) return;

    /* Mostrar estado de carga */
    contenedorTabla.innerHTML = '<p>Cargando estudiantes...</p>';

    /* GET al backend PHP — trae todos los registros de la BD */
    fetch(API_ESTUDIANTES)
        .then(res => {
            if (!res.ok) throw new Error('Error en la respuesta del servidor.');
            return res.json();
        })
        .then(estudiantes => {
            if (!Array.isArray(estudiantes) || estudiantes.length === 0) {
                contenedorTabla.innerHTML = '<p>No hay estudiantes registrados aún.</p>';
                return;
            }

            /* Construir tabla dinámica con los datos recibidos */
            let html = `
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Matrícula</th>
                        <th>Correo</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Curso</th>
                    </tr>
                </thead>
                <tbody>
            `;

            estudiantes.forEach(est => {
                html += `
                    <tr>
                        <td>${est.nombre}</td>
                        <td>${est.matricula}</td>
                        <td>${est.correo}</td>
                        <td>${est.fecha_nacimiento}</td>
                        <td>${est.curso}</td>
                    </tr>
                `;
            });

            html += '</tbody></table>';
            contenedorTabla.innerHTML = html;
        })
        .catch(() => {
            contenedorTabla.innerHTML = '<p style="color:red;">No se pudo conectar con el servidor.</p>';
        });
});
