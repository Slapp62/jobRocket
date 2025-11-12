const Applications = require('../models/Applications.js');
const Listings = require('../models/Listings.js');

async function submitApplication(listingId, applicantId, applicationData) {
  // Check if listing exists and is active
  const listing = await Listings.findById(listingId);
  if (!listing) {
    const error = new Error('Listing not found');
    error.status = 404;
    throw error;
  }
  if (!listing.isActive) {
    const error = new Error('Cannot apply to inactive listing');
    error.status = 400;
    throw error;
  }

  // Create application
  const application = new Applications({
    listingId,
    applicantId,
    resume: applicationData.resume,
    coverLetter: applicationData.coverLetter, // Can be undefined
    message: applicationData.message, // Can be undefined
    status: 'pending',
  });

  await application.save();
  return application;
}

async function getApplicantApplications(applicantId) {
  const applications = await Applications.find({ applicantId })
    .populate('listingId', 'jobTitle companyName') // Fetch only these fields from listing
    .sort({ createdAt: -1 });

  return applications;
}

async function getListingApplications(listingId, requesterId) {
  // Verify requester owns this listing
  const listing = await Listings.findById(listingId);
  if (!listing) {
    const error = new Error('Listing not found');
    error.status = 404;
    throw error;
  }

  if (listing.businessId.toString() !== requesterId) {
    const error = new Error('Not authorized to view these applications');
    error.status = 403;
    throw error;
  }

  const applications = await Applications.find({ listingId })
    .populate(
      'applicantId',
      'jobseekerProfile.firstName jobseekerProfile.lastName'
    )
    .sort({ createdAt: -1 });

  return applications;
}

async function updateApplicationStatus(applicationId, newStatus, requesterId) {
  const application =
    await Applications.findById(applicationId).populate('listingId');

  if (!application) {
    const error = new Error('Application not found');
    error.status = 404;
    throw error;
  }

  // Verify requester owns the listing
  if (application.listingId.businessId.toString() !== requesterId) {
    const error = new Error('Not authorized');
    error.status = 403;
    throw error;
  }

  application.status = newStatus;
  await application.save();
  return application;
}

module.exports = {
  submitApplication,
  getApplicantApplications,
  getListingApplications,
  updateApplicationStatus,
};
