const Listing = require("../validation/mongoSchemas/listingSchema");
const { throwError } = require("../utils/functionHandlers");
const { normalizeListingResponse } = require("../utils/normalizeResponses");

const getAllListings = async () => {
  const listings = await Listing.find({});
  if (listings.length === 0) {
    throwError(404, "No listings found");
  }
  const normalizedListings = listings.map((listing) =>
    normalizeListingResponse(listing),
  );
  return normalizedListings;
};

const getSearchedListings = async (searchObj) => {
  // Build filter object dynamically
  const query = {};

  // Text search (searches in jobTitle AND jobDescription)
  if (searchObj.searchWord && searchObj.searchWord.trim() !== '') {
    query.$or = [
      { jobTitle: { $regex: searchObj.searchWord, $options: 'i' } },
      { jobDescription: { $regex: searchObj.searchWord, $options: 'i' } }
    ];
  }

  // Exact matches for dropdowns
  if (searchObj.region && searchObj.region.trim() !== '') {
    query['location.region'] = searchObj.region;
  }

  if (searchObj.city && searchObj.city.trim() !== '') {
    query['location.city'] = searchObj.city;
  }

  if (searchObj.industry && searchObj.industry.trim() !== '') {
    query.industry = searchObj.industry;
  }

  if (searchObj.workArrangement && searchObj.workArrangement.trim() !== '') {
    query.workArrangement = searchObj.workArrangement;
  }

  // Execute search
  const listings = await Listing.find(query);
  
  if (listings.length === 0) {
    throwError(404, "No listings found");
  }
  
  const normalizedListings = listings.map((listing) =>
    normalizeListingResponse(listing),
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
    throwError(404, "Listing not found");
  }
  const normalizedListing = normalizeListingResponse(listing);
  return normalizedListing;
};

const getUserListings = async (userId) => {
  const userListings = await Listing.find({ businessId: userId });
  if (userListings.length === 0) {
    throwError(404, "User has no listings");
  }

  const normalizedUserListings = userListings.map((listing) =>
    normalizeListingResponse(listing),
  );
  return normalizedUserListings;
};

const getLikedListings = async (userId) => {
  const likedListings = await Listing.find({ likes: { $in: userId } });
  if (likedListings.length === 0) {
    throwError(404, "User has no liked listings");
  }
  const normalizedLikedListings = likedListings.map((listing) =>
    normalizeListingResponse(listing),
  );
  return normalizedLikedListings;
};

const editListingById = async (listingId, updateData) => {
  const updatedListing = await Listing.findByIdAndUpdate(
    listingId,
    updateData,
    {
      new: true,
    },
  );
  if (!updatedListing) {
    throwError(404, "Listing not found");
  }

  const normalizedUpdatedListing = normalizeListingResponse(updatedListing);
  return normalizedUpdatedListing;
};

const deleteListingById = async (listingId) => {
  const deletedListing = await Listing.findByIdAndDelete(listingId);
  if (!deletedListing) {
    throwError(404, "Listing not found");
  }
  const normalizedDeletedListing = normalizeListingResponse(deletedListing);
  return normalizedDeletedListing;
};

const toggleLike = async (listingId, userId) => {
  const listing = await Listing.findById(listingId);

  if (!listing) {
    throwError(400, "Listing not found.");
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
  getSearchedListings,
  createListing,
  getListingById,
  getUserListings,
  getLikedListings,
  editListingById,
  deleteListingById,
  toggleLike,
};
