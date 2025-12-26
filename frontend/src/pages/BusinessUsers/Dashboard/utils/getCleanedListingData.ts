import { TListing, TUsers } from '@/Types';

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
  isActive: listing.isActive ?? true,
  // Default to 7 days for edit mode
  expiresAt: 7,
});
