const { encryptPassword } = require('../utils/bcrypt');
const { throwError } = require('../utils/functionHandlers');
const Users = require('../models/Users.js');
const { normalizeUserResponse } = require('../utils/normalizeResponses.js');
const {
  uploadResumeToCloudinary,
} = require('../utils/uploadResumeToCloudinary.js');
const {
  logDatabase,
  logError,
  logExternalAPI,
} = require('../utils/logHelpers.js');

const getAllUsers = async () => {
  const users = await Users.find().select('-password').lean();
  if (!users || users.length === 0) {
    throwError(400, 'No users found in the system.');
  }
  const normalizedUsers = users.map((user) => normalizeUserResponse(user));
  return normalizedUsers;
};

const registerUser = async (userData, resumeFile) => {
  const existingUser = await Users.findOne({ email: userData.email });
  if (existingUser) {
    // Provide specific error message based on auth method
    let errorMessage = 'User already exists';
    if (existingUser.googleId) {
      errorMessage =
        'An account with this email already exists. Please login with Google.';
    } else if (existingUser.password) {
      errorMessage =
        'An account with this email already exists. Please login with your email and password.';
    }

    const error = new Error(errorMessage);
    error.status = 400;
    error.authMethod = existingUser.googleId ? 'google' : 'password';
    throw error;
  }

  if (resumeFile) {
    try {
      const resumeUrl = await uploadResumeToCloudinary(
        resumeFile.buffer,
        userData.email
      );
      if (!userData.jobseekerProfile) {
        userData.jobseekerProfile = {};
      }
      userData.jobseekerProfile.resume = resumeUrl.secure_url;

      // Log successful Cloudinary upload
      logExternalAPI('Cloudinary', 'upload-resume', {
        email: userData.email,
        fileSize: resumeFile.size,
        success: true,
        url: resumeUrl.secure_url,
      });
    } catch (error) {
      // Log Cloudinary upload failure
      logError(error, {
        operation: 'cloudinary-upload-resume',
        email: userData.email,
        fileSize: resumeFile?.size,
      });

      // Detect network-related errors
      if (
        error.code === 'EAI_AGAIN' ||
        error.code === 'ETIMEDOUT' ||
        error.code === 'ECONNREFUSED'
      ) {
        throwError(
          503,
          'Failed to upload resume due to a network issue. Please try again in a moment.'
        );
      }
      // Re-throw other errors to preserve original error handling
      throw error;
    }
  }

  const encryptedPassword = await encryptPassword(userData.password);
  userData.password = encryptedPassword;

  const newUser = new Users(userData);
  const savedUser = await newUser.save();

  // Log database operation
  logDatabase('create', 'Users', {
    userId: savedUser._id,
    email: savedUser.email,
    profileType: savedUser.profileType,
    hasResume: !!resumeFile,
  });

  const normalizedUser = normalizeUserResponse(savedUser);
  return normalizedUser;
};

const registerGoogleUser = async (userData) => {
  // Check if user already exists with this email or Google ID
  const existingUser = await Users.findOne({
    $or: [{ email: userData.email }, { googleId: userData.googleId }],
  });
  if (existingUser) {
    // Provide specific error message based on auth method
    let errorMessage = 'User already exists';
    if (existingUser.googleId) {
      errorMessage =
        'An account with this email already exists. Please login with Google.';
    } else if (existingUser.password) {
      errorMessage =
        'An account with this email already exists. Please login with your email and password.';
    }

    const error = new Error(errorMessage);
    error.status = 400;
    error.authMethod = existingUser.googleId ? 'google' : 'password';
    throw error;
  }

  // Google OAuth users don't have a password (it's set to null)
  // No need to encrypt password for OAuth users

  const newUser = new Users(userData);
  const savedUser = await newUser.save();

  // Log database operation
  logDatabase('create', 'Users', {
    userId: savedUser._id,
    email: savedUser.email,
    profileType: savedUser.profileType,
    authMethod: 'google-oauth',
  });

  const normalizedUser = normalizeUserResponse(savedUser);
  return normalizedUser;
};

const getUserById = async (userId) => {
  const user = await Users.findById(userId);
  if (!user) {
    throwError(404, 'Account not found. Please check and try again.');
  }
  const normalizedUser = normalizeUserResponse(user);
  return normalizedUser;
};

const updateProfile = async (userId, updateData, resumeFile) => {
  if (resumeFile) {
    const user = await Users.findById(userId);
    if (!user) {
      throwError(404, 'User not found');
    }

    try {
      const resumeUrl = await uploadResumeToCloudinary(
        resumeFile.buffer,
        user.email
      );

      // Add the Cloudinary URL to the update data
      if (!updateData.jobseekerProfile) {
        updateData.jobseekerProfile = {};
      }
      updateData.jobseekerProfile.resume = resumeUrl.secure_url;

      // Log successful Cloudinary upload
      logExternalAPI('Cloudinary', 'upload-resume', {
        userId,
        email: user.email,
        fileSize: resumeFile.size,
        success: true,
        url: resumeUrl.secure_url,
      });
    } catch (error) {
      // Log Cloudinary upload failure
      logError(error, {
        operation: 'cloudinary-upload-resume',
        userId,
        fileSize: resumeFile?.size,
      });

      // Detect network-related errors
      if (
        error.code === 'EAI_AGAIN' ||
        error.code === 'ETIMEDOUT' ||
        error.code === 'ECONNREFUSED'
      ) {
        throwError(
          503,
          'Failed to upload resume due to a network issue. Please try again in a moment.'
        );
      }
      // Re-throw other errors to preserve original error handling
      throw error;
    }
  }
  const updatedUser = await Users.findByIdAndUpdate(userId, updateData, {
    new: true,
  });
  if (!updatedUser) {
    throwError(
      404,
      "Your profile couldn't be updated. Please try logging in again."
    );
  }

  // Log database operation
  logDatabase('update', 'Users', {
    userId,
    updatedFields: Object.keys(updateData),
    hasResume: !!resumeFile,
  });

  const normalizedUser = normalizeUserResponse(updatedUser);
  return normalizedUser;
};

