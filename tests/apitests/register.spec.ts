import { test, expect } from "@playwright/test";
import testData from "../../test-data/testdata";
import helper from "../../helper/helper";

test.describe("Positive /Register Tests", () => {

  test("POST /register - Verify Success when signing up with valid email and passowrd", async ({ request }) => {
    const response = await request.post(`${testData.apiUrl}/register`, {
      data: {
        email: testData.register.email,
        password: testData.register.password
      }
    })
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200)
    expect(responseBody.id).toBeTruthy()
    expect(responseBody.token).toBeTruthy()
    helper.checkSchema('../schemas/registeruser.schema.json',responseBody) 
  })

})
test.describe("Negative Validation /Register Tests", () => {

  test("POST /register - Verify Error when signing up with invalid email", async ({ request }) => {
    const response = await request.post(`${testData.apiUrl}/register`, {
      data: {
        email: 'john@mail.com',
        password: testData.register.password
      }
    })
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(400)
    expect(responseBody.error).toBe('Note: Only defined users succeed registration')
  })

  test("POST /register - Verify Error when signing up with no email", async ({ request }) => {
    const response = await request.post(`${testData.apiUrl}/register`, {
      data: {
        email: '',
        password: testData.register.password
      }
    })
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(400)
    expect(responseBody.error).toBe('Missing email or username')
  })

  test("POST /register - Verify Error when signing up with no password", async ({ request }) => {
    const response = await request.post(`${testData.apiUrl}/register`, {
      data: {
        email: testData.register.email,
        password: ''
      }
    })
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(400)
    expect(responseBody.error).toBe('Missing password')
  })

})
