<?php
// ============================================================
// actualizar.php  —  UPDATE: editar un estudiante por ID
// Método esperado: POST (JSON)
// ============================================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido. Usa POST.']);
    exit;
}

require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$id              = intval($data['id']              ?? 0);
$nombre          = trim($data['nombre']            ?? '');
$matricula       = trim($data['matricula']         ?? '');
$correo          = trim($data['correo']            ?? '');
$fechaNacimiento = trim($data['fechaNacimiento']   ?? '');
$curso           = trim($data['curso']             ?? '');

if (!$id || !$nombre || !$matricula || !$correo || !$fechaNacimiento || !$curso) {
    http_response_code(400);
    echo json_encode(['error' => 'Todos los campos son obligatorios.']);
    exit;
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Formato de correo inválido.']);
    exit;
}

// UPDATE con prepared statement (previene inyección SQL)
$stmt = mysqli_prepare(
    $conn,
    "UPDATE estudiantes
     SET nombre = ?, matricula = ?, correo = ?, fecha_nacimiento = ?, curso = ?
     WHERE id = ?"
);

mysqli_stmt_bind_param($stmt, 'sssssi', $nombre, $matricula, $correo, $fechaNacimiento, $curso, $id);

if (mysqli_stmt_execute($stmt)) {
    if (mysqli_stmt_affected_rows($stmt) > 0) {
        echo json_encode(['success' => true, 'message' => '¡Estudiante actualizado correctamente!']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'No se encontró el estudiante para actualizar.']);
    }
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al actualizar: ' . mysqli_error($conn)]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
