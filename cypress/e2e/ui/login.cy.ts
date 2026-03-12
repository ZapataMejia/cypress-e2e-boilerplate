import { loginPage } from '../../pages/LoginPage';
import { inventoryPage } from '../../pages/InventoryPage';

describe('Login Page', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('should login successfully with valid credentials', () => {
    cy.fixture('users').then((users) => {
      loginPage.login(users.standardUser.username, users.standardUser.password);
      loginPage.verifyRedirectToInventory();
      inventoryPage.verifyPageLoaded();
    });
  });

  it('should display error for invalid credentials', () => {
    cy.fixture('users').then((users) => {
      loginPage.login(users.invalidUser.username, users.invalidUser.password);
      loginPage
        .getErrorMessage()
        .should('be.visible')
        .and(
          'contain.text',
          'Username and password do not match any user in this service',
        );
    });
  });

  it('should display error for locked out user', () => {
    cy.fixture('users').then((users) => {
      loginPage.login(users.lockedUser.username, users.lockedUser.password);
      loginPage
        .getErrorMessage()
        .should('be.visible')
        .and('contain.text', 'Sorry, this user has been locked out');
    });
  });

  it('should display error when username is empty', () => {
    loginPage.clickLogin();
    loginPage
      .getErrorMessage()
      .should('be.visible')
      .and('contain.text', 'Username is required');
  });

  it('should display error when password is empty', () => {
    cy.fixture('users').then((users) => {
      loginPage.fillUsername(users.standardUser.username);
      loginPage.clickLogin();
      loginPage
        .getErrorMessage()
        .should('be.visible')
        .and('contain.text', 'Password is required');
    });
  });

  it('should logout successfully from inventory page', () => {
    cy.fixture('users').then((users) => {
      loginPage.login(users.standardUser.username, users.standardUser.password);
      loginPage.verifyRedirectToInventory();
      inventoryPage.logout();
      cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
      loginPage.verifyPageLoaded();
    });
  });
});
