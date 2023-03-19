<?php

/*header('Content-Type: application/json');
 
try {
    $pdo = new PDO('mysql:host=localhost;dbname=db_academica', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 
    $stmt = $pdo->query('SELECT * FROM docentes');
    $docentes = $stmt->fetchAll(PDO::FETCH_ASSOC);
 
    echo json_encode($docentes);
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}*/

/*function obtener_registros($tabla){
  header('Content-Type: application/json');
  try {
      $pdo = new PDO('mysql:host=localhost;dbname=db_academica', 'root', '');
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   
      $stmt = $pdo->query('SELECT * FROM '.$tabla);
      $registros = $stmt->fetchAll(PDO::FETCH_ASSOC);
   
      echo json_encode($registros);
  } catch(PDOException $e) {
      echo "Error: " . $e->getMessage();
  }
}

obtener_registros('docentes');*/

class BaseDeDatos {
  public function obtener_registros($tabla){
      header('Content-Type: application/json');
      try {
          $pdo = new PDO('mysql:host=localhost;dbname=db_academica', 'root', '');
          $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       
          $stmt = $pdo->query('SELECT * FROM '.$tabla);
          $registros = $stmt->fetchAll(PDO::FETCH_ASSOC);
       
          echo json_encode($registros);
      } catch(PDOException $e) {
          echo "Error: " . $e->getMessage();
      }
  }
}








?>