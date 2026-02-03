<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <title>State Demo - View</title>
</head>
<body>
<h1>All Saved Submissions</h1>

<p><a href="../state-form.html">Back to Form</a></p>
<p><a href="state-clear.php">Clear All Data</a></p>

<?php
if (!empty($_SESSION['submissions'])) {
    echo "<ol>";
    foreach ($_SESSION['submissions'] as $entry) {
        echo "<li>";
        echo "Field 1: " . htmlspecialchars($entry['field1']) . ", ";
        echo "Field 2: " . htmlspecialchars($entry['field2']) . ", ";
        echo "Saved At: " . $entry['saved_at'];
        echo "</li>";
    }
    echo "</ol>";
} else {
    echo "<p>No submissions yet.</p>";
}
?>
</body>
</html>
