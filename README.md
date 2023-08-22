# playwright-cucumber

## Install Dependencies

```bash
yarn
```

## Setting Cucumber Extensions

- go to settings for e2e test
- search cucumber
- then edit settings.json find cucumber.features
- add ```"src/e2e/features/*.feature",``` this in cucumber.features
- then add this ```"cucumber.glue": ["src/e2e/steps/*.ts"]``` after cucumber.features
- If you want to do an integration test, use the folder integration and do the same thing a moment ago.

## Config Environments

- can config local, uat, prod in configs/config.ts line at 4

## Run

```bash
npx playwright test
```

- UI MODE

```bash
npx playwright test --ui
```

- SHOW REPORT

```bash
npx playwright show-report
```
