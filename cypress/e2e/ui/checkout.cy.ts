import { inventoryPage } from '../../pages/InventoryPage';
import { cartPage } from '../../pages/CartPage';
import { checkoutPage } from '../../pages/CheckoutPage';
import { faker } from '@faker-js/faker';

describe('Checkout Flow', () => {
  beforeEach(() => {
    cy.fixture('users').then((users) => {
      cy.login(users.standardUser.username, users.standardUser.password);
    });
  });

  it('should complete a full purchase flow', () => {
    cy.fixture('products').then((products) => {
      inventoryPage.visit();
      inventoryPage.addProductToCart(products.backpack.name);
      inventoryPage.addProductToCart(products.onesie.name);
      inventoryPage.goToCart();

      cartPage.verifyPageLoaded();
      cartPage.verifyItemInCart(products.backpack.name);
      cartPage.verifyItemInCart(products.onesie.name);
      cartPage.proceedToCheckout();

      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const postalCode = faker.location.zipCode();

      checkoutPage.verifyStepOnePageLoaded();
      checkoutPage.fillShippingInfo(firstName, lastName, postalCode);
      checkoutPage.clickContinue();

      checkoutPage.verifyCheckoutOverview();
      checkoutPage.getSummaryTotal().should('be.visible');
      checkoutPage.clickFinish();

      checkoutPage.verifyOrderComplete();
    });
  });

  it('should validate required fields on checkout form', () => {
    inventoryPage.visit();
    cy.fixture('products').then((products) => {
      inventoryPage.addProductToCart(products.backpack.name);
    });
    inventoryPage.goToCart();
    cartPage.proceedToCheckout();

    checkoutPage.clickContinue();
    checkoutPage
      .getErrorMessage()
      .should('be.visible')
      .and('contain.text', 'First Name is required');

    checkoutPage.fillShippingInfo(faker.person.firstName(), '', '');
    checkoutPage.clickContinue();
    checkoutPage
      .getErrorMessage()
      .should('be.visible')
      .and('contain.text', 'Last Name is required');
  });

  it('should persist cart items after navigating away and back', () => {
    cy.fixture('products').then((products) => {
      inventoryPage.visit();
      inventoryPage.addProductToCart(products.fleeceJacket.name);
      inventoryPage.getCartBadgeCount().should('have.text', '1');

      inventoryPage.goToCart();
      cartPage.verifyItemInCart(products.fleeceJacket.name);
      cartPage.continueShopping();

      inventoryPage.verifyPageLoaded();
      inventoryPage.getCartBadgeCount().should('have.text', '1');

      inventoryPage.goToCart();
      cartPage.verifyItemInCart(products.fleeceJacket.name);
    });
  });

  it('should show order confirmation with correct details', () => {
    cy.fixture('products').then((products) => {
      inventoryPage.visit();
      inventoryPage.addProductToCart(products.boltShirt.name);
      inventoryPage.goToCart();

      cartPage.verifyItemInCart(products.boltShirt.name);
      cartPage.getCartItems().should('have.length', 1);
      cartPage.proceedToCheckout();

      checkoutPage.fillShippingInfo(
        faker.person.firstName(),
        faker.person.lastName(),
        faker.location.zipCode(),
      );
      checkoutPage.clickContinue();
      checkoutPage.verifyCheckoutOverview();

      checkoutPage.getSummarySubtotal().should('contain.text', '15.99');
      checkoutPage.getSummaryTax().should('be.visible');
      checkoutPage.getSummaryTotal().should('be.visible');

      checkoutPage.clickFinish();
      checkoutPage.verifyOrderComplete();
      checkoutPage.clickBackHome();
      cy.url().should('include', '/inventory');
    });
  });
});
