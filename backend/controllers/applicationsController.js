const applicationsService = require('../services/applicationsService.js');
const { handleSuccess, handleError } = require('../utils/functionHandlers.js');

async function submitApplication(req, res) {
  try {
    const listingId = req.params.listingId;
    const applicantId = req.user._id;

    const applicationData = req.body;
    const application = await applicationsService.submitApplication(
      listingId,
      applicantId,
      applicationData
    );
    handleSuccess(res, 201, application, 'Application submitted successfully.');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function getDashboardData(req, res) {
  try {
    const businessId = req.user._id;
    const data = await applicationsService.getDashboardData(businessId);
    handleSuccess(res, 200, data, 'Dashboard data fetched successfully.')
  } catch (error) {
    handleError(res, error.status, error.message);
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
      requesterId
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
      requesterId
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

    const application = await applicationsService.updateApplicationData(
      id,
      applicationData,
      requesterId
    );
    handleSuccess(res, 200, application, 'Application updated successfully');
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
}

module.exports = {
  submitApplication,
  getDashboardData,
  getApplicationsByID,
  getListingApplications,
  updateApplicationStatus,
  updateApplicationData,
};
