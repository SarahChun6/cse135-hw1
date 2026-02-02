<?php
header("Cache-Control: no-cache");
header("Content-Type: text/html");
?>
<!DOCTYPE html>
<html>
<head>
    <title>Hello CGI World</title>
</head>
<body>

<h1 align="center">Hello HTML World</h1>
<hr/>
<p>Hello World from Sarah</p>
<p>This page was generated with PHP</p>
<?php
$date = date("Y-m-d H:i:s");
echo "<p>This program was generated at: $date</p>";

$address = $_SERVER['REMOTE_ADDR'];
echo "<p>Your current IP Address is: $address</p>";
?>

</body>
</html>
