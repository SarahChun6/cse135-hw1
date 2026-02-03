#!/usr/bin/env node

// ======================
// NodeJS CGI Echo Script
// ======================

// Print headers first
console.log("Cache-Control: no-cache");
console.log("Content-Type: application/json\n");

// Helper to parse URL-encoded string into object
function parseQuery(qs) {
  const params = {};
  qs.split("&").forEach(pair => {
    if (!pair) return;
    const [key, value] = pair.split("=");
    params[key] = decodeURIComponent(value || '');
  });
  return params;
}

// Get request method and client info
const method = process.env.REQUEST_METHOD || 'GET';
const ip = process.env.REMOTE_ADDR || 'Unknown';
const agent = process.env.HTTP_USER_AGENT || 'Unknown';
const date = new Date().toUTCString();

// Initialize data object
let data_received = {};

// Parse input depending on method
if (method === 'GET' || method === 'DELETE') {
  const query = process.env.QUERY_STRING || '';
  data_received = parseQuery(query);
} else {
  // POST or PUT
  const contentType = process.env.CONTENT_TYPE || '';
  let rawInput = '';
  try {
    // Read stdin for POST/PUT data
    const fs = require('fs');
    const fd = 0; // stdin
    rawInput = fs.readFileSync(fd, 'utf-8');
  } catch (e) {
    rawInput = '';
  }

  if (contentType.includes('application/json')) {
    try {
      data_received = JSON.parse(rawInput);
    } catch (e) {
      data_received = {};
    }
  } else {
    data_received = parseQuery(rawInput);
  }
}

// Build response
const response = {
  method,
  ip,
  user_agent: agent,
  date,
  data_received
};

// Output JSON
console.log(JSON.stringify(response, null, 2));
