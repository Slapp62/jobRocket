const listingService = require('../services/listingService.js');
const { handleSuccess, handleError } = require('../utils/functionHandlers.js');
const normalizeListing = require('../utils/normalizeListing.js');
const filterService = require('../services/filterService.js');

async function getAllListings(req, res) {
  try {
    const listings = await listingService.getAllListings();
    handleSuccess(res, 200, listings, 'Listings fetched successfully');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function getSearchedListings(req, res) {
  try {
    // remove search filters in case of "All" selection
    const normalizedSearchParams = filterService.normalizeSearch(req.query);
    const result = await filterService.getFilteredListings(
      normalizedSearchParams,
      req.user._id
    );
    res.json(result);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
}

async function getBusinessListings(req, res) {
  try {
    const businessId = req.user._id;
    const normalizedSearchParams = filterService.normalizeSearch(req.query);
    
    const result = await filterService.getFilteredListings(normalizedSearchParams, businessId);
    handleSuccess(res, 200, result, 'Business listings fetched successfully');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function getLikedListings(req, res) {
  try {
    const userId = req.user._id;
    const likedListings = await listingService.getLikedListings(userId);
    handleSuccess(
      res,
      200,
      likedListings,
      'Liked listings fetched successfully'
    );
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function getFavoriteListings(req, res) {
  try {
    const userId = req.params.userId;
    const favoriteListings = await listingService.getLikedListings(userId);

    // Return with pagination format to match /search endpoint
    const result = {
      listings: favoriteListings,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalResults: favoriteListings.length,
        perPage: favoriteListings.length,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };

    handleSuccess(res, 200, result, 'Favorite listings fetched successfully');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function getUserListingsPublic(req, res) {
  try {
    const userId = req.params.userId;
    const queryParams = {
      sortOption: req.query.sortOption || '',
      page: req.query.page || '1',
      limit: req.query.limit || '20',
    };
    const result = await listingService.getUserListings(userId, queryParams);
    handleSuccess(res, 200, result, 'User listings fetched successfully');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function getListingById(req, res) {
  try {
    const listingId = req.params.id;
    const listing = await listingService.getListingById(listingId);
    handleSuccess(res, 200, listing, 'Listing fetched successfully');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function createListing(req, res) {
  try {
    const listingData = req.body;
    const normalizedListing = await normalizeListing(listingData, req.user._id);
    const newListing = await listingService.createListing(normalizedListing);
    handleSuccess(res, 201, newListing, 'Listing created successfully');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function updateListing(req, res) {
  try {
    const listingId = req.params.id;
    const listingData = req.body;
    const updatedListing = await listingService.editListingById(
      listingId,
      listingData
    );
    handleSuccess(res, 200, updatedListing, 'Listing updated successfully');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function toggleListingLike(req, res) {
  try {
    const listingId = req.params.id;
    const userId = req.user._id;
    const updatedListing = await listingService.toggleLike(listingId, userId);
    handleSuccess(res, 200, updatedListing, 'Listing liked successfully');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function toggleListingLikeNew(req, res) {
  try {
    const listingId = req.params.id;
    const userId = req.user._id;
    const updatedListing = await listingService.toggleLike(listingId, userId);

    // Return a simple response indicating liked status
    const isLiked = updatedListing.likes.some(
      (likeId) => likeId.toString() === userId.toString()
    );

    handleSuccess(
      res,
      200,
      {
        liked: isLiked,
        likeCount: updatedListing.likes.length,
      },
      'Like toggled successfully'
    );
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function deleteListing(req, res) {
  try {
    const listingId = req.params.id;
    const deletedListing = await listingService.deleteListingById(listingId);
    handleSuccess(res, 200, deletedListing, 'Listing deleted successfully');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

module.exports = {
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
};
