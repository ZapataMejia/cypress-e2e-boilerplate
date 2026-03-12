import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

Given('I am logged in as a standard user', () => {
  cy.login('standard_user', 'secret_sauce');
});

Given('I am on the inventory page', () => {
  cy.visit('/inventory.html');
  cy.waitForPageLoad();
  cy.get('#inventory_container').should('be.visible');
});

When('I add {string} to the cart', (productName: string) => {
  cy.get('.inventory_item')
    .contains('.inventory_item_name', productName)
    .parents('.inventory_item')
    .find('button[id^="add-to-cart"]')
    .click();
});

When('I remove {string} from the cart', (productName: string) => {
  cy.get('.inventory_item')
    .contains('.inventory_item_name', productName)
    .parents('.inventory_item')
    .find('button[id^="remove"]')
    .click();
});

When('I navigate to the cart', () => {
  cy.get('.shopping_cart_link').click();
  cy.get('.title').should('have.text', 'Your Cart');
});

When('I proceed to checkout', () => {
  cy.get('[data-test="checkout"]').click();
});

When('I fill in the shipping information', () => {
  cy.get('[data-test="firstName"]').type(faker.person.firstName());
  cy.get('[data-test="lastName"]').type(faker.person.lastName());
  cy.get('[data-test="postalCode"]').type(faker.location.zipCode());
});

When('I continue to the overview', () => {
  cy.get('[data-test="continue"]').click();
  cy.get('.title').should('have.text', 'Checkout: Overview');
});

When('I finish the order', () => {
  cy.get('[data-test="finish"]').click();
});

Then('the cart badge should show {string} item(s)', (count: string) => {
  cy.get('.shopping_cart_badge').should('have.text', count);
});

Then('the cart badge should not be visible', () => {
  cy.get('.shopping_cart_badge').should('not.exist');
});

Then('I should see the order confirmation message', () => {
  cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  cy.get('.complete-text').should('be.visible');
});
