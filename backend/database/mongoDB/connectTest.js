const mongoose = require("mongoose");

const connectTestDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_TEST_URI);
  } catch (error) {
    console.error("MongoDB-Test connection error", error);
    process.exit(1);
  }
};

module.exports = { connectTestDB };
