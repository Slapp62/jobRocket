const request = require("supertest");
const app = require("../../app");
const {
  getAuthHeader,
  getBusinessUserToken,
} = require("../helpers/authHelpers");

describe("GET /api/cards/my-cards", () => {
  describe("Authentication Tests", () => {
    test("should return 401 when no token provided", async () => {
      const response = await request(app)
        .get("/api/cards/my-cards")
        .expect(401);

      expect(response.body.message).toMatch(/no token provided/i);
    });

    test("should return 401 when invalid token provided", async () => {
      const response = await request(app)
        .get("/api/cards/my-cards")
        .set(getAuthHeader("invalid-token"))
        .expect(401);

      expect(response.body.message).toMatch(/invalid token/i);
    });

    test("should return user's cards when valid token provided", async () => {
      const token = await getBusinessUserToken();

      const response = await request(app)
        .get("/api/cards/my-cards")
        .set(getAuthHeader(token))
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.message).toBe("User cards fetched successfully");
    });
  });

  describe("Business Logic Tests", () => {
    test("should only return cards belonging to the authenticated user", async () => {
      const token = await getBusinessUserToken();

      const response = await request(app)
        .get("/api/cards/my-cards")
        .set(getAuthHeader(token))
        .expect(200);

      // All returned cards should belong to this user
      // Note: You'll need to know the user ID to verify this
      expect(Array.isArray(response.body)).toBe(true);
      // Add more specific assertions based on your seeded data
    });
  });
});
