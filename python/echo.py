#!/usr/bin/env python3

import os
import sys
import json
from urllib.parse import parse_qs
from datetime import datetime

# -------------------------
# CGI Echo Script in Python
# -------------------------

# Print headers first
print("Cache-Control: no-cache")
print("Content-Type: application/json\n")  # required extra newline

# Get request method and client info
method = os.environ.get("REQUEST_METHOD", "GET").upper()
ip = os.environ.get("REMOTE_ADDR", "Unknown")
user_agent = os.environ.get("HTTP_USER_AGENT", "Unknown")
date = datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S GMT")

# Initialize data object
data_received = {}

# Helper to parse URL-encoded string into dictionary
def parse_query(qs):
    parsed = parse_qs(qs)
    # parse_qs returns values as lists, flatten them
    return {k: v[0] if len(v)==1 else v for k,v in parsed.items()}

# Parse input depending on method
if method in ["GET", "DELETE"]:
    query = os.environ.get("QUERY_STRING", "")
    data_received = parse_query(query)
else:
    # POST or PUT
    content_length = int(os.environ.get("CONTENT_LENGTH", 0))
    raw_input = sys.stdin.read(content_length) if content_length > 0 else ""
    content_type = os.environ.get("CONTENT_TYPE", "")

    if "application/json" in content_type:
        try:
            data_received = json.loads(raw_input)
        except json.JSONDecodeError:
            data_received = {}
    else:
        data_received = parse_query(raw_input)

# Build response
response = {
    "method": method,
    "ip": ip,
    "user_agent": user_agent,
    "date": date,
    "data_received": data_received
}

# Output JSON
print(json.dumps(response, indent=2))
