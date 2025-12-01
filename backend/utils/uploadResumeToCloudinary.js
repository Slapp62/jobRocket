const cloudinary = require('cloudinary').v2;
const chalk = require('chalk');
const streamifier = require('streamifier');

/**
 * Upload a resume PDF to Cloudinary with automatic retries.
 * @param {Buffer} fileBuffer - The file buffer from Multer memoryStorage.
 * @param {string} applicantEmail - Applicant's email for naming the file.
 * @param {number} maxRetries - Number of times to retry on failure (default 3).
 */
async function uploadResumeToCloudinary(fileBuffer, applicantEmail, maxRetries = 3) {
  let attempt = 0;
  const date = new Date().toISOString().split('T')[0];
  while (attempt < maxRetries) {
    try {
      return await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'resumes',
            resource_type: 'raw', // PDFs and other non-image files
            public_id: `resume_${applicantEmail}_${date}`,
            flags: 'attachment: false'
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        // Stream the buffer into Cloudinary
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
      });
    } catch (error) {
      attempt++;
      console.log(
        chalk.yellow(
          `Upload attempt ${attempt} failed: ${error.message}. Retrying...`
        )
      );

      if (attempt >= maxRetries) {
        console.log(chalk.red(`File: uploadResumeToCloudinary - All retries failed`));
        throw error;
      }
    }
  }
}

module.exports = {
  uploadResumeToCloudinary
};
