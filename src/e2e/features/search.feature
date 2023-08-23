Feature: YouTube Search
  As a user
  I want to search for a video on YouTube
  So I can watch the video

  Scenario Outline: Searching for a video
    Given I open the YouTube website
    When I search for "<search_query>"
    Then I should see search results
    And I play the video "<video_title>"

    Examples:
      | search_query  | video_title            |
      | suzume ost    | Suzume (feat. Toaka)   |
      | suzume        | RADWIMPS - すずめ feat.十明 [Official Lyric Video]    |