const toggleRole = async (userId) => {
  const user = await Users.findById(userId);
  if (!user) {
    throwError(
      404,
      "Your account couldn't be found. Please try logging in again."
    );
  }
  const newProfileType =
    user.profileType === 'jobseeker' ? 'business' : 'jobseeker';
  const updatedUser = await Users.findByIdAndUpdate(
    userId,
    { profileType: newProfileType },
    { new: true }
  );
  const normalizedUser = normalizeUserResponse(updatedUser);
  return normalizedUser;
};

const deleteUser = async (userId) => {
  const AnalyticsEvent = require('../models/AnalyticsEvent');

  const user = await Users.findById(userId);
  if (!user) {
    throwError(404, 'User not found');
  }

  // Soft delete: Mark as deleted with timestamp (30-day grace period)
  user.isDeleted = true;
  user.deletedAt = new Date();
  await user.save();

  // PRIVACY COMPLIANCE: Anonymize analytics events
  // Set userId to null while keeping aggregate data for platform metrics
  // This allows us to maintain business intelligence while protecting user privacy
  await AnalyticsEvent.updateMany({ userId }, { $set: { userId: null } });

  // Log database operation
  logDatabase('soft-delete', 'Users', {
    userId,
    email: user.email,
    profileType: user.profileType,
    deletedAt: user.deletedAt,
    analyticsAnonymized: true,
  });

  const normalizedUser = normalizeUserResponse(user);
  return normalizedUser;
};

const exportUserData = async (userId) => {
  const Applications = require('../models/Applications');
  const AnalyticsEvent = require('../models/AnalyticsEvent');

  const user = await Users.findById(userId);
  if (!user) {
    throwError(404, 'User not found');
  }

  // Get all applications submitted by this user
  const applications = await Applications.find({ applicantId: userId })
    .populate('listingId', 'jobTitle companyName')
    .lean();

  // Get all analytics events for this user (for GDPR/Amendment 13 compliance)
  const userEvents = await AnalyticsEvent.find({ userId }).lean();

  // Build comprehensive data export
  const exportData = {
    exportDate: new Date().toISOString(),
    exportVersion: '1.0',
    user: {
      account: {
        email: user.email,
        phone: user.phone,
        profileType: user.profileType,
        createdAt: user.createdAt,
        isAdmin: user.isAdmin,
      },
      consents: {
        dataProcessing: user.consents?.dataProcessing,
      },
    },
    applications: applications.map((app) => ({
      id: app._id,
      jobTitle: app.listingId?.jobTitle || 'Unknown',
      companyName: app.listingId?.companyName || 'Unknown',
      firstName: app.firstName,
      lastName: app.lastName,
      email: app.email,
      phone: app.phone,
      resumeUrl: app.resumeUrl,
      message: app.message,
      status: app.status,
      matchScore: app.matchScore,
      createdAt: app.createdAt,
      consent: app.applicationDataConsent,
    })),
  };

  // Add profile-specific data
  if (user.profileType === 'jobseeker' && user.jobseekerProfile) {
    exportData.user.jobseekerProfile = {
      firstName: user.jobseekerProfile.firstName,
      lastName: user.jobseekerProfile.lastName,
      highestEducation: user.jobseekerProfile.highestEducation,
      preferredWorkArrangement: user.jobseekerProfile.preferredWorkArrangement,
      linkedinPage: user.jobseekerProfile.linkedinPage,
      resume: user.jobseekerProfile.resume,
      skills: user.jobseekerProfile.skills,
      professionalSummary: user.jobseekerProfile.professionalSummary,
    };
  } else if (user.profileType === 'business' && user.businessProfile) {
    exportData.user.businessProfile = {
      companyName: user.businessProfile.companyName,
      location: user.businessProfile.location,
      numberOfEmployees: user.businessProfile.numberOfEmployees,
      companyLogo: user.businessProfile.companyLogo,
      companyDescription: user.businessProfile.companyDescription,
      website: user.businessProfile.website,
      contactEmail: user.businessProfile.contactEmail,
      socialMedia: user.businessProfile.socialMedia,
    };
  }

  // Add analytics data (privacy-compliant operational data)
  exportData.analytics = {
    summary: {
      totalSearches: userEvents.filter((e) => e.eventType === 'search').length,
      totalJobViews: userEvents.filter((e) => e.eventType === 'job_view')
        .length,
      totalApplications: userEvents.filter(
        (e) => e.eventType === 'application_submit'
      ).length,
    },
    searchHistory: userEvents
      .filter((e) => e.eventType === 'search')
      .map((e) => ({
        query: e.metadata?.searchQuery,
        resultsCount: e.metadata?.resultsCount,
        timestamp: e.timestamp,
      }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
    viewHistory: userEvents
      .filter((e) => e.eventType === 'job_view')
      .map((e) => ({
        jobId: e.jobId,
        timestamp: e.timestamp,
      }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
  };

  return exportData;
};

module.exports = {
  getAllUsers,
  registerUser,
  registerGoogleUser,
  getUserById,
  toggleRole,
  updateProfile,
  deleteUser,
  exportUserData,
};
