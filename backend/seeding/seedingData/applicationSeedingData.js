const dummyApplications = [
  {
    // Application for Senior Full Stack Developer (Sarah Cohen)
    listingIndex: 0, // Will be mapped to actual listing ID
    applicantEmail: 'sarah.cohen@email.com',
    resume:
      'Experienced Full Stack Developer with 3 years of professional experience. Strong expertise in JavaScript, React, Node.js, and MongoDB. Built multiple enterprise-level web applications from scratch. Proficient in modern development practices including CI/CD, testing, and agile methodologies. Passionate about clean code and user experience.',
    coverLetter:
      'I am excited to apply for the Senior Full Stack Developer position at LeviTech Solutions. My experience with React and Node.js aligns perfectly with your requirements, and I am eager to contribute to your innovative projects. I am particularly drawn to your collaborative team environment and opportunities for professional growth.',
    message:
      'I would love to discuss how my skills in full-stack development can contribute to your team. I am available for an interview at your earliest convenience.',
    status: 'pending',
  },
  {
    // Application for Data Scientist (Sarah Cohen - also applying)
    listingIndex: 2,
    applicantEmail: 'sarah.cohen@email.com',
    resume:
      'Full Stack Developer with strong analytical skills and growing interest in data science. Self-taught Python for data analysis. Completed online courses in machine learning and statistics. Experience working with data visualization libraries and building analytics dashboards for web applications.',
    coverLetter:
      'While my background is primarily in web development, I have developed a strong passion for data science and machine learning. I have been actively learning Python, TensorFlow, and statistical analysis through courses and personal projects. I am eager to transition into a data science role and believe my technical foundation and problem-solving skills will enable me to excel in this position.',
    status: 'reviewed',
  },
  {
    // Application for DevOps Engineer (Admin User)
    listingIndex: 4,
    applicantEmail: 'admin@email.com',
    resume:
      'System Administrator and DevOps professional with extensive experience in cloud infrastructure, CI/CD pipelines, and automation. Expert in AWS services, Docker, Kubernetes, and infrastructure as code. Strong background in security, monitoring, and incident response. Proven track record of improving system reliability and reducing deployment times.',
    coverLetter:
      'I am writing to express my strong interest in the DevOps Engineer position at CloudTech. With my extensive experience in AWS, Docker, and Kubernetes, I am confident I can help optimize your infrastructure and CI/CD processes. I have successfully implemented automated deployment pipelines that reduced release times by 60% in my previous role.',
    message:
      'I have reviewed your technology stack and am excited about the opportunity to work with modern DevOps tools. I am particularly interested in discussing how I can contribute to improving your system reliability and deployment processes.',
    status: 'pending',
  },
  {
    // Application for UX/UI Designer (Sarah Cohen - diverse applications)
    listingIndex: 5,
    applicantEmail: 'sarah.cohen@email.com',
    resume:
      'Full Stack Developer with a strong eye for design and user experience. Experienced in creating responsive, intuitive interfaces using modern design principles. Proficient in CSS, styled-components, and working closely with designers to implement pixel-perfect designs. Strong understanding of accessibility and usability best practices.',
    coverLetter:
      'Although I am primarily a developer, I have always been passionate about design and user experience. I have worked extensively with design tools and have collaborated with UX/UI designers throughout my career. I am seeking to transition more fully into a design role where I can leverage both my technical skills and creative abilities.',
    status: 'rejected',
  },
  {
    // Application for Cybersecurity Analyst (Admin User)
    listingIndex: 6,
    applicantEmail: 'admin@email.com',
    resume:
      'Cybersecurity professional with deep expertise in threat detection, SIEM tools, and incident response. Certified in CISSP and Security+. Experience implementing security frameworks and conducting vulnerability assessments. Strong knowledge of network security, cloud security, and compliance requirements. Successfully mitigated numerous security incidents and implemented proactive security measures.',
    coverLetter:
      'I am excited to apply for the Cybersecurity Analyst position at SecureTech. My certifications and hands-on experience with SIEM tools and threat detection align perfectly with your requirements. I am passionate about staying ahead of emerging threats and implementing robust security measures to protect critical systems.',
    message:
      'I have experience working with distributed teams and am comfortable with remote work arrangements. I would welcome the opportunity to discuss how my security expertise can contribute to protecting your organization.',
    status: 'reviewed',
  },
  {
    // Application for QA Automation Engineer (Admin User)
    listingIndex: 10,
    applicantEmail: 'admin@email.com',
    resume:
      'Quality Assurance professional with strong programming skills in Python and Java. Extensive experience designing and implementing test automation frameworks using Selenium and pytest. Skilled in integrating automated tests into CI/CD pipelines. Deep understanding of software testing methodologies, API testing, and performance testing. Committed to maintaining high quality standards throughout the development lifecycle.',
    coverLetter:
      'I am applying for the QA Automation Engineer position at QualitySoft. My experience with test automation frameworks and CI/CD integration makes me well-suited for this role. I have successfully built automation frameworks that increased test coverage by 80% while reducing testing time by 50%.',
    status: 'pending',
  },
  {
    // Application for Online Learning Platform Developer (Sarah Cohen)
    listingIndex: 12,
    applicantEmail: 'sarah.cohen@email.com',
    resume:
      'Full Stack Developer with 3 years of experience building interactive web applications. Strong proficiency in React and Node.js. Experience integrating video streaming and real-time features. Passionate about education and creating engaging user experiences. Built several educational web applications as side projects, including an online course platform with video lessons and progress tracking.',
    coverLetter:
      'I am thrilled to apply for the Online Learning Platform Developer position at EduTech Academy. Combining my technical skills with my passion for education is a dream opportunity. I have experience with video streaming technologies and have built educational platforms as personal projects. I am excited about the opportunity to contribute to the future of education technology.',
    message:
      'I would love to demonstrate some of the educational projects I have built and discuss how my experience can contribute to your e-learning platform. I am available for a technical discussion at your convenience.',
    status: 'reviewed',
  },
];

module.exports = dummyApplications;
