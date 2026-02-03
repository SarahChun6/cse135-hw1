#!/usr/bin/env node

console.log("Cache-Control: no-cache");
console.log("Content-Type: text/html\n");

console.log(`<!DOCTYPE html>
<html>
<head>
    <title>Environment Variables</title>
</head>
<body>
<h1 align="center">Environment Variables</h1>
<hr>`);

// Sort keys alphabetically
Object.keys(process.env).sort().forEach(key => {
    console.log(`<b>${key}:</b> ${process.env[key]}<br />`);
});

console.log(`</body>
</html>`);
