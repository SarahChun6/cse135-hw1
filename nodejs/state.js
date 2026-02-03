#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const crypto = require("crypto");

// -------------------------
// Configuration
// -------------------------
const SESSION_DIR = "/tmp/node_sessions";
if (!fs.existsSync(SESSION_DIR)) fs.mkdirSync(SESSION_DIR);

// -------------------------
// Helper: parse cookies
// -------------------------
function parseCookies(cookieHeader = "") {
  const cookies = {};
  cookieHeader.split(";").forEach(pair => {
    const [key, value] = pair.trim().split("=");
    if (key && value) cookies[key] = value;
  });
  return cookies;
}

// -------------------------
// Helper: load session
// -------------------------
function loadSession(cookies) {
  const sessionId = cookies.session_id;
  if (sessionId) {
    const sessionFile = path.join(SESSION_DIR, sessionId + ".json");
    if (fs.existsSync(sessionFile)) {
      const data = JSON.parse(fs.readFileSync(sessionFile));
      return { sessionId, data };
    }
  }
  // Create new session
  const newId = crypto.randomUUID();
  return { sessionId: newId, data: {} };
}

// -------------------------
// Helper: save session
// -------------------------
function saveSession(sessionId, data) {
  const sessionFile = path.join(SESSION_DIR, sessionId + ".json");
  fs.writeFileSync(sessionFile, JSON.stringify(data, null, 2));
}

// -------------------------
// Helper: clear all sessions
// -------------------------
function clearSessions() {
  fs.readdirSync(SESSION_DIR).forEach(file => {
    if (file.endsWith(".json")) fs.unlinkSync(path.join(SESSION_DIR, file));
  });
}

// -------------------------
// CGI headers
// -------------------------
console.log("Cache-Control: no-cache");
console.log("Content-Type: text/html");

// -------------------------
// Parse cookies
// -------------------------
const cookies = parseCookies(process.env.HTTP_COOKIE);
let { sessionId, data: sessionData } = loadSession(cookies);

// Set cookie header
console.log(`Set-Cookie: session_id=${sessionId}; Path=/`);

// -------------------------
// Parse query string
// -------------------------
const query = querystring.parse(process.env.QUERY_STRING || "");
const action = query.action || "save";

// -------------------------
// Parse POST data if needed
// -------------------------
let postData = "";
if (process.env.REQUEST_METHOD === "POST") {
  postData = fs.readFileSync(0, "utf-8");
}

if (action === "save" && postData) {
  const contentType = process.env.CONTENT_TYPE || "";
  let fields = {};
  if (contentType.includes("application/json")) {
    try { fields = JSON.parse(postData); } catch { fields = {}; }
  } else {
    fields = querystring.parse(postData);
  }

  if (fields.field1) sessionData.field1 = fields.field1;
  if (fields.field2) sessionData.field2 = fields.field2;
  saveSession(sessionId, sessionData);
}

// Handle clearing all sessions
if (action === "clear") {
  clearSessions();
  sessionData = {};
}

// -------------------------
// HTML output
// -------------------------
let html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>NodeJS Session State Demo</title>
</head>
<body>

<h1>Session State Demo - NodeJS</h1>

<nav>
  <a href="?action=save">Save Form Data</a> |
  <a href="?action=view">View Saved Data</a> |
  <a href="?action=clear" onclick="return confirm('Are you sure you want to clear all sessions?')">Clear All Sessions</a>
</nav>
<hr>
`;

if (action === "save") {
  html += `
<form action="?action=save" method="post">
  <label>
    Field 1:
    <input type="text" name="field1" value="${sessionData.field1 || ""}">
  </label><br><br>

  <label>
    Field 2:
    <input type="text" name="field2" value="${sessionData.field2 || ""}">
  </label><br><br>

  <button type="submit">Save Data</button>
</form>
`;
} else if (action === "view") {
  html += "<h2>Saved Session Data</h2>\n";
  if (Object.keys(sessionData).length > 0) {
    html += `<pre>${JSON.stringify(sessionData, null, 2)}</pre>`;
  } else {
    html += "<p>No session data found.</p>";
  }
} else if (action === "clear") {
  html += "<p>All sessions cleared!</p>";
}

html += `
</body>
</html>
`;

console.log("\n" + html);
