<?php
session_start();

// Save incoming data into session
$_SESSION['username'] = $_POST['username'] ?? '';
$_SESSION['password'] = $_POST['password'] ?? '';
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
    <li>Username: <?= htmlspecialchars($_SESSION['username']) ?></li>
    <li>Password: <?= htmlspecialchars($_SESSION['password']) ?></li>
    <li>Saved at: <?= $_SESSION['saved_at'] ?></li>
</ul>

<p>
    <a href="state-view.php">View Saved Data</a>
</p>

</body>
</html>
