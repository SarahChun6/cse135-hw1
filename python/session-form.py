#!/usr/bin/env python3

import cgi, os, http.cookies, json, uuid
from pathlib import Path
from urllib.parse import parse_qs
from datetime import datetime

SESSION_DIR = Path("/tmp/python_sessions")
SESSION_DIR.mkdir(exist_ok=True)

def load_session():
    cookie = http.cookies.SimpleCookie(os.environ.get("HTTP_COOKIE", ""))
    session_id = cookie.get("session_id")
    if session_id:
        session_file = SESSION_DIR / f"{session_id.value}.json"
        if session_file.exists():
            with open(session_file) as f:
                return session_id.value, json.load(f)
    new_session_id = str(uuid.uuid4())
    return new_session_id, {}

def save_session(session_id, data):
    with open(SESSION_DIR / f"{session_id}.json", "w") as f:
        json.dump(data, f)

def clear_sessions():
    for f in SESSION_DIR.glob("*.json"):
        f.unlink()

# Load session
session_id, session_data = load_session()
if "submissions" not in session_data:
    session_data["submissions"] = []

# Determine action
query = os.environ.get("QUERY_STRING", "")
params = parse_qs(query)
action = params.get("action", ["save"])[0]

form = cgi.FieldStorage()

# Save submission
if action == "save" and form:
    submission = {key: form.getvalue(key, "") for key in form.keys()}
    submission["saved_at"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    session_data["submissions"].append(submission)
    save_session(session_id, session_data)
    response_text = f"Saved submission #{len(session_data['submissions'])}\n{submission}"

# View submissions
elif action == "view":
    if session_data.get("submissions"):
        response_text = json.dumps(session_data["submissions"], indent=2)
    else:
        response_text = "No submissions yet."

# Clear sessions
elif action == "clear":
    clear_sessions()
    session_data = {}
    response_text = "All sessions cleared."

else:
    response_text = "Unknown action."

# Send headers
cookie = http.cookies.SimpleCookie()
cookie["session_id"] = session_id
cookie["session_id"]["path"] = "/"

print(cookie.output())
print("Cache-Control: no-cache")
print("Content-Type: text/plain\n")
print(response_text)
