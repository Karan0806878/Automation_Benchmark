Feature: User Authentication to VER10 Application

  @browser
  Scenario Outline: Verify User is successfully able to login to VER10 Application - Happy Flow
    Given User launches the VER10 Application
    When User enters the <user>
    Then The user login should be successful

    Examples:
      | user  |
      | vijay |