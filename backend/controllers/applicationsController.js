const applicationsService = require('../services/applicationsService.js');
const { getFilteredApplications } = require('../services/filterService.js');
const {
  handleSuccess,
  handleError,
  throwError,
} = require('../utils/functionHandlers.js');
const Users = require('../models/Users.js');
const Listings = require('../models/Listings.js');
const analyticsService = require('../services/analyticsService.js');

async function createApplication(req, res) {
  try {
    if (!req.file) {
      throwError(400, 'Resume file is required');
    }

    const listingId = req.params.listingId;
    const applicantId = req.user._id;
    const applicationData = req.body;
    const resumeFile = req.file;

    // Fetch user to check if they have a phone number
    const user = await Users.findById(applicantId);

    // Fetch listing to get employer name for audit trail
    const listing = await Listings.findById(listingId);
    
    // Capture consent metadata for Amendment 13 compliance
    applicationData.applicationDataConsent = {
      sharedFields: {
        name: true,
        email: true,
        phone: !!user.phone, // Convert to boolean: true if exists, false if null/undefined
        resume: true,
      },
      consentGranted: true,
      consentTimestamp: new Date(),
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      employerName: listing?.companyName || 'Unknown',
    };
    console.log(applicationData.applicationDataConsent);
    
    const application = await applicationsService.createApplication(
      listingId,
      applicantId,
      applicationData,
      resumeFile,
    );

    // Track application submission (non-blocking - runs in background)
    setImmediate(() => {
      analyticsService.trackApplicationSubmit(
        application._id,
        listingId,
        applicantId,
        req.sessionID,
        req.get('user-agent')
      );
    });

    handleSuccess(res, 201, application, 'Application submitted successfully.');
  } catch (error) {
    handleError(
      res,
      error.status,
      `createApplicationController: ${error.message}`,
    );
  }
}

async function getDashboardMetrics(req, res) {
  try {
    const businessId = req.user._id;
    const data = await applicationsService.getDashboardMetrics(businessId);
    handleSuccess(res, 200, data, 'Dashboard metrics fetched successfully.');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function getBusinessApplications(req, res) {
  try {
    const businessId = req.user._id;
    const filterParams = req.query;
    const applications = await getFilteredApplications(
      businessId,
      filterParams,
    );
    handleSuccess(res, 200, applications);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
}

async function getApplicationsByID(req, res) {
  try {
    const applicantId = req.user._id;
    const applications =
      await applicationsService.getApplicantApplications(applicantId);
    handleSuccess(res, 200, applications);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
}

async function getListingApplications(req, res) {
  try {
    const listingId = req.params.listingId;
    const requesterId = req.user._id;
    const applications = await applicationsService.getListingApplications(
      listingId,
      requesterId,
    );
    handleSuccess(res, 200, applications);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
}

async function updateApplicationStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const requesterId = req.user._id;

    const application = await applicationsService.updateApplicationStatus(
      id,
      status,
      requesterId,
    );
    handleSuccess(res, 200, application, 'Application status updated');
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
}

async function updateApplicationData(req, res) {
  try {
    const { id } = req.params;
    const applicationData = req.body;
    const requesterId = req.user._id;
    const resumeFile = req.file;

    const application = await applicationsService.updateApplicationData(
      id,
      applicationData,
      requesterId,
      resumeFile,
    );
    handleSuccess(res, 200, application, 'Application updated successfully');
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
}

async function deleteApplication(req, res) {
  try {
    const { id } = req.params;
    const requesterId = req.user._id;

    const result = await applicationsService.deleteApplication(id, requesterId);
    handleSuccess(res, 200, result, 'Application deleted successfully');
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
}

module.exports = {
  createApplication,
  getDashboardMetrics,
  getApplicationsByID,
  getListingApplications,
  updateApplicationStatus,
  updateApplicationData,
  getBusinessApplications,
  deleteApplication,
};
