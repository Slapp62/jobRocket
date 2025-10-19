const mongoose = require("mongoose");
const chalk = require("chalk");

const connectLocalDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_LOCAL_URI || "");
    console.log(chalk.green.bold("MongoDB connected locally."));
  } catch (error) {
    console.error("MongoDB-Local connection error", error);
    process.exit(1);
  }
};

module.exports = { connectLocalDB };
