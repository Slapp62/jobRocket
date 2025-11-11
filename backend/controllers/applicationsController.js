const { createApplication, getApplicantApplications, getListingApplications, updateApplicationStatus } = require("../services/applicationsService.js");
const { handleSuccess, handleError } = require("../utils/functionHandlers.js");

async function submitApplication(req, res) {
    try {
        const { listingId } = req.params.listingId;
        const {applicantId} = req.user._id;
        const applicationData = req.body;
        const application = await createApplication(listingId, applicantId, applicationData);
        handleSuccess(res, 201, application, "Application submitted successfully.");
    } catch (error) {
        handleError(res, error.status, error.message);
    }
}

async function getApplicationsByID(req, res) {
  try {
    const applicantId = req.user._id;
    const applications = await getApplicantApplications(applicantId);
    handleSuccess(res, 200, applications);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
}

async function getListingApplications(req, res) {
  try {
    const { listingId } = req.params;
    const requesterId = req.user._id;
    const applications = await getListingApplications(listingId, requesterId);
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
    
    const application = await updateApplicationStatus(id, status, requesterId);
    handleSuccess(res, 200, application, "Application status updated");
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
}

module.exports = {
    submitApplication,
    getApplicationsByID,
    getListingApplications,
    updateApplicationStatus,
};
