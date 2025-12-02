const express = require('express');
const { getMatchScore } = require('../controllers/recommendationController.js');
const { authenticateUser } = require('../middleware/authMiddleware.js');

const router = express.Router();

// Get match score for a listing
router.get('/match-score/:listingId', authenticateUser, getMatchScore);

module.exports = router;
