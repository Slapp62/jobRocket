const request = require("supertest");
const app = require("../../app");
const Cards = require("../../validation/mongoSchemas/cardsSchema");

describe("GET /api/cards/:id", () => {
  let existingCardId;
  const nonExistentCardId = "66b0a60f2e7c039244a87999";

  beforeEach(async () => {
    // Get an existing card ID for testing
    const existingCard = await Cards.findOne({});
    existingCardId = existingCard._id.toString();
  });

  test("should return card with status 200 when valid ID is provided", async () => {
    const response = await request(app)
      .get(`/api/cards/${existingCardId}`)
      .expect(200);

    expect(response.body).toHaveProperty("_id", existingCardId);
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("subtitle");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("web");
    expect(response.body).toHaveProperty("image");
    expect(response.body.image).toHaveProperty("url");
    expect(response.body.image).toHaveProperty("alt");
    expect(response.body).toHaveProperty("address");
    expect(response.body.address).toHaveProperty("state");
    expect(response.body.address).toHaveProperty("country");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("street");
    expect(response.body.address).toHaveProperty("houseNumber");
    expect(response.body.address).toHaveProperty("zip");
    expect(response.body).toHaveProperty("bizNumber");
    expect(response.body).toHaveProperty("likes");
    expect(response.body).toHaveProperty("user_id");
    expect(response.body).toHaveProperty("createdAt");
    expect(Array.isArray(response.body.likes)).toBe(true);
    expect(typeof response.body.bizNumber).toBe("number");
  });

  test("should return 404 when card with provided ID does not exist", async () => {
    const response = await request(app)
      .get(`/api/cards/${nonExistentCardId}`)
      .expect(404);

    expect(response.body).toMatch(/card not found/i);
  });

  test("should return 400 when invalid ObjectId format is provided", async () => {
    const invalidId = "invalid-id-format";

    await request(app)
      .get(`/api/cards/${invalidId}`)
      .expect(400);
  });

  test("should return card data with proper defaults applied", async () => {
    const response = await request(app)
      .get(`/api/cards/${existingCardId}`)
      .expect(200);

    // Verify defaults are properly applied
    expect(typeof response.body.web).toBe("string");
    expect(typeof response.body.address.state).toBe("string");
    expect(typeof response.body.image.url).toBe("string");
    expect(typeof response.body.image.alt).toBe("string");
    expect(response.body.image.url).toMatch(/^https?:/);

    // Verify business number is within valid range
    expect(response.body.bizNumber).toBeGreaterThanOrEqual(1000000);
    expect(response.body.bizNumber).toBeLessThanOrEqual(9999999);
  });

  test("should handle Hebrew content correctly", async () => {
    // Find a card with Hebrew content if it exists
    const hebrewCard = await Cards.findOne({
      $or: [
        { title: /[\u0590-\u05FF]/ },
        { subtitle: /[\u0590-\u05FF]/ },
        { description: /[\u0590-\u05FF]/ }
      ]
    });

    if (hebrewCard) {
      const response = await request(app)
        .get(`/api/cards/${hebrewCard._id}`)
        .expect(200);

      expect(response.body).toHaveProperty("_id", hebrewCard._id.toString());
      expect(typeof response.body.title).toBe("string");
      expect(typeof response.body.subtitle).toBe("string");
      expect(typeof response.body.description).toBe("string");
    }
  });
});