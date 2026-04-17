<?php
// ============================================================
// db.php  —  Conexión a MySQL (credenciales solo en servidor)
// ============================================================

$host     = 'localhost';
$dbname   = 'grupo8_db';
$usuario  = 'root';
$password = '';         

$conn = mysqli_connect($host, $usuario, $password, $dbname);

if (!$conn) {
    http_response_code(500);
    die(json_encode(['error' => 'Error de conexión: ' . mysqli_connect_error()]));
}

mysqli_set_charset($conn, 'utf8mb4');
?>