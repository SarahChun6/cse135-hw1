#!/usr/bin/env python3

import os

# CGI headers
print("Cache-Control: no-cache")
print("Content-Type: text/html\n")  # important extra newline

# HTML header
print("""<!DOCTYPE html>
<html>
<head>
    <title>Environment Variables</title>
</head>
<body>
<h1 align="center">Environment Variables</h1>
<hr>""")

# Loop through environment variables sorted alphabetically
for key in sorted(os.environ.keys()):
    value = os.environ[key]
    print(f"<b>{key}:</b> {value}<br />")

# HTML footer
print("""
</body>
</html>""")
