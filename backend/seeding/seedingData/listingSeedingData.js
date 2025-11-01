const dummyListings = [
  {
    jobTitle: "Senior Full Stack Developer",
    jobDescription:
      "We are seeking an experienced Full Stack Developer to join our growing tech team. You will be responsible for developing and maintaining web applications using modern technologies. Work on exciting projects in a collaborative environment with opportunities for growth and learning.",
    requirements: [
      "5+ years of experience in full stack development",
      "Strong proficiency in React and Node.js",
      "Experience with MongoDB and SQL databases",
      "Familiarity with cloud platforms (AWS/Azure)",
      "Excellent problem-solving skills",
    ],
    advantages: [
      "Experience with TypeScript",
      "Knowledge of DevOps practices",
      "Familiarity with microservices architecture",
      "Contributions to open-source projects",
    ],
    apply: {
      method: "email",
      contact: "jobs@levitechsolutions.com",
    },
    location: {
      region: "Center",
      city: "Tel Aviv",
    },
    workArrangement: "Full-time Hybrid",
    industry: "Software Development",
  },
  {
    jobTitle: "Marketing Manager",
    jobDescription:
      "Join our dynamic marketing team as a Marketing Manager. You will lead marketing campaigns, manage social media presence, and develop strategies to increase brand awareness. Perfect opportunity for a creative professional looking to make an impact.",
    requirements: [
      "3+ years of marketing experience",
      "Strong understanding of digital marketing",
      "Experience with social media management",
      "Excellent written and verbal communication skills in Hebrew and English",
      "Bachelor's degree in Marketing or related field",
    ],
    advantages: [
      "Experience with Google Analytics and SEO",
      "Graphic design skills",
      "Experience in the tech industry",
    ],
    apply: {
      method: "link",
      contact: "https://www.sarahartstudio.com/careers",
    },
    location: {
      region: "Center",
      city: "Tel Aviv",
    },
    workArrangement: "Full-time On-site",
    industry: "Marketing & PR",
  },
  {
    jobTitle: "Data Scientist",
    jobDescription:
      "We are looking for a talented Data Scientist to analyze complex datasets and provide actionable insights. You will work with cutting-edge AI and machine learning technologies to solve real-world problems and drive business decisions.",
    requirements: [
      "Master's degree or PhD in Computer Science, Statistics, or related field",
      "3+ years of experience in data science",
      "Strong proficiency in Python and R",
      "Experience with machine learning frameworks (TensorFlow, PyTorch)",
      "Excellent analytical and statistical skills",
    ],
    advantages: [
      "Experience with big data technologies (Spark, Hadoop)",
      "Knowledge of deep learning",
      "Published research papers",
      "Experience in healthcare or biotech industry",
    ],
    apply: {
      method: "email",
      contact: "careers@biotech-innovations.co.il",
    },
    location: {
      region: "Jerusalem_District",
      city: "Jerusalem",
    },
    workArrangement: "Full-time Hybrid",
    industry: "AI & Machine Learning",
  },
  {
    jobTitle: "Customer Success Manager",
    jobDescription:
      "Be the bridge between our customers and our product team. As a Customer Success Manager, you will ensure client satisfaction, onboard new customers, and help them achieve their goals using our platform. Build lasting relationships and drive retention.",
    requirements: [
      "2+ years in customer success or account management",
      "Excellent interpersonal and communication skills",
      "Fluency in Hebrew and English",
      "Problem-solving mindset",
      "Experience with CRM systems",
    ],
    advantages: [
      "Background in SaaS industry",
      "Technical understanding of software products",
      "Experience in training and onboarding",
    ],
    apply: {
      method: "email",
      contact: "hr@customer-first.co.il",
    },
    location: {
      region: "North",
      city: "Haifa",
    },
    workArrangement: "Remote",
    industry: "Software Development",
  },
  {
    jobTitle: "DevOps Engineer",
    jobDescription:
      "Join our infrastructure team as a DevOps Engineer. You will be responsible for maintaining our CI/CD pipelines, managing cloud infrastructure, and ensuring system reliability. Work with modern tools and technologies in a fast-paced environment.",
    requirements: [
      "3+ years of DevOps experience",
      "Strong knowledge of AWS or Azure",
      "Experience with Docker and Kubernetes",
      "Proficiency in scripting (Bash, Python)",
      "Understanding of networking and security",
    ],
    advantages: [
      "Experience with Terraform or CloudFormation",
      "Knowledge of monitoring tools (Prometheus, Grafana)",
      "Experience with Jenkins or GitLab CI",
      "Certifications in cloud platforms",
    ],
    apply: {
      method: "link",
      contact: "https://jobs.cloudtech.co.il/devops",
    },
    location: {
      region: "Center",
      city: "Petah Tikva",
    },
    workArrangement: "Full-time Hybrid",
    industry: "Cloud Computing",
  },
  {
    jobTitle: "UX/UI Designer",
    jobDescription:
      "We are seeking a creative UX/UI Designer to craft beautiful and intuitive user experiences. You will work closely with product managers and developers to design web and mobile applications that users love. Bring your design expertise and passion for user-centered design.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Strong portfolio demonstrating design skills",
      "Proficiency in Figma and Adobe Creative Suite",
      "Understanding of user research and usability testing",
      "Knowledge of responsive design principles",
    ],
    advantages: [
      "Experience with design systems",
      "Animation and motion design skills",
      "Front-end development knowledge (HTML/CSS)",
      "Experience in mobile app design",
    ],
    apply: {
      method: "email",
      contact: "design@creative-labs.co.il",
    },
    location: {
      region: "Center",
      city: "Herzliya",
    },
    workArrangement: "Full-time On-site",
    industry: "Design & Creative Services",
  },
  {
    jobTitle: "Cybersecurity Analyst",
    jobDescription:
      "Protect our organization from cyber threats as a Cybersecurity Analyst. You will monitor networks, investigate security incidents, and implement security measures. Join a team dedicated to keeping our systems safe and secure in an ever-evolving threat landscape.",
    requirements: [
      "2+ years of experience in cybersecurity",
      "Knowledge of security frameworks and best practices",
      "Experience with SIEM tools and threat detection",
      "Understanding of network protocols and architecture",
      "Strong analytical and problem-solving skills",
    ],
    advantages: [
      "Security certifications (CISSP, CEH, Security+)",
      "Experience with penetration testing",
      "Knowledge of cloud security (AWS/Azure)",
      "Incident response experience",
    ],
    apply: {
      method: "link",
      contact: "https://www.securetech.co.il/careers/analyst",
    },
    location: {
      region: "South",
      city: "Beer Sheva",
    },
    workArrangement: "Full-time Remote",
    industry: "Cybersecurity",
  },
  {
    jobTitle: "Product Manager - Mobile Apps",
    jobDescription:
      "Lead the development of innovative mobile applications as our Product Manager. You will define product vision, prioritize features, and work with cross-functional teams to deliver exceptional mobile experiences. Shape the future of our mobile platform.",
    requirements: [
      "4+ years of product management experience",
      "Experience with mobile app development lifecycle",
      "Strong understanding of user-centered design",
      "Excellent communication and leadership skills",
      "Data-driven decision making approach",
    ],
    advantages: [
      "Technical background in mobile development",
      "Experience with A/B testing and analytics",
      "MBA or relevant advanced degree",
      "Experience in consumer apps with high user base",
    ],
    apply: {
      method: "email",
      contact: "product@appinnovate.co.il",
    },
    location: {
      region: "Center",
      city: "Ramat Gan",
    },
    workArrangement: "Hybrid",
    industry: "Mobile App Development",
  },
  {
    jobTitle: "Content Writer & Copywriter",
    jobDescription:
      "Join our creative team as a Content Writer and Copywriter. Create compelling content for websites, blogs, social media, and marketing campaigns. Your words will engage audiences and drive brand awareness for our diverse client portfolio.",
    requirements: [
      "2+ years of professional writing experience",
      "Native-level Hebrew and fluent English",
      "Strong research and interviewing skills",
      "Portfolio of published work",
      "Ability to adapt writing style for different audiences",
    ],
    advantages: [
      "SEO knowledge and optimization skills",
      "Experience in B2B or tech writing",
      "Social media marketing experience",
      "Knowledge of content management systems",
    ],
    apply: {
      method: "link",
      contact: "https://careers.contentcreators.co.il/writer",
    },
    location: {
      region: "Jerusalem_District",
      city: "Jerusalem",
    },
    workArrangement: "Part-time Remote",
    industry: "Marketing & PR",
  },
  {
    jobTitle: "Financial Analyst",
    jobDescription:
      "Analyze financial data and provide strategic insights as our Financial Analyst. You will prepare reports, create financial models, and support decision-making processes. Great opportunity to grow your career in a dynamic fintech environment.",
    requirements: [
      "Bachelor's degree in Finance, Economics, or Accounting",
      "2+ years of financial analysis experience",
      "Proficiency in Excel and financial modeling",
      "Strong analytical and quantitative skills",
      "Understanding of financial statements and metrics",
    ],
    advantages: [
      "CFA or CPA certification",
      "Experience with SQL and data visualization tools",
      "Knowledge of financial software (SAP, Oracle)",
      "Experience in the fintech sector",
    ],
    apply: {
      method: "email",
      contact: "finance@fintechpro.co.il",
    },
    location: {
      region: "Center",
      city: "Rishon LeZion",
    },
    workArrangement: "Full-time On-site",
    industry: "Financial Technology (FinTech)",
  },
  {
    jobTitle: "QA Automation Engineer",
    jobDescription:
      "Ensure software quality through automated testing as our QA Automation Engineer. You will design and implement test automation frameworks, identify bugs, and work closely with developers to maintain high-quality standards throughout the development cycle.",
    requirements: [
      "3+ years of QA automation experience",
      "Strong programming skills in Java or Python",
      "Experience with Selenium, Cypress, or similar tools",
      "Understanding of CI/CD pipelines",
      "Knowledge of testing methodologies and best practices",
    ],
    advantages: [
      "Experience with API testing (Postman, REST Assured)",
      "Performance testing experience (JMeter, LoadRunner)",
      "Mobile testing experience (Appium)",
      "ISTQB certification",
    ],
    apply: {
      method: "email",
      contact: "qa@qualitysoft.co.il",
    },
    location: {
      region: "North",
      city: "Yokneam",
    },
    workArrangement: "Contract On-site",
    industry: "Software Development",
  },
];

module.exports = dummyListings;
