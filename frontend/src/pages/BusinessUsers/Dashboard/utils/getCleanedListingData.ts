import { TListing, TUsers } from '@/Types';

/**
 * Calculate how many days remain until expiration
 * Returns the number of days as a valid duration (7, 14, 30, 60, 90)
 * If expired or invalid, defaults to 7 days
 */
const calculateDaysRemaining = (expiresAt: string | Date): number => {
  const expiresDate = new Date(expiresAt);
  const today = new Date();
  const diffTime = expiresDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Valid duration options in the form
  const validDurations = [7, 14, 30, 60, 90];

  // If already expired or very close to expiration, default to 7 days
  if (diffDays <= 0) {
    return 7;
  }

  // Find the closest valid duration that's greater than or equal to remaining days
  // This ensures we don't accidentally shorten an active listing
  const closestDuration = validDurations.find((duration) => duration >= diffDays);

  return closestDuration || 90; // If remaining days > 90, use maximum (90)
};

export const cleanedUserData = (user: TUsers) => ({
  phone: user.phone,
  profileType: user.profileType,
  ...(user.profileType === 'jobseeker' &&
    user.jobseekerProfile && {
      jobseekerProfile: {
        firstName: user.jobseekerProfile.firstName,
        lastName: user.jobseekerProfile.lastName,
        highestEducation: user.jobseekerProfile.highestEducation,
        preferredWorkArrangement: user.jobseekerProfile.preferredWorkArrangement,
        linkedinPage: user.jobseekerProfile.linkedinPage || '',
        resume: user.jobseekerProfile.resume || '',
        skills: user.jobseekerProfile.skills || [],
        description: user.jobseekerProfile.description || '',
      },
    }),
  ...(user.profileType === 'business' &&
    user.businessProfile && {
      businessProfile: {
        companyName: user.businessProfile.companyName,
        location: {
          country: user.businessProfile.location.country,
          region: user.businessProfile.location.region,
          city: user.businessProfile.location.city,
        },
        logo: {
          url: user.businessProfile.logo?.url || '',
          alt: user.businessProfile.logo?.alt || '',
        },
        industry: user.businessProfile.industry,
        numberOfEmployees: user.businessProfile.numberOfEmployees,
        website: user.businessProfile.website || '',
        contactEmail: user.businessProfile.contactEmail || '',
        socialMedia: {
          linkedin: user.businessProfile.socialMedia?.linkedin || '',
          twitter: user.businessProfile.socialMedia?.twitter || '',
          facebook: user.businessProfile.socialMedia?.facebook || '',
        },
        description: user.businessProfile.description || '',
      },
    }),
});

export const cleanedListingData = (listing: TListing) => ({
  companyName: listing.companyName,
  jobTitle: listing.jobTitle,
  jobDescription: listing.jobDescription,
  requirements: listing.requirements,
  advantages: listing.advantages,
  apply: listing.apply,
  location: listing.location,
  workArrangement: listing.workArrangement,
  requiredExperience: listing.requiredExperience,
  isActive: listing.isActive ?? true,
  // Calculate appropriate duration based on current expiration date
  expiresAt: listing.expiresAt ? calculateDaysRemaining(listing.expiresAt) : 7,
});
