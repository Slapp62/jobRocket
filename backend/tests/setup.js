const { connectToDB } = require("../database/dbService");
const { seedTestData } = require("../seeding/seedingDataService");
const mongoose = require("mongoose");
const dummyUsers = require("../seeding/seedingData/userSeedingData");
const dummyCards = require("../seeding/seedingData/cardSeedingData");
const chalk = require("chalk");
const config = require("config");
const PORT = config.get("PORT") || 3000;

beforeAll(async () => {
  try {
    await connectToDB();
    console.log(chalk.green.bold(`Test database connected on port ${PORT}`));
  } catch (error) {
    console.error("Failed to connect to test database:", error);
    process.exit(1);
  }
});

beforeEach(async () => {
  try {
    await seedTestData(dummyUsers, dummyCards);
    console.log(chalk.green.bold("Test data seeded"));
  } catch (error) {
    console.error("Failed to seed test data:", error);
    throw error;
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.close();
    console.log(chalk.green.bold("Test database connection closed"));
  } catch (error) {
    console.error("Error closing test database connection:", error);
  }
});
