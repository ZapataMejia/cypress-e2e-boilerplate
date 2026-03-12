Feature: User Login
  As a user of SauceDemo
  I want to be able to log in with my credentials
  So that I can access the product inventory

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I enter username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should be redirected to the inventory page
    And I should see the products list

  Scenario: Failed login with invalid credentials
    When I enter username "invalid_user" and password "wrong_password"
    And I click the login button
    Then I should see the error message "Username and password do not match any user in this service"

  Scenario: Failed login with locked out user
    When I enter username "locked_out_user" and password "secret_sauce"
    And I click the login button
    Then I should see the error message "Sorry, this user has been locked out"

  Scenario: Failed login with empty username
    When I leave the username field empty
    And I click the login button
    Then I should see the error message "Username is required"

  Scenario: Failed login with empty password
    When I enter username "standard_user" and password ""
    And I click the login button
    Then I should see the error message "Password is required"
