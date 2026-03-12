/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in to SauceDemo.
     * @param username - The username for login
     * @param password - The password for login
     * @example cy.login('standard_user', 'secret_sauce')
     */
    login(username: string, password: string): Chainable<void>;

    /**
     * Custom command to add a product to the cart by its visible name.
     * @param productName - The displayed product name
     * @example cy.addToCart('Sauce Labs Backpack')
     */
    addToCart(productName: string): Chainable<void>;

    /**
     * Custom command for API requests against the configured API URL.
     * @param method - HTTP method
     * @param url - API path (appended to env.apiUrl)
     * @param body - Optional request body
     * @example cy.apiRequest('GET', '/posts/1')
     */
    apiRequest(
      method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
      url: string,
      body?: Record<string, unknown>,
    ): Chainable<Response<unknown>>;

    /**
     * Custom command to select elements by data-test attribute.
     * @param testId - The data-test attribute value
     * @example cy.getByTestId('login-button')
     */
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to wait until the page is fully loaded.
     * @example cy.waitForPageLoad()
     */
    waitForPageLoad(): Chainable<void>;
  }
}
