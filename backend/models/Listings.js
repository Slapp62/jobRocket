const { Schema, model } = require('mongoose');
const { WORK_ARRANGEMENTS } = require('../data/workArr.js');
const { CITIES, REGIONS } = require('../data/israelCities.js');
const EXPERIENCE_LEVELS = require('../data/experienceLevels.js');
const {
  generateEmbedding,
  listingToText,
} = require('../services/embeddingService.js');

const jobListingSchema = new Schema({
  embedding: {
    type: [Number],
    default: null,
  },
  businessId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
    index: true,
  },
  companyName: {
    type: String,
    required: true,
    index: true,
    minLength: 2,
    maxLength: 256,
  },
  jobTitle: {
    type: String,
    required: true,
    index: true,
    minLength: 5,
    maxLength: 100,
    match: [
      /^[a-zA-Z\s.,;:!?'"()\-&/]+$/,
      'Job title can only contain letters, spaces, and basic punctuation',
    ],
  },
  jobDescription: { type: String, required: true, minLength: 10, index: true },
  requirements: [String],
  advantages: [String],
  apply: {
    method: {
      jobRocketSystem: { type: Boolean, default: false },
      companySystem: { type: Boolean, default: false },
      email: { type: Boolean, default: false },
    },
    contact: {
      email: { type: String },
      link: { type: String },
    },
  },
  location: {
    region: {
      type: String,
      enum: REGIONS,
      required: true,
      index: true,
    },
    city: {
      type: String,
      enum: CITIES,
      required: true,
      index: true,
    },
  },
  workArrangement: {
    type: String,
    enum: WORK_ARRANGEMENTS,
    required: true,
    index: true,
  },
  requiredExperience: {
    type: String,
    enum: EXPERIENCE_LEVELS,
    required: true,
    index: true,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  isActive: { type: Boolean, default: true },
  viewCount: {
    type: Number,
    default: 0,
    min: 0, // Prevent negative view counts
  },
  lastViewedAt: {
    type: Date,
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
  expiresAt: {
    type: Date,
    required: true,
    default: () => {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      return date;
    },
  },
});

// Text search index for full-text search across multiple fields
jobListingSchema.index(
  {
    jobTitle: 'text',
    companyName: 'text',
    jobDescription: 'text',
    workArrangement: 'text',
    requiredExperience: 'text',
    'location.city': 'text',
    'location.region': 'text',
  },
  {
    weights: {
      jobTitle: 10, // Highest priority - matches in job title are most relevant
      companyName: 8, // High priority - company name matches are very relevant
      jobDescription: 5, // Medium priority - description matches are relevant
      workArrangement: 2, // Lower priority - work arrangement is less critical for relevance
      requiredExperience: 2, // Lower priority - experience level is filterable separately
      'location.city': 2, // Lower priority - city is filterable separately
      'location.region': 2, // Lower priority - region is filterable separately
    },
    name: 'listing_text_search',
  }
);

// Validation: Exactly one application method must be selected
jobListingSchema.pre('validate', function (next) {
  if (this.apply && this.apply.method) {
    const count =
      (this.apply.method.jobRocketSystem ? 1 : 0) +
      (this.apply.method.companySystem ? 1 : 0) +
      (this.apply.method.email ? 1 : 0);

    if (count !== 1) {
      this.invalidate(
        'apply.method',
        'Exactly one application method must be selected'
      );
    }
  }
  next();
});

jobListingSchema.pre('save', async function (next) {
  // Generate embedding if listing content has changed
  if (
    this.isModified('jobTitle') ||
    this.isModified('jobDescription') ||
    this.isModified('requirements')
  ) {
    try {
      const listingText = listingToText(this);
      this.embedding = await generateEmbedding(listingText);
    } catch (error) {
      console.error('Failed to generate listing embedding:', error);
      // Don't block the save if embedding fails
    }
  }
  next();
});

const Listing = model('JobListings', jobListingSchema);

module.exports = Listing;
