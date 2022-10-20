# MDVIP Visual Regression Tests

---

## Getting Started
> After running the following commands you should be able to start running tests.
- Run `nvm use`
- Run `npm install`
- Run `npx install playwright`

---

## Current Tests
- **Visual Regression Tests**
    - `/tests/visual-regression.spec.ts`

## Running Tests
> To run tests inside of the `/tests/` folder, run the following command.
```
npx playwright test
```

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
