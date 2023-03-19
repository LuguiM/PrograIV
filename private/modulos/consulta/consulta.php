<?php

// Conexión a la base de datos
$conn = mysqli_connect('localhost', 'root', '', 'db_academica');

// Obtener los estudiantes de la base de datos
$query = "SELECT * FROM docentes";
$resultado = mysqli_query($conn, $query);

// Crear un array asociativo con los estudiantes
$docentes = array();
while ($fila = mysqli_fetch_assoc($resultado)) {
  $docentes[] = $fila;
}

// Cerrar la conexión a la base de datos
mysqli_close($conn);

// Convertir el array asociativo a un objeto JSON
$respuesta = array('docentes' => $docentes);
echo json_encode($respuesta); // Retorna la respuesta como un objeto JSON
?>