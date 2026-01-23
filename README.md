# CSE 135 HW1 Website - Deployment Setup

## Team Members
- Sarah Chun

- **Grader password:** 
- letmepasspls

This site is deployed automatically from GitHub to my Digital Ocean server using a bare Git repository and a post-receive hook.

---

## Server Setup

- **Bare repository:** `/var/repo/cse135-hw1.git`  
  - This repo cannot be edited directly; it only stores Git objects.

- **Deployment target:** `/var/www/schun.site/public_html`  
  - Apache serves files from this directory.

- **Post-receive hook:** `/var/repo/cse135-hw1.git/hooks/post-receive`  
  - Runs automatically on each push to `main`  
  - Checks out the latest commit into `/public_html` so Apache serves the updated site  

Example contents of the hook:

```sh
#!/bin/sh
TARGET="/var/www/schun.site/public_html"
GIT_DIR="/var/repo/cse135-hw1.git"

# Remove old files
rm -rf "$TARGET"/*

# Checkout latest main branch
git --work-tree="$TARGET" --git-dir="$GIT_DIR" checkout -f main

echo "Deployment finished."
