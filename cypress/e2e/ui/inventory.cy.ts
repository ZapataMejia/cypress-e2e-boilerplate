import { inventoryPage } from '../../pages/InventoryPage';

describe('Inventory Page', () => {
  beforeEach(() => {
    cy.fixture('users').then((users) => {
      cy.login(users.standardUser.username, users.standardUser.password);
    });
    inventoryPage.visit();
  });

  it('should display all 6 products on inventory page', () => {
    inventoryPage.verifyPageLoaded();
    inventoryPage.getProducts().should('have.length', 6);
  });

  it('should add a product to the cart and update badge count', () => {
    cy.fixture('products').then((products) => {
      inventoryPage.addProductToCart(products.backpack.name);
      inventoryPage.getCartBadgeCount().should('have.text', '1');

      inventoryPage.addProductToCart(products.bikeLight.name);
      inventoryPage.getCartBadgeCount().should('have.text', '2');
    });
  });

  it('should remove a product from the cart', () => {
    cy.fixture('products').then((products) => {
      inventoryPage.addProductToCart(products.backpack.name);
      inventoryPage.getCartBadgeCount().should('have.text', '1');

      inventoryPage.removeProductFromCart(products.backpack.name);
      cy.get('.shopping_cart_badge').should('not.exist');
    });
  });

  it('should sort products by price low to high', () => {
    inventoryPage.sortBy('lohi');
    inventoryPage.getProductPrices().then((prices) => {
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  });

  it('should navigate to product detail page', () => {
    cy.fixture('products').then((products) => {
      inventoryPage.clickProduct(products.backpack.name);
      cy.url().should('include', '/inventory-item');
      cy.get('.inventory_details_name').should(
        'have.text',
        products.backpack.name,
      );
      cy.get('.inventory_details_price').should(
        'contain.text',
        `$${products.backpack.price}`,
      );
    });
  });
});
