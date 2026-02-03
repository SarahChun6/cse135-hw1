<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>View State</title>
</head>
<body>

<h1>Saved State</h1>

<?php if (!empty($_SESSION['username']) || !empty($_SESSION['password'])): ?>

<ul>
    <li>Username: <?= htmlspecialchars($_SESSION['username']) ?></li>
    <li>Password: <?= htmlspecialchars($_SESSION['password']) ?></li>
    <li>Saved at: <?= $_SESSION['saved_at'] ?></li>
</ul>

<?php else: ?>
<p>No data saved in this session.</p>
<?php endif; ?>

<p>
    <a href="../state-form-php.html">Back to Form</a> |
    <a href="state-clear.php">Clear Data</a>
</p>

</body>
</html>
