<?php
$host = 'localhost';
$dbname = 'commerce';
$user = 'root';
$password = ''; 


$pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Use Faker to generate dummy data
require 'vendor/autoload.php';

$faker = Faker\Factory::create();

$insertQuery = "INSERT INTO produits (name, description, price, image_url) VALUES (:name, :description, :price, :image_url)";
$statement = $pdo->prepare($insertQuery);

try {
    for ($i = 0; $i < 1000; $i++) {
        $name = $faker->word;
        $description = $faker->sentence;
        $price = $faker->randomFloat(2, 1, 1000);
        $imageUrl = $faker->imageUrl(640, 480, 'product');

        $statement->execute([
            ':name' => $name,
            ':description' => $description,
            ':price' => $price,
            ':image_url' => $imageUrl,
        ]);
    }

    echo "Dummy data inserted successfully.\n";
} catch (PDOException $e) {
    die("Failed to insert dummy data: " . $e->getMessage());
}

?>
