import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the login page', () => {
  cy.visit('/');
  cy.waitForPageLoad();
  cy.get('.login_logo').should('be.visible');
});

When(
  'I enter username {string} and password {string}',
  (username: string, password: string) => {
    if (username) {
      cy.get('[data-test="username"]').clear().type(username);
    }
    if (password) {
      cy.get('[data-test="password"]').clear().type(password);
    }
  },
);

When('I click the login button', () => {
  cy.get('[data-test="login-button"]').click();
});

When('I leave the username field empty', () => {
  cy.get('[data-test="username"]').should('be.visible').and('have.value', '');
});

Then('I should be redirected to the inventory page', () => {
  cy.url().should('include', '/inventory');
});

Then('I should see the products list', () => {
  cy.get('#inventory_container').should('be.visible');
  cy.get('.inventory_item').should('have.length.greaterThan', 0);
});

Then('I should see the error message {string}', (message: string) => {
  cy.get('[data-test="error"]').should('be.visible').and('contain.text', message);
});
