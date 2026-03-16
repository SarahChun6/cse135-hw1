# Web Analytics Platform

This project implements a full web analytics pipeline that collects user activity from a website, stores it in a backend datastore, and presents analytics dashboards and reports with role-based access control.

The system was developed as part of the CSE 135 analytics platform project and demonstrates the full lifecycle of data collection, storage, analysis, and reporting.

---

# Live Deployment

Analytics collection site:
https://test.schun.site

Reporting dashboard:
https://reporting.schun.site/login.php

Collector endpoint:
https://collector.schun.site
Note: need to run `nodejs collector-server.js` for data collection to happen

---

# Repository

GitHub Repository: https://github.com/SarahChun6/cse135-hw1/tree/main/hw5

---

# System Architecture

The system consists of three main components:

## 1. Client Analytics Collector

A JavaScript analytics collector (`collector-v6.js`) embedded on the test site captures user behavior and environment data.

The collector records:

Behavioral events
- mouse movement
- clicks
- scroll activity
- keyboard events
- idle detection
- page enter / page exit

Technographic information
- browser user agent
- screen size
- device memory
- CPU cores
- network information
- timezone

Performance data
- navigation timing
- page load milestones

Error tracking
- JavaScript runtime errors
- resource load failures
- unhandled promise rejections

Collected data is sent to the collector endpoint using `navigator.sendBeacon()` or a fallback `fetch()` request.

---

## 2. Collector Server

The collector server receives event payloads and stores them in a datastore.

Events are written to a JSONL datastore and exposed through API endpoints that allow the reporting dashboard to query recent analytics data.

Example endpoint: `/api/static`


This endpoint returns recent analytics events used to populate dashboards and reports.

---

## 3. Reporting Dashboard

The reporting platform provides a role-based analytics dashboard that allows users to analyze collected data.

The dashboard includes:

- an analyst overview dashboard
- behavior analytics reports
- performance analytics reports
- geographic visitor analysis
- saved report snapshots
- PDF export functionality

Charts and data visualizations are rendered using Chart.js and Leaflet (for map visualizations).

---

# Authentication and Authorization

The reporting platform implements a role-based authentication system using PHP sessions and a MySQL database.

User roles include:

## Super Admin
Full system access.

Capabilities:
- manage users
- access all analytics sections
- create reports
- export reports
- view saved reports

---

## Analyst

Analysts can access analytics sections assigned to them and generate reports.

Capabilities:
- view analytics dashboards
- access assigned report categories
- generate and save reports
- export reports as PDFs

Example analyst permission sets:
- performance only
- performance + behavioral analytics

---

## Viewer

Viewers have limited access and can only view saved reports created by analysts.

Capabilities:
- view saved reports
- download report PDFs

Viewers cannot access live dashboards or analytics generation tools.

---

# Report Categories

The system includes three primary analytics categories.

## Behavioral Analytics

Analyzes user interaction patterns.

Includes:
- event type distribution
- session activity
- most active pages
- interaction trends

---

## Performance Analytics

Analyzes page load performance.

Includes:
- navigation timing analysis
- page load duration summaries
- slow page identification

---

## Geographic Analytics

Analyzes visitor geographic distribution.

Includes:
- world map visualization of visitors
- country distribution tables
- visitor concentration markers

---

# Export System

Reports can be exported to PDF using the **Dompdf** library.

Exports include:
- report title and description
- data tables
- analyst commentary
- summary statistics

Export links are available from report pages and the analyst dashboard.

---

# Use of AI

AI assistance (ChatGPT) was used during development for:

- debugging server configuration issues
- improving CSS layout and UI consistency
- generating example analytics visualizations
- refining role-based authorization logic

AI suggestions were reviewed and modified before being incorporated into the project.

Overall, AI was helpful for development, accelerating debugging, and UI improvements, but implementation and system integration still required manual overview and testing.

---

# Future Improvements

Given additional time, several improvements could be implemented.

Possible future features include:

- caching geographic IP lookups to improve performance
- richer analytics visualizations
- additional behavioral metrics
- scheduled automated report generation
- email delivery of exported reports
- improved UI polish and responsive layouts
- filtering and date range selection for reports
- anomaly detection on collected analytics data

---

# Notes

This system was designed to meet the project requirements while maintaining reasonable performance and simplicity.

The architecture favors clarity and reliability over complex frameworks.
