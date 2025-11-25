const Applications = require('../models/Applications.js');
const Listings = require('../models/Listings.js');
const { normalizeApplicationResponse } = require('../utils/normalizeResponses');

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
    applicantId: applicantId,
    firstName: applicationData.firstName,
    lastName: applicationData.lastName,
    email: applicationData.email,
    phone: applicationData.phone === '' ? undefined : applicationData.phone,
    resume: applicationData.resume,
    message:
      applicationData.message === '' ? undefined : applicationData.message,
    status: 'pending',
  });
  console.log(application);
  await application.save();
  return application;
}

async function getApplicantApplications(applicantId) {
  const applications = await Applications.find({ applicantId })
    .populate('listingId') // Fetch all listing fields
    .sort({ createdAt: -1 });

  return applications;
}

async function getDashboardMetrics(businessId){
  const listings = await Listings.find({businessId: businessId});
  if (!listings || listings.length === 0) {
    const error = new Error('No listings found');
    error.status = 404;
    throw error;
  }

  const listingIds = listings.map(listing => listing._id);
  const applications = await Applications.find({listingId : {$in: listingIds}})
  let reviewed = 0;
  let pending = 0;
  let rejected = 0;

  applications.forEach((application) => {
    application.status === 'pending' ? ++pending :
    application.status === 'reviewed' ? ++reviewed :
    ++rejected; 
  })

  return {
    metrics: {
      totalListings: listings.length,
      totalApplications: applications.length,
      pendingApplications: pending,
      reviewedApplications: reviewed,
      rejectedApplications: rejected,
    }
  }
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
      'jobseekerProfile.firstName jobseekerProfile.lastName jobseekerProfile.email jobseekerProfile.phone jobseekerProfile.resume jobseekerProfile.message'
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

async function updateApplicationData(
  applicationId,
  applicationData,
  requesterId
) {
  const application = await Applications.findById(applicationId);

  if (!application) {
    const error = new Error('Application not found');
    error.status = 404;
    throw error;
  }

  // Verify requester is the applicant
  if (application.applicantId.toString() !== requesterId) {
    const error = new Error('Not authorized to update this application');
    error.status = 403;
    throw error;
  }

  // Only allow updates if status is pending
  if (application.status !== 'pending') {
    const error = new Error('Cannot update application that is not pending');
    error.status = 400;
    throw error;
  }

  // Update allowed fields
  if (applicationData.firstName)
    application.firstName = applicationData.firstName;
  if (applicationData.lastName) application.lastName = applicationData.lastName;
  if (applicationData.email) application.email = applicationData.email;
  if (applicationData.phone !== undefined)
    application.phone =
      applicationData.phone === '' ? undefined : applicationData.phone;
  if (applicationData.resume) application.resume = applicationData.resume;
  if (applicationData.message !== undefined)
    application.message =
      applicationData.message === '' ? undefined : applicationData.message;

  await application.save();
  return application;
}

module.exports = {
  submitApplication,
  getDashboardMetrics,
  getApplicantApplications,
  getListingApplications,
  updateApplicationStatus,
  updateApplicationData,
};
