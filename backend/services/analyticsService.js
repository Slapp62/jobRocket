const AnalyticsEvent = require('../models/AnalyticsEvent');
const Listing = require('../models/Listings');
const Applications = require('../models/Applications');
const User = require('../models/Users');
const logger = require('../config/logger');

/**
 * Analytics Service
 *
 * Handles all analytics tracking and reporting for JobRocket platform.
 * Privacy-compliant with Amendment 13 - tracks operational data only.
 *
 * Key Principles:
 * 1. Non-blocking: Analytics failures must never crash the main application
 * 2. Privacy-first: Session IDs only (no IP addresses)
 * 3. Sanitized data: User agents reduced to browser type
 * 4. Auto-expiring: Events auto-delete after 90 days via TTL index
 */

/**
 * Sanitize user agent string to browser type only
 * @param {string} userAgentString - Full user agent from request headers
 * @returns {string} Simplified format like "Chrome/Desktop" or "Safari/Mobile"
 */
function sanitizeUserAgent(userAgentString) {
  if (!userAgentString) return 'Unknown/Unknown';

  const ua = userAgentString.toLowerCase();

  // Detect device type
  const isMobile = /mobile|android|iphone|ipad|tablet/.test(ua);
  const deviceType = isMobile ? 'Mobile' : 'Desktop';

  // Detect browser
  let browser = 'Other';
  if (ua.includes('edg/')) browser = 'Edge';
  else if (ua.includes('chrome/')) browser = 'Chrome';
  else if (ua.includes('safari/') && !ua.includes('chrome')) browser = 'Safari';
  else if (ua.includes('firefox/')) browser = 'Firefox';
  else if (ua.includes('opr/') || ua.includes('opera/')) browser = 'Opera';

  return `${browser}/${deviceType}`;
}

/**
 * Generic event logging function
 * NON-BLOCKING: Wrapped in try/catch to prevent analytics failures from crashing app
 *
 * @param {string} eventType - Type of event (job_view, application_submit, search, etc.)
 * @param {Object} options - Event data
 * @param {string} options.userId - User ID (null for anonymous users)
 * @param {string} options.jobId - Job listing ID (if applicable)
 * @param {string} options.sessionId - Express session ID
 * @param {Object} options.metadata - Additional event-specific data
 * @param {string} options.userAgent - Full user agent string (will be sanitized)
 */
async function logEvent(
  eventType,
  { userId, jobId, sessionId, metadata = {}, userAgent }
) {
  try {
    // Sanitize user agent if provided
    if (userAgent) {
      metadata.userAgent = sanitizeUserAgent(userAgent);
    }

    const event = new AnalyticsEvent({
      eventType,
      userId: userId || null,
      jobId: jobId || null,
      sessionId,
      metadata,
      timestamp: new Date(),
    });

    await event.save();
  } catch (error) {
    // Log the error but don't throw - analytics failures should never crash the app
    logger.error('Analytics tracking failed (non-critical)', {
      eventType,
      error: error.message,
      category: 'analytics-tracking-error',
    });
  }
}

/**
 * Track job listing view
 * Increments viewCount on listing + logs analytics event
 *
 * @param {string} jobId - Listing ID
 * @param {string} userId - User ID (null for anonymous)
 * @param {string} sessionId - Session ID
 * @param {string} userAgent - User agent string
 */
async function trackJobView(jobId, userId, sessionId, userAgent) {
  try {
    // Increment view counter on the listing (atomic operation)
    await Listing.findByIdAndUpdate(
      jobId,
      {
        $inc: { viewCount: 1 },
        $set: { lastViewedAt: new Date() },
      },
      { new: false } // Don't need to return the updated document
    );

    // Log analytics event (non-blocking)
    await logEvent('job_view', {
      userId,
      jobId,
      sessionId,
      userAgent,
    });
  } catch (error) {
    logger.error('Job view tracking failed (non-critical)', {
      jobId,
      error: error.message,
      category: 'analytics-tracking-error',
    });
  }
}

/**
 * Track application submission
 *
 * @param {string} applicationId - Application document ID
 * @param {string} jobId - Listing ID
 * @param {string} userId - User ID (null for non-registered applicants)
 * @param {string} sessionId - Session ID
 * @param {string} userAgent - User agent string
 */
