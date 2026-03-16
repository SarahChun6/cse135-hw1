# GRADER GUIDE

This document provides login credentials and a recommended scenario for testing the analytics platform.

---

# Deployment

Reporting Dashboard:
https://reporting.schun.site

Test Analytics Site:
https://test.schun.site

---

# Login Credentials

## Super Admin

Username:
superadmin

Password:
superadminpw!1

Capabilities:
- manage users
- access all report categories
- create reports
- export reports
- view saved reports

---

## Analyst

Username:
performanceanalyst

Password:
analystpw@2

Capabilities:
- view assigned analytics sections
- create reports
- export reports
- save reports

---

## Viewer

Username:
viewer

Password:
viewerpw#3

Capabilities:
- view saved reports
- download exported report PDFs

Viewers cannot access live analytics dashboards.

---

# Suggested Grading Scenario

Step 1  
Visit the analytics test site:

https://test.schun.site

Interact with the page for a short time.

Example interactions:
- move the mouse
- scroll the page
- click links or buttons

This generates analytics events that will appear in the reporting system.

---

Step 2  
Log into the reporting dashboard as **analyst**.

Navigate to:

https://reporting.schun.site

Login with analyst credentials.

---

Step 3  
Open the **Analyst Dashboard**.

Observe the live analytics overview including:
- event counts
- session statistics
- most active pages
- recent collected event data

---

Step 4  
Open the three analytics report categories:

Behavior Report  
Performance Report  
Geography Report  

Each report includes:
- charts or visualizations
- data tables
- analyst commentary

---

Step 5  
Export a report to PDF.

Click an export button on any report page.

A PDF report should be generated.

---

Step 6  
Create a saved report.

Use the "Save Report Snapshot" option from the dashboard.

---

Step 7  
Log out and log in as **viewer**.

Navigate to:

Saved Reports

Verify that viewers can:
- see saved reports
- open report views
- download exported reports

Verify that viewers cannot access:
- live analytics dashboards
- report creation tools

---

# Known Limitations / Potential Concerns

The following areas may contain limitations:

## Geographic IP Lookups

The geographic report uses IP-based lookups which may be approximate depending on the lookup service used.

---

## Large Dataset Performance

The dashboard currently retrieves a limited number of recent analytics events to maintain responsiveness.

Very large datasets would require pagination or aggregation.

---

## Collector Event Volume

The collector throttles certain events (such as mouse movement) to avoid excessive network traffic.

This may slightly reduce granularity of behavioral analytics but improves system performance.

---

# Final Notes

The system has been tested across the three roles and basic analytics workflows.

Any known limitations are documented above.
