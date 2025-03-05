Feature: Verify all the options are available when a user logs in as a admin

  Scenario: Verify UI when logged in as an admin
    Given User launches the Carbon tool
    Then the user login should be successful with <user1> profile
    And the estimate browser option should be available with all the projects listed
    When the User selects the Reports options
    Then all the Reports should be available
    When the User clicks on comparator option
    Then IFT comparator reports will be available
    When the User clicks Cost-Element Comparator option
    Then Cost-Element Comparator reports will be available
    When the User clicks on CCESS option
    Then CCESS reports should be available
    When the User clicks on Cost and Carbon Expenditure Profile option
    Then Cost and Carbon Expenditure Profile reports will be available
    When the User selects the Admin Control-Panel option 
    Then all the Assign Inflation Index should be available
    When the User clicks on Admin Master Data option
    Then all the Codes will be available
    When the User clicks on Admin Master Data Baseline Assumptions
    Then all the transport assumptions will be available
    And all the Mode of transportwill be available
    When the User clicks on Admin Master Data Emission Factors
    Then Base Carbon Library will be available
    When the User clicks on Admin Master Data Dynamic Carbon Library
    Then Dynamic Carbon Library will be available
    When the User clicks on Admin Role Based Access
    Then Assign Estimators to Roles option will be available
    And Role Permissions option will also be available
    Examples: 
      | user1 |
      | admin |
