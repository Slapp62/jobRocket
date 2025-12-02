const express = require('express');
const {
  getAllListings,
  getSearchedListings,
  getListingById,
  getBusinessListings,
  getLikedListings,
  getFavoriteListings,
  getUserListingsPublic,
  createListing,
  updateListing,
  toggleListingLike,
  toggleListingLikeNew,
  deleteListing,
} = require('../controllers/listingController.js');
const {
  authenticateUser,
  businessAuth,
  listingCreatorAuth,
  listingCreatorAdminAuth,
} = require('../middleware/authMiddleware.js');
const listingValidation = require('../middleware/listingValidation.js');
const { listingsLimiter } = require('../middleware/rateLimiter.js');

const router = express.Router();

// Get all listings
router.get('/', getAllListings);

// Search listings
router.get('/search', getSearchedListings);

// Get user's own listings (authenticated)
router.get('/business-listings', authenticateUser, getBusinessListings);

// Get liked listings (authenticated)
router.get('/liked', authenticateUser, getLikedListings);

// Get favorite listings by user ID (public)
router.get('/favorites/:userId', getFavoriteListings);

// Get user listings by user ID (public)
router.get('/user-listings/:userId', getUserListingsPublic);

// Get listing by ID
router.get('/:id', getListingById);

// Create a new listing
router.post(
  '/',
  authenticateUser,
  businessAuth,
  listingsLimiter,
  listingValidation,
  createListing
);

// Update listing by ID
router.put(
  '/:id',
  authenticateUser,
  listingCreatorAuth,
  listingValidation,
  updateListing
);

// Toggle like on listing (legacy PATCH endpoint)
router.patch('/:id', authenticateUser, toggleListingLike);

// Toggle like on listing (new POST endpoint)
router.post('/:id/like', authenticateUser, toggleListingLikeNew);

// Delete listing by ID
router.delete('/:id', authenticateUser, listingCreatorAdminAuth, deleteListing);

module.exports = router;
