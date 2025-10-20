const normalizeUserResponse = (user) => {
  const normalizedUserData = {
    _id: user._id,
    name: {
      first: user.name.first,
      middle: user.name.middle,
      last: user.name.last,
    },
    phone: user.phone,
    email: user.email,
    image: {
      url: user.image.url,
      alt: user.image.alt,
    },
    address: {
      state: user.address.state,
      country: user.address.country,
      city: user.address.city,
      street: user.address.street,
      houseNumber: user.address.houseNumber,
      zip: user.address.zip,
    },
    isAdmin: user.isAdmin,
    isBusiness: user.isBusiness,
    createdAt: user.createdAt,
  };
  return normalizedUserData;
};

const normalizeListingResponse = (listing) => {
  const normalizedListingData = {
    _id: listing._id,
    businessId: listing.businessId,
    jobTitle: listing.jobTitle,
    jobDescription: listing.jobDescription,
    requirements: listing.requirements,
    advantages: listing.advantages,
    apply: {
      method: listing.apply.method,
      contact: listing.apply.contact,
    },
    location: {
      region: listing.location.region,
      city: listing.location.city,
    },
    workArrangement: listing.workArrangement,
    industry: listing.industry,
    likes: listing.likes,
    isActive: listing.isActive,
    createdAt: listing.createdAt,
    expiresAt: listing.expiresAt,
  };

  return normalizedListingData;
};

module.exports = { normalizeUserResponse, normalizeListingResponse };
