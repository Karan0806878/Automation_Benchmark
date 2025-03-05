Feature: User is able to update item and resource details for a Project

Scenario Outline: Verify that User is able to select a Project and update its details
    Given User launches the Carbon tool
    Then the user login should be successful with <user> profile
    And the user searches project and performs right click and clicks manage revision 
    Then user selects project and update project details
    Examples:
        | user  |
        | admin |
