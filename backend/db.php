<?php
// ============================================================
// db.php  —  Conexión a MySQL (credenciales solo en servidor)
// ============================================================

$host     = 'localhost';
$dbname   = 'grupo8_db';
$usuario  = 'root';
<<<<<<< HEAD
$password = '';         
=======
$password = '';          // Cambia esto si tu MySQL tiene contraseña
>>>>>>> 027e23df8f4aa0c9787cdc3936092704bc0a64b7

$conn = mysqli_connect($host, $usuario, $password, $dbname);

if (!$conn) {
    http_response_code(500);
    die(json_encode(['error' => 'Error de conexión: ' . mysqli_connect_error()]));
}

mysqli_set_charset($conn, 'utf8mb4');
<<<<<<< HEAD
?>
=======
>>>>>>> 027e23df8f4aa0c9787cdc3936092704bc0a64b7
