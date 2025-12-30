const dummyApplications = [
  {
    // Application for Senior Full Stack Developer (Sarah Cohen)
    listingIndex: 0, // Will be mapped to actual listing ID
    firstName: 'Sarah',
    lastName: 'Cohen',
    email: 'sarah.cohen@email.com',
    phone: '0541234567',
    resumeUrl: 'https://www.linkedin.com/in/sarah-cohen/',
    message:
      'I would love to discuss how my skills in full-stack development can contribute to your team. I am available for an interview at your earliest convenience.',
    status: 'pending',
    applicationDataConsent: {
      sharedFields: {
        name: true,
        email: true,
        phone: true,
        resume: true,
      },
      consentGranted: true,
      consentTimestamp: new Date('2025-12-21T19:26:15.363Z'),
      ipAddress: '127.0.0.1',
      userAgent:
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36 Edg/143.0.0.0',
      employerName: 'FinTech Pro',
    },
  },
  {
    // Application for Data Scientist (Sarah Cohen - also applying)
    listingIndex: 2,
    firstName: 'Sarah',
    lastName: 'Cohen',
    email: 'sarah.cohen@email.com',
    phone: '0541234567',
    resumeUrl: 'https://www.linkedin.com/in/sarah-cohen/',
    status: 'reviewed',
    applicationDataConsent: {
      sharedFields: {
        name: true,
        email: true,
        phone: true,
        resume: true,
      },
      consentGranted: true,
      consentTimestamp: new Date('2025-12-21T19:26:15.363Z'),
      ipAddress: '127.0.0.1',
      userAgent:
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36 Edg/143.0.0.0',
      employerName: 'FinTech Pro',
    },
  },
  {
    // Application for DevOps Engineer (Admin User)
    listingIndex: 4,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@email.com',
    phone: '0541234567',
    resumeUrl: 'https://www.linkedin.com/in/admin-user/',
    message:
      'I have reviewed your technology stack and am excited about the opportunity to work with modern DevOps tools. I am particularly interested in discussing how I can contribute to improving your system reliability and deployment processes.',
    status: 'pending',
    applicationDataConsent: {
      sharedFields: {
        name: true,
        email: true,
        phone: true,
        resume: true,
      },
      consentGranted: true,
      consentTimestamp: new Date('2025-12-21T19:26:15.363Z'),
      ipAddress: '127.0.0.1',
      userAgent:
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36 Edg/143.0.0.0',
      employerName: 'FinTech Pro',
    },
  },
  {
    // Application for UX/UI Designer (Sarah Cohen - diverse applications)
    listingIndex: 5,
    firstName: 'Sarah',
    lastName: 'Cohen',
    email: 'sarah.cohen@email.com',
    phone: '0541234567',
    resumeUrl: 'https://www.linkedin.com/in/sarah-cohen/',
    status: 'rejected',
    applicationDataConsent: {
      sharedFields: {
        name: true,
        email: true,
        phone: true,
        resume: true,
      },
      consentGranted: true,
      consentTimestamp: new Date('2025-12-21T19:26:15.363Z'),
      ipAddress: '127.0.0.1',
      userAgent:
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36 Edg/143.0.0.0',
      employerName: 'FinTech Pro',
    },
  },
  {
    // Application for Cybersecurity Analyst (Admin User)
    listingIndex: 6,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@email.com',
    phone: '0541234567',
    resumeUrl: 'https://www.linkedin.com/in/admin-user/',
    message:
      'I have experience working with distributed teams and am comfortable with remote work arrangements. I would welcome the opportunity to discuss how my security expertise can contribute to protecting your organization.',
    status: 'reviewed',
    applicationDataConsent: {
      sharedFields: {
        name: true,
        email: true,
        phone: true,
        resume: true,
      },
      consentGranted: true,
      consentTimestamp: new Date('2025-12-21T19:26:15.363Z'),
      ipAddress: '127.0.0.1',
      userAgent:
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36 Edg/143.0.0.0',
      employerName: 'FinTech Pro',
    },
  },
  {
    // Application for QA Automation Engineer (Admin User)
    listingIndex: 10,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@email.com',
    phone: '0541234567',
    resumeUrl: 'https://www.linkedin.com/in/admin-user/',
    status: 'pending',
    applicationDataConsent: {
      sharedFields: {
        name: true,
        email: true,
        phone: true,
        resume: true,
      },
      consentGranted: true,
      consentTimestamp: new Date('2025-12-21T19:26:15.363Z'),
      ipAddress: '127.0.0.1',
      userAgent:
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36 Edg/143.0.0.0',
      employerName: 'FinTech Pro',
    },
  },
  {
    // Application for Online Learning Platform Developer (Sarah Cohen)
    listingIndex: 12,
    firstName: 'Sarah',
    lastName: 'Cohen',
    email: 'sarah.cohen@email.com',
    phone: '0541234567',
    resumeUrl: 'https://www.linkedin.com/in/sarah-cohen/',
    message:
      'I would love to demonstrate some of the educational projects I have built and discuss how my experience can contribute to your e-learning platform. I am available for a technical discussion at your convenience.',
    status: 'reviewed',
    applicationDataConsent: {
      sharedFields: {
        name: true,
        email: true,
        phone: true,
        resume: true,
      },
      consentGranted: true,
      consentTimestamp: new Date('2025-12-21T19:26:15.363Z'),
      ipAddress: '127.0.0.1',
      userAgent:
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36 Edg/143.0.0.0',
      employerName: 'FinTech Pro',
    },
  },
];

module.exports = dummyApplications;
