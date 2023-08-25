Feature: YouTube Video Play
  As a user
  I want to be able to play videos on YouTube
  So that I can watch the content

  # Background:
  #   Given go on to the YouTube

  Scenario: Searching for and Playing a Video
    When I search for the video "suzume ost"
    And I select the video "Suzume (feat. Toaka)"
    Then the video should start playing
    When the user clicks the "Pause" button
    Then the video should pause
    When the user selects a different video quality
    Then the video quality should change accordingly
