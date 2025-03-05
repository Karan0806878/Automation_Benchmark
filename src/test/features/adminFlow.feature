Feature: Verify IFT feature in CCFT

Scenario Outline: Verify that User is able to add Resource to item
    Given User launches the Carbon tool
    Then the user login should be successful with <user> profile
    Then user navigates to Base carbon library and updates the A1-A3, A5W and waste factor for a resource
    And the user searches and selects the required project
    Then user selects a section and expands it upto resource level
    Then user verifies the carbon values
    # Then user navigates to the estimate browser home screen and selects manage revision
    # Then user add a new revision and opens newly created revision
    # Then select any section and expand upto normal item level
    
     Examples:
        | user  |
        | admin |