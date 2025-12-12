const { calculateMatchScore } = require('../services/matchingService');

/**
 * Sorts an array of job listings by their match score relative to a user's embedding.
 *
 * HOW IT WORKS:
 * 1. Takes an array of listings and a user's embedding vector
 * 2. For each listing, calculates how well it matches the user's profile (0-1 scale)
 * 3. Adds the match score as a property to each listing object
 * 4. Sorts the listings by match score (highest or lowest first)
 * 5. Returns the sorted array
 *
 * WHAT'S A MATCH SCORE?
 * - A number between 0 and 1 representing how relevant a job is to a user
 * - Calculated using cosine similarity between user and listing embeddings
 * - Higher score = better match
 *
 * @param {Array} listings - Array of listing documents from MongoDB
 * @param {Array} userEmbedding - User's 1536-dimensional embedding vector
 * @param {String} sortOrder - 'desc' for highest first, 'asc' for lowest first
 * @returns {Array} Listings with matchScore property, sorted by match score
 */
function sortListingsByMatchScore(listings, userEmbedding, sortOrder = 'desc') {
  // Validate inputs
  if (!Array.isArray(listings)) {
    throw new Error('listings must be an array');
  }

  if (!Array.isArray(userEmbedding) || userEmbedding.length === 0) {
    throw new Error('userEmbedding must be a non-empty array');
  }

  if (sortOrder !== 'desc' && sortOrder !== 'asc') {
    throw new Error('sortOrder must be "desc" or "asc"');
  }

  // Calculate match score for EACH listing
  const listingsWithScores = listings.map(listing => {
    // Check if this listing has a valid embedding
    // (Some old listings might not have embeddings yet)
    const hasValidEmbedding =
      listing.embedding &&
      Array.isArray(listing.embedding) &&
      listing.embedding.length > 0;

    let matchScore;

    if (hasValidEmbedding) {
      // Calculate the actual match score using cosine similarity
      matchScore = calculateMatchScore(userEmbedding, listing.embedding);
    } else {
      // If no embedding, default to 0 (worst match)
      // This ensures listings without embeddings appear at the bottom
      matchScore = 0;
    }

    // Return a new object with all listing properties PLUS the match score
    return {
      ...listing,
      matchScore,
    };
  });

  // Sort the listings by match score
  listingsWithScores.sort((a, b) => {
    if (sortOrder === 'desc') {
      // Descending: highest match score first
      return b.matchScore - a.matchScore;
    } else {
      // Ascending: lowest match score first
      return a.matchScore - b.matchScore;
    }
  });

  return listingsWithScores;
}

module.exports = {
  sortListingsByMatchScore,
};
