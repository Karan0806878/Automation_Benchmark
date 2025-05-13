Feature: Variable Library functionality


# @browser 
#   Scenario: Perform create varibale actions on the NH Carbon application test
#     Given User is on NH Application Home Page test variable data
#     When User perform the create variable test data
#     When User perform the update variable test data
#     When User perform the delete variable test data


@browser 
Scenario: Perform create varibale actions on the NH Carbon application test
Given User is on NH Application Home Page test variable data
When User perform the create variable test data

@browser 
Scenario: Perform update variable actions on the NH Carbon application test
Given User is on NH Application Home Page test conditon
When User perform the update variable test data

@browser 
Scenario: Perform delete variable actions on the NH Carbon application test
Given User is on NH Application Home Page test conditon
When User perform the delete variable test data