async function trackApplicationSubmit(
  applicationId,
  jobId,
  userId,
  sessionId,
  userAgent
) {
  try {
    await logEvent('application_submit', {
      userId,
      jobId,
      sessionId,
      metadata: {
        applicationId,
      },
      userAgent,
    });
  } catch (error) {
    logger.error('Application tracking failed (non-critical)', {
      applicationId,
      error: error.message,
      category: 'analytics-tracking-error',
    });
  }
}

/**
 * Track search query
 *
 * @param {string} query - Search text entered by user
 * @param {number} resultsCount - Number of results returned
 * @param {string} userId - User ID (null for anonymous)
 * @param {string} sessionId - Session ID
 * @param {string} userAgent - User agent string
 */
async function trackSearch(query, resultsCount, userId, sessionId, userAgent) {
  try {
    // Only track non-empty queries
    if (!query || query.trim() === '') {
      return;
    }

    await logEvent('search', {
      userId,
      jobId: null,
      sessionId,
      metadata: {
        searchQuery: query.trim(),
        resultsCount,
      },
      userAgent,
    });
  } catch (error) {
    logger.error('Search tracking failed (non-critical)', {
      query,
      error: error.message,
      category: 'analytics-tracking-error',
    });
  }
}

/**
 * Get platform-wide metrics for admin dashboard
 *
 * @param {number} _days - Number of days to look back (default: 30) - Currently unused, hardcoded to 30 days
 * @returns {Object} Platform metrics
 */
async function getPlatformMetrics(_days = 30) {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get all-time counts
    const [
      totalJobs,
      totalApplications,
      totalUsers,
      totalJobseekers,
      totalBusinesses,
    ] = await Promise.all([
      Listing.countDocuments({ isActive: true }),
      Applications.countDocuments({}),
      User.countDocuments({ isDeleted: { $ne: true } }),
      User.countDocuments({
        profileType: 'jobseeker',
        isDeleted: { $ne: true },
      }),
      User.countDocuments({
        profileType: 'business',
        isDeleted: { $ne: true },
      }),
    ]);

    // Get time-based counts from analytics events
    const [
      jobViews30d,
      jobViews7d,
      applications30d,
      applications7d,
      searches30d,
      searches7d,
    ] = await Promise.all([
      AnalyticsEvent.countDocuments({
        eventType: 'job_view',
        timestamp: { $gte: thirtyDaysAgo },
      }),
      AnalyticsEvent.countDocuments({
        eventType: 'job_view',
        timestamp: { $gte: sevenDaysAgo },
      }),
      AnalyticsEvent.countDocuments({
        eventType: 'application_submit',
        timestamp: { $gte: thirtyDaysAgo },
      }),
      AnalyticsEvent.countDocuments({
        eventType: 'application_submit',
        timestamp: { $gte: sevenDaysAgo },
      }),
      AnalyticsEvent.countDocuments({
        eventType: 'search',
        timestamp: { $gte: thirtyDaysAgo },
      }),
      AnalyticsEvent.countDocuments({
        eventType: 'search',
        timestamp: { $gte: sevenDaysAgo },
      }),
    ]);

    // Calculate conversion rate (applications per view)
    const conversionRate30d =
      jobViews30d > 0 ? ((applications30d / jobViews30d) * 100).toFixed(2) : 0;

    return {
      jobs: {
        total: totalJobs,
      },
      applications: {
        total: totalApplications,
        last30Days: applications30d,
        last7Days: applications7d,
      },
      users: {
        total: totalUsers,
        jobseekers: totalJobseekers,
        businesses: totalBusinesses,
      },
      engagement: {
        jobViews30d,
        jobViews7d,
        searches30d,
        searches7d,
        conversionRate30d: parseFloat(conversionRate30d),
      },
    };
  } catch (error) {
    logger.error('Failed to fetch platform metrics', {
      error: error.message,
      category: 'analytics-query-error',
    });
    throw error;
  }
}

/**
 * Get search insights (most searched terms)
 *
 * @param {number} limit - Number of top searches to return
 * @param {number} days - Number of days to look back
 * @returns {Array} Top searched terms with counts
 */
