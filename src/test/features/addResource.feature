Feature: User is able to add Resource to item

Scenario Outline: Verify that User is able to add Resource to item
    Given User launches the Carbon tool
    Then the user login should be successful with <user> profile
    And the user searches project and clicks on actions and selects manage revision 
    Then user selects the project and selects a section
    Then user expand the section and add a resource
     Examples:
        | user  |
        | admin |