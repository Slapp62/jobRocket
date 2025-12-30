const User = require('../models/Users');
const JobListing = require('../models/Listings');
const { calculateMatchScore } = require('./matchingService');
const { throwError } = require('../utils/functionHandlers');
const { logAI, logError } = require('../utils/logHelpers');

async function getMatchScoreForListing(userId, listingId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throwError(
        404,
        "Your account information couldn't be found. Please try logging in again."
      );
    }

    const listing = await JobListing.findById(listingId);
    if (!listing) {
      throwError(404, 'This job listing is no longer available.');
    }

    // If embeddings don't exist yet, can't calculate
    if (!user.jobseekerProfile?.embedding || !listing.embedding) {
      logError(new Error('Missing embeddings for match calculation'), {
        operation: 'get-match-score',
        userId,
        listingId,
        hasUserEmbedding: !!user.jobseekerProfile?.embedding,
        hasListingEmbedding: !!listing.embedding,
      });
      return null;
    }

    const score = calculateMatchScore(
      user.jobseekerProfile.embedding,
      listing.embedding,
      userId,
      listingId
    );

    // Log recommendation calculation
    logAI('calculate-recommendation', {
      userId,
      listingId,
      matchScore: score,
      jobTitle: listing.jobTitle,
    });

    return score;
  } catch (error) {
    logError(error, {
      operation: 'get-match-score',
      userId,
      listingId,
    });
    throw error;
  }
}

module.exports = { getMatchScoreForListing };
