class InventoryPage {
  private selectors = {
    inventoryContainer: '#inventory_container',
    inventoryItem: '.inventory_item',
    itemName: '.inventory_item_name',
    itemPrice: '.inventory_item_price',
    itemDescription: '.inventory_item_desc',
    itemImage: '.inventory_item_img',
    addToCartButton: 'button[id^="add-to-cart"]',
    removeButton: 'button[id^="remove"]',
    sortDropdown: '[data-test="product-sort-container"]',
    shoppingCartBadge: '.shopping_cart_badge',
    shoppingCartLink: '.shopping_cart_link',
    burgerMenu: '#react-burger-menu-btn',
    logoutLink: '#logout_sidebar_link',
    pageTitle: '.title',
  };

  visit(): this {
    cy.visit('/inventory.html');
    cy.waitForPageLoad();
    return this;
  }

  verifyPageLoaded(): this {
    cy.get(this.selectors.inventoryContainer).should('be.visible');
    cy.get(this.selectors.pageTitle).should('have.text', 'Products');
    return this;
  }

  getProducts(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.inventoryItem);
  }

  getProductByName(name: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .get(this.selectors.inventoryItem)
      .contains(this.selectors.itemName, name)
      .parents(this.selectors.inventoryItem);
  }

  addProductToCart(productName: string): this {
    this.getProductByName(productName)
      .find(this.selectors.addToCartButton)
      .click();
    return this;
  }

  removeProductFromCart(productName: string): this {
    this.getProductByName(productName)
      .find(this.selectors.removeButton)
      .click();
    return this;
  }

  sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): this {
    cy.get(this.selectors.sortDropdown).select(option);
    return this;
  }

  getCartBadgeCount(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.shoppingCartBadge);
  }

  goToCart(): this {
    cy.get(this.selectors.shoppingCartLink).click();
    return this;
  }

  getProductNames(): Cypress.Chainable<string[]> {
    return cy.get(this.selectors.itemName).then(($els) => {
      return Cypress._.map($els, (el) => el.innerText);
    });
  }

  getProductPrices(): Cypress.Chainable<number[]> {
    return cy.get(this.selectors.itemPrice).then(($els) => {
      return Cypress._.map($els, (el) =>
        parseFloat(el.innerText.replace('$', '')),
      );
    });
  }

  clickProduct(productName: string): this {
    cy.get(this.selectors.itemName).contains(productName).click();
    return this;
  }

  logout(): this {
    cy.get(this.selectors.burgerMenu).click();
    cy.get(this.selectors.logoutLink).should('be.visible').click();
    return this;
  }
}

export const inventoryPage = new InventoryPage();
