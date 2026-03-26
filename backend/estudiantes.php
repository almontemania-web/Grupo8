<?php
// ============================================================
// estudiantes.php  —  READ: SELECT FROM estudiantes
// Método esperado: GET
// ============================================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido. Usa GET.']);
    exit;
}

require_once 'db.php';

// SELECT todos los estudiantes incluyendo id, más recientes primero
$result = mysqli_query(
    $conn,
    "SELECT id, nombre, matricula, correo, fecha_nacimiento, curso
     FROM estudiantes
     ORDER BY fecha_registro DESC"
);

if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => 'Error en la consulta: ' . mysqli_error($conn)]);
    exit;
}

$estudiantes = [];
while ($row = mysqli_fetch_assoc($result)) {
    $estudiantes[] = $row;
}

echo json_encode($estudiantes);

mysqli_free_result($result);
mysqli_close($conn);
