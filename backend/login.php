<?php
session_start();
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = trim($_POST['usuario'] ?? '');
    $password = trim($_POST['password'] ?? '');

    // Usuario hardcodeado para pruebas
    if ($usuario === 'grupo8' && $password === 'grupo8') {
        $_SESSION['usuario'] = 'grupo8';
        $_SESSION['id'] = 0;
        header('Location: ../Dashboard.html');
        exit;
    }

   // Login con correo y password de la tabla estudiantes
    $stmt = $conn->prepare('SELECT id, correo, password FROM estudiantes WHERE correo = ? LIMIT 1');
    $stmt->bind_param('s', $usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        // Validación correcta usando password_verify para leer el Hash
        if (password_verify($password, $row['password'])) {
            $_SESSION['usuario'] = $row['correo'];
            $_SESSION['estudiante-id'] = $row['id']; 
            header('Location: ../Dashboard.html');
            exit;
        } else {
            // Caso donde la contraseña fue ingresada plana directamente a la DB (para pruebas)
            // Borra este 'else if' cuando ya todos tus usuarios tengan Hash
            if ($password === $row['password']) {
                $_SESSION['usuario'] = $row['correo'];
                $_SESSION['estudiante-id'] = $row['id']; 
                header('Location: ../Dashboard.html');
                exit;
            }
        }
    }

    // Si falla
    $_SESSION['login_error'] = 'Usuario o contraseña incorrectos';
    header('Location: ../login.html');
    exit;
}
header('Location: ../login.html');
exit;
