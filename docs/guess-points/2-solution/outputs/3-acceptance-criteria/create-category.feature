Feature: Create Category
  As a user,
  I want to create a category,
  So that I can

  Background: 
    Given I am a user

  @backend @frontend
  Scenario: Successful registration
    When I create a category with valid category details
    Then I should see a success message

  @backend @frontend
  Scenario: Invalid or missing category details
    When I register with invalid category details
    Then I should see an error notifying me that my input is invalid

  @backend @frontend
  Scenario: Category already created with name
    Given a set of already created categories
      | name      |
      | category1 |
      | category2 |
      | category3 |
    When I attempt to create categories with those names
    Then I should see an error for each category notifying me that the category already exists