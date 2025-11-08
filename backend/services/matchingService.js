function calculateMatchScore(embedding1, embedding2) {
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  for (let i = 0; i < embedding1.length; i++) {
    dotProduct += embedding1[i] * embedding2[i];
    magnitude1 += embedding1[i] ** 2;
    magnitude2 += embedding2[i] ** 2;
  }

  const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
  
  // Convert from -1 to 1 range into 0 to 1 range
  return (similarity + 1) / 2;
}

module.exports = { calculateMatchScore };