const Listing = require('../models/Listings.js');
const { normalizeListingResponse } = require('../utils/normalizeResponses');
const { throwError } = require('../utils/functionHandlers');

const normalizeSearch = (query) => {
  if (query.city === 'all') {
    query.city = '';
  }
  if (query.region === 'all') {
    query.region = '';
  }
  if (query.industry === 'all') {
    query.industry = '';
  }
  if (query.workArrangement === 'all') {
    query.workArrangement = '';
  }
  return {
    searchWord: query.searchWord || '',
    region: query.region || '',
    city: query.city || '',
    industry: query.industry || '',
    workArrangement: query.workArrangement || '',
    sortOption: query.sortOption || '',
    page: query.page || '1',
    limit: query.limit || '20',
  };
};

const getSearchedListings = async (searchObj, businessId = null) => {
  // Build filter object dynamically
  const query = {};

  // If businessId provided, only show that business's listings
  if (businessId) {
    query.businessId = businessId;
  }

  // Text search (searches in jobTitle AND jobDescription)
  if (searchObj.searchWord && searchObj.searchWord.trim() !== '') {
    query.$or = [
      { jobTitle: { $regex: searchObj.searchWord, $options: 'i' } },
      { jobDescription: { $regex: searchObj.searchWord, $options: 'i' } },
    ];
  }

  // Exact matches for dropdowns
  if (
    searchObj.region &&
    searchObj.region.trim() !== '' &&
    searchObj.region !== 'All Regions'
  ) {
    query['location.region'] = searchObj.region;
  }

  if (
    searchObj.city &&
    searchObj.city.trim() !== '' &&
    searchObj.city !== 'All Cities'
  ) {
    query['location.city'] = searchObj.city;
  }

  if (
    searchObj.industry &&
    searchObj.industry.trim() !== '' &&
    searchObj.industry !== 'All Industries'
  ) {
    query.industry = searchObj.industry;
  }

  if (
    searchObj.workArrangement &&
    searchObj.workArrangement.trim() !== '' &&
    searchObj.workArrangement !== 'All Work Arrangements'
  ) {
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
    Listing.find(query).sort(sortBy).skip(skip).limit(limit).lean(), // Returns plain objects (faster)
    Listing.countDocuments(query), // Get total count for pagination info
  ]);

  if (listings.length === 0) {
    throwError(404, 'No jobs match your search. Try adjusting your filters.');
  }

  return {
    listings: listings.map(normalizeListingResponse),
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

module.exports = {
  normalizeSearch,
  getSearchedListings
};
