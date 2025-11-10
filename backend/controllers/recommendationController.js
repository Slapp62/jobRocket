const recommendationService = require("../services/recommendationService");
const { handleError } = require("../utils/functionHandlers");

async function getMatchScore(req, res) {
  try {
    const userId = req.user._id;
    const { listingId } = req.params;

    const score = await recommendationService.getMatchScoreForListing(userId, listingId);
    res.json({ matchScore: score });
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
}

module.exports = { getMatchScore };