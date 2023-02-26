import { Given, Then, When } from "@cucumber/cucumber"
import { expect } from "@playwright/test";
import { ScenarioWorld, } from "./setup/world";
export var valid_auth_token: string;

export var setAuthToken: boolean;
Given('User with {string} auth token', async function (totkenType: string) {

    if (totkenType == "valid") {

        setAuthToken=true
        valid_auth_token = "ghp_Rrs4LyFggL9Wwwfvzsre1g5Bye1wqQP7"

    } else {

        valid_auth_token = ""
    }

});


When('requesting GET {string}', async function (this: ScenarioWorld, route: string) {
    const {
        api: { request },
        globalAPIResponseVariables
    } = this
    console.log(`I retrieve ${route}`)
    const response = await request.get("https://api.github.com/repos/jbogard/MediatR" + route)
    globalAPIResponseVariables.response = response
});

Then(
    /^the response was (successful)?(unsuccesful)?$/,
    async function (this: ScenarioWorld, success: boolean, unsuccessful: boolean) {
        const {
            globalAPIResponseVariables
        } = this

        console.log(`the response was ${unsuccessful ? 'unsuccessful ' : 'successful '} `)

        const response = globalAPIResponseVariables.response
        if (unsuccessful) {
            expect(response.ok()).toBeFalsy()
        } else {
            expect(response.ok()).toBeTruthy()
        }
    }
)

Then(
    /^the response was not (successful)?(unsuccesful)?$/,
    async function (this: ScenarioWorld, success: boolean, unsuccessful: boolean) {
        const {
            globalAPIResponseVariables
        } = this
        console.log(`the response was ${unsuccessful ? 'unsuccessful ' : 'successful '} `)
        const response = globalAPIResponseVariables.response
        expect(response.ok()).toBeFalsy()

    }
)



Then('the response status code is {int}', function (this: ScenarioWorld, statusCode: string) {
    const {
        globalAPIResponseVariables
    } = this
    const response = globalAPIResponseVariables.response
    expect(response.status()).toBe(Number(statusCode))

});


Then('the most recent commit is authored by Jimmy Bogard', async function (this: ScenarioWorld) {
    const {
        api: { request },
        globalAPIResponseVariables
    } = this
    var response = await globalAPIResponseVariables.response.json()
    console.log(response[1].url)
    response = await request.get(response[1].url)
    globalAPIResponseVariables.response = response
    response = await globalAPIResponseVariables.response.json()
    console.log(response.commit.committer.name)
    expect(response.commit.committer.name).toBe("Jimmy Bogard")
});

Then('the most recent commit is dated {string}', async function (this: ScenarioWorld, date: string) {
    const {
        globalAPIResponseVariables
    } = this
    const response = await globalAPIResponseVariables.response.json()
    console.log(response.commit.committer.date)
    expect(response.commit.committer.date).toBe(date)

});


When('a message in the body reading {string}', async function (errorMessage: string) {
    const {
        globalAPIResponseVariables
    } = this
    const response = await globalAPIResponseVariables.response.json()
    console.log(response)
    expect(response.message).toBe(errorMessage)


});
