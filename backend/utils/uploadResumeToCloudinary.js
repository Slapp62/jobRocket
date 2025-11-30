const cloudinary = require('cloudinary').v2;

async function uploadResumeToCloudinary(fileBuffer, applicantEmail) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'resumes',
        resource_type: 'raw',
        public_id: `resume_${applicantEmail}_${Date.now()}`
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    
    uploadStream.end(fileBuffer);
  });
}

module.exports = {
  uploadResumeToCloudinary
};