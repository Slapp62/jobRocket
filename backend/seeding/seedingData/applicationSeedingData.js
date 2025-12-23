const dummyApplications = [
  {
    // Application for Senior Full Stack Developer (Sarah Cohen)
    listingIndex: 0, // Will be mapped to actual listing ID
    firstName: 'Sarah',
    lastName: 'Cohen',
    email: 'sarah.cohen@email.com',
    phone: '0541234567',
    resumeUrl: 'https://www.linkedin.com/in/sarah-cohen/',
    coverLetter:
      'I am excited to apply for the Senior Full Stack Developer position at LeviTech Solutions. My experience with React and Node.js aligns perfectly with your requirements, and I am eager to contribute to your innovative projects. I am particularly drawn to your collaborative team environment and opportunities for professional growth.',
    message:
      'I would love to discuss how my skills in full-stack development can contribute to your team. I am available for an interview at your earliest convenience.',
    status: 'pending',
    applicationDataConsent: {
      sharedFields: {
        name: true,
        email: true,
        phone: true,
        resume: true,
        coverLetter: true
      },
      consentGranted: true,
      consentTimestamp: new Date("2025-12-21T19:26:15.363Z"),
      ipAddress: "127.0.0.1",
      userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36 Edg/143.0.0.0",
      employerName: "FinTech Pro"
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
    coverLetter:
      'While my background is primarily in web development, I have developed a strong passion for data science and machine learning. I have been actively learning Python, TensorFlow, and statistical analysis through courses and personal projects. I am eager to transition into a data science role and believe my technical foundation and problem-solving skills will enable me to excel in this position.',
    status: 'reviewed',
    applicationDataConsent: {
      sharedFields: {
        name: true,
        email: true,
        phone: true,
        resume: true,
        coverLetter: true
      },
      consentGranted: true,
      consentTimestamp: new Date("2025-12-21T19:26:15.363Z"),
      ipAddress: "127.0.0.1",
      userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36 Edg/143.0.0.0",
      employerName: "FinTech Pro"
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
    coverLetter:
      'I am writing to express my strong interest in the DevOps Engineer position at CloudTech. With my extensive experience in AWS, Docker, and Kubernetes, I am confident I can help optimize your infrastructure and CI/CD processes. I have successfully implemented automated deployment pipelines that reduced release times by 60% in my previous role.',
    message:
      'I have reviewed your technology stack and am excited about the opportunity to work with modern DevOps tools. I am particularly interested in discussing how I can contribute to improving your system reliability and deployment processes.',
    status: 'pending',
    applicationDataConsent: {
      sharedFields: {
        name: true,
        email: true,
        phone: true,
        resume: true,
        coverLetter: true
      },
      consentGranted: true,
      consentTimestamp: new Date("2025-12-21T19:26:15.363Z"),
      ipAddress: "127.0.0.1",
      userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36 Edg/143.0.0.0",
      employerName: "FinTech Pro"
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
    coverLetter:
      'Although I am primarily a developer, I have always been passionate about design and user experience. I have worked extensively with design tools and have collaborated with UX/UI designers throughout my career. I am seeking to transition more fully into a design role where I can leverage both my technical skills and creative abilities.',
    status: 'rejected',
    applicationDataConsent: {
      sharedFields: {
        name: true,
        email: true,
        phone: true,
        resume: true,
        coverLetter: true
      },
      consentGranted: true,
      consentTimestamp: new Date("2025-12-21T19:26:15.363Z"),
      ipAddress: "127.0.0.1",
      userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36 Edg/143.0.0.0",
      employerName: "FinTech Pro"
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
    coverLetter:
      'I am excited to apply for the Cybersecurity Analyst position at SecureTech. My certifications and hands-on experience with SIEM tools and threat detection align perfectly with your requirements. I am passionate about staying ahead of emerging threats and implementing robust security measures to protect critical systems.',
    message:
      'I have experience working with distributed teams and am comfortable with remote work arrangements. I would welcome the opportunity to discuss how my security expertise can contribute to protecting your organization.',
    status: 'reviewed',
    applicationDataConsent: {
      sharedFields: {
        name: true,
        email: true,
        phone: true,
        resume: true,
        coverLetter: true
      },
      consentGranted: true,
      consentTimestamp: new Date("2025-12-21T19:26:15.363Z"),
      ipAddress: "127.0.0.1",
      userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36 Edg/143.0.0.0",
      employerName: "FinTech Pro"
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
    coverLetter:
      'I am applying for the QA Automation Engineer position at QualitySoft. My experience with test automation frameworks and CI/CD integration makes me well-suited for this role. I have successfully built automation frameworks that increased test coverage by 80% while reducing testing time by 50%.',
    status: 'pending',
    applicationDataConsent: {
      sharedFields: {
        name: true,
        email: true,
        phone: true,
        resume: true,
        coverLetter: true
      },
      consentGranted: true,
      consentTimestamp: new Date("2025-12-21T19:26:15.363Z"),
      ipAddress: "127.0.0.1",
      userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36 Edg/143.0.0.0",
      employerName: "FinTech Pro"
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
    coverLetter:
      'I am thrilled to apply for the Online Learning Platform Developer position at EduTech Academy. Combining my technical skills with my passion for education is a dream opportunity. I have experience with video streaming technologies and have built educational platforms as personal projects. I am excited about the opportunity to contribute to the future of education technology.',
    message:
      'I would love to demonstrate some of the educational projects I have built and discuss how my experience can contribute to your e-learning platform. I am available for a technical discussion at your convenience.',
    status: 'reviewed',
    applicationDataConsent: {
      sharedFields: {
        name: true,
        email: true,
        phone: true,
        resume: true,
        coverLetter: true
      },
      consentGranted: true,
      consentTimestamp: new Date("2025-12-21T19:26:15.363Z"),
      ipAddress: "127.0.0.1",
      userAgent: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36 Edg/143.0.0.0",
      employerName: "FinTech Pro"
    },
  },
];

module.exports = dummyApplications;
