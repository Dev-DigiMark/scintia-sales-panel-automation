# Glami AI Automation - QA Guide

This repository contains Playwright automation scripts for Glami AI.

## Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.

## Setup
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Runing Codegen
To use the Playwright Inspector and generate new test code:
```bash
npx playwright codegen
```

## Running Tests
To run the tests with a headed browser (visible UI) using the Chromium project:
```bash
npx playwright test --headed --project=chromium
```

## Record New Tests
To use the Playwright Inspector and generate new test code:
```bash
npx playwright codegen
```
## Run Specific Test
```bash
npx playwright test --headed --project=chromium tests/example.spec.ts
```

## Run All Tests
```bash
npx playwright test --headed --project=chromium
```

## Run Tests with Report
```bash
npx playwright test --headed --project=chromium --reporter=html
```

## Auth state setup
```
 npm run auth:save
 npm run codegen -- https://your-app-url

```