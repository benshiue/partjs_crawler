#
#test/features/onlineshow.feature
#
Feature: Slidenow feature
  In order to satisfy someone want to travel but he can't
  As a coder, developer and instructor
  I want to make online show in Markdown

  Scenario: Read slides
    Given Landing page showing travel online list
    When Click the  item
    Then I should see travel online show