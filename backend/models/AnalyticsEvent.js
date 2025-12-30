const { Schema, model } = require('mongoose');

/**
 * AnalyticsEvent Model
 *
 * Tracks platform usage events for business intelligence and analytics.
 * This model is privacy-compliant with Israeli Amendment 13:
 * - Only tracks operational data (no personal behavioral profiling)
 * - Auto-deletes after 90 days via TTL index (GDPR/privacy compliance)
 * - Session IDs only (no IP addresses stored)
 * - User agents sanitized to browser type only
 *
 * Event Types:
 * - job_view: User views a job listing detail page
 * - application_submit: User submits a job application
 * - search: User performs a search query
 * - signup: New user registration
 * - profile_view: User views a profile page
 */
const analyticsEventSchema = new Schema({
  // Type of event being tracked
  eventType: {
    type: String,
    required: true,
    enum: [
      'job_view',
      'application_submit',
      'search',
      'signup',
      'profile_view',
    ],
    index: true, // Fast filtering by event type
  },

  // User who triggered the event (null for anonymous/logged-out users)
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    default: null,
    index: true, // Fast user-specific queries (for data export/deletion)
  },

  // Related job listing (if applicable)
  jobId: {
    type: Schema.Types.ObjectId,
    ref: 'JobListings',
    default: null,
    index: true, // Fast job-specific analytics
  },

  // Session identifier from express-session (for tracking user journeys without IP)
  sessionId: {
    type: String,
    required: true,
    index: true,
  },

  // Event-specific metadata (flexible schema for different event types)
  metadata: {
    // Search-specific fields
    searchQuery: { type: String }, // The search text user entered
    resultsCount: { type: Number }, // Number of results returned

    // Browser type only (sanitized - no full user agent string)
    // Example: "Chrome/Desktop" or "Safari/Mobile"
    userAgent: { type: String },

    // Application-specific fields
    applicationId: { type: Schema.Types.ObjectId, ref: 'Applications' },

    // Additional contextual data can be added here as needed
  },

  // When the event occurred (separate from createdAt for clarity)
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
    index: true, // Fast time-series queries
  },

  // Creation timestamp (used for TTL expiration)
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// PRIVACY COMPLIANCE: TTL Index - Auto-delete events after 90 days
// This ensures we don't retain analytics data indefinitely
analyticsEventSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 90 * 24 * 60 * 60, // 90 days in seconds
    name: 'analytics_ttl_index',
  }
);

// Compound index for common queries: event type + timestamp
// Useful for "get top searches in last 30 days" type queries
analyticsEventSchema.index(
  { eventType: 1, timestamp: -1 },
  { name: 'event_type_timestamp_index' }
);

// Compound index for job-specific analytics over time
analyticsEventSchema.index(
  { jobId: 1, timestamp: -1 },
  { name: 'job_time_series_index' }
);

const AnalyticsEvent = model('AnalyticsEvent', analyticsEventSchema);

module.exports = AnalyticsEvent;
