const applicationValidation = require('../middleware/applicationValidation');
const {authenticateUser, optionalAuthenticateUser} = require('../middleware/authService');
const {applicationsLimiter} = require('../middleware/rateLimiter');
const router = require('express').Router();
const {
  submitApplication,
  getApplicationsByID,
  getListingApplications,
  updateApplicationStatus,
} = require('../controllers/applicationsController');

router.post('/:listingId', optionalAuthenticateUser, applicationsLimiter, applicationValidation, submitApplication);

router.get('/my-applications', authenticateUser, getApplicationsByID);

router.get('/listing/:listingId', authenticateUser, getListingApplications);

router.patch(
  '/:id',
  authenticateUser,
  updateApplicationStatus
);

module.exports = router;
