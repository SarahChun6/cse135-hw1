#!/usr/bin/env node

// Manual CGI style NodeJS

// Import required modules
const querystring = require('querystring');

// Get environment variables
const method = process.env.REQUEST_METHOD || 'UNKNOWN';
const ip = process.env.REMOTE_ADDR || 'Unknown';
const agent = process.env.HTTP_USER_AGENT || 'Unknown';
const date = new Date().toUTCString();

// Helper to parse x-www-form-urlencoded
function parseFormData(data) {
    return querystring.parse(data);
}

// Read POST/PUT/DELETE body if exists
let inputData = '';

if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    const contentLength = parseInt(process.env.CONTENT_LENGTH || 0, 10);
    if (contentLength > 0) {
        let buffer = Buffer.alloc(contentLength);
        let bytesRead = 0;
        while (bytesRead < contentLength) {
            bytesRead += process.stdin.read(buffer, bytesRead, contentLength - bytesRead) || 0;
        }
        inputData = buffer.toString();
    }
} else if (method === 'GET') {
    inputData = process.env.QUERY_STRING || '';
}

// Parse input based on content type
let data = {};
const contentType = process.env.CONTENT_TYPE || '';
if (contentType.includes("application/json")) {
    try {
        data = JSON.parse(inputData);
    } catch (e) {
        data = { error: "Invalid JSON" };
    }
} else {
    data = parseFormData(inputData);
}

// Build JSON response
const response = {
    method: method,
    ip: ip,
    user_agent: agent,
    date: date,
    data_received: data
};

// Output CGI headers
console.log("Cache-Control: no-cache");
console.log("Content-Type: application/json\n");

// Send JSON
console.log(JSON.stringify(response, null, 2));
