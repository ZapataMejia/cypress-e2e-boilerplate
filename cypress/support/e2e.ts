import './commands';
import 'cypress-mochawesome-reporter/register';

Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('ResizeObserver loop') ||
    err.message.includes('Non-Error promise rejection')
  ) {
    return false;
  }
});

beforeEach(() => {
  cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
});

afterEach(function () {
  if (this.currentTest?.state === 'failed') {
    const testTitle = this.currentTest.title.replace(/\s+/g, '-');
    cy.screenshot(`FAILED-${testTitle}`, { capture: 'fullPage' });
  }
});
