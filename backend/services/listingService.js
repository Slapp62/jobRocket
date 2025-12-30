const Listing = require('../models/Listings.js');
const User = require('../models/Users.js');
const { throwError } = require('../utils/functionHandlers.js');
const { normalizeListingResponse } = require('../utils/normalizeResponses');
const { calculateMatchScore } = require('./matchingService.js');

const getAllListings = async () => {
  const listings = await Listing.find({});
  if (listings.length === 0) {
    throwError(404, 'No job listings available at the moment.');
  }
  const normalizedListings = listings.map((listing) =>
    normalizeListingResponse(listing)
  );
  return normalizedListings;
};

const createListing = async (listingData) => {
  const newListing = new Listing(listingData);
  const savedListing = await newListing.save();
  const normalizedListing = normalizeListingResponse(savedListing);
  return normalizedListing;
};

const getListingById = async (id) => {
  const listing = await Listing.findById(id);
  if (!listing) {
    throwError(404, 'This job listing is no longer available.');
  }
  const normalizedListing = normalizeListingResponse(listing);
  return normalizedListing;
};

const getLikedListings = async (userId) => {
  const likedListings = await Listing.find({ likes: { $in: userId } }).lean();
  if (likedListings.length === 0) {
    throwError(404, "You haven't saved any job listings yet.");
  }

  // Get user embedding to calculate match scores for favorites
  let userEmbedding = null;
  const user = await User.findById(userId);
  if (user?.profileType === 'jobseeker' && user.jobseekerProfile?.embedding) {
    userEmbedding = user.jobseekerProfile.embedding;
  }

  // Add match scores to favorited listings if user is a jobseeker with embedding
  let listingsWithScores = likedListings;
  if (userEmbedding) {
    listingsWithScores = likedListings.map((listing) => {
      // Check if this listing has a valid embedding
      const hasValidEmbedding =
        listing.embedding &&
        Array.isArray(listing.embedding) &&
        listing.embedding.length > 0;

      // Calculate match score or set to null
      const matchScore = hasValidEmbedding
        ? calculateMatchScore(userEmbedding, listing.embedding)
        : null;

      return {
        ...listing,
        matchScore,
      };
    });
  }

  const normalizedLikedListings = listingsWithScores.map((listing) =>
    normalizeListingResponse(listing)
  );
  return normalizedLikedListings;
};

const editListingById = async (listingId, updateData) => {
  const updatedListing = await Listing.findByIdAndUpdate(
    listingId,
    updateData,
    {
      new: true,
    }
  );
  if (!updatedListing) {
    throwError(
      404,
      "This job listing couldn't be updated. It may have been removed."
    );
  }

  const normalizedUpdatedListing = normalizeListingResponse(updatedListing);
  return normalizedUpdatedListing;
};

const deleteListingById = async (listingId) => {
  const deletedListing = await Listing.findByIdAndDelete(listingId);
  if (!deletedListing) {
    throwError(
      404,
      "This job listing couldn't be deleted. It may have already been removed."
    );
  }
  const normalizedDeletedListing = normalizeListingResponse(deletedListing);
  return normalizedDeletedListing;
};

const toggleLike = async (listingId, userId) => {
  const listing = await Listing.findById(listingId);

  if (!listing) {
    throwError(400, 'This job listing is no longer available.');
  }

  if (listing.likes.includes(userId)) {
    const idIndex = listing.likes.indexOf(userId);
    listing.likes.splice(idIndex, 1);
  } else {
    listing.likes.push(userId);
  }
  const savedListing = await listing.save();
  const normalizedSavedListing = normalizeListingResponse(savedListing);
  return normalizedSavedListing;
};

module.exports = {
  getAllListings,
  createListing,
  getListingById,
  getLikedListings,
  editListingById,
  deleteListingById,
  toggleLike,
};
