const request = require("supertest");
const app = require("../../app");
const Users = require("../../validation/mongoSchemas/usersSchema");
const Cards = require("../../validation/mongoSchemas/cardsSchema");
const {
  getAuthHeader,
  getBusinessUserToken,
  getAdminUserToken,
  getRegularUserToken,
} = require("../helpers/authHelpers");

describe("PUT /api/cards/:id", () => {
  let cardCreatorToken;
  let otherBusinessUserToken;
  let adminToken;
  let regularUserToken;
  let testCardId;
  const nonExistentCardId = "66b0a60f2e7c039244a87999";

  beforeEach(async () => {
    // Get different types of users and tokens
    adminToken = await getAdminUserToken();
    regularUserToken = await getRegularUserToken();
    cardCreatorToken = await getBusinessUserToken();

    const businessUser = await Users.findOne({ email: "david.levi@email.com" });

    // Get a test card - should exist from seed data
    const testCard = await Cards.findOne({ user_id: businessUser._id });
    if (testCard) {
      testCardId = testCard._id.toString();
    } else {
      throw new Error("No test card found for business user");
    }
  });

  test("should update card with status 200 when card creator edits", async () => {
    const updatedCardData = {
      title: "Updated Test Card",
      subtitle: "Updated Subtitle",
      description: "Updated description for testing",
      phone: "052-9876543",
      email: "updated@test.com",
      web: "https://www.updatedtest.com",
      image: {
        url: "https://example.com/updated.jpg",
        alt: "Updated test image",
      },
      address: {
        state: "Updated State",
        country: "Israel",
        city: "Updated City",
        street: "Updated Street",
        houseNumber: 456,
        zip: 7654321,
      },
    };

    const response = await request(app)
      .put(`/api/cards/${testCardId}`)
      .set(getAuthHeader(cardCreatorToken))
      .send(updatedCardData)
      .expect(200);

    expect(response.body).toHaveProperty("_id", testCardId);
    expect(response.body).toHaveProperty("title", updatedCardData.title);
    expect(response.body).toHaveProperty("subtitle", updatedCardData.subtitle);
    expect(response.body).toHaveProperty("description", updatedCardData.description);
    expect(response.body).toHaveProperty("phone", updatedCardData.phone);
    expect(response.body).toHaveProperty("email", updatedCardData.email);
    expect(response.body).toHaveProperty("web", updatedCardData.web);
    expect(response.body.image).toHaveProperty("url", updatedCardData.image.url);
    expect(response.body.image).toHaveProperty("alt", updatedCardData.image.alt);
    expect(response.body.address).toHaveProperty("state", updatedCardData.address.state);
    expect(response.body.address).toHaveProperty("city", updatedCardData.address.city);
  });

  test("should handle partial updates correctly", async () => {
    const partialUpdate = {
      title: "Partially Updated Title",
      description: "Only updating title and description",
    };

    const response = await request(app)
      .put(`/api/cards/${testCardId}`)
      .set(getAuthHeader(cardCreatorToken))
      .send(partialUpdate)
      .expect(200);

    expect(response.body).toHaveProperty("title", partialUpdate.title);
    expect(response.body).toHaveProperty("description", partialUpdate.description);
    // Other fields should remain unchanged
    expect(response.body).toHaveProperty("subtitle");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("email");
  });

  test("should apply defaults for empty optional fields", async () => {
    const updateWithEmptyFields = {
      title: "Test Default Application",
      subtitle: "Testing Defaults",
      description: "Testing how defaults are applied",
      phone: "050-1234567",
      email: "defaults@test.com",
      web: "",
      image: {
        url: "",
        alt: "",
      },
      address: {
        state: "",
        country: "Israel",
        city: "Test City",
        street: "Test Street",
        houseNumber: 123,
        zip: 1234567,
      },
    };

    const response = await request(app)
      .put(`/api/cards/${testCardId}`)
      .set(getAuthHeader(cardCreatorToken))
      .send(updateWithEmptyFields)
      .expect(200);

    expect(response.body.web).toBe("");
    expect(response.body.address.state).toBe("Unspecified");
    expect(response.body.image.url).toMatch(/^https:/);
    expect(response.body.image.alt).toBe("Business card image");
  });

  test("should return 401 when user is not authenticated", async () => {
    const updateData = {
      title: "Unauthorized Update",
    };

    await request(app)
      .put(`/api/cards/${testCardId}`)
      .send(updateData)
      .expect(401);
  });

  test("should return 403 when user is not the card creator", async () => {
    if (otherBusinessUserToken) {
      const updateData = {
        title: "Unauthorized Update",
      };

      await request(app)
        .put(`/api/cards/${testCardId}`)
        .set(getAuthHeader(adminToken))
        .send(updateData)
        .expect(403);
    }
  });

  test("should return 403 when regular user tries to edit", async () => {
    const updateData = {
      title: "Regular User Update",
    };

    await request(app)
      .put(`/api/cards/${testCardId}`)
      .set(getAuthHeader(regularUserToken))
      .send(updateData)
      .expect(403);
  });

  test("should return 404 when card does not exist", async () => {
    const updateData = {
      title: "Update Non-existent Card",
    };

    await request(app)
      .put(`/api/cards/${nonExistentCardId}`)
      .set(getAuthHeader(cardCreatorToken))
      .send(updateData)
      .expect(404);
  });

  test("should return 400 when validation fails", async () => {
    const invalidUpdate = {
      title: "a", // Too short
      phone: "invalid-phone",
      email: "invalid-email",
    };

    await request(app)
      .put(`/api/cards/${testCardId}`)
      .set(getAuthHeader(cardCreatorToken))
      .send(invalidUpdate)
      .expect(400);
  });

  test("should return 400 when invalid ObjectId format is provided", async () => {
    const updateData = {
      title: "Valid Update Data",
    };

    await request(app)
      .put("/api/cards/invalid-id-format")
      .set(getAuthHeader(cardCreatorToken))
      .send(updateData)
      .expect(400);
  });

  test("should preserve bizNumber and user_id during update", async () => {
    const originalCard = await Cards.findById(testCardId);
    const updateData = {
      title: "Title Update Test",
    };

    const response = await request(app)
      .put(`/api/cards/${testCardId}`)
      .set(getAuthHeader(cardCreatorToken))
      .send(updateData)
      .expect(200);

    expect(response.body.bizNumber).toBe(originalCard.bizNumber);
    expect(response.body.user_id).toBe(originalCard.user_id.toString());
  });
});