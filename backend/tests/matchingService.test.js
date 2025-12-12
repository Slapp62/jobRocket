const { calculateMatchScore } = require('../services/matchingService');

// Unit tests for matching service - no database required
describe('Match Score Calculation', () => {
  test('identical embeddings should return 1.0 (100% match)', () => {
    const embedding = Array(1536).fill(0.5);
    const score = calculateMatchScore(embedding, embedding);
    expect(score).toBeCloseTo(1.0, 2);
  });

  test('completely different embeddings should return low scores', () => {
    // Create two orthogonal vectors (no similarity)
    const embedding1 = Array(1536).fill(0).map((_, i) => (i === 0 ? 1 : 0));
    const embedding2 = Array(1536).fill(0).map((_, i) => (i === 1 ? 1 : 0));
    const score = calculateMatchScore(embedding1, embedding2);
    expect(score).toBeCloseTo(0, 2);
  });

  test('somewhat similar embeddings should return moderate scores', () => {
    // Create two vectors with some overlap
    const embedding1 = Array(1536).fill(0).map((_, i) => (i < 500 ? 0.8 : 0.2));
    const embedding2 = Array(1536).fill(0).map((_, i) => (i < 300 ? 0.7 : 0.3));
    const score = calculateMatchScore(embedding1, embedding2);
    // Should be between 0 and 1, but not at extremes
    expect(score).toBeGreaterThan(0.3);
    expect(score).toBeLessThan(0.9);
  });

  test('score should never be negative', () => {
    const embedding1 = Array(1536).fill(0.3);
    const embedding2 = Array(1536).fill(-0.3);
    const score = calculateMatchScore(embedding1, embedding2);
    expect(score).toBeGreaterThanOrEqual(0);
  });

  test('score should never exceed 1.0', () => {
    const embedding1 = Array(1536).fill(0.9);
    const embedding2 = Array(1536).fill(0.8);
    const score = calculateMatchScore(embedding1, embedding2);
    expect(score).toBeLessThanOrEqual(1.0);
  });

  test('realistic OpenAI-style embeddings should produce reasonable scores', () => {
    // Simulate realistic embeddings (small positive/negative values, normalized)
    const embedding1 = Array(1536).fill(0).map(() => (Math.random() - 0.5) * 0.1);
    const embedding2 = Array(1536).fill(0).map(() => (Math.random() - 0.5) * 0.1);

    const score = calculateMatchScore(embedding1, embedding2);

    // With random unrelated embeddings, score should be low (not around 60% like the bug caused)
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(1.0);
    // Most random embeddings should have low similarity
    expect(score).toBeLessThan(0.5);
  });
});
