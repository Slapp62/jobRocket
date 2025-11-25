const Listing = require('../models/Listings.js');
const Applications = require('../models/Applications.js');
const { normalizeListingResponse } = require('../utils/normalizeResponses');
const { normalizeApplicationResponse } = require('../utils/normalizeResponses');
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

const getFilteredListings = async (filterParams, businessId = null) => {
  // Build filter object dynamically
  const query = {};

  // If businessId provided, only show that business's listings
  if (businessId) {
    query.businessId = businessId;
  }

  // Text search (searches in jobTitle AND jobDescription)
  if (filterParams.searchText && filterParams.searchText.trim() !== '') {
    query.$or = [
      { jobTitle: { $regex: filterParams.searchText, $options: 'i' } },
      { jobDescription: { $regex: filterParams.searchText, $options: 'i' } },
    ];
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
    filterParams.industry &&
    filterParams.industry.trim() !== '' &&
    filterParams.industry !== 'All Industries'
  ) {
    query.industry = filterParams.industry;
  }

  if (
    filterParams.workArrangement &&
    filterParams.workArrangement.trim() !== '' &&
    filterParams.workArrangement !== 'All Work Arrangements'
  ) {
    query.workArrangement = filterParams.workArrangement;
  }

  const page = parseInt(filterParams.page) || 1;
  const limit = parseInt(filterParams.limit) || 20;
  const skip = (page - 1) * limit;

  const sortOptions = {
    'title-asc': { jobTitle: 1 },
    'title-desc': { jobTitle: -1 },
    'date-created-old': { createdAt: 1 },
    'date-created-new': { createdAt: -1 },
    'match-score': { matchScore: -1 },
    'match-score-desc': { matchScore: 1 },
  };
  const sortBy = sortOptions[filterParams.sortOption] || { createdAt: -1 };

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

async function getFilteredApplications(businessId, filterParams) {
  // Get all listings for the business 
  const listings = await Listing.find({businessId});
  // Get all listingIds
  const listingIds = listings.map(listing => listing._id);

  // Start query for applications with all applications for the listings
  const query = { listingId: { $in: listingIds } };

  if (filterParams.status && filterParams.status !== 'all') {
    query.status = filterParams.status;
  }

  if (filterParams.searchText) {
    query.$or = [
      { firstName: { $regex: filterParams.searchText, $options: 'i' } },
      { lastName: { $regex: filterParams.searchText, $options: 'i' } },
      { email: { $regex: filterParams.searchText, $options: 'i' } }
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
