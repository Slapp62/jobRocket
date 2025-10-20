import { TCards, TUsers } from "@/Types";

export const cleanedUserData = (user: TUsers) => ({
        phone: user.phone,
        profileType: user.profileType,
        ...(user.profileType === 'jobseeker' && user.jobseekerProfile && {
            jobseekerProfile: {
                firstName: user.jobseekerProfile.firstName,
                lastName: user.jobseekerProfile.lastName,
                highestEducation: user.jobseekerProfile.highestEducation,
                preferredWorkArrangement: user.jobseekerProfile.preferredWorkArrangement,
                linkedinPage: user.jobseekerProfile.linkedinPage || '',
                resume: user.jobseekerProfile.resume || '',
                skills: user.jobseekerProfile.skills || [],
                description: user.jobseekerProfile.description || '',
            }
        }),
        ...(user.profileType === 'business' && user.businessProfile && {
            businessProfile: {
                name: user.businessProfile.name,
                location: {
                    country: user.businessProfile.location.country,
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
            }
        })
});

export const cleanedCardData = (card: TCards) => ({
        title: card.title,
        subtitle: card.subtitle,
        description: card.description,
        phone: card.phone,
        email: card.email,
        web: card.web,
        image: {
            url: card.image?.url || '',
            alt: card.image?.alt || '',
        },
        address: {
            country: card.address?.country,
            state: card.address?.state || '',
            city: card.address?.city,
            street: card.address?.street,
            houseNumber: String(card.address?.houseNumber),
            zip: String(card.address?.zip),
        }
    })