const { Schema, model } = require('mongoose');
const { WORK_ARRANGEMENTS } = require('../data/workArr');
const { CITIES, REGIONS } = require('../data/israelCities.js');
const { INDUSTRIES } = require('../data/industries.js');
const {
  generateEmbedding,
  jobseekerToText,
} = require('../services/embeddingService.js');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: false,
    trim: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  loginAttempts: {
    type: Number,
    required: true,
    default: 0,
  },
  loginTimeout: {
    type: Number,
    required: true,
    default: 0,
  },
  phone: {
    type: String,
    required: false,
    match: [
      /^(\+972[-\s]?|972[-\s]?|0)((2|3|4|8|9)[-\s]?\d{7}|5[0-9][-\s]?\d{7})$/,
      'Phone must be a valid Israeli phone number',
    ],
  },
  profileType: {
    type: String,
    required: true,
    enum: ['jobseeker', 'business', 'admin'],
  },
  jobseekerProfile: {
    embedding: {
      type: [Number],
      default: null,
    },
    firstName: {
      type: String,
      required() {
        return this.profileType === 'jobseeker';
      },
      minLength: 2,
      maxLength: 256,
    },
    lastName: {
      type: String,
      required() {
        return this.profileType === 'jobseeker';
      },
      minLength: 2,
      maxLength: 256,
    },
    highestEducation: {
      type: String,
      required() {
        return this.profileType === 'jobseeker';
      },
      enum: [
        'High School',
        'Associate Degree',
        "Bachelor's Degree",
        "Master's Degree",
        'Doctorate',
        'Other',
      ],
    },
    preferredWorkArrangement: {
      type: String,
      required() {
        return this.profileType === 'jobseeker';
      },
      enum: WORK_ARRANGEMENTS,
    },
    linkedinPage: {
      type: String,
      maxLength: 512,
      default: '',
    },
    resume: {
      type: String,
      maxLength: 1024,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      maxLength: 2000,
      default: '',
    },
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
  },
  businessProfile: {
    companyName: {
      type: String,
      required() {
        return this.profileType === 'business';
      },
      minLength: 2,
      maxLength: 256,
    },
    location: {
      country: {
        type: String,
        required() {
          return this.profileType === 'business';
        },
        minLength: 2,
        maxLength: 256,
      },
      region: {
        type: String,
        required() {
          return this.profileType === 'business';
        },
        enum: REGIONS,
      },
      city: {
        type: String,
        required() {
          return this.profileType === 'business';
        },
        enum: CITIES,
      },
      _id: {
        type: Schema.Types.ObjectId,
        auto: true,
      },
    },
    logo: {
      url: {
        type: String,
        default: '',
      },
      alt: {
        type: String,
        default: 'company logo',
        maxLength: 256,
      },
      _id: {
        type: Schema.Types.ObjectId,
        auto: true,
      },
    },
    industry: {
      type: String,
      required() {
        return this.profileType === 'business';
      },
      enum: INDUSTRIES,
    },
    numberOfEmployees: {
      type: String,
      required() {
        return this.profileType === 'business';
      },
      enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
    },
    website: {
      type: String,
      maxLength: 512,
      default: '',
    },
    contactEmail: {
      type: String,
      match: [/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email'],
      default: '',
    },
    socialMedia: {
      linkedin: {
        type: String,
        maxLength: 512,
        default: '',
      },
      twitter: {
        type: String,
        maxLength: 512,
        default: '',
      },
      facebook: {
        type: String,
        maxLength: 512,
        default: '',
      },
      _id: {
        type: Schema.Types.ObjectId,
        auto: true,
      },
    },
    description: {
      type: String,
      maxLength: 2000,
      default: '',
    },
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
  },
  adminProfile: {
    name: {
      type: String,
      required() {
        return this.profileType === 'admin';
      },
      minLength: 2,
      maxLength: 256,
    },
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  consents: {
    ageConfirmation: {
      granted: {
        type: Boolean,
        required() {
          return this.profileType === 'jobseeker';
        },
      },
      timestamp: {
        type: Date,
        required() {
          return this.profileType === 'jobseeker';
        },
      },
      ipAddress: String,
      userAgent: String,
    },
    dataProcessing: {
      granted: { type: Boolean, required: true },
      timestamp: { type: Date, required: true },
      ipAddress: String,
      userAgent: String,
    },
  },
  // Soft delete fields for 30-day grace period
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

// Custom validator: Either password OR googleId must exist
userSchema.pre('validate', function (next) {
  if (!this.password && !this.googleId) {
    next(new Error('User must have either a password or Google account'));
  } else {
    next();
  }
});

userSchema.pre('save', async function (next) {
  // Only for jobseekers, and only if their profile changed or embedding is missing
  if (
    this.profileType === 'jobseeker' &&
    (this.isModified('jobseekerProfile') || this.isNew)
  ) {
    try {
      const profileText = jobseekerToText(this.jobseekerProfile);
      this.jobseekerProfile.embedding = await generateEmbedding(profileText);
    } catch (error) {
      console.error('Failed to generate jobseeker embedding:', error);
      // Don't block the save if embedding fails
    }
  }
  next();
});

const Users = model('Users', userSchema);
module.exports = Users;
