Feature: Condition Library functionality

 @browser 
  Scenario: Perform create condition actions on the NH Carbon application test
    Given User is on NH Application Home Page test conditon
    When User perform the create condition test
    When User perform the update condition test
    When User perform the duplicate condition test
    When User perform the delete condition test
    Then There should be no console errors


# @browser 
# Scenario: Perform create condition actions on the NH Carbon application test
# Given User is on NH Application Home Page test conditon
# When User perform the create condition test

# @browser 
# Scenario: Perform update condition actions on the NH Carbon application test
# Given User is on NH Application Home Page test conditon
# When User perform the update condition test

# @browser 
# Scenario: Perform duplicate condition actions on the NH Carbon application test
# Given User is on NH Application Home Page test conditon
# When User perform the duplicate condition test

# @browser 
# Scenario: Perform delete condition actions on the NH Carbon application test
# Given User is on NH Application Home Page test conditon
# When User perform the delete condition test