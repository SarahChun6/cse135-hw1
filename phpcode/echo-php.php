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

if (stripos($contentType, "application/json") !== false) {
    $data = json_decode($rawInput, true) ?? [];
} else {
    if ($method === "GET") {
        $data = $_GET;
    } else {
        parse_str($rawInput, $data);
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
