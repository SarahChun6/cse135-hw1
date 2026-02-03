<?php
session_start();
session_unset();
session_destroy();
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>State Cleared</title>
</head>
<body>

<h1>Session Cleared</h1>

<p>The saved data has been removed.</p>

<p>
    <a href="state-form.html">Start Over</a>
</p>

</body>
</html>
