# Web Analytics Platform

This project implements a full web analytics pipeline that collects user activity from a website, stores it in a backend datastore, and presents analytics dashboards and reports with role-based access control.

The system was developed as part of the CSE 135 analytics platform project and demonstrates the full lifecycle of data collection, storage, analysis, and reporting.

---

# Live Deployment

Analytics collection site:
https://test.schun.site

Reporting dashboard:
https://reporting.schun.site

Collector endpoint:
https://collector.schun.site

---

# Repository

GitHub Repository:
(INSERT REPO LINK HERE)

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

Example endpoint:
