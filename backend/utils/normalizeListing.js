const normalizeListing = async (listingData, userId) => {
  const normalizedListing = {
    ...listingData,
    businessId: userId,
  };

  return normalizedListing;
};

module.exports = normalizeListing;
