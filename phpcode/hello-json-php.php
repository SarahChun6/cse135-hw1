<?php
// Send headers
header("Cache-Control: no-cache");
header("Content-Type: application/json");

// Get current date/time
$date = date("Y-m-d H:i:s");

// Get user's IP address
$address = $_SERVER['REMOTE_ADDR'];

// Create the message array (associative array in PHP)
$message = array(
    "title" => "Hello, PHP!",
    "heading" => "Hello, PHP from Sarah!",
    "message" => "This page was generated with the PHP programming language",
    "time" => $date,
    "IP" => $address
);

// Encode the array as JSON and output it
echo json_encode($message, JSON_PRETTY_PRINT);
?>
