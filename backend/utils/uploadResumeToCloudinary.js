const cloudinary = require('cloudinary').v2;

async function uploadResumeToCloudinary(fileBuffer, applicantEmail) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'resumes',
        resource_type: 'raw',
        public_id: `resume_${applicantEmail}_${Date.now()}`,
        timeout: 60000, // 60 second timeout
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    uploadStream.end(fileBuffer);
  });
}

module.exports = { uploadResumeToCloudinary };
