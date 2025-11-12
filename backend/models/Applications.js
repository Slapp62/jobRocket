// /backend/models/Applications.js
const { Schema, model } = require('mongoose');

const applicationSchema = new Schema({
  listingId: {
    type: Schema.Types.ObjectId,
    ref: 'JobListings', // Links to your JobListings collection
    required: true,
    index: true, // Makes queries faster when searching by listing
  },
  applicantId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
    index: true, // Makes queries faster when searching by applicant
  },
  resume: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 5000,
  },
  coverLetter: {
    type: String,
    minlength: 50,
    maxlength: 2000,
  },
  message: {
    type: String,
    minlength: 50,
    maxlength: 2000,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index - prevents duplicate applications
applicationSchema.index({ listingId: 1, applicantId: 1 }, { unique: true });

module.exports = model('Applications', applicationSchema);
