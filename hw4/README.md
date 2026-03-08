# HW4 – Analytics Backend Checkpoint
Site URL: https://test.schun.site/index.html     
Login page: https://reporting.schun.site/login.php     
Protected reporting dashboard: https://reporting.schun.site/reports.php      

**Notes:** To start the reporting server call `node reporting-server.js` from the command line. This must be running in the background for the datastore to be connected.
And to record new events, start the collection server by calling `node collector-server.js` from the command line and interacting with the wrecked-tech site at https://test.schun.site/index.html

### Grader Login Credentials
username: admin     
password: pw

## Part 1 - Authentication System

A login system was implemented using PHP sessions. The reporting pages (index.php and reports.php) are protected and require a user to log in before accessing them. 
If a user attempts to access these pages directly without logging in, they are redirected to the login page. A logout page destroys the session and returns the user to the login screen.
This prevents forceful browsing and ensures only authenticated users can view the analytics dashboard.

## Part 2 - Datastore to Data Table using Raw HTML

Analytics events collected by `collector.js` are stored in a PostgreSQL datastore (`static_logs` table). The reporting dashboard retrieves this data from the REST endpoint: `/api/static` 
and displays it in a raw HTML table showing fields such as event type, page, session ID, timestamp, and IP address.

## Part 3 - Datastore to Column Chart using Chart.js

The reporting dashboard also visualizes collected analytics data using Chart.js. Event records retrieved from `/api/static` are grouped by event type (`payload.type`) 
and displayed as a bar chart showing the frequency of different user events.
