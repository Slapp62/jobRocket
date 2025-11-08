const mongoose = require('mongoose');
const User = require('../models/Users');
const JobListing = require('../models/Listings');
require('dotenv').config();

async function backfillEmbeddings() {
  await mongoose.connect(process.env.MONGO_URI);

  console.log('Generating jobseeker embeddings...');
  const jobseekers = await User.find({
    profileType: 'jobseeker',
    'jobseekerProfile.embedding': { $exists: false }
  });

  for (const user of jobseekers) {
    await user.save(); // Triggers the pre-save hook
    console.log(`✓ ${user.email}`);
  }

  console.log('\nGenerating listing embeddings...');
  const listings = await JobListing.find({
    embedding: { $exists: false }
  });

  for (const listing of listings) {
    await listing.save(); // Triggers the pre-save hook
    console.log(`✓ ${listing.jobTitle}`);
  }

  console.log('\n✅ Done!');
  process.exit(0);
}

backfillEmbeddings().catch(console.error);