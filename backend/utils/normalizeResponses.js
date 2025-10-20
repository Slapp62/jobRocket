const normalizeUserResponse = (user) => {
  const normalizedUserData = {
    _id: user._id,
    email: user.email,
    phone: user.phone,
    profileType: user.profileType,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
  };

  if (user.profileType === "jobseeker" && user.jobseekerProfile) {
    normalizedUserData.jobseekerProfile = {
      firstName: user.jobseekerProfile.firstName,
      lastName: user.jobseekerProfile.lastName,
      highestEducation: user.jobseekerProfile.highestEducation,
      preferredWorkArrangement: user.jobseekerProfile.preferredWorkArrangement,
      linkedinPage: user.jobseekerProfile.linkedinPage,
      resume: user.jobseekerProfile.resume,
      skills: user.jobseekerProfile.skills,
      description: user.jobseekerProfile.description,
    };
  }

  if (user.profileType === "business" && user.businessProfile) {
    normalizedUserData.businessProfile = {
      name: user.businessProfile.name,
      location: {
        country: user.businessProfile.location.country,
        city: user.businessProfile.location.city,
      },
      logo: {
        url: user.businessProfile.logo.url,
        alt: user.businessProfile.logo.alt,
      },
      industry: user.businessProfile.industry,
      numberOfEmployees: user.businessProfile.numberOfEmployees,
      website: user.businessProfile.website,
      contactEmail: user.businessProfile.contactEmail,
      socialMedia: {
        linkedin: user.businessProfile.socialMedia.linkedin,
        twitter: user.businessProfile.socialMedia.twitter,
        facebook: user.businessProfile.socialMedia.facebook,
      },
      description: user.businessProfile.description,
    };
  }

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
