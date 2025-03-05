Feature: User Authentication to Carbon Tool

  @browser
  Scenario Outline: Verify User is successfully able to login to Carbon Tool - Happy Flow
    Given User launches the Carbon tool
    Then the user login should be successful with <user> profile

    Examples:
      | user  |
      | admin |

  @browser
  Scenario: Verify User login failure when incorrect credentials are used - Negative Flow
    Given User launches the Carbon tool
    Then the user login should fail when incorrect credentials are used

    Examples:
      | user  |
      | admin |
