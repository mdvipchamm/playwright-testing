# MDVIP Visual Regression Tests

---

## Getting Started
> After running the following commands you should be able to start running tests.
- Run `nvm use`
- Run `npm install`
- Run `npx install playwright`

---

## Current Tests
> Tests are set up to block requests by default, this makes sure that when you run these tests on support or production environments you do not get hit by Lift or Google Optimize.

- **Visual Regression Tests**
    - `/tests/visual-regression.spec.ts`
    - `/tests/visual-comparision.spec.ts`

---

## Configuring Tests
### MDVIP 1 - Environment Variables
- DEV
- SB
- SB2
- SUPPORT
- PROD

---

### MDVIP 2 - Environment Variables:
- DEVLP
- SBLP
- SUPPORTLP
- PRODLP

---

### Block Network Requests
> By default, we block the following network requests when testing. These are managed in the `/utils/blockRequests.ts` file, if you'd like to block anything additional just add the value to the array.

```javascript
"google.com",
"google-optimize.com",
"google-analytics.com",
"marketo.net",
"driftt.com",
"dialogtech.com",
"builder.lift.acquia.com",
"tiqcdn.com",
"tealiumiq.com"
```

#### Don't block network requests
> If you don't want to block network requests add the following lines to the test files.

```javascript
blockRequests: false
```

**Full Example:**
```javascript
  await visualRegressionTest({
    url: url,
    site1: PROD,
    blockRequests: false
  })
```

---

### Change which site to test
> To change the site to test on, navigate to the `/tests/` folder and open the `visual-regression.spec.ts` file and change the `site1` property to the environment you'd like to test.

#### Visual Regression Test
- Change `site1` to the environment you'd like to test.
```javascript
  site1: DEV
```

---

#### Visual Comparison Test
- Change `site1` to the environment you'd like to test first and change `site2` to the environment you'd like to compare site1 to. In this example we'll compare DEV to PROD.
```javascript
  site1: DEV,
  site2: PROD
```

---

## Running Tests
### Visual Regression Test
> This visual regression test runs on one site only. Use this to compare one site.
```
npx playwright test visual-regression
```

---
### Visual Comparison Test
> This visual regression test runs on multiple sites and is used to compare Site A to Site B.
```
npx playwright test visual-comparison
```

## Helpful Commands
### Generate new snapshots
> To run tests and regenerate new snapshots run the following command.
```
npx playwright test --update-snapshots
```

### Retries
> To automatically retry tests run the following command.
```
npx playwright test --retries=3
```

---

## Reports

### Manually show report
> This will pop open the report in your web-browser by running the following command.
```
npx playwright show-report
```

---

## Extra Notes
> For mobile scaling use device `deviceScaleFactor: 1` for consistency in the screenshots.
```
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
        deviceScaleFactor: 1
      },
    }
```
