#!/usr/bin/env python3

import cgi
import os
import http.cookies
import json
import uuid
from pathlib import Path
from urllib.parse import parse_qs

# Directory to store session files
SESSION_DIR = Path("/tmp/python_sessions")
SESSION_DIR.mkdir(exist_ok=True)

# -------------------------
# Helper: load session
# -------------------------
def load_session():
    cookie = http.cookies.SimpleCookie(os.environ.get("HTTP_COOKIE", ""))
    session_id = cookie.get("session_id")
    if session_id:
        session_file = SESSION_DIR / f"{session_id.value}.json"
        if session_file.exists():
            with open(session_file) as f:
                return session_id.value, json.load(f)
    # No valid session, create new
    new_session_id = str(uuid.uuid4())
    return new_session_id, {}

# -------------------------
# Helper: save session
# -------------------------
def save_session(session_id, data):
    session_file = SESSION_DIR / f"{session_id}.json"
    with open(session_file, "w") as f:
        json.dump(data, f)

# -------------------------
# Helper: clear all sessions
# -------------------------
def clear_sessions():
    for f in SESSION_DIR.glob("*.json"):
        f.unlink()

# -------------------------
# Load session
# -------------------------
session_id, session_data = load_session()

# -------------------------
# Determine action
# -------------------------
query = os.environ.get("QUERY_STRING", "")
params = parse_qs(query)
action = params.get("action", ["save"])[0]  # default to save

# Parse form data if saving
form = cgi.FieldStorage()
if action == "save" and ("field1" in form or "field2" in form):
    if "field1" in form:
        session_data["field1"] = form.getvalue("field1")
    if "field2" in form:
        session_data["field2"] = form.getvalue("field2")
    save_session(session_id, session_data)

# Handle clearing all session files
if action == "clear":
    clear_sessions()
    session_data = {}

# -------------------------
# Output HTTP headers
# -------------------------
cookie = http.cookies.SimpleCookie()
cookie["session_id"] = session_id
cookie["session_id"]["path"] = "/"

print(cookie.output())
print("Cache-Control: no-cache")
print("Content-Type: text/html\n")

# -------------------------
# Output HTML page
# -------------------------
html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Python Session State Demo</title>
</head>
<body>

<h1>Session State Demo - Python</h1>

<nav>
  <a href="?action=save">Save Form Data</a> |
  <a href="?action=view">View Saved Data</a> |
  <a href="?action=clear" onclick="return confirm('Are you sure you want to clear all sessions?')">Clear All Sessions</a>
</nav>
<hr>
"""

# Action: Save form page
if action == "save":
    html += f"""
<form action="?action=save" method="post">
    <label>
        Field 1:
        <input type="text" name="field1" value="{session_data.get('field1', '')}">
    </label><br><br>

    <label>
        Field 2:
        <input type="text" name="field2" value="{session_data.get('field2', '')}">
    </label><br><br>

    <button type="submit">Save Data</button>
</form>
"""
# Action: View saved data
elif action == "view":
    html += "<h2>All Saved Session Data</h2>\n"
    if session_data:
        html += f"<pre>{json.dumps(session_data, indent=2)}</pre>"
    else:
        html += "<p>No session data found.</p>"

# Action: Clear
elif action == "clear":
    html += "<p>All sessions cleared!</p>"

html += """
</body>
</html>
"""

print(html)
