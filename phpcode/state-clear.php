<?php
session_start();
session_destroy();
?>
<!DOCTYPE html>
<html>
<head>
    <title>State Demo - Cleared</title>
</head>
<body>
<h1>All session data cleared!</h1>

<p><a href="state-form.html">Back to Form</a></p>
<p><a href="state-view.php">View Saved Data</a></p>
</body>
</html>
