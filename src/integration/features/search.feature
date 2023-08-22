Feature: YouTube Search
  As a user
  I want to search for a video on YouTube
  So I can watch the video

  Scenario: Searching for a video
    Given I open the YouTube website
    When I search for "suzume ost"
    Then I should see search results
    And I play the video "Suzume (feat. Toaka)"