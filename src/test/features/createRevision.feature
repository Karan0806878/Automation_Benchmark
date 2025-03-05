Feature: Verify if the Contractor is able to update a revision assigned to them

    Scenario Outline: Verify if the contractor can view an estimate and create a revision from it
        Given User launches the Carbon tool
        Then the user login should be successful with <user1> profile
        When the admin creates a revision and assigns to contractor
        And the admin logs out and contractor logs back in
        Then the user login should be successful with <user2> profile
        When the contractor opens the assigned estimate and creates a revision
        And the contractor opens the estimate specific library and adds a new library to estimate
        Examples:
            | user1 | user2      |
            | admin | contractor |