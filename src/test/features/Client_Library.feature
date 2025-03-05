Feature: Client Library functionality

  #  @browser 
  # Scenario: Perform create actions on the NH Carbon application
  #   Given User is on NH Application Home Page
  #   When User perform the necessary interactions
  #   When User perform the update operation
  #   When User perform the duplicate operation
  #   When User perform the delete operation
  #   Then There should be no console errors

  
  @browser 
  Scenario: Perform create actions on the NH Carbon application
    Given User is on NH Application Home Page
    When User perform the necessary interactions
    Then There should be no console errors

  @browser
  Scenario: Perform update actions on the NH Carbon application
    Given User is on NH Application Home Page
    When User perform the update operation
    Then There should be no console errors
  
  @browser
  Scenario: Perform duplicate actions on the NH Carbon application
    Given User is on NH Application Home Page
    When User perform the duplicate operation
    Then There should be no console errors

  @browser
  Scenario: Perform delete actions on the NH Carbon application
    Given User is on NH Application Home Page
    When User perform the delete operation
    Then There should be no console errors





  