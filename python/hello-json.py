#!/usr/bin/env python3

import os
import json
from datetime import datetime

# CGI headers
print("Cache-Control: no-cache")
print("Content-Type: application/json\n")  # note the extra newline

# Get current date and client IP
date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
ip = os.environ.get("REMOTE_ADDR", "Unknown")

# Create the message dictionary
message = {
    "title": "Hello, Python!",
    "heading": "Hello, Python from Sarah!",
    "message": "This page was generated with Python",
    "time": date,
    "IP": ip
}

# Output JSON
print(json.dumps(message, indent=2))
