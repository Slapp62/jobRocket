/**
 * File Validation Utilities
 *
 * This file contains validation functions for file uploads.
 * These are separate from Joi validation because Joi is designed for
 * validating plain JavaScript objects, not File objects or binary data.
 */

// Maximum file size: 5MB (in bytes)
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed MIME type for PDF files
export const ALLOWED_FILE_TYPE = 'application/pdf';

/**
 * Validates a PDF file for upload
 *
 * @param file - The File object to validate (or null if no file selected)
 * @returns An error message string if validation fails, or null if valid
 *
 * Validation checks:
 * 1. File exists (not null)
 * 2. File size is under 5MB
 * 3. File MIME type is 'application/pdf'
 * 4. File name ends with '.pdf' extension
 */
export function validatePdfFile(file: File | null): string | null {
  // Check if file exists
  if (!file) {
    return null; // No file is valid (for optional uploads)
  }

  // Check file size (must be 5MB or less)
  if (file.size > MAX_FILE_SIZE) {
    return 'File size must be less than 5MB';
  }

  // Check MIME type
  if (file.type !== ALLOWED_FILE_TYPE) {
    return 'Only PDF files are allowed';
  }

  // Check file extension (additional security check)
  if (!file.name.toLowerCase().endsWith('.pdf')) {
    return 'File must have a .pdf extension';
  }

  // All checks passed
  return null;
}

/**
 * Validates a PDF file for required upload contexts
 * (like application forms where resume is mandatory)
 *
 * @param file - The File object to validate (or null if no file selected)
 * @returns An error message string if validation fails, or null if valid
 */
export function validateRequiredPdfFile(file: File | null): string | null {
  // First check if file exists (required)
  if (!file) {
    return 'Please select a file';
  }

  // Then run all other validations
  return validatePdfFile(file);
}
