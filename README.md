# playwright-cucumber

## Install Dependencies

```bash
yarn
```

## Setting Cucumber Extensions

- go to settings
- search cucumber
- then edit settings.json find cucumber.features
- add ```"src/e2e/features/*.feature",``` this in cucumber.features
- then add this ```"cucumber.glue": ["src/e2e/steps/*.ts"]``` after cucumber.features

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
