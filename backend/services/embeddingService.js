const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Main function: text → coordinates
async function generateEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
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
    jobseekerProfile.description || ''
  ];
  
  return parts.filter(p => p).join('\n').trim();
}

// Helper: job listing → text description
function listingToText(listing) {
  const parts = [
    listing.title,
    listing.jobDescription,
    `Requirements: ${listing.requirements || 'None specified'}`,
    `Industry: ${listing.industry || ''}`
  ];
  
  return parts.filter(p => p).join('\n').trim();
}

module.exports = { 
  generateEmbedding, 
  jobseekerToText, 
  listingToText 
};