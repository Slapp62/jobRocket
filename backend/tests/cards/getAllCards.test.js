const request = require("supertest");
const app = require("../../app");

describe("GET /api/cards/", () => {
  test("should return all cards with status 200", async () => {
    // Act: Make a GET request to your cards endpoint
    const response = await request(app).get("/api/cards/").expect(200); // This checks the HTTP status code

    // Assert: Verify the response structure and content
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    // Additional assertions to verify card structure
    const firstCard = response.body[0];
    expect(firstCard).toHaveProperty("title");
    expect(firstCard).toHaveProperty("subtitle");
    expect(firstCard).toHaveProperty("email");
    expect(firstCard).toHaveProperty("phone");
  });
});
