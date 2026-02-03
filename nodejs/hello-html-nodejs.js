#!/usr/bin/env node

// Simple CGI-style headers
console.log("Cache-Control: no-cache");
console.log("Content-Type: text/html\n");

const date = new Date();
const ip = process.env.REMOTE_ADDR || "Unknown";

console.log(`<!DOCTYPE html>
<html>
<head>
    <title>Hello CGI World</title>
</head>
<body>
<h1 align="center">Hello HTML World</h1>
<hr/>
<p>Hello World from Sarah</p>
<p>This page was generated with NodeJS</p>
<p>This program was generated at: ${date}</p>
<p>Your current IP Address is: ${ip}</p>
</body>
</html>`);
