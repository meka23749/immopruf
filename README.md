# ImmoPrüf — QA Portfolio Project

A complete QA testing project simulating a real-world property 
valuation web application. Built to demonstrate manual testing, 
test automation, and API testing skills.

---

## Project Overview

ImmoPrüf is a web application that calculates real estate market 
values and mortgage lending values (Beleihungswert). 
The project covers the full QA workflow from bug discovery 
to automated regression testing.

---

## What Was Tested

### Manual Testing
- Explored the application as a real user
- Identified 5 bugs through exploratory testing
- Documented each bug with reproduction steps, 
  expected vs actual results

### Automated Testing — Playwright (TypeScript)
- Written 10 automated tests covering all bug fixes
- Validation tests for all form fields
- Regression tests to prevent bugs from coming back

### API Testing — Postman
- Tested 3 REST API endpoints
- 20 automated API tests including error cases
- Verified response structure, data types, status codes
  and response time

---

## Bugs Found & Fixed

| ID | Description | Severity | Status |
|----|-------------|----------|--------|
| BUG-001 | Beleihungswert 80% instead of 60% | Critical | ✅ Fixed |
| BUG-002 | Date showing 01.01.1970 | Medium | ✅ Fixed |
| BUG-003 | Surface area missing m² unit | Low | ✅ Fixed |
| BUG-004 | Gewerbeimmobilie showing undefined | Critical | ✅ Fixed |
| BUG-005 | No error for unrealistic value | Medium | ✅ Fixed |

---

## Test Results

| Type | Tests | Passed | Status |
|------|-------|--------|--------|
| Playwright (E2E) | 10 | 10 | ✅ |
| Postman (API) | 20 | 20 | ✅ |
| **Total** | **30** | **30** | ✅ |

---

## Project Structure

immopruf/
├── app/
│   └── index.html          ← Web application
├── tests/
│   └── immopruf.spec.ts    ← Playwright tests
├── api/
│   └── server.js           ← Mock REST API (Node.js)
├── docs/
│   ├── bug-report.md       ← Bug documentation
│   └── api-test-report.md  ← API test results
├── playwright.config.ts
├── package.json
└── README.md

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| HTML / CSS / JavaScript | Web application |
| Node.js + Express | Mock REST API |
| Playwright + TypeScript | End-to-end test automation |
| Postman | API testing |
| Git + GitHub | Version control |

---

## How To Run

**Start the API:**
```bash
node api/server.js
```

**Run Playwright tests:**
```bash
npx playwright test
```

**Open the app:**  
Double-click `app/index.html` in your file explorer.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/marktdaten?stadt=erfurt | Market data by city |
| GET | /api/wertindikation?stadt=erfurt&flaeche=85&typ=wohnung | Property valuation |
| GET | /api/hochwasser?stadt=hamburg | Flood risk by city |

---

## Documentation

- [Bug Report](docs/bug-report.md)
- [API Test Report](docs/api-test-report.md)

---

