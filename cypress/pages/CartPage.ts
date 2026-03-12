class CartPage {
  private selectors = {
    cartItem: '.cart_item',
    cartItemName: '.inventory_item_name',
    cartItemPrice: '.inventory_item_price',
    cartItemQuantity: '.cart_quantity',
    removeButton: 'button[id^="remove"]',
    continueShoppingButton: '[data-test="continue-shopping"]',
    checkoutButton: '[data-test="checkout"]',
    pageTitle: '.title',
  };

  visit(): this {
    cy.visit('/cart.html');
    cy.waitForPageLoad();
    return this;
  }

  verifyPageLoaded(): this {
    cy.get(this.selectors.pageTitle).should('have.text', 'Your Cart');
    return this;
  }

  getCartItems(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.cartItem);
  }

  getItemByName(name: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .get(this.selectors.cartItem)
      .contains(this.selectors.cartItemName, name)
      .parents(this.selectors.cartItem);
  }

  verifyItemInCart(productName: string): this {
    cy.get(this.selectors.cartItemName).should('contain.text', productName);
    return this;
  }

  verifyItemNotInCart(productName: string): this {
    cy.get('body').then(($body) => {
      if ($body.find(this.selectors.cartItem).length > 0) {
        cy.get(this.selectors.cartItemName).should(
          'not.contain.text',
          productName,
        );
      }
    });
    return this;
  }

  removeItem(productName: string): this {
    this.getItemByName(productName).find(this.selectors.removeButton).click();
    return this;
  }

  getCartItemCount(): Cypress.Chainable<number> {
    return cy.get('body').then(($body) => {
      return $body.find(this.selectors.cartItem).length;
    });
  }

  continueShopping(): this {
    cy.get(this.selectors.continueShoppingButton).click();
    return this;
  }

  proceedToCheckout(): this {
    cy.get(this.selectors.checkoutButton).click();
    return this;
  }
}

export const cartPage = new CartPage();
