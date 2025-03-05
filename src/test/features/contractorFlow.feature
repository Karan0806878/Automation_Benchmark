Feature: Verify end-to-end contractor flow in CCFT

Scenario Outline: Verify that User is able to add Resource to item
    Given User launches the Carbon tool
    Then the user login should be successful with <user1> profile
    Then user navigates to Base carbon library and updates the A1-A3, A5W and waste factor for a resource
    And the user searches and selects the required project
    Then user selects a section and expands it upto resource level
    Then user verifies the carbon values
    Then user navigates to the estimate browser home screen and selects manage revision
    Then user add a new revision 
    And assigns a contractor
    And the admin logs out and contractor logs back in
    Then the user login should be successful with <user2> profile
    When the contractor searches and opens the assigned estimate and creates a revision
    Then contractor opens estimate specific library and adds a library
    Then contractor opens the added library and uploads a EPD file
    And the contractor clicks apply to estimate and returns back to revision page
    Then contractor opens the newly created revision and opens a section and expands it
    Then user modifies carbon values verifies the carbon values
    Then user deletes one of the resources
    Then the contractor will add new item and enter the quantity
    And will verify the total cost
    Then contractor will add a new resource and edit carbon values
    Then contractor will add a subitem
    Then contractor deletes the added revision
    And the assignRevisionContract API is called to remove the contractor assigned
    Then contractor logs out

    Examples:
            | user1 | user2      |
            | admin | contractor |