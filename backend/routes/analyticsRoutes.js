const express = require('express');
const router = express.Router();
const { authenticateUser, adminAuth } = require('../middleware/authMiddleware');
const analyticsService = require('../services/analyticsService');
const { handleSuccess, handleError } = require('../utils/functionHandlers');

/**
 * Analytics Routes
 *
 * All routes require admin authentication for security.
 * These endpoints provide business intelligence data for the admin dashboard.
 */

// Apply admin authentication to ALL analytics routes
router.use(authenticateUser, adminAuth);

/**
 * GET /api/analytics/platform-metrics
 * Returns overall platform statistics
 *
 * Response:
 * {
 *   jobs: { total: number },
 *   applications: { total: number, last30Days: number, last7Days: number },
 *   users: { total: number, jobseekers: number, businesses: number },
 *   engagement: { jobViews30d: number, jobViews7d: number, searches30d: number, searches7d: number, conversionRate30d: number }
 * }
 */
router.get('/platform-metrics', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const metrics = await analyticsService.getPlatformMetrics(days);
    handleSuccess(res, 200, metrics, 'Platform metrics fetched successfully');
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

/**
 * GET /api/analytics/search-insights
 * Returns top searched terms
 *
 * Query params:
 * - limit: Number of results (default: 10)
 * - days: Days to look back (default: 30)
 *
 * Response:
 * [
 *   { query: string, searchCount: number, avgResults: number },
 *   ...
 * ]
 */
router.get('/search-insights', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const days = parseInt(req.query.days) || 30;
    const insights = await analyticsService.getSearchInsights(limit, days);
    handleSuccess(res, 200, insights, 'Search insights fetched successfully');
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

/**
 * GET /api/analytics/popular-jobs
 * Returns most viewed jobs
 *
 * Query params:
 * - limit: Number of results (default: 10)
 * - days: Days to look back (default: 30)
 *
 * Response:
 * [
 *   {
 *     _id: string,
 *     jobTitle: string,
 *     companyName: string,
 *     city: string,
 *     viewsLast30Days: number,
 *     totalViews: number,
 *     createdAt: date
 *   },
 *   ...
 * ]
 */
router.get('/popular-jobs', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const days = parseInt(req.query.days) || 30;
    const popularJobs = await analyticsService.getPopularJobs(limit, days);
    handleSuccess(res, 200, popularJobs, 'Popular jobs fetched successfully');
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

/**
 * GET /api/analytics/application-metrics
 * Returns application funnel stats
 *
 * Query params:
 * - days: Days to look back (default: 30)
 *
 * Response:
 * {
 *   totalViews: number,
 *   totalApplications: number,
 *   viewToApplicationRate: number,
 *   applicationsByStatus: { pending: number, reviewed: number, rejected: number }
 * }
 */
router.get('/application-metrics', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const metrics = await analyticsService.getApplicationMetrics(days);
    handleSuccess(res, 200, metrics, 'Application metrics fetched successfully');
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
