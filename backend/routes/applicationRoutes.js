const applicationValidation = require('../middleware/applicationValidation');
const {authenticateUser, optionalAuthenticateUser} = require('../middleware/authService');
const {applicationsLimiter} = require('../middleware/rateLimiter');
const router = require('express').Router();
const {
  submitApplication,
  getApplicationsByID,
  getListingApplications,
  updateApplicationStatus,
  updateApplicationData,
} = require('../controllers/applicationsController');

router.post('/:listingId', optionalAuthenticateUser, applicationsLimiter, applicationValidation, submitApplication);

router.get('/my-applications', authenticateUser, getApplicationsByID);

router.get('/listing/:listingId', authenticateUser, getListingApplications);

router.patch(
  '/:id/status',
  authenticateUser,
  updateApplicationStatus
);

router.put(
  '/:id',
  authenticateUser,
  applicationValidation,
  updateApplicationData
);

module.exports = router;
