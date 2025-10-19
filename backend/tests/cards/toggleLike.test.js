const request = require("supertest");
const app = require("../../app");
const Users = require("../../validation/mongoSchemas/usersSchema");
const Cards = require("../../validation/mongoSchemas/cardsSchema");
const {
  getAuthHeader,
  getRegularUserToken,
} = require("../helpers/authHelpers");

describe("PATCH /api/cards/:id", () => {
  let userToken;
  let anotherUserToken;
  let testCardId;
  let testUserId;
  let anotherUserId;
  let nonExistentCardId = "66b0a60f2e7c039244a87999";

  beforeEach(async () => {
    // Get test users and tokens
    const user = await Users.findOne({ email: "sarah.cohen@email.com" });
    const anotherUser = await Users.findOne({ email: "admin@email.com" });

    testUserId = user._id.toString();
    anotherUserId = anotherUser._id.toString();

    // Generate tokens
    userToken = await getRegularUserToken();
    anotherUserToken = await getRegularUserToken();

    // Get or create a test card
    let testCard = await Cards.findOne({});
    if (!testCard) {
      const businessUser = await Users.findOne({ isBusiness: true });
      testCard = new Cards({
        title: "Test Card for Likes",
        subtitle: "Test Subtitle",
        description: "Test Description",
        phone: "050-1234567",
        email: "likes@test.com",
        web: "https://www.likestest.com",
        image: {
          url: "https://example.com/likes.jpg",
          alt: "Likes test image"
        },
        address: {
          state: "Test State",
          country: "Israel",
          city: "Test City",
          street: "Test Street",
          houseNumber: 123,
          zip: 1234567
        },
        bizNumber: 1234568,
        likes: [],
        user_id: businessUser._id
      });
      testCard = await testCard.save();
    }
    testCardId = testCard._id.toString();

    // Reset likes array for consistent testing
    await Cards.findByIdAndUpdate(testCardId, { likes: [] });
  });

  test("should add like when user likes card for first time", async () => {
    const response = await request(app)
      .patch(`/api/cards/${testCardId}`)
      .set(getAuthHeader(userToken))
      .expect(200);

    expect(response.body).toHaveProperty("_id", testCardId);
    expect(response.body.likes).toContain(testUserId);
    expect(response.body.likes).toHaveLength(1);
  });

  test("should remove like when user unlikes previously liked card", async () => {
    // First like the card
    await Cards.findByIdAndUpdate(testCardId, {
      $push: { likes: testUserId }
    });

    const response = await request(app)
      .patch(`/api/cards/${testCardId}`)
      .set(getAuthHeader(userToken))
      .expect(200);

    expect(response.body).toHaveProperty("_id", testCardId);
    expect(response.body.likes).not.toContain(testUserId);
    expect(response.body.likes).toHaveLength(0);
  });

  test("should handle multiple users liking the same card", async () => {
    // First user likes the card
    await request(app)
      .patch(`/api/cards/${testCardId}`)
      .set(getAuthHeader(userToken))
      .expect(200);

    // Second user likes the card
    const response = await request(app)
      .patch(`/api/cards/${testCardId}`)
      .set(getAuthHeader(anotherUserToken))
      .expect(200);

    expect(response.body.likes).toContain(testUserId);
    expect(response.body.likes).toContain(anotherUserId);
    expect(response.body.likes).toHaveLength(2);
  });

  test("should only remove specific user's like when multiple likes exist", async () => {
    // Both users like the card first
    await Cards.findByIdAndUpdate(testCardId, {
      likes: [testUserId, anotherUserId]
    });

    // First user unlikes
    const response = await request(app)
      .patch(`/api/cards/${testCardId}`)
      .set(getAuthHeader(userToken))
      .expect(200);

    expect(response.body.likes).not.toContain(testUserId);
    expect(response.body.likes).toContain(anotherUserId);
    expect(response.body.likes).toHaveLength(1);
  });

  test("should return proper card structure with all fields", async () => {
    const response = await request(app)
      .patch(`/api/cards/${testCardId}`)
      .set(getAuthHeader(userToken))
      .expect(200);

    expect(response.body).toHaveProperty("_id");
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
    expect(response.body).toHaveProperty("bizNumber");
    expect(response.body).toHaveProperty("likes");
    expect(response.body).toHaveProperty("user_id");
    expect(response.body).toHaveProperty("createdAt");
    expect(Array.isArray(response.body.likes)).toBe(true);
  });

  test("should return 401 when user is not authenticated", async () => {
    await request(app)
      .patch(`/api/cards/${testCardId}`)
      .expect(401);
  });

  test("should return 400 when card does not exist", async () => {
    const response = await request(app)
      .patch(`/api/cards/${nonExistentCardId}`)
      .set(getAuthHeader(userToken))
      .expect(400);

    expect(response.body).toMatch(/card not found/i);
  });

  test("should return 400 when invalid ObjectId format is provided", async () => {
    await request(app)
      .patch("/api/cards/invalid-id-format")
      .set(getAuthHeader(userToken))
      .expect(400);
  });

  test("should handle rapid like/unlike operations correctly", async () => {
    // Like the card
    const likeResponse = await request(app)
      .patch(`/api/cards/${testCardId}`)
      .set(getAuthHeader(userToken))
      .expect(200);

    expect(likeResponse.body.likes).toContain(testUserId);

    // Immediately unlike the card
    const unlikeResponse = await request(app)
      .patch(`/api/cards/${testCardId}`)
      .set(getAuthHeader(userToken))
      .expect(200);

    expect(unlikeResponse.body.likes).not.toContain(testUserId);
    expect(unlikeResponse.body.likes).toHaveLength(0);
  });

  test("should maintain like count integrity", async () => {
    // Get initial state
    const initialCard = await Cards.findById(testCardId);
    const initialLikeCount = initialCard.likes.length;

    // Like the card
    await request(app)
      .patch(`/api/cards/${testCardId}`)
      .set(getAuthHeader(userToken))
      .expect(200);

    // Verify count increased by 1
    const likedCard = await Cards.findById(testCardId);
    expect(likedCard.likes.length).toBe(initialLikeCount + 1);

    // Unlike the card
    await request(app)
      .patch(`/api/cards/${testCardId}`)
      .set(getAuthHeader(userToken))
      .expect(200);

    // Verify count returned to original
    const unlikedCard = await Cards.findById(testCardId);
    expect(unlikedCard.likes.length).toBe(initialLikeCount);
  });
});