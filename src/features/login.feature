Feature: User Authentication tests

  Background: 
    Given User navigates to the application
    And User click on the login link

  Scenario: Login should be success
    Given User enters the username as "sd576"
    And User enter the password as "Password01"
    When User click on the login button
    Then Login should be success

  Scenario: Login should not be success
    Given User enters the username as "sd576"
    And User enter the password as "nnnn"
    When User click on the login button
    But Login should fail
