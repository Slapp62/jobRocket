const app = require('./app');
const chalk = require('chalk');
const { connectToDB } = require('./database/dbService');
const config = require('config');
const { seedDevData } = require('./seeding/seedingDataService');
const dummyUsers = require('./seeding/seedingData/userSeedingData');
const dummyListings = require('./seeding/seedingData/listingSeedingData');
const dummyApplications = require('./seeding/seedingData/applicationSeedingData');

// Function-based startup for explicit control
const startServer = async () => {
  try {
    // 1. Connect to database FIRST 
    console.log(chalk.blue('Connecting to database...'));
    await connectToDB();
    console.log(chalk.green('Database connected!'));
    
    // 2. Seed dev data if needed 
    if (process.env.NODE_ENV === 'development') {
      await seedDevData(dummyUsers, dummyListings, dummyApplications);
    }
    
    // 3. THEN start server 
    const PORT = process.env.PORT || config.get('PORT') || 3000;
    
    // calling app.listen loads app.js module
    const server = app.listen(PORT, () => {
      console.log(chalk.green.bold(`Server running on port ${PORT}`));
    });
    
    return server;
  } catch (error) {
    console.error(chalk.red('Failed to start server:'), error);
    process.exit(1);
  }
};

// Auto-start if this file is the entry point
if (require.main === module) {
  startServer();
}

// Export both the app and the startup function
module.exports = { app, startServer };
