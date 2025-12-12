const Applications = require('../models/Applications.js');
const Listings = require('../models/Listings.js');
const User = require('../models/Users.js');
const { throwError } = require('../utils/functionHandlers.js');
const { normalizeApplicationResponse } = require('../utils/normalizeResponses');
const { uploadResumeToCloudinary } = require('../utils/uploadResumeToCloudinary.js');
const matchingService = require('./matchingService.js');


async function createApplication(listingId, applicantId, applicationData, resumeFile) {
  // Check if listing exists and is active
  const listing = await Listings.findById(listingId);
  if (!listing) {
    throwError(404, 'Listing not found');
  }
  if (!listing.isActive) {
    throwError(400, 'Cannot apply to inactive listing');
  }

  if (applicantId){
    const user = await User.findById(applicantId);
    if (!user) {
      throwError(404, 'User not found');
    }
    if (!user.jobseekerProfile.embedding) {
      throwError(400, 'User has no jobseeker profile');
    }
    const matchScore = matchingService.calculateMatchScore(
      user.jobseekerProfile.embedding,
      listing.embedding
    );
    applicationData.matchScore = matchScore;
  }

  const resumeUrl = await uploadResumeToCloudinary(resumeFile.buffer, applicationData.email);
  
  // Create application
  const application = new Applications({
    listingId,
    applicantId: applicantId || null,
    firstName: applicationData.firstName,
    lastName: applicationData.lastName, 
    email: applicationData.email,
    phone: applicationData.phone === '' ? undefined : applicationData.phone,
    resumeUrl: resumeUrl.secure_url,
    message:
      applicationData.message === '' ? undefined : applicationData.message,
    status: 'pending',
    matchScore: applicationData.matchScore || null,
  });
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
    throwError(404, 'No listings found');
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
    throwError(404, 'Listing not found');
  }

  if (listing.businessId.toString() !== requesterId) {
    throwError(403, 'Not authorized to view these applications');
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
    throwError(404, 'Application not found');
  }

  // Verify requester owns the listing
  if (application.listingId.businessId.toString() !== requesterId) {
    throwError(403, 'Not authorized');
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
    throwError(404, 'Application not found');
  }

  // Verify requester is the applicant
  if (application.applicantId.toString() !== requesterId) {
    throwError(403, 'Not authorized to update this application');
  }

  // Only allow updates if status is pending
  if (application.status !== 'pending') {
    throwError(400, 'Cannot update application that is not pending');
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


async function deleteApplication(applicationId, listingId, requesterId) {
  const application =
    await Applications.findById(applicationId).populate('listingId');
  if (!application) {
    throwError(404, 'Application not found');
  }

  if (application.listingId.businessId.toString() !== requesterId || application.applicantId.toString() !== requesterId) {
    throwError(403, 'Not authorized to delete this application');
  }

  await Applications.findByIdAndUpdate(applicationId, { hiddenFromBusiness: true });
  return { deleted: true, id: applicationId };
}


module.exports = {
  createApplication,
  getDashboardMetrics,
  getApplicantApplications,
  getListingApplications,
  updateApplicationStatus,
  updateApplicationData,
  deleteApplication,
};
