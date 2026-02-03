<?php
// echo-php.php

// Prevent caching
header("Cache-Control: no-cache"); //, no-store, must-revalidate
header("Content-Type: application/json");

// Get method
$method = $_SERVER['REQUEST_METHOD'];

// Get client info
$ip = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
$agent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
$date = gmdate("D, d M Y H:i:s T"); // date(DATE_RFC2822);

// Parse input depending on method & content type
$data = [];

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$rawInput = file_get_contents("php://input");

if ($method === 'GET' || $method === 'DELETE') {
    $data_received = $_GET;
} else {
    // POST or PUT
    if (stripos($content_type, 'application/json') !== false) {
        $json = file_get_contents("php://input");
        $data_received = json_decode($json, true);
    } else {
        $data_received = $_POST;
    }
}

// Build response
$response = [
    "method" => $method,
    "ip" => $ip,
    "user_agent" => $agent,
    "date" => $date,
    "data_received" => $data
];

// Send JSON
echo json_encode($response, JSON_PRETTY_PRINT);
?>
