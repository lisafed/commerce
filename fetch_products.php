<?php
$host = 'localhost';
$dbname = 'commerce';
$user = 'root';
$password = '';

$pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;

$query = "SELECT * FROM produits LIMIT :limit OFFSET :offset";
$statement = $pdo->prepare($query);
$statement->bindValue(':limit', $limit, PDO::PARAM_INT);
$statement->bindValue(':offset', $offset, PDO::PARAM_INT);
$statement->execute();

$products = $statement->fetchAll(PDO::FETCH_ASSOC);
header('Content-Type: application/json');
echo json_encode($products);
?>
