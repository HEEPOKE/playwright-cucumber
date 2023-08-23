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
- If you want to do an integration test,can create and  use the folder integration and do the same thing a moment ago.

## Config Environments

- can config local, uat, prod in configs/config.ts line at 4
- BROWSER in .env file can use ```chrome```,```firefox```,```safari```

## Config Cucumber

- can config cucumber go to ```src/configs/cucumber.js``` for config

## Run

- Test

```bash
yarn test
```

- PreTest

```bash
yarn pretest
```

- Test && Report

```bash
yarn post:test
```

- Test Fail Rerun

```bash
yarn test:failed
```

- Test Clean Folder

```bash
yarn test:clean
```
