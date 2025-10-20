const express = require("express");
const {
  getAllListings,
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
  adminAuth,
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

// 2 - get listings by user id
listingRouter.get("/my-listings", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const userListings = await getUserListings(userId);
    handleSuccess(res, 200, userListings, "User listings fetched successfully");
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

// 6 - toggle like on listing
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
