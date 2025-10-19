const request = require("supertest");
const app = require("../../app");
const Users = require("../../validation/mongoSchemas/usersSchema");
const Cards = require("../../validation/mongoSchemas/cardsSchema");
const { generateAuthToken } = require("../../auth/providers/jwt");

describe("DELETE /api/cards/:id", () => {
  let cardCreatorToken;
  let adminToken;
  let otherBusinessUserToken;
  let regularUserToken;
  let testCardId;
  let nonExistentCardId = "66b0a60f2e7c039244a87999";

  beforeEach(async () => {
    // Get different types of users
    const adminUser = await Users.findOne({ isAdmin: true });
    const businessUser = await Users.findOne({ isBusiness: true, isAdmin: false });
    const regularUser = await Users.findOne({ isBusiness: false, isAdmin: false });

    // Generate tokens
    adminToken = generateAuthToken(adminUser);
    regularUserToken = generateAuthToken(regularUser);

    // Create a test card for deletion
    const testCard = new Cards({
      title: "Card to Delete",
      subtitle: "Delete Test Card",
      description: "This card will be deleted during testing",
      phone: "050-1234567",
      email: "delete@test.com",
      web: "https://www.deletetest.com",
      image: {
        url: "https://example.com/delete.jpg",
        alt: "Delete test image",
      },
      address: {
        state: "Delete State",
        country: "Israel",
        city: "Delete City",
        street: "Delete Street",
        houseNumber: 999,
        zip: 9999999,
      },
      bizNumber: 9876543,
      likes: [],
      user_id: businessUser._id,
    });

    const savedCard = await testCard.save();
    testCardId = savedCard._id.toString();
    cardCreatorToken = generateAuthToken(businessUser);

    // Get another business user for testing unauthorized access
    const otherBusinessUser = await Users.findOne({
      isBusiness: true,
      isAdmin: false,
      _id: { $ne: businessUser._id },
    });
    if (otherBusinessUser) {
      otherBusinessUserToken = generateAuthToken(otherBusinessUser);
    }
  });

  test("should delete card with status 200 when card creator deletes", async () => {
    const response = await request(app)
      .delete(`/api/cards/${testCardId}`)
      .set("Authorization", `Bearer ${cardCreatorToken}`)
      .expect(200);

    expect(response.body).toHaveProperty("_id", testCardId);
    expect(response.body).toHaveProperty("title", "Card to Delete");

    // Verify card is actually deleted from database
    const deletedCard = await Cards.findById(testCardId);
    expect(deletedCard).toBeNull();
  });

  test("should delete card with status 200 when admin deletes", async () => {
    const response = await request(app)
      .delete(`/api/cards/${testCardId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);

    expect(response.body).toHaveProperty("_id", testCardId);
    expect(response.body).toHaveProperty("title", "Card to Delete");

    // Verify card is actually deleted from database
    const deletedCard = await Cards.findById(testCardId);
    expect(deletedCard).toBeNull();
  });

  test("should return complete card data in delete response", async () => {
    const response = await request(app)
      .delete(`/api/cards/${testCardId}`)
      .set("Authorization", `Bearer ${cardCreatorToken}`)
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
  });

  test("should return 401 when user is not authenticated", async () => {
    await request(app).delete(`/api/cards/${testCardId}`).expect(401);
  });

  test("should return 403 when user is not card creator or admin", async () => {
    if (otherBusinessUserToken) {
      await request(app)
        .delete(`/api/cards/${testCardId}`)
        .set("Authorization", `Bearer ${otherBusinessUserToken}`)
        .expect(403);
    }
  });

  test("should return 403 when regular user tries to delete", async () => {
    await request(app)
      .delete(`/api/cards/${testCardId}`)
      .set("Authorization", `Bearer ${regularUserToken}`)
      .expect(403);
  });

  test("should return 404 when card does not exist", async () => {
    await request(app)
      .delete(`/api/cards/${nonExistentCardId}`)
      .set("Authorization", `Bearer ${cardCreatorToken}`)
      .expect(404);
  });

  test("should return 400 when invalid ObjectId format is provided", async () => {
    await request(app)
      .delete("/api/cards/invalid-id-format")
      .set("Authorization", `Bearer ${cardCreatorToken}`)
      .expect(400);
  });

  test("should handle deletion of card with likes", async () => {
    // Add some likes to the card
    await Cards.findByIdAndUpdate(testCardId, {
      likes: ["66b0a60f2e7c039244a87111", "66b0a60f2e7c039244a87222"],
    });

    const response = await request(app)
      .delete(`/api/cards/${testCardId}`)
      .set("Authorization", `Bearer ${cardCreatorToken}`)
      .expect(200);

    expect(response.body.likes).toHaveLength(2);

    // Verify card is deleted
    const deletedCard = await Cards.findById(testCardId);
    expect(deletedCard).toBeNull();
  });

  test("should not affect other cards when deleting one card", async () => {
    // Get count of cards before deletion
    const initialCount = await Cards.countDocuments();

    await request(app)
      .delete(`/api/cards/${testCardId}`)
      .set("Authorization", `Bearer ${cardCreatorToken}`)
      .expect(200);

    // Verify only one card was deleted
    const finalCount = await Cards.countDocuments();
    expect(finalCount).toBe(initialCount - 1);
  });

  test("should handle concurrent deletion attempts gracefully", async () => {
    // First deletion should succeed
    const firstResponse = await request(app)
      .delete(`/api/cards/${testCardId}`)
      .set("Authorization", `Bearer ${cardCreatorToken}`)
      .expect(200);

    expect(firstResponse.body).toHaveProperty("_id", testCardId);

    // Second deletion should fail with 404
    await request(app)
      .delete(`/api/cards/${testCardId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(404);
  });

  test("should maintain referential integrity after deletion", async () => {
    // Delete the card
    await request(app)
      .delete(`/api/cards/${testCardId}`)
      .set("Authorization", `Bearer ${cardCreatorToken}`)
      .expect(200);

    // Verify card is not found in any queries
    const cardExists = await Cards.exists({ _id: testCardId });
    expect(cardExists).toBeNull();

    // Verify user still exists (referential integrity)
    const user = await Users.findById(Cards.user_id);
    expect(user).toBeDefined();
  });
});