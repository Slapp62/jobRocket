const { Schema, model } = require('mongoose');
const { WORK_ARRANGEMENTS } = require('../data/workArr.js');
const { CITIES, REGIONS } = require('../data/israelCities.js');
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
    method: { type: String, enum: ['email', 'link'], required: true },
    contact: { type: String, required: true }, // email address or URL
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
  likes: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
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
