const { calculateMatchScore } = require('../services/matchingService');
const User = require('../models/Users');
const JobListing = require('../models/Listings');

async function getMatchScore(req, res) {
  try {
    const userId = req.user._id;
    const { listingId } = req.params;

    const user = await User.findById(userId);
    const listing = await JobListing.findById(listingId);

    // If embeddings don't exist yet, can't calculate
    if (!user.jobseekerProfile?.embedding || !listing.embedding) {
      return res.json({ matchScore: null });
    }

    const score = calculateMatchScore(
      user.jobseekerProfile.embedding,
      listing.embedding
    );

    res.json({ matchScore: score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getMatchScore };