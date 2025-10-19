const request = require("supertest");
const app = require("../../app");
const Users = require("../../validation/mongoSchemas/usersSchema");
const Cards = require("../../validation/mongoSchemas/cardsSchema");
const { generateAuthToken } = require("../../auth/providers/jwt");
const { getAuthHeader } = require("../helpers/authHelpers");
const { get } = require("lodash");

describe("PATCH /api/cards/bizNumber/:id", () => {
  let adminToken;
  let businessUserToken;
  let regularUserToken;
  let testCardId;
  let originalBizNumber;
  let nonExistentCardId = "66b0a60f2e7c039244a87999";

  beforeEach(async () => {
    // Get different types of users
    const adminUser = await Users.findOne({ isAdmin: true });
    const businessUser = await Users.findOne({ isBusiness: true, isAdmin: false });
    const regularUser = await Users.findOne({ isBusiness: false, isAdmin: false });

    // Generate tokens
    adminToken = generateAuthToken(adminUser);
    businessUserToken = generateAuthToken(businessUser);
    regularUserToken = generateAuthToken(regularUser);

    // Get a test card and store its original business number
    const testCard = await Cards.findOne({});
    testCardId = testCard._id.toString();
    originalBizNumber = testCard.bizNumber;
  });

  test("should change business number with status 200 when admin provides valid new number", async () => {
    const newBizNumber = 5555555;

    const response = await request(app)
      .patch(`/api/cards/bizNumber/${testCardId}`)
      .set(g)
      .send({ newBizNumber })
      .expect(200);

    expect(response.body).toHaveProperty("_id", testCardId);
    expect(response.body).toHaveProperty("bizNumber", newBizNumber);
    expect(response.body.bizNumber).not.toBe(originalBizNumber);

    // Verify the change persisted in database
    const updatedCard = await Cards.findById(testCardId);
    expect(updatedCard.bizNumber).toBe(newBizNumber);
  });

  test("should return complete card data in response", async () => {
    const newBizNumber = 4444444;

    const response = await request(app)
      .patch(`/api/cards/bizNumber/${testCardId}`)
      .set(getAuthHeader(adminToken))
      .send({ newBizNumber })
      .expect(200);

    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("title");
    expect(response.body).toHaveProperty("subtitle");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("web");
    expect(response.body).toHaveProperty("image");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("bizNumber", newBizNumber);
    expect(response.body).toHaveProperty("likes");
    expect(response.body).toHaveProperty("user_id");
    expect(response.body).toHaveProperty("createdAt");
  });

  test("should handle business number as string input", async () => {
    const newBizNumber = "6666666"; // String instead of number

    const response = await request(app)
      .patch(`/api/cards/bizNumber/${testCardId}`)
      .set(getAuthHeader(adminToken))
      .send({ newBizNumber })
      .expect(200);

    expect(response.body.bizNumber).toBe(6666666); // Should be converted to number
  });

  test("should handle business number within valid range", async () => {
    const validNumbers = [1000000, 5000000, 9999999];

    for (const newBizNumber of validNumbers) {
      const response = await request(app)
        .patch(`/api/cards/bizNumber/${testCardId}`)
        .set(g)
        .send({ newBizNumber })
        .expect(200);

      expect(response.body.bizNumber).toBe(newBizNumber);
      expect(response.body.bizNumber).toBeGreaterThanOrEqual(1000000);
      expect(response.body.bizNumber).toBeLessThanOrEqual(9999999);
    }
  });

  test("should return 400 when business number is already in use", async () => {
    // Get another card's business number
    const anotherCard = await Cards.findOne({ _id: { $ne: testCardId } });
    if (anotherCard) {
      const existingBizNumber = anotherCard.bizNumber;

      const response = await request(app)
        .patch(`/api/cards/bizNumber/${testCardId}`)
        .set(getAuthHeader(adminToken))
        .send({ newBizNumber: existingBizNumber })
        .expect(400);

      expect(response.body).toMatch(/already in use/i);
    }
  });

  test("should return 400 when business number is out of valid range", async () => {
    const invalidNumbers = [999999, 10000000, 0, -1, 12345678];

    for (const invalidNumber of invalidNumbers) {
      await request(app)
        .patch(`/api/cards/bizNumber/${testCardId}`)
        .set(getAuthHeader(adminToken))
        .send({ newBizNumber: invalidNumber })
        .expect(400);
    }
  });

  test("should return 400 when newBizNumber is missinetgetAuthHeader(adminToken)", async () => {
    await request(app)
      .patch(`/api/cards/bizNumber/${testCardId}`)
      .set(getAuthHeader(adminToken))
      .send({}) // Missing newBizNumber
      .expect(400);
  });

  test("should return 400 when newBizNumber is invalid format", async () => {
    const invalidFormats = ["abc123", "not-a-number", null, undefined, {}];

    for (const invalidFormat of invalidFormats) {
      await request(app)
        .patch(`/api/cards/bizNumber/${testCardId}`)
        .set(getAuthHeader(adminToken))
        .send({ newBizNumber: invalidFormat })
        .expect(400);
    }
  });

  test("should return 401 when user is not authenticated", async () => {
    await request(app)
      .patch(`/api/cards/bizNumber/${testCardId}`)
      .send({ newBizNumber: 7777777 })
      .expect(401);
  });

  test("should return 403 when user is not an admin", async () => {
    await request(app)
      .patch(`/api/cards/bizNumber/${testCardId}`)
      .set('x-auth-token', businessUserToken)
      .send({ newBizNumber: 8888888 })
      .expect(403);

    await request(app)
      .patch(`/api/cards/bizNumber/${testCardId}`)
      .set('x-auth-token', regularUserToken)
      .send({ newBizNumber: 8888888 })
      .expect(403);
  });

  test("should return 404 when card does not exist", async () => {
    await request(app)
      .patch(`/api/cards/bizNumber/${nonExistentCardId}`)
      .set(g)
      .send({ newBizNumber: 3333333 })
      .expect(404);
  });

  test("should return 400 when invalid ObjectId format is provided", async () => {
    await request(app)
      .patch("/api/cards/bizNumber/invalid-id-format")
      .set(g)
      .send({ newBizNumber: 2222222 })
      .expect(400);
  });

  test("should not change other card properties", async () => {
    const originalCard = await Cards.findById(testCardId);
    const newBizNumber = 1111111;

    const response = await request(app)
      .patch(`/api/cards/bizNumber/${testCardId}`)
      .set(g)
      .send({ newBizNumber })
      .expect(200);

    // Verify only bizNumber changed
    expect(response.body.title).toBe(originalCard.title);
    expect(response.body.subtitle).toBe(originalCard.subtitle);
    expect(response.body.description).toBe(originalCard.description);
    expect(response.body.phone).toBe(originalCard.phone);
    expect(response.body.email).toBe(originalCard.email);
    expect(response.body.user_id).toBe(originalCard.user_id.toString());
    expect(response.body.bizNumber).toBe(newBizNumber);
    expect(response.body.bizNumber).not.toBe(originalCard.bizNumber);
  });

  test("should handle multiple sequential business number changes", async () => {
    const numbers = [1234567, 2345678, 3456789];

    for (const newBizNumber of numbers) {
      const response = await request(app)
        .patch(`/api/cards/bizNumber/${testCardId}`)
        .set(g)
        .send({ newBizNumber })
        .expect(200);

      expect(response.body.bizNumber).toBe(newBizNumber);
    }

    // Verify final state
    const finalCard = await Cards.findById(testCardId);
    expect(finalCard.bizNumber).toBe(3456789);
  });
});