import { test, expect} from '@playwright/test'
import testData from '../../test-data/testdata'
import helper from '../../helper/helper'

test.describe("Positive /Users Tests", () => {

    test("GET /users/[id] - Verify Success getting info for Single user", async ({ request }) => {
        const response = await request.get(`${testData.apiUrl}/users/2`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(2)
        expect(responseBody.data.first_name).toBe('Janet')
        expect(responseBody.data.last_name).toBe('Weaver')
        expect(responseBody.data.email).toBeTruthy()
        helper.checkSchema('../schemas/users.schema.json',responseBody)  
    })

    test("GET /users?page=2 - Verify Success getting the user list for specific page", async ({ request }) => {
        const response = await request.get(`${testData.apiUrl}/users?page=2`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        helper.checkSchema('../schemas/userslist.schema.json',responseBody)  
    })

    test("POST /users - Verify Success when creating a new user", async ({ request }) => {
        const response = await request.post(`${testData.apiUrl}/user`, { data: {
            name: testData.create.name,
            job: testData.create.job,
        }
    })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(201)
        expect(responseBody.name).toBe(testData.create.name)
        expect(responseBody.job).toBe(testData.create.job)
        expect(responseBody.id).toBeTruthy()
        expect(responseBody.createdAt).toBeTruthy()
        helper.checkSchema('../schemas/newuser.schema.json',responseBody)
    })

    test("PUT /users/[id] - Verify Success when updating a user's name", async ({ request }) => {
        const response = await request.put(`${testData.apiUrl}/user/2`, { data: {
            name: testData.update.name
        }
    })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe(testData.update.name)
        expect(responseBody.job).toBeUndefined() //Substitute for "value does not exist in response body"
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test("PUT /users/[id]- Verify Success when updating a user's job", async ({ request }) => {
        const response = await request.put(`${testData.apiUrl}/user/2`, { data: {
            job: testData.update.job
        }
    })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBeUndefined() //Substitute for "value does not exist in response body"
        expect(responseBody.job).toBe(testData.update.job)
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test("PUT /users/[id] - Verify Success when updating a user's name & job", async ({ request }) => {
        const response = await request.put(`${testData.apiUrl}/user/2`, { data: {
            name: testData.update.name,
            job: testData.update.job
        }
    })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe(testData.update.name)
        expect(responseBody.job).toBe(testData.update.job)
        expect(responseBody.updatedAt).toBeTruthy()
        helper.checkSchema('../schemas/updateuser.schema.json',responseBody)
    })

    test("PATCH /users/[id] - Verify Success when patching a user's name", async ({ request }) => {
        const response = await request.put(`${testData.apiUrl}/user/2`, { data: {
            name: testData.patch.name
        }
    })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe(testData.patch.name)
        expect(responseBody.job).toBeUndefined() //Substitute for "value does not exist in response body"
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test("PATCH /users/[id] - Verify Success when patching a user's job", async ({ request }) => {
        const response = await request.patch(`${testData.apiUrl}/user/2`, { data: {
            job: testData.patch.job
        }
    })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBeUndefined() //Substitute for "value does not exist in response body"
        expect(responseBody.job).toBe(testData.patch.job)
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test("PATCH /users/[id] - Verify Success when patching a user's name & job", async ({ request }) => {
        const response = await request.patch(`${testData.apiUrl}/user/2`, { data: {
            name: testData.patch.name,
            job: testData.patch.job
        }
    })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe(testData.patch.name)
        expect(responseBody.job).toBe(testData.patch.job)
        expect(responseBody.updatedAt).toBeTruthy()
        helper.checkSchema('../schemas/updateuser.schema.json',responseBody)
    })

    test("DELETE /users/[id] - Verify removing info for Single user", async ({ request }) => {
        const response = await request.delete(`${testData.apiUrl}/users/2`)
        expect(response.status()).toBe(204)
    })

})

test.describe("Negative Validation /Users Tests", () => {

    test("GET /users/[id] - Verify Error when user Id does not exist", async ({ request }) => {
        const response = await request.get(`${testData.apiUrl}/users/66`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(404)
        expect(responseBody).toStrictEqual({})
    })

    test("GET /users/[id] - Verify Error when user Id is invalid", async ({ request }) => {
        const response = await request.get(`${testData.apiUrl}/users/a`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(404)
        expect(responseBody).toStrictEqual({})
    })

    test("GET /users?page=2 - Verify Error getting the user list for non-existent page", async ({ request }) => {
        const response = await request.get(`${testData.apiUrl}/users?page=6`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        helper.checkSchema('../schemas/blankuserslist.schema.json',responseBody)  
    })

})
