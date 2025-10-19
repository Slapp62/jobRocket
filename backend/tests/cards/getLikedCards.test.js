const request = require("supertest");
const app = require("../../app");
const Users = require("../../validation/mongoSchemas/usersSchema");
const Cards = require("../../validation/mongoSchemas/cardsSchema");
const { generateAuthToken } = require("../../auth/providers/jwt");

describe("GET /api/cards/liked", () => {
  let userToken;
  let anotherUserToken;
  let testUserId;
  let anotherUserId;
  let likedCardIds = [];

  beforeEach(async () => {
    // Get test users
    const user = await Users.findOne({ isBusiness: false, isAdmin: false });
    const anotherUser = await Users.findOne({
      isBusiness: false,
      isAdmin: false,
      _id: { $ne: user._id },
    });

    testUserId = user._id.toString();
    anotherUserId = anotherUser._id.toString();

    // Generate tokens
    userToken = generateAuthToken(user);
    anotherUserToken = generateAuthToken(anotherUser);

    // Clear all likes first for clean testing
    await Cards.updateMany({}, { likes: [] });

    // Get some cards to like
    const cards = await Cards.find({}).limit(3);
    likedCardIds = cards.map((card) => card._id.toString());

    // Make the user like some cards
    if (cards.length >= 2) {
      await Cards.findByIdAndUpdate(cards[0]._id, {
        $push: { likes: testUserId },
      });
      await Cards.findByIdAndUpdate(cards[1]._id, {
        $push: { likes: testUserId },
      });

      // Make another user like one of the same cards
      if (cards.length >= 1) {
        await Cards.findByIdAndUpdate(cards[0]._id, {
          $push: { likes: anotherUserId },
        });
      }
    }
  });

  test("should return liked cards with status 200 when user has liked cards", async () => {
    const response = await request(app)
      .get("/api/cards/liked")
      .set("Authorization", `Bearer ${userToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.length).toBeLessThanOrEqual(2);

    // Verify all returned cards contain the user's ID in likes
    response.body.forEach((card) => {
      expect(card.likes).toContain(testUserId);
    });
  });

  test("should return proper card structure for liked cards", async () => {
    const response = await request(app)
      .get("/api/cards/liked")
      .set("Authorization", `Bearer ${userToken}`)
      .expect(200);

    if (response.body.length > 0) {
      const firstCard = response.body[0];
      expect(firstCard).toHaveProperty("_id");
      expect(firstCard).toHaveProperty("title");
      expect(firstCard).toHaveProperty("subtitle");
      expect(firstCard).toHaveProperty("description");
      expect(firstCard).toHaveProperty("phone");
      expect(firstCard).toHaveProperty("email");
      expect(firstCard).toHaveProperty("web");
      expect(firstCard).toHaveProperty("image");
      expect(firstCard.image).toHaveProperty("url");
      expect(firstCard.image).toHaveProperty("alt");
      expect(firstCard).toHaveProperty("address");
      expect(firstCard).toHaveProperty("bizNumber");
      expect(firstCard).toHaveProperty("likes");
      expect(firstCard).toHaveProperty("user_id");
      expect(firstCard).toHaveProperty("createdAt");
      expect(Array.isArray(firstCard.likes)).toBe(true);
    }
  });

  test("should return different results for different users", async () => {
    const user1Response = await request(app)
      .get("/api/cards/liked")
      .set("Authorization", `Bearer ${userToken}`)
      .expect(200);

    const user2Response = await request(app)
      .get("/api/cards/liked")
      .set("Authorization", `Bearer ${anotherUserToken}`)
      .expect(200);

    // User 1 should have 2 liked cards, User 2 should have 1
    expect(user1Response.body.length).toBe(2);
    expect(user2Response.body.length).toBe(1);

    // Verify the cards contain the correct user IDs
    user1Response.body.forEach((card) => {
      expect(card.likes).toContain(testUserId);
    });

    user2Response.body.forEach((card) => {
      expect(card.likes).toContain(anotherUserId);
    });
  });

  test("should return 404 when user has no liked cards", async () => {
    // Create a new user with no liked cards
    const newUser = new Users({
      name: {
        first: "No",
        middle: "",
        last: "Likes",
      },
      phone: "050-0000000",
      email: "nolikes@test.com",
      password: "NoLikes123!",
      address: {
        state: "",
        country: "Israel",
        city: "Test City",
        street: "Test Street",
        houseNumber: 1,
        zip: 1111111,
      },
      isAdmin: false,
      isBusiness: false,
    });

    const savedUser = await newUser.save();
    const noLikesToken = generateAuthToken(savedUser);

    const response = await request(app)
      .get("/api/cards/liked")
      .set("Authorization", `Bearer ${noLikesToken}`)
      .expect(404);

    expect(response.body).toMatch(/no liked cards/i);

    // Clean up
    await Users.findByIdAndDelete(savedUser._id);
  });

  test("should return 401 when user is not authenticated", async () => {
    await request(app).get("/api/cards/liked").expect(401);
  });

  test("should handle user with multiple liked cards correctly", async () => {
    // Like all available cards for the user
    const allCards = await Cards.find({});
    for (const card of allCards) {
      await Cards.findByIdAndUpdate(card._id, {
        $addToSet: { likes: testUserId },
      });
    }

    const response = await request(app)
      .get("/api/cards/liked")
      .set("Authorization", `Bearer ${userToken}`)
      .expect(200);

    expect(response.body.length).toBe(allCards.length);
    response.body.forEach((card) => {
      expect(card.likes).toContain(testUserId);
    });
  });

  test("should not return cards that user has unliked", async () => {
    // First, like a card
    const card = await Cards.findOne({});
    await Cards.findByIdAndUpdate(card._id, {
      $push: { likes: testUserId },
    });

    // Verify it appears in liked cards
    let response = await request(app)
      .get("/api/cards/liked")
      .set("Authorization", `Bearer ${userToken}`)
      .expect(200);

    const initialCount = response.body.length;
    expect(response.body.some((c) => c._id === card._id.toString())).toBe(true);

    // Unlike the card
    await Cards.findByIdAndUpdate(card._id, {
      $pull: { likes: testUserId },
    });

    // Verify it no longer appears in liked cards
    response = await request(app)
      .get("/api/cards/liked")
      .set("Authorization", `Bearer ${userToken}`)
      .expect(200);

    expect(response.body.length).toBe(initialCount - 1);
    expect(response.body.some((c) => c._id === card._id.toString())).toBe(false);
  });

  test("should handle Hebrew content in liked cards correctly", async () => {
    // Find a Hebrew card and like it
    const hebrewCard = await Cards.findOne({
      $or: [
        { title: /[\u0590-\u05FF]/ },
        { subtitle: /[\u0590-\u05FF]/ },
        { description: /[\u0590-\u05FF]/ },
      ],
    });

    if (hebrewCard) {
      await Cards.findByIdAndUpdate(hebrewCard._id, {
        $addToSet: { likes: testUserId },
      });

      const response = await request(app)
        .get("/api/cards/liked")
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200);

      const foundHebrewCard = response.body.find(
        (card) => card._id === hebrewCard._id.toString(),
      );
      expect(foundHebrewCard).toBeDefined();
      expect(typeof foundHebrewCard.title).toBe("string");
      expect(typeof foundHebrewCard.subtitle).toBe("string");
      expect(typeof foundHebrewCard.description).toBe("string");
    }
  });
});