class LoginPage {
  private selectors = {
    usernameInput: '[data-test="username"]',
    passwordInput: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    errorMessage: '[data-test="error"]',
    errorButton: '.error-button',
    logo: '.login_logo',
  };

  visit(): this {
    cy.visit('/');
    cy.waitForPageLoad();
    return this;
  }

  fillUsername(username: string): this {
    cy.get(this.selectors.usernameInput).clear().type(username);
    return this;
  }

  fillPassword(password: string): this {
    cy.get(this.selectors.passwordInput).clear().type(password);
    return this;
  }

  clickLogin(): this {
    cy.get(this.selectors.loginButton).click();
    return this;
  }

  login(username: string, password: string): this {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
    return this;
  }

  getErrorMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.errorMessage);
  }

  dismissError(): this {
    cy.get(this.selectors.errorButton).click();
    return this;
  }

  verifyPageLoaded(): this {
    cy.get(this.selectors.logo).should('be.visible');
    cy.get(this.selectors.loginButton).should('be.visible');
    return this;
  }

  verifyRedirectToInventory(): this {
    cy.url().should('include', '/inventory');
    return this;
  }
}

export const loginPage = new LoginPage();
