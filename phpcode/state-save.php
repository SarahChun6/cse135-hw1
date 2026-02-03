<?php
session_start();

// Save incoming data into session
$_SESSION['field1'] = $_POST['field1'] ?? '';
$_SESSION['field2'] = $_POST['field2'] ?? '';
$_SESSION['saved_at'] = date('r');
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>State Saved</title>
</head>
<body>

<h1>Data Saved</h1>

<p>Your data has been stored on the server.</p>

<ul>
    <li>Field 1: <?= htmlspecialchars($_SESSION['field1']) ?></li>
    <li>Field 2: <?= htmlspecialchars($_SESSION['field2']) ?></li>
    <li>Saved at: <?= $_SESSION['saved_at'] ?></li>
</ul>

<p>
    <a href="state-view.php">View Saved Data</a>
</p>

</body>
</html>
