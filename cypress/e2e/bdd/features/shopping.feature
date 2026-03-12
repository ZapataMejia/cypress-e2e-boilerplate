Feature: Shopping Cart and Checkout
  As a logged-in user
  I want to add products to my cart and complete a purchase
  So that I can buy items from the store

  Background:
    Given I am logged in as a standard user
    And I am on the inventory page

  Scenario: Add a single product to the cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1" item

  Scenario: Add multiple products to the cart
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart badge should show "2" items

  Scenario: Remove a product from the cart
    When I add "Sauce Labs Backpack" to the cart
    And I remove "Sauce Labs Backpack" from the cart
    Then the cart badge should not be visible

  Scenario: Complete a full checkout flow
    When I add "Sauce Labs Backpack" to the cart
    And I navigate to the cart
    And I proceed to checkout
    And I fill in the shipping information
    And I continue to the overview
    And I finish the order
    Then I should see the order confirmation message
