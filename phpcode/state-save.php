<?php
session_start();

// Ensure the submissions array exists
if (!isset($_SESSION['submissions'])) {
    $_SESSION['submissions'] = [];
}

// Save new submission
if (isset($_POST['field1']) || isset($_POST['field2'])) {
    $_SESSION['submissions'][] = [
        'field1' => $_POST['field1'] ?? '',
        'field2' => $_POST['field2'] ?? '',
        'saved_at' => date('Y-m-d H:i:s')
    ];
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>State Demo - Saved</title>
</head>
<body>
<h1>Data Saved!</h1>

<p><a href="state-view.php">View All Saved Data</a></p>
<p><a href="../state-form-php.html">Back to Form</a></p>
<p><a href="state-clear.php">Clear All Data</a></p>

<h2>Most Recent Submission</h2>
<?php
$last = end($_SESSION['submissions']);
if ($last) {
    echo "<ul>";
    echo "<li>Field 1: " . htmlspecialchars($last['field1']) . "</li>";
    echo "<li>Field 2: " . htmlspecialchars($last['field2']) . "</li>";
    echo "<li>Saved At: " . $last['saved_at'] . "</li>";
    echo "</ul>";
} else {
    echo "<p>No submissions yet.</p>";
}
?>
</body>
</html>
