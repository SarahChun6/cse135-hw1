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

<?php if (!empty($_SESSION['field1']) || !empty($_SESSION['field2'])): ?>

<ul>
    <li>Field 1: <?= htmlspecialchars($_SESSION['field1']) ?></li>
    <li>Field 2: <?= htmlspecialchars($_SESSION['field2']) ?></li>
    <li>Saved at: <?= $_SESSION['saved_at'] ?></li>
</ul>

<?php else: ?>
<p>No data saved in this session.</p>
<?php endif; ?>

<p>
    <a href="state-form.html">Back to Form</a> |
    <a href="state-clear.php">Clear Data</a>
</p>

</body>
</html>
