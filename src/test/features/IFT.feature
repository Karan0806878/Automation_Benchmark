Feature: Verify IFT feature in CCFT

Scenario Outline: Verify that User is able to add Resource to item
    Given User launches the Carbon tool
    Then the user login should be successful with <user> profile
    And the user searches project and clicks on actions and selects manage revision 
    Then user creates a revision and then clicks on actions and select View IFT
    Then user make adjustments to Revision in each IFT tab
    Then user goes to comparator and compares the baseline and revesion for cost and Carbon
    Then user marks the revision as nominate preferred revision
    Then user shall view the CESS report for the revision
    Then user shall view the carbon expense profile report
     Examples:
        | user  |
        | admin |