async function getSearchInsights(limit = 10, days = 30) {
  try {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const topSearches = await AnalyticsEvent.aggregate([
      {
        $match: {
          eventType: 'search',
          timestamp: { $gte: cutoffDate },
          'metadata.searchQuery': { $exists: true, $nin: [null, ''] },
        },
      },
      {
        $group: {
          _id: '$metadata.searchQuery',
          count: { $sum: 1 },
          avgResults: { $avg: '$metadata.resultsCount' },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: limit,
      },
      {
        $project: {
          _id: 0,
          query: '$_id',
          searchCount: '$count',
          avgResults: { $round: ['$avgResults', 0] },
        },
      },
    ]);

    return topSearches;
  } catch (error) {
    logger.error('Failed to fetch search insights', {
      error: error.message,
      category: 'analytics-query-error',
    });
    throw error;
  }
}

/**
 * Get popular jobs (most viewed listings)
 *
 * @param {number} limit - Number of top jobs to return
 * @param {number} days - Number of days to look back
 * @returns {Array} Most viewed jobs with view counts
 */
async function getPopularJobs(limit = 10, days = 30) {
  try {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    // Get view counts from analytics events (more accurate than Listing.viewCount for time-based queries)
    const jobViewCounts = await AnalyticsEvent.aggregate([
      {
        $match: {
          eventType: 'job_view',
          timestamp: { $gte: cutoffDate },
          jobId: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: '$jobId',
          viewCount: { $sum: 1 },
        },
      },
      {
        $sort: { viewCount: -1 },
      },
      {
        $limit: limit,
      },
    ]);

    // Fetch job details for top jobs
    const jobIds = jobViewCounts.map((item) => item._id);
    const jobs = await Listing.find({ _id: { $in: jobIds } })
      .select('jobTitle companyName location.city createdAt viewCount')
      .lean();

    // Merge view counts with job details
    const jobsMap = new Map(jobs.map((job) => [job._id.toString(), job]));

    const popularJobs = jobViewCounts
      .map((item) => {
        const job = jobsMap.get(item._id.toString());
        if (!job) return null;

        return {
          _id: job._id,
          jobTitle: job.jobTitle,
          companyName: job.companyName,
          city: job.location?.city,
          viewsLast30Days: item.viewCount,
          totalViews: job.viewCount || 0,
          createdAt: job.createdAt,
        };
      })
      .filter((job) => job !== null);

    return popularJobs;
  } catch (error) {
    logger.error('Failed to fetch popular jobs', {
      error: error.message,
      category: 'analytics-query-error',
    });
    throw error;
  }
}

/**
 * Get application funnel metrics
 *
 * @param {number} days - Number of days to look back
 * @returns {Object} Application funnel stats
 */
async function getApplicationMetrics(days = 30) {
  try {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [totalViews, totalApplications, applicationsByStatus] =
      await Promise.all([
        AnalyticsEvent.countDocuments({
          eventType: 'job_view',
          timestamp: { $gte: cutoffDate },
        }),
        AnalyticsEvent.countDocuments({
          eventType: 'application_submit',
          timestamp: { $gte: cutoffDate },
        }),
        Applications.aggregate([
          {
            $match: {
              createdAt: { $gte: cutoffDate },
            },
          },
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
            },
          },
        ]),
      ]);

    const statusCounts = {
      pending: 0,
      reviewed: 0,
      rejected: 0,
    };

    applicationsByStatus.forEach((item) => {
      statusCounts[item._id] = item.count;
    });

    const viewToApplicationRate =
      totalViews > 0 ? ((totalApplications / totalViews) * 100).toFixed(2) : 0;

    return {
      totalViews,
      totalApplications,
      viewToApplicationRate: parseFloat(viewToApplicationRate),
      applicationsByStatus: statusCounts,
    };
  } catch (error) {
    logger.error('Failed to fetch application metrics', {
      error: error.message,
      category: 'analytics-query-error',
    });
    throw error;
  }
}

module.exports = {
  sanitizeUserAgent,
  logEvent,
  trackJobView,
  trackApplicationSubmit,
  trackSearch,
  getPlatformMetrics,
  getSearchInsights,
  getPopularJobs,
  getApplicationMetrics,
};
