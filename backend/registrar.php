<?php
// ============================================================
// registrar.php  —  CREATE: INSERT INTO estudiantes
// Método esperado: POST (JSON)
// ============================================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight CORS
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

// Leer JSON del cuerpo de la petición
$data = json_decode(file_get_contents('php://input'), true);

$nombre          = trim($data['nombre']          ?? '');
$matricula       = trim($data['matricula']       ?? '');
$correo          = trim($data['correo']          ?? '');
$fechaNacimiento = trim($data['fechaNacimiento'] ?? '');
$curso           = trim($data['curso']           ?? '');

// Validación básica del lado servidor
if (!$nombre || !$matricula || !$correo || !$fechaNacimiento || !$curso) {
    http_response_code(400);
    echo json_encode(['error' => 'Todos los campos son obligatorios.']);
    exit;
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Formato de correo inválido.']);
    exit;
}

// INSERT con prepared statement (previene inyección SQL)
$stmt = mysqli_prepare(
    $conn,
    "INSERT INTO estudiantes (nombre, matricula, correo, fecha_nacimiento, curso)
     VALUES (?, ?, ?, ?, ?)"
);

mysqli_stmt_bind_param($stmt, 'sssss', $nombre, $matricula, $correo, $fechaNacimiento, $curso);

if (mysqli_stmt_execute($stmt)) {
    http_response_code(201);
    echo json_encode(['success' => true, 'message' => '¡Estudiante registrado con éxito!']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al registrar: ' . mysqli_error($conn)]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
