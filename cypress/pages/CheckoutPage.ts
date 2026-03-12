class CheckoutPage {
  private selectors = {
    firstNameInput: '[data-test="firstName"]',
    lastNameInput: '[data-test="lastName"]',
    postalCodeInput: '[data-test="postalCode"]',
    continueButton: '[data-test="continue"]',
    cancelButton: '[data-test="cancel"]',
    finishButton: '[data-test="finish"]',
    backHomeButton: '[data-test="back-to-products"]',
    errorMessage: '[data-test="error"]',
    summarySubtotal: '.summary_subtotal_label',
    summaryTax: '.summary_tax_label',
    summaryTotal: '.summary_total_label',
    completeHeader: '.complete-header',
    completeText: '.complete-text',
    checkoutOverview: '.checkout_summary_container',
    pageTitle: '.title',
  };

  fillShippingInfo(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): this {
    cy.get(this.selectors.firstNameInput).clear().type(firstName);
    cy.get(this.selectors.lastNameInput).clear().type(lastName);
    cy.get(this.selectors.postalCodeInput).clear().type(postalCode);
    return this;
  }

  clickContinue(): this {
    cy.get(this.selectors.continueButton).click();
    return this;
  }

  clickCancel(): this {
    cy.get(this.selectors.cancelButton).click();
    return this;
  }

  clickFinish(): this {
    cy.get(this.selectors.finishButton).click();
    return this;
  }

  clickBackHome(): this {
    cy.get(this.selectors.backHomeButton).click();
    return this;
  }

  getErrorMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.errorMessage);
  }

  verifyCheckoutOverview(): this {
    cy.get(this.selectors.checkoutOverview).should('be.visible');
    cy.get(this.selectors.pageTitle).should('have.text', 'Checkout: Overview');
    return this;
  }

  verifyOrderComplete(): this {
    cy.get(this.selectors.completeHeader).should(
      'have.text',
      'Thank you for your order!',
    );
    cy.get(this.selectors.completeText).should('be.visible');
    return this;
  }

  getSummaryTotal(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.summaryTotal);
  }

  getSummarySubtotal(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.summarySubtotal);
  }

  getSummaryTax(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.summaryTax);
  }

  verifyStepOnePageLoaded(): this {
    cy.get(this.selectors.pageTitle).should(
      'have.text',
      'Checkout: Your Information',
    );
    return this;
  }
}

export const checkoutPage = new CheckoutPage();
