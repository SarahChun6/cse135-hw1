# CSE 135 HW3 - Test Site, Data Collection, DB & REST Endpoints

## Team Members
- Sarah Chun

## **Grader password:** letmepasspls

https://schun.site    
https://test.schun.site    
https://collector.schun.site (same html page from hw1 but hosting new hw3 script collector.js)   

## **Site login:** (for accessing https://schun.site/members/sarah/index.html)
- Username: sarah
- Password: dino

---
## Collector.js Modifications Beyond the CSE135 Tutorial
Key Changes:
- Started from Module 7 – Version 6 of the collector.
  - Retained built-in error tracking, page lifecycle events (e.g. enter, exit, visibility change), and session tracking with generated session IDs. 
  - Simplified the getNavigationTiming() logic to reduce payload size and focus only on relevant navigation timing fields.
  - Removed web vitals reporting and resource summary aggregation to make the payload smaller and more readable.
- Added additional behavioral events to capture richer interaction data:
  - Mouse click events
  - Mouse movement events
  - Keyboard activity (used e.code instead of e.key so that what the user typed is not recorded)
  - Scroll activity
- Endpoint Transition (PHP → Node REST)
  - Initially implemented a `collect.php` endpoint to:
    - Accept POST data
    - Parse JSON payloads
    - Store basic log information
  - Later transitioned to a REST-based /log endpoint handled by a Node + Express server for Part 5.
    - This endpoint inserts data directly into PostgreSQL.
    - Uses a JSONB column (payload) to store the full raw event object.
- Manual Feature Detection (JS / CSS / Images)
  - JavaScript Detection
    - Implemented manually in index.html of wrecked-tech.
    - Used an <iFrame> inside of <noscript> fallback to detect JS-disabled clients.
  - Image Detection
    - Used a “pet rock” SVG asset.
    - JavaScript checks whether the image successfully loads and logs whether images are enabled.
  - CSS Detection
    - Inserted a CSS marker value.
    - JavaScript reads the computed value to verify CSS is applied and logs whether CSS was enabled.

## Reporting Server (Part 5)
The reporting-server.js file implements the REST API for the reporting vhost (reporting.schun.site). It exposes CRUD endpoints (GET, POST, PUT, DELETE) under /api/static that interact directly with the PostgreSQL static_logs table.

- Apache receives https://reporting.schun.site/api/static
- Apache forwards it to http://127.0.0.1:3001
- That port is served by reporting-server.js
- If Node is not running --> Apache returns 503 Service Unavailable

To start the reporting server call `node reporting-server.js` from the command line.
This must be running in the background for Part 5 REST endpoints to function properly.
