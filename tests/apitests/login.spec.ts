import { test, expect } from "@playwright/test";
import testData from "../../test-data/testdata";

test.describe("Positive /Login Tests", () => {
    
  test("POST /login - Verify success when logging in with valid email and password", async ({ request }) => {
    const response = await request.post(`${testData.apiUrl}/login`, {
      data: {
        email: testData.register.email,
        password: testData.register.password
      }
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.id).toBeUndefined()
    expect(responseBody.token).toBeTruthy()
  })

})

test.describe("Negative Validation /Login Tests", () => {

  test("POST /login - Verify Error when logging in with invalid email and valid password", async ({ request }) => {
    const response = await request.post(`${testData.apiUrl}/login`, {
      data: {
        email: 'john@mail.com',
        password: testData.register.password
      }
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(400)
    expect(responseBody.error).toBe('user not found')
  })

  test("POST /login - Verify Error when logging in with valid email and no password", async ({ request }) => {
    const response = await request.post(`${testData.apiUrl}/login`, {
      data: {
        email: testData.register.email,
        password: ''
      }
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(400)
    expect(responseBody.error).toBe('Missing password')
  })

  test("POST /login - Verify Error when logging in with only password", async ({ request }) => {
    const response = await request.post(`${testData.apiUrl}/login`, {
      data: {
        email: '',
        password: testData.register.password
      }
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(400)
    expect(responseBody.error).toBe('Missing email or username')
  })

})
