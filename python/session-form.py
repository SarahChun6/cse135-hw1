#!/usr/bin/env python3

import cgi
import os
import http.cookies
import json
import uuid
from pathlib import Path

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

# Load or create session
session_id, session_data = load_session()

# Parse form data
form = cgi.FieldStorage()
if "field1" in form or "field2" in form:
    if "field1" in form:
        session_data["field1"] = form.getvalue("field1")
    if "field2" in form:
        session_data["field2"] = form.getvalue("field2")
    save_session(session_id, session_data)

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
print("""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Python Session State Demo</title>
</head>
<body>

<h1>Session State Demo - Python</h1>

<form action="#" method="post">
    <label>
        Field 1:
        <input type="text" name="field1" value="{field1}">
    </label><br><br>

    <label>
        Field 2:
        <input type="text" name="field2" value="{field2}">
    </label><br><br>

    <button type="submit">Save Data</button>
</form>

<p>
    <strong>Saved Data:</strong><br>
    Field 1: {field1}<br>
    Field 2: {field2}
</p>

</body>
</html>
""".format(
    field1=session_data.get("field1", ""),
    field2=session_data.get("field2", "")
))
