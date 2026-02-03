#!/usr/bin/env node

import fs from "fs";
import crypto from "crypto";
import path from "path";

// ----------------------
// Helpers
// ----------------------

function parseCookies(cookieHeader = "") {
  const cookies = {};
  cookieHeader.split(";").forEach(c => {
    const [k, v] = c.trim().split("=");
    if (k) cookies[k] = decodeURIComponent(v || "");
  });
  return cookies;
}

function parseQuery(qs = "") {
  const params = {};
  qs.split("&").forEach(pair => {
    if (!pair) return;
    const [k, v] = pair.split("=");
    params[k] = decodeURIComponent(v || "");
  });
  return params;
}

function readBody() {
  try {
    return fs.readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

// ----------------------
// Session handling
// ----------------------

const SESSION_DIR = "./sessions";

const cookies = parseCookies(process.env.HTTP_COOKIE);
let sessionId = cookies.session_id;
let isNewSession = false;

if (!sessionId) {
  sessionId = crypto.randomBytes(16).toString("hex");
  isNewSession = true;
}

const sessionFile = path.join(SESSION_DIR, `${sessionId}.json`);

let session = {};
if (fs.existsSync(sessionFile)) {
  session = JSON.parse(fs.readFileSync(sessionFile, "utf8"));
}

// ----------------------
// Request parsing
// ----------------------

const method = process.env.REQUEST_METHOD || "GET";
const contentType = process.env.CONTENT_TYPE || "";
let data = {};

if (method === "GET" || method === "DELETE") {
  data = parseQuery(process.env.QUERY_STRING || "");
} else {
  const body = readBody();
  if (contentType.includes("application/json")) {
    try { data = JSON.parse(body); } catch {}
  } else {
    data = parseQuery(body);
  }
}

// ----------------------
// Update session state
// ----------------------

if (data.field1 !== undefined) session.field1 = data.field1;
if (data.field2 !== undefined) session.field2 = data.field2;

// Save session
fs.writeFileSync(sessionFile, JSON.stringify(session, null, 2));

// ----------------------
// Output headers
// ----------------------

if (isNewSession) {
  console.log(`Set-Cookie: session_id=${sessionId}; Path=/; HttpOnly`);
}

console.log("Content-Type: application/json\n");

// ----------------------
// Output response
// ----------------------

console.log(JSON.stringify({
  message: "Session stored via CGI",
  session_id: sessionId,
  session
}, null, 2));

/*#!/usr/bin/env node

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
*/