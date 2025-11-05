const dummyListings = [
  {
    companyName: "LeviTech Solutions",
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
    companyName: "Sarah Art Studio",
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
    companyName: "BioTech Innovations",
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
    companyName: "Customer First",
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
    companyName: "CloudTech",
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
    companyName: "Creative Labs",
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
    companyName: "SecureTech",
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
    companyName: "App Innovate",
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
    companyName: "Content Creators",
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
    companyName: "FinTech Pro",
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
    companyName: "QualitySoft",
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
  {
    companyName: "Green Energy Solutions",
    jobTitle: "Solar Energy Consultant",
    jobDescription:
      "Join our mission to transform Israel's energy landscape. As a Solar Energy Consultant, you will assess client needs, design solar panel systems, and guide customers through the installation process. Make a real impact on sustainability while growing a rewarding career.",
    requirements: [
      "Bachelor's degree in Engineering or Environmental Science",
      "2+ years of experience in renewable energy sector",
      "Knowledge of solar panel systems and installation",
      "Strong communication and presentation skills",
      "Valid driver's license",
    ],
    advantages: [
      "NABCEP certification",
      "Experience with energy storage systems",
      "Fluency in Arabic or Russian",
      "Sales experience in B2B environment",
    ],
    apply: {
      method: "email",
      contact: "careers@greenenergy.co.il",
    },
    location: {
      region: "South",
      city: "Beer Sheva",
    },
    workArrangement: "Full-time Hybrid",
    industry: "Solar Energy",
  },
  {
    companyName: "EduTech Academy",
    jobTitle: "Online Learning Platform Developer",
    jobDescription:
      "Build the future of education technology. We're looking for a passionate developer to create engaging online learning experiences. You'll work on our e-learning platform, integrating video content, interactive quizzes, and student progress tracking.",
    requirements: [
      "3+ years of full stack development experience",
      "Proficiency in React and Node.js",
      "Experience with video streaming technologies",
      "Knowledge of Learning Management Systems (LMS)",
      "Understanding of UX principles for educational software",
    ],
    advantages: [
      "Experience with WebRTC or similar technologies",
      "Background in education or instructional design",
      "Experience with SCORM or xAPI standards",
      "Mobile app development experience",
    ],
    apply: {
      method: "link",
      contact: "https://jobs.edutech-academy.co.il/developer",
    },
    location: {
      region: "Center",
      city: "Modi'in-Maccabim-Re'ut",
    },
    workArrangement: "Remote",
    industry: "Educational Technology (EdTech)",
  },
  {
    companyName: "MediCare Plus",
    jobTitle: "Healthcare Data Analyst",
    jobDescription:
      "Analyze healthcare data to improve patient outcomes and operational efficiency. You will work with electronic health records, create reports and dashboards, and provide insights to medical staff. Join a team committed to advancing healthcare through data-driven decisions.",
    requirements: [
      "Bachelor's degree in Statistics, Data Science, or related field",
      "2+ years of healthcare data analysis experience",
      "Proficiency in SQL and data visualization tools (Tableau, Power BI)",
      "Knowledge of healthcare regulations and HIPAA compliance",
      "Strong attention to detail and analytical thinking",
    ],
    advantages: [
      "Experience with R or Python for statistical analysis",
      "Familiarity with HL7 or FHIR standards",
      "Healthcare administration background",
      "Experience with clinical trials data",
    ],
    apply: {
      method: "email",
      contact: "hr@medicare-plus.co.il",
    },
    location: {
      region: "Jerusalem_District",
      city: "Jerusalem",
    },
    workArrangement: "Full-time On-site",
    industry: "Healthcare & Medical Services",
  },
  {
    companyName: "TravelWise Israel",
    jobTitle: "Tour Guide & Experience Coordinator",
    jobDescription:
      "Share the beauty and history of Israel with visitors from around the world. As a Tour Guide and Experience Coordinator, you'll lead groups to historical sites, coordinate logistics, and create memorable travel experiences. Flexible schedule with seasonal opportunities.",
    requirements: [
      "Licensed Tour Guide certification in Israel",
      "Fluent in English and Hebrew",
      "Excellent storytelling and public speaking skills",
      "Knowledge of Israeli history, culture, and geography",
      "Customer service oriented mindset",
    ],
    advantages: [
      "Additional language skills (Spanish, French, German, Russian)",
      "First aid certification",
      "Experience with adventure tourism",
      "Photography or videography skills",
    ],
    apply: {
      method: "link",
      contact: "https://www.travelwise-israel.com/careers/guide",
    },
    location: {
      region: "Jerusalem_District",
      city: "Jerusalem",
    },
    workArrangement: "Seasonal",
    industry: "Tourism & Travel",
  },
  {
    companyName: "Kosher Delights Restaurant Group",
    jobTitle: "Executive Chef",
    jobDescription:
      "Lead our culinary team at one of Tel Aviv's premier kosher restaurants. You will create innovative menus, manage kitchen operations, train staff, and ensure the highest standards of food quality and presentation. Bring your passion for gastronomy to our diverse clientele.",
    requirements: [
      "7+ years of professional cooking experience",
      "3+ years in a head chef or sous chef role",
      "Extensive knowledge of kosher dietary laws and certification",
      "Proven ability to manage kitchen staff and operations",
      "Creativity in menu development",
    ],
    advantages: [
      "Culinary degree or certification",
      "Experience with Mediterranean and Middle Eastern cuisine",
      "Restaurant management experience",
      "Fluency in French or Italian",
    ],
    apply: {
      method: "email",
      contact: "chef@kosherdelights.co.il",
    },
    location: {
      region: "Center",
      city: "Tel Aviv",
    },
    workArrangement: "Full-time On-site",
    industry: "Restaurants & Food Service",
  },
  {
    companyName: "LogiFlow Systems",
    jobTitle: "Supply Chain Operations Manager",
    jobDescription:
      "Optimize our logistics operations and drive efficiency across the supply chain. You'll oversee inventory management, coordinate with suppliers and distributors, implement process improvements, and ensure timely delivery of products throughout Israel and internationally.",
    requirements: [
      "Bachelor's degree in Supply Chain Management or Business",
      "5+ years of supply chain or logistics experience",
      "Strong understanding of inventory management systems",
      "Experience with ERP systems (SAP, Oracle)",
      "Excellent problem-solving and leadership skills",
    ],
    advantages: [
      "Six Sigma or Lean certification",
      "Experience with international shipping and customs",
      "Knowledge of warehouse management systems (WMS)",
      "Fluency in English and Hebrew",
    ],
    apply: {
      method: "email",
      contact: "operations@logiflow.co.il",
    },
    location: {
      region: "Center",
      city: "Ashdod",
    },
    workArrangement: "Full-time On-site",
    industry: "Logistics & Supply Chain",
  },
  {
    companyName: "Legal Advisors LLP",
    jobTitle: "Corporate Legal Associate",
    jobDescription:
      "Join our dynamic corporate law practice. You will advise clients on commercial transactions, mergers and acquisitions, corporate governance, and regulatory compliance. Work with startups, SMEs, and established corporations in a fast-paced environment.",
    requirements: [
      "Licensed attorney with Israeli Bar Association",
      "2-4 years of corporate law experience",
      "Strong research and analytical skills",
      "Excellent written and verbal communication in Hebrew and English",
      "Ability to manage multiple matters simultaneously",
    ],
    advantages: [
      "Experience with tech startups or venture capital",
      "LL.M. degree",
      "Background in securities law",
      "Fluency in additional languages",
    ],
    apply: {
      method: "link",
      contact: "https://legaladvisors.co.il/careers/associate",
    },
    location: {
      region: "Center",
      city: "Herzliya",
    },
    workArrangement: "Hybrid",
    industry: "Legal Services",
  },
  {
    companyName: "BuildTech Construction",
    jobTitle: "Civil Engineer - Infrastructure Projects",
    jobDescription:
      "Design and oversee major infrastructure projects including roads, bridges, and public facilities. You will work on projects from conception through completion, collaborating with architects, contractors, and government agencies to deliver quality infrastructure.",
    requirements: [
      "Bachelor's degree in Civil Engineering",
      "Licensed Professional Engineer in Israel",
      "4+ years of experience in infrastructure projects",
      "Proficiency in AutoCAD and civil engineering software",
      "Strong project management skills",
    ],
    advantages: [
      "Master's degree in Structural Engineering",
      "Experience with seismic design",
      "Knowledge of BIM (Building Information Modeling)",
      "PMP certification",
    ],
    apply: {
      method: "email",
      contact: "engineering@buildtech.co.il",
    },
    location: {
      region: "North",
      city: "Haifa",
    },
    workArrangement: "Full-time On-site",
    industry: "Construction",
  },
  {
    companyName: "Fitness Revolution Studios",
    jobTitle: "Personal Trainer & Group Fitness Instructor",
    jobDescription:
      "Inspire and motivate our members to achieve their fitness goals. You'll design personalized workout programs, lead energetic group classes, and create a positive, supportive environment. Part-time position with flexible hours and growth opportunities.",
    requirements: [
      "Certified Personal Trainer (recognized certification)",
      "1+ years of training experience",
      "Knowledge of exercise physiology and nutrition basics",
      "Excellent interpersonal and motivational skills",
      "CPR and First Aid certified",
    ],
    advantages: [
      "Specialty certifications (yoga, pilates, CrossFit, etc.)",
      "Experience with rehabilitation or physical therapy",
      "Nutrition coaching certification",
      "Social media presence or influencer experience",
    ],
    apply: {
      method: "email",
      contact: "trainers@fitnessrevolution.co.il",
    },
    location: {
      region: "Center",
      city: "Ra'anana",
    },
    workArrangement: "Part-time On-site",
    industry: "Fitness & Wellness",
  },
  {
    companyName: "AgriTech Innovations",
    jobTitle: "Agricultural Technology Specialist",
    jobDescription:
      "Help revolutionize Israeli agriculture with cutting-edge technology. You will work with farmers to implement smart farming solutions, including precision agriculture, IoT sensors, and automated irrigation systems. Field work combined with technical support and training.",
    requirements: [
      "Bachelor's degree in Agriculture, Agronomy, or related field",
      "Understanding of modern farming practices and technology",
      "Strong technical aptitude and problem-solving skills",
      "Willingness to work in field conditions",
      "Valid driver's license",
    ],
    advantages: [
      "Experience with IoT devices or sensor networks",
      "Knowledge of data analysis and agricultural software",
      "Background in sustainable farming practices",
      "Fluency in Arabic",
    ],
    apply: {
      method: "link",
      contact: "https://agritech-innovations.co.il/jobs/specialist",
    },
    location: {
      region: "South",
      city: "Netivot",
    },
    workArrangement: "Field Work",
    industry: "Agriculture",
  },
];

module.exports = dummyListings;
