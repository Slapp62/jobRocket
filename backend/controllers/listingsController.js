const express = require("express");
const {
  getAllListings,
  getSearchedListings,
  getListingById,
  getUserListings,
  getLikedListings,
  deleteListingById,
  toggleLike,
  editListingById,
} = require("../services/listingsServices.js");
const { createListing } = require("../services/listingsServices.js");
const {
  handleSuccess,
  handleError,
} = require("../utils/functionHandlers.js");
const {
  authenticateUser,
  businessAuth,
  listingCreatorAuth,
  listingCreatorAdminAuth,
} = require("../middleware/authService.js");
const listingValidation = require("../middleware/listingValidation.js");
const normalizeListing = require("../utils/normalizeListing.js");

const listingRouter = express.Router();

// 1 - get all listings
listingRouter.get("/", async (_req, res) => {
  try {
    const listings = await getAllListings();
    handleSuccess(res, 200, listings, "Listings fetched successfully");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

listingRouter.get('/search', async (req, res) => {
  try {
    const searchObj = {
      searchWord: req.query.searchWord || '',
      region: req.query.region || '',
      city: req.query.city || '',
      industry: req.query.industry || '',
      workArrangement: req.query.workArrangement || '',
      sortOption: req.query.sortOption || '',
      page: req.query.page || '1',
      limit: req.query.limit || '20'
    };

    const result = await getSearchedListings(searchObj);
    
    // Return both listings and pagination
    res.json(result);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

// 2 - get listings by user id (authenticated)
listingRouter.get("/my-listings", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const queryParams = {
      sortOption: req.query.sortOption || '',
      page: req.query.page || '1',
      limit: req.query.limit || '20'
    };
    const result = await getUserListings(userId, queryParams);
    handleSuccess(res, 200, result, "User listings fetched successfully");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// Get liked listings by user id
listingRouter.get("/liked", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const likedListings = await getLikedListings(userId);
    handleSuccess(
      res,
      200,
      likedListings,
      "Liked listings fetched successfully",
    );
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// Get favorited listings by user id (public endpoint for favorites page)
listingRouter.get("/favorites/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const favoriteListings = await getLikedListings(userId);

    // Return with pagination format to match /search endpoint
    const result = {
      listings: favoriteListings,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalResults: favoriteListings.length,
        perPage: favoriteListings.length,
        hasNextPage: false,
        hasPrevPage: false
      }
    };

    handleSuccess(
      res,
      200,
      result,
      "Favorite listings fetched successfully",
    );
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// Get user's listings by user id (public endpoint for my-listings page)
listingRouter.get("/user-listings/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const queryParams = {
      sortOption: req.query.sortOption || '',
      page: req.query.page || '1',
      limit: req.query.limit || '20'
    };
    const result = await getUserListings(userId, queryParams);

    handleSuccess(
      res,
      200,
      result,
      "User listings fetched successfully",
    );
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// 3 - get listing by id
listingRouter.get("/:id", async (req, res) => {
  try {
    const listingId = req.params.id;
    const listing = await getListingById(listingId);
    handleSuccess(res, 200, listing, "Listing fetched successfully");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// 4 - create a new listing
listingRouter.post(
  "/",
  authenticateUser,
  businessAuth,
  listingValidation,
  async (req, res) => {
    try {
      const listingData = req.body;
      const normalizedListing = await normalizeListing(
        listingData,
        req.user._id,
      );
      const newListing = await createListing(normalizedListing);
      handleSuccess(res, 201, newListing, "Listing created successfully");
    } catch (error) {
      handleError(res, error.status, error.message);
    }
  },
);

// 5 - edit listing by id
listingRouter.put(
  "/:id",
  authenticateUser,
  listingCreatorAuth,
  listingValidation,
  async (req, res) => {
    try {
      const listingId = req.params.id;
      const listingData = req.body;
      const updatedListing = await editListingById(listingId, listingData);
      handleSuccess(res, 200, updatedListing, "Listing updated successfully");
    } catch (error) {
      handleError(res, error.status, error.message);
    }
  },
);

// 6 - toggle like on listing (PATCH - legacy)
listingRouter.patch("/:id", authenticateUser, async (req, res) => {
  try {
    const listingId = req.params.id;
    const userId = req.user._id;
    const updatedListing = await toggleLike(listingId, userId);
    handleSuccess(res, 200, updatedListing, "Listing liked successfully");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// Toggle like on listing (POST - new endpoint)
listingRouter.post("/:id/like", authenticateUser, async (req, res) => {
  try {
    const listingId = req.params.id;
    const userId = req.user._id;
    const updatedListing = await toggleLike(listingId, userId);

    // Return a simple response indicating liked status
    const isLiked = updatedListing.likes.some(
      (likeId) => likeId.toString() === userId.toString()
    );

    handleSuccess(res, 200, {
      liked: isLiked,
      likeCount: updatedListing.likes.length,
    }, "Like toggled successfully");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// 7 - delete listing by id
listingRouter.delete(
  "/:id",
  authenticateUser,
  listingCreatorAdminAuth,
  async (req, res) => {
    try {
      const listingId = req.params.id;
      const deletedListing = await deleteListingById(listingId);
      handleSuccess(res, 200, deletedListing, "Listing deleted successfully");
    } catch (error) {
      handleError(res, error.status, error.message);
    }
  },
);

module.exports = listingRouter;
