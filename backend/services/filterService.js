const Listing = require('../models/Listings.js');
const Applications = require('../models/Applications.js');
const User = require('../models/Users.js');
const { normalizeListingResponse } = require('../utils/normalizeResponses');
const { normalizeApplicationResponse } = require('../utils/normalizeResponses');
const { throwError } = require('../utils/functionHandlers');
const { sortListingsByMatchScore } = require('../utils/matchScoreSorting.js');
const { calculateMatchScore } = require('./matchingService.js');
const { generateEmbedding } = require('./embeddingService.js');

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
    searchWord: query.searchWord || '',
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

   // Semantic search with AI embeddings (when search query provided)
  if (filterParams.searchWord && filterParams.searchWord.trim() !== '') {
    const searchQuery = filterParams.searchWord.trim();
    const threshold = parseFloat(process.env.SEMANTIC_SEARCH_THRESHOLD) || 0.4;

    try {
      // Generate embedding for search query
      const searchEmbedding = await generateEmbedding(searchQuery);

      // Fetch all listings matching other filters (region, city, workArrangement)
      const allListings = await Listing.find(query).lean();

      if (allListings.length === 0) {
        throwError(404, 'No jobs match your search. Try adjusting your filters.');
      }

      // Calculate semantic scores for all listings
      const scoredListings = allListings.map(listing => {
        const hasValidEmbedding =
          listing.embedding &&
          Array.isArray(listing.embedding) &&
          listing.embedding.length > 0;

        const searchScore = hasValidEmbedding
          ? calculateMatchScore(searchEmbedding, listing.embedding)
          : 0;

        return {
          ...listing,
          searchScore,
        };
      });

      // Filter by relevance threshold
      const relevantListings = scoredListings.filter(l => l.searchScore >= threshold);

      if (relevantListings.length === 0) {
        throwError(404, 'No jobs match your search. Try different keywords or adjusting your filters.');
      }

      // Apply sorting (default to relevance, but allow user to re-sort)
      let sortedListings;
      if (filterParams.sortOption === 'title-asc') {
        sortedListings = relevantListings.sort((a, b) => a.jobTitle.localeCompare(b.jobTitle));
      } else if (filterParams.sortOption === 'title-desc') {
        sortedListings = relevantListings.sort((a, b) => b.jobTitle.localeCompare(a.jobTitle));
      } else if (filterParams.sortOption === 'date-created-old') {
        sortedListings = relevantListings.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (filterParams.sortOption === 'date-created-new') {
        sortedListings = relevantListings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else {
        // Default: sort by relevance (searchScore descending)
        sortedListings = relevantListings.sort((a, b) => b.searchScore - a.searchScore);
      }

      // Apply pagination
      const page = parseInt(filterParams.page) || 1;
      const limit = parseInt(filterParams.limit) || 20;
      const skip = (page - 1) * limit;
      const total = sortedListings.length;
      const paginatedListings = sortedListings.slice(skip, skip + limit);

      // Add matchScore for jobseekers (if applicable)
      let listingsWithScores = paginatedListings;
      if (userId) {
        const user = await User.findById(userId);
        if (user?.profileType === 'jobseeker' && user.jobseekerProfile?.embedding) {
          const userEmbedding = user.jobseekerProfile.embedding;
          listingsWithScores = paginatedListings.map((listing) => {
            const hasValidEmbedding =
              listing.embedding &&
              Array.isArray(listing.embedding) &&
              listing.embedding.length > 0;

            const matchScore = hasValidEmbedding
              ? calculateMatchScore(userEmbedding, listing.embedding)
              : null;

            return {
              ...listing,
              matchScore,
            };
          });
        }
      }

      // Early return for semantic search
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

    } catch (error) {
      // Graceful fallback to regex search if OpenAI fails
      console.error('Semantic search failed, falling back to regex:', error);
      query.$or = [
        { jobTitle: { $regex: searchQuery, $options: 'i' } },
        { jobDescription: { $regex: searchQuery, $options: 'i' } },
      ];
      // Continue to normal flow below (will use regex filter)
    }
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
    if (!user.jobseekerProfile?.embedding || user.jobseekerProfile.embedding.length === 0) {
      throwError(400, 'User profile incomplete - cannot calculate match scores. Please complete your profile.');
    }

    // Fetch ALL listings matching the filters (before pagination)
    const allListings = await Listing.find(query).lean();

    if (allListings.length === 0) {
      throwError(404, 'No jobs match your search. Try adjusting your filters.');
    }

    // Use utility function to calculate match scores and sort
    const sortOrder = filterParams.sortOption === 'match-score' ? 'desc' : 'asc';
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
  const sortBy = sortOptions[filterParams.sortOption] || { createdAt: -1 };

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
    Listing.find(query).sort(sortBy).skip(skip).limit(limit).lean(), // Returns plain objects (faster)
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
  const listings = await Listing.find({businessId});
  // Get all listingIds
  const listingIds = listings.map(listing => listing._id);

  // Start query for applications with all applications for the listings
  const query = { 
    listingId: { $in: listingIds },
    hiddenFromBusiness: false
  };

  if (filterParams.status && filterParams.status !== 'all') {
    query.status = filterParams.status;
  }

  if (filterParams.searchWord) {
    query.$or = [
      { firstName: { $regex: filterParams.searchWord, $options: 'i' } },
      { lastName: { $regex: filterParams.searchWord, $options: 'i' } },
      { email: { $regex: filterParams.searchWord, $options: 'i' } }
    ];
  }

  // Date range filter
  if (filterParams.dateFrom || filterParams.dateTo) {
    query.createdAt = {};
    if (filterParams.dateFrom) query.createdAt.$gte = new Date(filterParams.dateFrom);
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
    Applications.find(query).populate('listingId').sort(sortBy).skip(skip).limit(limit).lean(), // Returns plain objects (faster)
    Applications.countDocuments(query), // Get total count for pagination info
  ]);

  return {
    applications: applications.map(normalizeApplicationResponse),
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
  getFilteredApplications
};
