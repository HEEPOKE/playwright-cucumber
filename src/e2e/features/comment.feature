Feature: YouTube Comments
  As a user
  I want to be able to comment on videos on YouTube
  So that I can interact with the content creator and other users

  Scenario: User adds a comment
    Given the user is watching a video on YouTube
    When the user types a comment in the comment section
    And clicks the "Post" button
    Then the comment should appear in the comment section

  Scenario: User edits a comment
    Given the user has previously posted a comment
    When the user selects the "Edit" option on their comment
    And makes changes to the comment
    And clicks the "Save" button
    Then the edited comment should be displayed

  Scenario: User deletes a comment
    Given the user has previously posted a comment
    When the user selects the "Delete" option on their comment
    Then the comment should be removed from the comment section