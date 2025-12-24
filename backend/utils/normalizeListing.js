/**
 * Normalizes listing data before saving to database
 *
 * IMPORTANT: The frontend now sends expiresAt as an ISO string representing
 * midnight in the user's local timezone. We should accept this as-is and let
 * MongoDB store it. Do not manipulate the date on the backend as it could
 * introduce timezone shifts.
 */
const normalizeListing = async (listingData, userId) => {
  // Create default expiration (30 days from now) only if expiresAt is not provided
  // This is used primarily for seeding and legacy code
  let defaultExpiration;
  if (!listingData.expiresAt) {
    const defaultDate = new Date();
    defaultDate.setUTCHours(0, 0, 0, 0); // Set to UTC midnight
    defaultDate.setDate(defaultDate.getDate() + 30); // Add 30 days
    defaultExpiration = defaultDate.toISOString();
  }

  const normalizedListing = {
    ...listingData,
    businessId: userId,
    // If expiresAt is provided (from frontend), use it as-is (it's already an ISO string)
    // If not provided, use default expiration
    expiresAt: listingData.expiresAt || defaultExpiration,
  };

  return normalizedListing;
};

module.exports = normalizeListing;
