Feature: User Registration
  As a new user,
  I want to register an account,
  So that I can access the system.

  @backend @frontend
  Scenario: Successful registration
    Given I am a new user
    When I register with valid account details
    Then I should see a success message
    And I should receive a confirmation email

  @backend @frontend
  Scenario: Invalid or missing registration details
    Given I am a new user
    When I register with invalid account details
    Then I should see an error notifying me that my input is invalid
    And I should not receive a confirmation email

  @backend @frontend
  Scenario: Account already created with email
    Given a set of users already created accounts
      | email             |
      | john@example.com  |
      | alice@example.com |
      | david@example.com |
    When new users attempt to register with those emails
    Then they should see an error notifying them that the account already exists
    And they should not receive a confirmation email

  @backend @frontend
  Scenario: Registration with confirmation email pending confirmation
    Given a set of previously registered but not confirmed accounts:
      | email             |
      | john@example.com  |
      | alice@example.com |
      | david@example.com |
    When new users attempt to register with those emails
    Then they should see an error message prompting them to confirm their email
    And they should not receive a new confirmation email

  @backend @frontend
  Scenario: Registration with email domain not allowed
    Given I am a new user
    When I register with an email from a restricted domain
    Then I should see an error message indicating the domain is not allowed
    And I should not receive a confirmation email