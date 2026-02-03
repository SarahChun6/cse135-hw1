#!/usr/bin/env node

import fs from "fs";
import path from "path";

function parseCookies(cookieHeader = "") {
  const cookies = {};
  cookieHeader.split(";").forEach(c => {
    const [k, v] = c.trim().split("=");
    if (k) cookies[k] = decodeURIComponent(v || "");
  });
  return cookies;
}

const SESSION_DIR = "./sessions";
const cookies = parseCookies(process.env.HTTP_COOKIE);
const sessionId = cookies.session_id;

let session = null;

if (sessionId) {
  const sessionFile = path.join(SESSION_DIR, `${sessionId}.json`);
  if (fs.existsSync(sessionFile)) {
    session = JSON.parse(fs.readFileSync(sessionFile, "utf8"));
  }
}

console.log("Content-Type: application/json\n");
console.log(JSON.stringify({
  session_id: sessionId || null,
  session
}, null, 2));
