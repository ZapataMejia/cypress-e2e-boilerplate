# Cypress E2E Boilerplate

Enterprise-grade end-to-end testing framework built with Cypress, TypeScript, and BDD.

## Tech Stack

- **Cypress** - E2E testing framework
- **TypeScript** - Type-safe test code
- **Cucumber/Gherkin** - BDD feature files
- **Faker.js** - Dynamic test data generation
- **Mochawesome** - HTML test reports
- **ESLint + Prettier** - Code quality

## Quick Start

```bash
npm install
cp cypress.env.json.example cypress.env.json
npm run cy:open
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run cy:open` | Open Cypress Test Runner |
| `npm run cy:run` | Run all tests headless |
| `npm run cy:run:chrome` | Run tests in Chrome |
| `npm run cy:run:firefox` | Run tests in Firefox |
| `npm run cy:run:edge` | Run tests in Edge |
| `npm run test:smoke` | Run smoke tests (login) |
| `npm run test:regression` | Run all UI regression tests |
| `npm run test:bdd` | Run BDD feature tests |
| `npm run test:api` | Run API tests |
| `npm run report` | Generate Mochawesome HTML report |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Project Structure

```
cypress/
├── e2e/
│   ├── ui/                  # UI test specs
│   ├── api/                 # API test specs
│   └── bdd/
│       ├── features/        # Gherkin feature files
│       └── step-definitions/ # Step implementations
├── fixtures/                # Test data
├── pages/                   # Page Object Models
├── plugins/                 # Cypress plugins
└── support/                 # Commands and setup
```

## Docker

```bash
docker build -t cypress-e2e .
docker run cypress-e2e
docker run cypress-e2e --browser firefox
```
