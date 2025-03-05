Feature: User is able to view resource level details for a Project

Scenario Outline: Verify that User is able to select a Project and then narrow down to Resource level
    Given User launches the Carbon tool
    Then the user login should be successful with <user> profile
    And the user searches and selects the required project
    And the item rates are retrieved
    Examples:
        | user  |
        | admin |
