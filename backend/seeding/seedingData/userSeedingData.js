const dummyUsers = [
  {
    email: 'sarah.cohen@email.com',
    password: 'Password123!',
    phone: '050-1234567',
    profileType: 'jobseeker',
    jobseekerProfile: {
      firstName: 'Sarah',
      lastName: 'Cohen',
      highestEducation: "Bachelor's Degree",
      preferredWorkArrangement: 'Full-time Hybrid',
      linkedinPage: 'https://www.linkedin.com/in/sarahcohen',
      resume: '',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      description:
        'Passionate full-stack developer with 3 years of experience in web development.',
    },
    isAdmin: false,
  },
  {
    email: 'david.levi@email.com',
    password: 'BizPass789$',
    phone: '052-9876543',
    profileType: 'business',
    businessProfile: {
      name: 'Tech Solutions Ltd',
      location: {
        country: 'Israel',
        city: 'Jerusalem',
      },
      logo: {
        url: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/company-logo.jpg',
        alt: 'Tech Solutions Ltd logo',
      },
      industry: 'Software Development',
      numberOfEmployees: '51-200',
      website: 'https://www.techsolutions.co.il',
      contactEmail: 'hr@techsolutions.co.il',
      socialMedia: {
        linkedin: 'https://www.linkedin.com/company/techsolutions',
        twitter: 'https://twitter.com/techsolutions',
        facebook: 'https://www.facebook.com/techsolutions',
      },
      description:
        'Leading software development company specializing in enterprise solutions.',
    },
    isAdmin: false,
  },
  {
    email: 'admin@email.com',
    password: 'AdminPass789$',
    phone: '054-5555555',
    profileType: 'admin',
    adminProfile: {
      name: 'Admin',
    },
    isAdmin: true,
  },
];

module.exports = dummyUsers;
