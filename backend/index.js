const dotenv = require('dotenv');
dotenv.config();

// Set config directory path before loading config module
// This ensures the config library finds the files in backend/config/
const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');

// Emergency logging to catch startup issues
console.log('🚀 index.js: Starting module load...');
console.log('Environment:', process.env.NODE_ENV || 'undefined');
console.log('PORT:', process.env.PORT || 'undefined');
console.log('Config directory:', process.env.NODE_CONFIG_DIR);

const chalk = require('chalk');
console.log('✓ chalk loaded');

const { connectToDB } = require('./database/dbService');
console.log('✓ dbService loaded');

const config = require('config');
console.log('✓ config loaded');

const { seedDevData } = require('./seeding/seedingDataService');
const dummyUsers = require('./seeding/seedingData/userSeedingData');
const dummyListings = require('./seeding/seedingData/listingSeedingData');
const dummyApplications = require('./seeding/seedingData/applicationSeedingData');
console.log('✓ seeding modules loaded');

// Function-based startup for explicit control
const startServer = async () => {
  try {
    // 1. Connect to database FIRST (before loading app.js)
    console.log(chalk.blue('Connecting to database...'));
    console.log(
      chalk.blue(`Environment: ${process.env.NODE_ENV || 'undefined'}`),
    );
    await connectToDB();
    console.log(chalk.green('Database connected!'));

    // 2. NOW load app.js (after DB connection exists for session store)
    console.log(chalk.blue('Loading Express app...'));
    const app = require('./app');
    console.log(chalk.green('✓ app loaded'));

    // 3. Seed dev data ONLY in development
    if (process.env.NODE_ENV === 'development') {
      console.log(chalk.yellow('Seeding development data...'));
      await seedDevData(dummyUsers, dummyListings, dummyApplications);
      console.log(chalk.green('Seeding complete!'));
    } else {
      console.log(chalk.blue('Skipping seeding (production mode)'));
    }

    // 4. THEN start server
    const PORT = process.env.PORT || config.get('PORT') || 3000;
    console.log(chalk.blue(`Attempting to bind to port ${PORT}...`));

    // calling app.listen loads app.js module
    // Bind to 0.0.0.0 to listen on all network interfaces (required by some hosting platforms)
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(chalk.green.bold(`✓ Server running on port ${PORT}`));
      console.log(
        chalk.green.bold(
          `✓ Environment: ${process.env.NODE_ENV || 'development'}`,
        ),
      );
    });

    return server;
  } catch (error) {
    console.error(chalk.red('❌ Failed to start server:'), error);
    console.error(chalk.red('Stack trace:'), error.stack);
    process.exit(1);
  }
};

// Auto-start if this file is the entry point
if (require.main === module) {
  startServer();
}

// Export both the app and the startup function
//module.exports = { app, startServer };
