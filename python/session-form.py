#!/usr/bin/env python3

import cgi
import os
import http.cookies
import json
import uuid
from pathlib import Path
from urllib.parse import parse_qs
from datetime import datetime

# Directory to store session files
SESSION_DIR = Path("/tmp/python_sessions")
SESSION_DIR.mkdir(exist_ok=True)

# Helper: load session
def load_session():
    cookie = http.cookies.SimpleCookie(os.environ.get("HTTP_COOKIE", ""))
    session_id = cookie.get("session_id")
    if session_id:
        session_file = SESSION_DIR / f"{session_id.value}.json"
        if session_file.exists():
            with open(session_file) as f:
                return session_id.value, json.load(f)
    # No valid session, create new one
    new_session_id = str(uuid.uuid4())
    return new_session_id, {}

# Helper: save session
def save_session(session_id, data):
    session_file = SESSION_DIR / f"{session_id}.json"
    with open(session_file, "w") as f:
        json.dump(data, f)

# Helper: clear all sessions
def clear_sessions():
    for f in SESSION_DIR.glob("*.json"):
        f.unlink()

# Load session
session_id, session_data = load_session()

# Ensure the 'submissions' list exists
if "submissions" not in session_data:
    session_data["submissions"] = []

# Determine action
query = os.environ.get("QUERY_STRING", "")
params = parse_qs(query)
action = params.get("action", ["save"])[0]  # default to save

# Parse form data if saving
form = cgi.FieldStorage()
# Save new submission if form fields are present
if action == "save" and form:
    # Collect all form fields dynamically
    submission = { key: form.getvalue(key, "") for key in form.keys() }
    submission["saved_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    session_data["submissions"].append(submission)
    save_session(session_id, session_data)

# Handle clearing all session files
if action == "clear":
    clear_sessions()
    session_data = {}

# Output HTTP headers
cookie = http.cookies.SimpleCookie()
cookie["session_id"] = session_id
cookie["session_id"]["path"] = "/"

print(cookie.output())
print("Cache-Control: no-cache")
print("Content-Type: text/html\n")


html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Python Session State Demo</title>
</head>
<body>
<h1>Python Session State Demo</h1>

<nav>
  <a href="?action=save">Save Form</a> |
  <a href="?action=view">View Submissions</a> |
  <a href="?action=clear" onclick="return confirm('Clear all sessions?')">Clear All Sessions</a>
</nav>
<hr>
"""

# Pre-fill form inputs with latest submission
latest = session_data["submissions"][-1] if session_data["submissions"] else {}

if action == "save":
    html += f"""
<form action="?action=save" method="post">
    <label>Field 1: <input type="text" name="field1" value="{latest.get('field1', '')}"></label><br><br>
    <label>Field 2: <input type="text" name="field2" value="{latest.get('field2', '')}"></label><br><br>
    <button type="submit">Save Data</button>
</form>
"""
elif action == "view":
    html += "<h2>All Submissions</h2>\n"
    if session_data.get("submissions"):
        for i, sub in enumerate(session_data["submissions"], 1):
            html += f"<b>Submission {i}:</b><br>"
            for k, v in sub.items():
                html += f"&nbsp;&nbsp;{k}: {v}<br>"
            html += "<hr>"
    else:
        html += "<p>No submissions yet.</p>"
elif action == "clear":
    html += "<p>All sessions cleared!</p>"

html += "</body></html>"

print(html)