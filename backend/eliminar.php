<?php
// ============================================================
// eliminar.php  —  DELETE: eliminar un estudiante por ID
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
$id   = intval($data['id'] ?? 0);

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'ID inválido.']);
    exit;
}

// DELETE con prepared statement (previene inyección SQL)
$stmt = mysqli_prepare($conn, "DELETE FROM estudiantes WHERE id = ?");
mysqli_stmt_bind_param($stmt, 'i', $id);

if (mysqli_stmt_execute($stmt)) {
    if (mysqli_stmt_affected_rows($stmt) > 0) {
<<<<<<< HEAD
        echo json_encode(['success' => true, 'message' => '¡Estudiante eliminado correctamente!']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'No se encontró el estudiante para eliminar.']);
=======
        echo json_encode(['success' => true, 'message' => 'Estudiante eliminado correctamente.']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Estudiante no encontrado.']);
>>>>>>> 027e23df8f4aa0c9787cdc3936092704bc0a64b7
    }
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al eliminar: ' . mysqli_error($conn)]);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
