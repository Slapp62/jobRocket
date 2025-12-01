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
    required: false, // Allow null for non-users
    default: null,
    index: true,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  phone: {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        return /^0(?:5[0-9]|[2-4689])(?:-?\d{3}(?:-?\d{4}))$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Israeli phone number!`,
    },
  },
  resumeUrl: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 5000,
  },
  message: {
    type: String,
    minlength: 10,
    maxlength: 2000,
    required: false,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'rejected'],
    default: 'pending',
  },
  hiddenFromBusiness:{
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index - prevents duplicate applications
applicationSchema.index({ listingId: 1, email: 1 }, { unique: true });

module.exports = model('Applications', applicationSchema);
