const app = require("./app");
const chalk = require("chalk");
const { connectToDB } = require("./database/dbService");
const config = require("config");
const { seedDevData } = require("./seeding/seedingDataService");
const dummyUsers = require("./seeding/seedingData/userSeedingData");
const dummyCards = require("./seeding/seedingData/cardSeedingData");

// Function-based startup for explicit control
const startServer = async () => {
  try {
    const PORT = process.env.PORT || config.get("PORT") || 3000;
    const server = app.listen(PORT, async () => {
      console.log(chalk.green.bold(`server running on port ${PORT}`));
      await connectToDB();
      await seedDevData(dummyUsers, dummyCards);
    });
    return server; // Return server instance for potential cleanup
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Auto-start if this file is the entry point
if (require.main === module) {
  startServer();
}

// Export both the app and the startup function
module.exports = { app, startServer };
