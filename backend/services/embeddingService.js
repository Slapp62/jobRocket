const OpenAI = require('openai');
const openai =
  process.env.NODE_ENV === 'test' && !process.env.OPENAI_API_KEY
    ? null
    : new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Main function: text → coordinates
async function generateEmbedding(text) {
  if (!openai) {
    // Return a mock embedding for test environment
    return Array(1536).fill(0);
  }
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}

// Helper: jobseeker profile → text description
function jobseekerToText(jobseekerProfile) {
  const parts = [
    `Skills: ${jobseekerProfile.skills?.join(', ') || 'None'}`,
    `Education: ${jobseekerProfile.highestEducation || 'Not specified'}`,
    `Preferred work: ${jobseekerProfile.preferredWorkArrangement || 'Any'}`,
    jobseekerProfile.description || '',
  ];

  return parts
    .filter((p) => p)
    .join('\n')
    .trim();
}

// Helper: job listing → text description
function listingToText(listing) {
  const requirements = Array.isArray(listing.requirements)
    ? listing.requirements.join(', ')
    : listing.requirements || 'None specified';

  const parts = [
    listing.jobTitle,
    listing.jobDescription,
    `Requirements: ${requirements}`,
  ];

  return parts
    .filter((p) => p)
    .join('\n')
    .trim();
}

module.exports = {
  generateEmbedding,
  jobseekerToText,
  listingToText,
};
