const { encryptPassword } = require('../utils/bcrypt');
const { throwError } = require('../utils/functionHandlers');
const Users = require('../models/Users.js');
const { normalizeUserResponse } = require('../utils/normalizeResponses.js');
const { uploadResumeToCloudinary } = require('../utils/uploadResumeToCloudinary.js');
const { logDatabase, logError, logExternalAPI } = require('../utils/logHelpers.js');

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
    const error = new Error('User already exists');
    error.status = 400;
    throw error;
  }

  if (resumeFile){
    try {
      const resumeUrl = await uploadResumeToCloudinary(resumeFile.buffer, userData.email);
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
      if (error.code === 'EAI_AGAIN' || error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
        throwError(503, 'Failed to upload resume due to a network issue. Please try again in a moment.');
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

const getUserById = async (userId) => {
  const user = await Users.findById(userId);
  if (!user) {
    throwError(404, 'Account not found. Please check and try again.');
  }
  const normalizedUser = normalizeUserResponse(user);
  return normalizedUser;
};

const updateProfile = async (userId, updateData, resumeFile) => {
  if (resumeFile){
    const user = await Users.findById(userId);
    if (!user) {
      throwError(404, 'User not found');
    }

    try {
      const resumeUrl = await uploadResumeToCloudinary(resumeFile.buffer, user.email);

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
      if (error.code === 'EAI_AGAIN' || error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
        throwError(503, 'Failed to upload resume due to a network issue. Please try again in a moment.');
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
  const deletedUser = await Users.findByIdAndDelete(userId);
  if (!deletedUser) {
    throwError(404, 'User not found');
  }

  // Log database operation
  logDatabase('delete', 'Users', {
    userId,
    email: deletedUser.email,
    profileType: deletedUser.profileType,
  });

  const normalizedUser = normalizeUserResponse(deletedUser);
  return normalizedUser;
};

module.exports = {
  getAllUsers,
  registerUser,
  getUserById,
  toggleRole,
  updateProfile,
  deleteUser,
};
