Feature: YouTube Video Play
  As a user
  I want to be able to play videos on YouTube
  So that I can watch the content

  Background:
    Given I am on the YouTube website
    And I have a search bar

  @play
  Scenario: Searching for and Playing a Video
    When I search for the video "glass no hana"
    And I play the video "[White Album] Glass no Hana - Ogata Rina"
    And the user skips ads
    When the user clicks the "Pause" button
    Then the video should pause
    And the user selects a different video quality
    Then the video quality should change accordingly