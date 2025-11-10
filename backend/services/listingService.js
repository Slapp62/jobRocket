const Listing = require("../models/Listings.js");
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
  if (searchObj.region && searchObj.region.trim() !== '' && searchObj.region !== 'All Regions') {
    query['location.region'] = searchObj.region;
  }

  if (searchObj.city && searchObj.city.trim() !== '' && searchObj.city !== 'All Cities') {
    query['location.city'] = searchObj.city;
  }

  if (searchObj.industry && searchObj.industry.trim() !== '' && searchObj.industry !== 'All Industries') {
    query.industry = searchObj.industry;
  }

  if (searchObj.workArrangement && searchObj.workArrangement.trim() !== '' && searchObj.workArrangement !== 'All Work Arrangements') {
    query.workArrangement = searchObj.workArrangement;
  }

  const page = parseInt(searchObj.page) || 1;
  const limit = parseInt(searchObj.limit) || 20;
  const skip = (page - 1) * limit;

  const sortOptions = {
    'title-asc': { jobTitle: 1 },
    'title-desc': { jobTitle: -1 },
    'date-created-old': { createdAt: 1 },
    'date-created-new': { createdAt: -1 },
    'match-score': { matchScore: -1 },
    'match-score-desc': { matchScore: 1 },
  };
  const sortBy = sortOptions[searchObj.sortOption] || { createdAt: -1 };

  // Execute search
  const [listings, total] = await Promise.all([
    Listing.find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .lean(), // Returns plain objects (faster)
    Listing.countDocuments(query) // Get total count for pagination info
  ]);
  
  if (listings.length === 0) {
    throwError(404, "No listings found");
  }
  
  return {
    listings: listings.map(normalizeListingResponse),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
      perPage: limit,
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1
    }
  };
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

const getUserListings = async (userId, queryParams = {}) => {
  const page = parseInt(queryParams.page) || 1;
  const limit = parseInt(queryParams.limit) || 20;
  const skip = (page - 1) * limit;

  const sortOptions = {
    'title-asc': { jobTitle: 1 },
    'title-desc': { jobTitle: -1 },
    'date-created-old': { createdAt: 1 },
    'date-created-new': { createdAt: -1 },
    'match-score': { matchScore: -1 },
    'match-score-desc': { matchScore: 1 },
  };
  const sortBy = sortOptions[queryParams.sortOption] || { createdAt: -1 };

  // Execute query with pagination
  const [userListings, total] = await Promise.all([
    Listing.find({ businessId: userId })
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .lean(),
    Listing.countDocuments({ businessId: userId })
  ]);

  if (userListings.length === 0) {
    throwError(404, "User has no listings");
  }

  const normalizedUserListings = userListings.map((listing) =>
    normalizeListingResponse(listing),
  );

  return {
    listings: normalizedUserListings,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
      perPage: limit,
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1
    }
  };
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
