const { Schema, model } = require("mongoose");
const { INDUSTRIES } = require("../../data/industries.js");
const { WORK_ARRANGEMENTS } = require("../../data/workArr.js");
const { CITIES, REGIONS } = require("../../data/israelCities.js");

const jobListingSchema = new Schema({
  businessId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  companyName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
  },
  jobTitle: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 100,
    match: [
      /^[a-zA-Z\s.,;:!?'"()\-&/]+$/,
      "Job title can only contain letters, spaces, and basic punctuation",
    ],
  },
  jobDescription: { type: String, required: true, minLength: 10 },
  requirements: [String],
  advantages: [String],
  apply: {
    method: { type: String, enum: ["email", "link"], required: true },
    contact: { type: String, required: true }, // email address or URL
  },
  location: {
    region: {
      type: String,
      enum: REGIONS,
      required: true,
    },
    city: {
      type: String,
      enum: CITIES,
      required: true,
    },
  },
  workArrangement: {
    type: String,
    enum: WORK_ARRANGEMENTS,
    required: true,
  },
  industry: {
    type: String,
    enum: INDUSTRIES,
    required: true,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
});

const Listing = model("JobListings", jobListingSchema);

module.exports = Listing;
