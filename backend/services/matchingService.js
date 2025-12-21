const { logAI, createTimer } = require('../utils/logHelpers');

function calculateMatchScore(
  embedding1,
  embedding2,
  jobseekerId = null,
  listingId = null,
) {
  const endTimer = createTimer('calculate-match-score');

  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  for (let i = 0; i < embedding1.length; i++) {
    dotProduct += embedding1[i] * embedding2[i];
    magnitude1 += embedding1[i] ** 2;
    magnitude2 += embedding2[i] ** 2;
  }

  const similarity =
    dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));

  // Cosine similarity with OpenAI embeddings naturally ranges from 0 to 1
  // Clamp to ensure we stay within valid bounds (handles any floating-point edge cases)
  const score = Math.max(0, Math.min(1, similarity));

  // Log AI operation
  if (jobseekerId && listingId) {
    logAI('calculate-match', {
      jobseekerId,
      listingId,
      matchScore: score,
      algorithm: 'cosine-similarity',
      vectorDimensions: embedding1.length,
    });
  }

  endTimer({
    jobseekerId,
    listingId,
    matchScore: score,
  });

  return score;
}

module.exports = { calculateMatchScore };
