declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      addToCart(productName: string): Chainable<void>;
      apiRequest(
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
        url: string,
        body?: Record<string, unknown>,
      ): Chainable<Cypress.Response<unknown>>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      waitForPageLoad(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.session(
    [username, password],
    () => {
      cy.visit('/');
      cy.get('[data-test="username"]').clear().type(username);
      cy.get('[data-test="password"]').clear().type(password);
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/inventory');
    },
    {
      validate() {
        cy.visit('/inventory.html');
        cy.url().should('include', '/inventory');
      },
    },
  );
});

Cypress.Commands.add('addToCart', (productName: string) => {
  cy.get('.inventory_item')
    .contains('.inventory_item_name', productName)
    .parents('.inventory_item')
    .find('button[id^="add-to-cart"]')
    .click();
});

Cypress.Commands.add(
  'apiRequest',
  (
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    body?: Record<string, unknown>,
  ) => {
    const apiUrl = Cypress.env('apiUrl');
    return cy.request({
      method,
      url: `${apiUrl}${url}`,
      body,
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    });
  },
);

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-test="${testId}"]`);
});

Cypress.Commands.add('waitForPageLoad', () => {
  cy.document().its('readyState').should('eq', 'complete');
  cy.get('body').should('be.visible');
});

export {};
