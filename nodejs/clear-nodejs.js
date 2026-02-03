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

if (sessionId) {
  const sessionFile = path.join(SESSION_DIR, `${sessionId}.json`);
  if (fs.existsSync(sessionFile)) fs.unlinkSync(sessionFile);
}

console.log("Set-Cookie: session_id=; Path=/; Max-Age=0");
console.log("Content-Type: application/json\n");

console.log(JSON.stringify({ message: "Session cleared" }, null, 2));
