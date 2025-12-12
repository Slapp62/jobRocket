function calculateMatchScore(embedding1, embedding2) {
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
  return Math.max(0, Math.min(1, similarity));
}

module.exports = { calculateMatchScore };
