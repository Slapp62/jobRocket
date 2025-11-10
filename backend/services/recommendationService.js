const User = require("../models/Users");
const JobListing = require("../models/Listings");
const { calculateMatchScore } = require("./matchingService");
const { throwError } = require("../utils/functionHandlers");

async function getMatchScoreForListing(userId, listingId) {
  const user = await User.findById(userId);
  if (!user) {
    throwError(404, "User not found");
  }

  const listing = await JobListing.findById(listingId);
  if (!listing) {
    throwError(404, "Listing not found");
  }

  // If embeddings don't exist yet, can't calculate
  if (!user.jobseekerProfile?.embedding || !listing.embedding) {
    return null;
  }

  const score = calculateMatchScore(
    user.jobseekerProfile.embedding,
    listing.embedding
  );

  return score;
}

module.exports = { getMatchScoreForListing };
