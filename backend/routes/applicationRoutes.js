const applicationValidation = require('../middleware/applicationValidation');
const {authenticateUser, optionalAuthenticateUser, businessAuth} = require('../middleware/authService');
const {applicationsLimiter} = require('../middleware/rateLimiter');
const router = require('express').Router();
const {
  createApplication,
  getApplicationsByID,
  getListingApplications,
  updateApplicationStatus,
  updateApplicationData,
  getDashboardMetrics,
  getBusinessApplications,
  deleteApplication,
} = require('../controllers/applicationsController');
const upload = require('../middleware/multer');

router.post('/:listingId', optionalAuthenticateUser, applicationsLimiter, applicationValidation, upload.single('resume'), createApplication);

router.get('/my-applications', authenticateUser, getApplicationsByID);

router.get('/business/dashboard/metrics', authenticateUser, businessAuth, getDashboardMetrics);

router.get('/business-applications', authenticateUser, businessAuth, getBusinessApplications);

router.get('/listing/:listingId', authenticateUser, getListingApplications);

router.patch(
  '/status/:id',
  authenticateUser,
  updateApplicationStatus
);

router.put(
  '/:id',
  authenticateUser,
  applicationValidation,
  updateApplicationData
);

router.delete('/:id', authenticateUser, deleteApplication);

module.exports = router;
