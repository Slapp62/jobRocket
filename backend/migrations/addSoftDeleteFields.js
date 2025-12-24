/**
 * Migration script to add soft delete fields to existing users
 * Run this once after deploying the soft delete feature
 *
 * Usage: node backend/migrations/addSoftDeleteFields.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

async function migrateUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');

    // Update all users that don't have isDeleted field
    const result = await usersCollection.updateMany(
      { isDeleted: { $exists: false } },
      {
        $set: {
          isDeleted: false,
          deletedAt: null,
        },
      }
    );

    console.log(`✅ Migration complete!`);
    console.log(`   - Users updated: ${result.modifiedCount}`);
    console.log(`   - Users matched: ${result.matchedCount}`);

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateUsers();
