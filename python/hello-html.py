#!/usr/bin/env python3

import os
from datetime import datetime

# CGI headers
print("Cache-Control: no-cache")
print("Content-Type: text/html\n")  # note the extra newline

# Get current date and client IP
date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
ip = os.environ.get("REMOTE_ADDR", "Unknown")

# HTML output
print(f"""<!DOCTYPE html>
<html>
<head>
    <title>Hello CGI World</title>
</head>
<body>
<h1 align="center">Hello HTML World</h1>
<hr/>
<p>Hello World from Sarah</p>
<p>This page was generated with Python</p>
<p>This program was generated at: {date}</p>
<p>Your current IP Address is: {ip}</p>
</body>
</html>""")
