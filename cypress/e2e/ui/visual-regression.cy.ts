describe('Visual Regression Tests', () => {
  it('should capture login page screenshot for visual comparison', () => {
    cy.visit('/');
    cy.waitForPageLoad();
    cy.get('.login_logo').should('be.visible');
    cy.get('[data-test="login-button"]').should('be.visible');

    cy.screenshot('login-page-baseline', {
      capture: 'fullPage',
      overwrite: true,
    });

    cy.get('[data-test="username"]').should('be.visible');
    cy.get('[data-test="password"]').should('be.visible');
    cy.get('[data-test="login-button"]').should('be.visible');
  });

  it('should capture inventory page screenshot for visual comparison', () => {
    cy.fixture('users').then((users) => {
      cy.login(users.standardUser.username, users.standardUser.password);
    });

    cy.visit('/inventory.html');
    cy.waitForPageLoad();
    cy.get('#inventory_container').should('be.visible');
    cy.get('.inventory_item').should('have.length', 6);

    cy.screenshot('inventory-page-baseline', {
      capture: 'fullPage',
      overwrite: true,
    });

    cy.get('.inventory_item').first().should('be.visible');
    cy.get('.header_secondary_container').should('be.visible');
  });
});
