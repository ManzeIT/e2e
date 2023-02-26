
Feature: I want to use the GitHub API to see the latest commits on Jimmy Bogard's MediatR project

    @smoke
    Scenario: As an API I can retrieve with a valid auth token
        Given User with "valid" auth token
        When requesting GET "/commits"
        And the response was successful
        Then the most recent commit is authored by Jimmy Bogard
        And the most recent commit is dated "2023-02-23T15:44:17Z"

    @smoke
    Scenario: As an API I can retrieve with a Invalid auth token
        Given User with "Invalid" auth token
        When requesting GET "/commits"
        And the response was not successful
        And a message in the body reading "Bad credentials"
