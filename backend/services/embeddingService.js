const OpenAI = require('openai');
const {
  logAI,
  logExternalAPI,
  logError,
  createTimer,
} = require('../utils/logHelpers');

const openai =
  process.env.NODE_ENV === 'test' && !process.env.OPENAI_API_KEY
    ? null
    : new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Main function: text → coordinates
async function generateEmbedding(
  text,
  entityType = 'unknown',
  entityId = null,
) {
  const endTimer = createTimer('generate-embedding');

  try {
    if (!openai) {
      // Return a mock embedding for test environment
      logAI('generate-embedding-mock', {
        entityType,
        entityId,
        textLength: text.length,
        environment: 'test',
      });
      endTimer({ success: true, entityType, mock: true });
      return Array(1536).fill(0);
    }

    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    const embedding = response.data[0].embedding;

    // Log successful OpenAI API call
    logExternalAPI('OpenAI', 'embeddings.create', {
      model: 'text-embedding-3-small',
      inputLength: text.length,
      tokensUsed: response.usage?.total_tokens,
      success: true,
      entityType,
      entityId,
    });

    // Log AI operation
    logAI('generate-embedding', {
      entityType,
      entityId,
      vectorDimensions: embedding.length,
      textLength: text.length,
    });

    endTimer({ success: true, entityType });
    return embedding;
  } catch (error) {
    logError(error, {
      operation: 'generate-embedding',
      entityType,
      entityId,
      textLength: text.length,
      model: 'text-embedding-3-small',
    });
    endTimer({ success: false, entityType });
    throw error;
  }
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
    listing.companyName,
    listing.jobTitle,
    listing.jobDescription,
    listing.workArrangement,
    listing.location.region,
    listing.location.city,
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
