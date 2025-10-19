const request = require("supertest");
const app = require("../../app");
const {
  getAuthHeader,
  getBusinessUserToken,
  getRegularUserToken,
} = require("../helpers/authHelpers");

describe("POST /api/cards/", () => {
  let businessUserToken;
  let regularUserToken;

  beforeEach(async () => {
    businessUserToken = await getBusinessUserToken();
    regularUserToken = await getRegularUserToken();
  });

  test("should create a new card with status 201 when authenticated business user", async () => {
    const newCard = {
      title: "Test Business Card",
      subtitle: "Testing Card Creation",
      description: "This is a test card created during automated testing",
      phone: "050-1234567",
      email: "test@testbusiness.com",
      web: "https://www.testbusiness.com",
      image: {
        url: "https://example.com/test-image.jpg",
        alt: "Test business image"
      },
      address: {
        state: "Test State",
        country: "Israel",
        city: "Test City",
        street: "Test Street",
        houseNumber: 123,
        zip: 1234567
      }
    };

    const response = await request(app)
      .post("/api/cards/")
      .set(getAuthHeader(businessUserToken))
      .send(newCard)
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("title", newCard.title);
    expect(response.body).toHaveProperty("subtitle", newCard.subtitle);
    expect(response.body).toHaveProperty("description", newCard.description);
    expect(response.body).toHaveProperty("phone", newCard.phone);
    expect(response.body).toHaveProperty("email", newCard.email);
    expect(response.body).toHaveProperty("web", newCard.web);
    expect(response.body).toHaveProperty("bizNumber");
    expect(response.body).toHaveProperty("user_id");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.likes).toEqual([]);
    expect(typeof response.body.bizNumber).toBe("number");
    expect(response.body.bizNumber).toBeGreaterThanOrEqual(1000000);
    expect(response.body.bizNumber).toBeLessThanOrEqual(9999999);
  });

  test("should create card with default values when optional fields are omitted", async () => {
    const newCard = {
      title: "Minimal Test Card",
      subtitle: "Testing Defaults",
      description: "Testing card creation with minimal data",
      phone: "050-1234567",
      email: "minimal@test.com",
      address: {
        country: "Israel",
        city: "Test City",
        street: "Test Street",
        houseNumber: 123,
        zip: 1234567
      }
    };

    const response = await request(app)
      .post("/api/cards/")
      .set(getAuthHeader(businessUserToken))
      .send(newCard)
      .expect(201);

    expect(response.body.web).toBe("");
    expect(response.body.address.state).toBe("Unspecified");
    expect(response.body.image.url).toMatch(/^https:/);
    expect(response.body.image.alt).toBeDefined();
  });

  test("should return 401 when user is not authenticated", async () => {
    const newCard = {
      title: "Test Card",
      subtitle: "Test Subtitle",
      description: "Test Description",
      phone: "050-1234567",
      email: "test@test.com",
      address: {
        country: "Israel",
        city: "Test City",
        street: "Test Street",
        houseNumber: 123,
        zip: 1234567
      }
    };

    await request(app)
      .post("/api/cards/")
      .send(newCard)
      .expect(401);
  });

  test("should return 403 when user is not a business user", async () => {
    const newCard = {
      title: "Test Card",
      subtitle: "Test Subtitle",
      description: "Test Description",
      phone: "050-1234567",
      email: "test@test.com",
      address: {
        country: "Israel",
        city: "Test City",
        street: "Test Street",
        houseNumber: 123,
        zip: 1234567
      }
    };

    await request(app)
      .post("/api/cards/")
      .set(getAuthHeader(regularUserToken))
      .send(newCard)
      .expect(403);
  });

  test("should return 400 when required fields are missing", async () => {
    const invalidCard = {
      title: "Test Card"
      // Missing required fields
    };

    await request(app)
      .post("/api/cards/")
      .set(getAuthHeader(businessUserToken))
      .send(invalidCard)
      .expect(400);
  });

  test("should return 400 when phone format is invalid", async () => {
    const invalidCard = {
      title: "Test Card",
      subtitle: "Test Subtitle",
      description: "Test Description",
      phone: "invalid-phone",
      email: "test@test.com",
      address: {
        country: "Israel",
        city: "Test City",
        street: "Test Street",
        houseNumber: 123,
        zip: 1234567
      }
    };

    await request(app)
      .post("/api/cards/")
      .set(getAuthHeader(businessUserToken))
      .send(invalidCard)
      .expect(400);
  });

  test("should return 400 when email format is invalid", async () => {
    const invalidCard = {
      title: "Test Card",
      subtitle: "Test Subtitle",
      description: "Test Description",
      phone: "050-1234567",
      email: "invalid-email",
      address: {
        country: "Israel",
        city: "Test City",
        street: "Test Street",
        houseNumber: 123,
        zip: 1234567
      }
    };

    await request(app)
      .post("/api/cards/")
      .set(getAuthHeader(businessUserToken))
      .send(invalidCard)
      .expect(400);
  });
});