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

<<<<<<< HEAD

=======
>>>>>>> 027e23df8f4aa0c9787cdc3936092704bc0a64b7
$nombre          = trim($data['nombre']          ?? '');
$matricula       = trim($data['matricula']       ?? '');
$correo          = trim($data['correo']          ?? '');
$fechaNacimiento = trim($data['fechaNacimiento'] ?? '');
$curso           = trim($data['curso']           ?? '');
<<<<<<< HEAD
$password = password_hash($matricula, PASSWORD_DEFAULT); // La matrícula será la contraseña
=======
>>>>>>> 027e23df8f4aa0c9787cdc3936092704bc0a64b7

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

<<<<<<< HEAD

// INSERT con prepared statement (incluye password por defecto)
$stmt = mysqli_prepare(
    $conn,
    "INSERT INTO estudiantes (nombre, matricula, correo, fecha_nacimiento, curso, password)
     VALUES (?, ?, ?, ?, ?, ?)"
);

mysqli_stmt_bind_param($stmt, 'ssssss', $nombre, $matricula, $correo, $fechaNacimiento, $curso, $password);
=======
// INSERT con prepared statement (previene inyección SQL)
$stmt = mysqli_prepare(
    $conn,
    "INSERT INTO estudiantes (nombre, matricula, correo, fecha_nacimiento, curso)
     VALUES (?, ?, ?, ?, ?)"
);

mysqli_stmt_bind_param($stmt, 'sssss', $nombre, $matricula, $correo, $fechaNacimiento, $curso);
>>>>>>> 027e23df8f4aa0c9787cdc3936092704bc0a64b7

if (mysqli_stmt_execute($stmt)) {
    http_response_code(201);
    echo json_encode(['success' => true, 'message' => '¡Estudiante registrado con éxito!']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al registrar: ' . mysqli_error($conn)]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
