const Listing = require('../models/Listings.js');
const Applications = require('../models/Applications.js');
const User = require('../models/Users.js');
const { normalizeListingResponse } = require('../utils/normalizeResponses');
const { normalizeApplicationResponse } = require('../utils/normalizeResponses');
const { throwError } = require('../utils/functionHandlers');
const { sortListingsByMatchScore } = require('../utils/matchScoreSorting.js');
const { calculateMatchScore } = require('./matchingService.js');

const normalizeSearch = (query) => {
  if (query.city === 'all') {
    query.city = '';
  }
  if (query.region === 'all') {
    query.region = '';
  }
  if (query.workArrangement === 'all') {
    query.workArrangement = '';
  }
  return {
    searchText: query.searchText || '',
    region: query.region || '',
    city: query.city || '',
    workArrangement: query.workArrangement || '',
    sortOption: query.sortOption || '',
    page: query.page || '1',
    limit: query.limit || '20',
  };
};

const getFilteredListings = async (filterParams, userId, businessId = null) => {
  // Build filter object dynamically
  const query = {};

  // If businessId provided, only show that business's listings
  if (businessId) {
    query.businessId = businessId;
  }

  // Exact matches for dropdowns
  if (
    filterParams.region &&
    filterParams.region.trim() !== '' &&
    filterParams.region !== 'All Regions'
  ) {
    query['location.region'] = filterParams.region;
  }

  if (
    filterParams.city &&
    filterParams.city.trim() !== '' &&
    filterParams.city !== 'All Cities'
  ) {
    query['location.city'] = filterParams.city;
  }

  if (
    filterParams.workArrangement &&
    filterParams.workArrangement.trim() !== '' &&
    filterParams.workArrangement !== 'All Work Arrangements'
  ) {
    query.workArrangement = filterParams.workArrangement;
  }

  // Text search using MongoDB text index (searches jobTitle, companyName, jobDescription, workArrangement, location.city, location.region)
  if (filterParams.searchText && filterParams.searchText.trim() !== '') {
    query.$text = { $search: filterParams.searchText.trim() };
  }

  const page = parseInt(filterParams.page) || 1;
  const limit = parseInt(filterParams.limit) || 20;
  const skip = (page - 1) * limit;

  // Handle match-score sorting separately (requires calculating scores for all listings)
  if (
    filterParams.sortOption === 'match-score' ||
    filterParams.sortOption === 'match-score-desc'
  ) {
    // Validate user is logged in
    if (!userId) {
      throwError(401, 'Must be logged in to use match score sorting');
    }

    // Fetch user to get their embedding
    const user = await User.findById(userId);

    // Validate user exists and is a jobseeker
    if (!user) {
      throwError(404, 'User not found');
    }

    if (user.profileType !== 'jobseeker') {
      throwError(403, 'Match score sorting is only available for jobseekers');
    }

    // Check if jobseeker has an embedding
    if (
      !user.jobseekerProfile?.embedding ||
      user.jobseekerProfile.embedding.length === 0
    ) {
      throwError(
        400,
        'User profile incomplete - cannot calculate match scores. Please complete your profile.',
      );
    }

    // Fetch ALL listings matching the filters (before pagination)
    const allListings = await Listing.find(query).lean();

    if (allListings.length === 0) {
      throwError(404, 'No jobs match your search. Try adjusting your filters.');
    }

    // Use utility function to calculate match scores and sort
    const sortOrder =
      filterParams.sortOption === 'match-score' ? 'desc' : 'asc';
    const sortedListings = sortListingsByMatchScore(
      allListings,
      user.jobseekerProfile.embedding,
      sortOrder,
    );

    // Apply pagination AFTER sorting
    const paginatedListings = sortedListings.slice(skip, skip + limit);
    const total = sortedListings.length;

    // Return early for match-score sorting
    return {
      listings: paginatedListings.map(normalizeListingResponse),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalResults: total,
        perPage: limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  // Sort options for MongoDB (match-score is handled separately above)
  const sortOptions = {
    'title-asc': { jobTitle: 1 },
    'title-desc': { jobTitle: -1 },
    'date-created-old': { createdAt: 1 },
    'date-created-new': { createdAt: -1 },
  };

  // Default sort: if text search is active, sort by relevance (text score), otherwise by date
  let sortBy;
  if (filterParams.searchText && !filterParams.sortOption) {
    // Default to text search relevance when searching
    sortBy = { score: { $meta: 'textScore' } };
  } else {
    sortBy = sortOptions[filterParams.sortOption] || { createdAt: -1 };
  }

  // Projection: Include text score when text search is active (for potential client-side use)
  const projection = filterParams.searchText
    ? { score: { $meta: 'textScore' } }
    : {};

  // Check if requester is a logged-in jobseeker with an embedding
  // We'll use this to add match scores to ALL listing responses
  let userEmbedding = null;
  if (userId) {
    const user = await User.findById(userId);
    if (user?.profileType === 'jobseeker' && user.jobseekerProfile?.embedding) {
      userEmbedding = user.jobseekerProfile.embedding;
    }
  }

  // Execute search
  const [listings, total] = await Promise.all([
    Listing.find(query, projection).sort(sortBy).skip(skip).limit(limit).lean(), // Returns plain objects (faster)
    Listing.countDocuments(query), // Get total count for pagination info
  ]);

  if (listings.length === 0) {
    throwError(404, 'No jobs match your search. Try adjusting your filters.');
  }

  // Add match scores to listings if user is a jobseeker with embedding
  let listingsWithScores = listings;
  if (userEmbedding) {
    listingsWithScores = listings.map((listing) => {
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

  return {
    listings: listingsWithScores.map(normalizeListingResponse),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
      perPage: limit,
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
};

async function getFilteredApplications(businessId, filterParams) {
  // Get all listings for the business
  const listings = await Listing.find({ businessId });
  // Get all listingIds
  const listingIds = listings.map((listing) => listing._id);

  // Start query for applications with all applications for the listings
  const query = {
    listingId: { $in: listingIds },
    hiddenFromBusiness: false,
  };

  if (filterParams.status && filterParams.status !== 'all') {
    query.status = filterParams.status;
  }

  if (filterParams.searchText) {
    query.$or = [
      { firstName: { $regex: filterParams.searchText, $options: 'i' } },
      { lastName: { $regex: filterParams.searchText, $options: 'i' } },
      { email: { $regex: filterParams.searchText, $options: 'i' } },
    ];
  }

  // Date range filter
  if (filterParams.dateFrom || filterParams.dateTo) {
    query.createdAt = {};
    if (filterParams.dateFrom)
      query.createdAt.$gte = new Date(filterParams.dateFrom);
    if (filterParams.dateTo) {
      const endOfDay = new Date(filterParams.dateTo);
      endOfDay.setHours(23, 59, 59, 999);
      query.createdAt.$lte = endOfDay;
    }
  }

  // Specific listing filter
  if (filterParams.listingId && filterParams.listingId !== 'all') {
    query.listingId = filterParams.listingId;
  }

  const sortOptions = {
    'date-newest': { createdAt: -1 },
    'date-oldest': { createdAt: 1 },
    'name-asc': { firstName: 1, lastName: 1 },
    'name-desc': { firstName: -1, lastName: -1 },
    'match-desc': { matchScore: -1 },
    'match-asc': { matchScore: 1 },
  };

  const page = parseInt(filterParams.page) || 1;
  const limit = parseInt(filterParams.limit) || 20;
  const skip = (page - 1) * limit;

  const sortBy = sortOptions[filterParams.sortOption] || { createdAt: -1 };

  // Execute search
  const [applications, total] = await Promise.all([
    Applications.find(query)
      .populate('listingId')
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .lean(), // Returns plain objects (faster)
    Applications.countDocuments(query), // Get total count for pagination info
  ]);

  // Normalize application responses for dashboard - exclude unnecessary fields
  const normalizedApplications = applications.map((app) =>
    normalizeApplicationResponse(app, app.listingId, {
      includeMessage: false, // Message not displayed on dashboard
      includeApplicantId: false, // Internal field not displayed
      includeConsent: false, // Privacy metadata not needed on frontend
    }),
  );

  return {
    applications: normalizedApplications,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
      perPage: limit,
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  };
}

module.exports = {
  normalizeSearch,
  getFilteredListings,
  getFilteredApplications,
};
