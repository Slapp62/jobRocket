import { FC } from 'react';
import { Anchor, Box, Container, List, Paper, Text, Title } from '@mantine/core';

const TermsOfService: FC = () => {
  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="md">
        Terms of Service
      </Title>
      <Text c="dimmed" fs="italic" mb="xl">
        Last Updated: January 2025
      </Text>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          1. Acceptance of Terms
        </Title>
        <Text mb="md">
          Welcome to JobRocket ("we," "our," "us," or the "Service"). These Terms of Service
          ("Terms") constitute a legally binding agreement between you and JobRocket governing your
          access to and use of our job matching platform available at{' '}
          <Anchor href="https://jobrocket-site.onrender.com" target="_blank">
            https://jobrocket-site.onrender.com
          </Anchor>
          .
        </Text>
        <Text mb="md">
          By accessing or using JobRocket, you acknowledge that you have read, understood, and agree
          to be bound by these Terms and our <Anchor href="/privacy-policy">Privacy Policy</Anchor>.
          If you do not agree to these Terms, you must not use our Service.
        </Text>
        <Paper p="md" withBorder bg="yellow.0" mb="md">
          <Text fw={700} mb="xs">
            Age Requirement:
          </Text>
          <Text>
            You must be at least 15 years old to use JobRocket. By using our Service, you represent
            and warrant that you are at least 15 years of age.
          </Text>
        </Paper>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          2. Description of Service
        </Title>
        <Text mb="md">
          JobRocket is an online platform that connects job seekers with employers in Israel. Our
          Service provides:
        </Text>
        <List mb="md">
          <List.Item>
            <strong>For Jobseekers:</strong> The ability to create profiles, browse job listings,
            apply for positions, favorite listings, and receive AI-powered job match recommendations
          </List.Item>
          <List.Item>
            <strong>For Businesses:</strong> The ability to create company profiles, post job
            listings, manage applications, and access AI-powered candidate matching
          </List.Item>
          <List.Item>
            <strong>AI Matching:</strong> Automated job matching using artificial intelligence to
            calculate compatibility scores between jobseekers and job listings
          </List.Item>
        </List>
        <Text mb="md">
          The Service is currently provided free of charge. We reserve the right to introduce
          pricing, subscription plans, or premium features in the future with appropriate notice.
        </Text>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          3. User Accounts
        </Title>

        <Title order={3} size="h4" mb="xs" mt="md">
          3.1 Account Creation
        </Title>
        <Text mb="sm">
          To use certain features of JobRocket, you must create an account. You agree to:
        </Text>
        <List mb="md">
          <List.Item>
            Provide accurate, current, and complete information during registration
          </List.Item>
          <List.Item>Maintain and promptly update your account information</List.Item>
          <List.Item>Keep your password secure and confidential</List.Item>
          <List.Item>Be responsible for all activities that occur under your account</List.Item>
          <List.Item>
            Notify us immediately of any unauthorized use of your account at{' '}
            <Anchor href="mailto:admin@jobrocket.co.il">admin@jobrocket.co.il</Anchor>
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          3.2 Account Types
        </Title>
        <Text mb="sm">JobRocket offers two account types:</Text>
        <List mb="md">
          <List.Item>
            <strong>Jobseeker Accounts:</strong> For individuals seeking employment opportunities
          </List.Item>
          <List.Item>
            <strong>Business Accounts:</strong> For companies and employers posting job listings
          </List.Item>
        </List>
        <Text mb="md">
          You may switch between account types at any time through your account settings. However,
          you may only maintain one active account.
        </Text>

        <Title order={3} size="h4" mb="xs" mt="md">
          3.3 Account Termination
        </Title>
        <Text mb="sm">
          You may delete your account at any time through your account settings. Upon deletion:
        </Text>
        <List mb="md">
          <List.Item>
            Your personal data will be immediately removed from our active systems
          </List.Item>
          <List.Item>Your job listings (if any) will be removed</List.Item>
          <List.Item>Your applications will be removed</List.Item>
          <List.Item>
            Data may remain in backup systems for up to 30 days for technical reasons
          </List.Item>
        </List>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          4. User Conduct and Responsibilities
        </Title>

        <Title order={3} size="h4" mb="xs" mt="md">
          4.1 Acceptable Use
        </Title>
        <Text mb="sm">
          You agree to use JobRocket only for lawful purposes and in accordance with these Terms.
          You agree NOT to:
        </Text>
        <List mb="md">
          <List.Item>Violate any applicable Israeli or international laws or regulations</List.Item>
          <List.Item>Post false, misleading, fraudulent, or deceptive content</List.Item>
          <List.Item>
            Impersonate any person or entity or falsely state or misrepresent your affiliation
          </List.Item>
          <List.Item>
            Post job listings for positions that do not exist or that you are not authorized to fill
          </List.Item>
          <List.Item>Harass, abuse, threaten, or discriminate against other users</List.Item>
          <List.Item>Spam, solicit, or advertise unrelated products or services</List.Item>
          <List.Item>
            Use automated systems (bots, scrapers, etc.) to access the Service without authorization
          </List.Item>
          <List.Item>
            Attempt to gain unauthorized access to our systems or other users' accounts
          </List.Item>
          <List.Item>Upload or transmit viruses, malware, or any other malicious code</List.Item>
          <List.Item>
            Interfere with or disrupt the Service or servers/networks connected to the Service
          </List.Item>
          <List.Item>
            Collect or harvest personal information from other users without their consent
          </List.Item>
          <List.Item>
            Post content that is illegal, obscene, defamatory, discriminatory, or violates
            intellectual property rights
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          4.2 Job Listings (Business Accounts)
        </Title>
        <Text mb="sm">If you post job listings, you agree that:</Text>
        <List mb="md">
          <List.Item>All job listings are for legitimate positions that actually exist</List.Item>
          <List.Item>You have the authority to recruit for the positions you post</List.Item>
          <List.Item>
            Your listings comply with Israeli employment and anti-discrimination laws
          </List.Item>
          <List.Item>
            You will not discriminate based on age, gender, religion, ethnicity, disability, or
            other protected characteristics
          </List.Item>
          <List.Item>
            You will promptly remove or mark as filled any listings that are no longer available
          </List.Item>
          <List.Item>
            You will handle applicant information responsibly and in compliance with privacy laws
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          4.3 Job Applications (Jobseeker Accounts)
        </Title>
        <Text mb="sm">If you submit job applications, you agree that:</Text>
        <List mb="md">
          <List.Item>
            All information in your profile and applications is accurate and truthful
          </List.Item>
          <List.Item>
            You own the rights to any content (resumes, cover letters, etc.) you submit
          </List.Item>
          <List.Item>
            You understand that your application information will be shared with the employer
          </List.Item>
          <List.Item>You will not submit spam or mass applications</List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          4.4 Rate Limits
        </Title>
        <Text mb="sm">
          To ensure fair use and prevent abuse, we implement the following rate limits:
        </Text>
        <List mb="md">
          <List.Item>Login attempts: 5 per 15 minutes</List.Item>
          <List.Item>Registration attempts: 5 per hour</List.Item>
          <List.Item>Job listings: 10 per 24 hours</List.Item>
          <List.Item>Job applications: 50 per hour</List.Item>
        </List>
        <Text>
          Exceeding these limits may result in temporary account restrictions or permanent
          suspension.
        </Text>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          5. Content and Intellectual Property
        </Title>

        <Title order={3} size="h4" mb="xs" mt="md">
          5.1 Your Content
        </Title>
        <Text mb="sm">
          You retain ownership of all content you submit to JobRocket (profiles, job listings,
          applications, etc.). By posting content, you grant JobRocket a worldwide, non-exclusive,
          royalty-free license to:
        </Text>
        <List mb="md">
          <List.Item>Use, reproduce, and display your content to provide the Service</List.Item>
          <List.Item>
            Process your content with AI/ML algorithms for job matching purposes
          </List.Item>
          <List.Item>
            Share your content with other users as part of the Service functionality (e.g., sharing
            applications with employers)
          </List.Item>
        </List>
        <Text mb="md">
          You represent and warrant that you have all necessary rights to grant this license and
          that your content does not violate any third-party rights.
        </Text>

        <Title order={3} size="h4" mb="xs" mt="md">
          5.2 JobRocket's Content
        </Title>
        <Text mb="sm">
          The Service, including its design, features, graphics, text, and code, is owned by
          JobRocket and protected by Israeli and international copyright and trademark laws. You may
          not:
        </Text>
        <List mb="md">
          <List.Item>Copy, modify, or create derivative works of the Service</List.Item>
          <List.Item>
            Reverse engineer, decompile, or disassemble any aspect of the Service
          </List.Item>
          <List.Item>Remove or modify any proprietary notices</List.Item>
          <List.Item>Use the JobRocket name, logo, or trademarks without permission</List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          5.3 Content Moderation
        </Title>
        <Text mb="sm">JobRocket reserves the right, but not the obligation, to:</Text>
        <List mb="md">
          <List.Item>Monitor, review, and moderate content posted on the Service</List.Item>
          <List.Item>
            Remove or refuse to post any content that violates these Terms or that we deem
            inappropriate, offensive, or harmful
          </List.Item>
          <List.Item>
            Determine in our sole discretion what constitutes inappropriate or violating content
          </List.Item>
          <List.Item>
            Take action against users who violate these Terms, including warnings, content removal,
            or account suspension/termination
          </List.Item>
        </List>
        <Text mb="md">
          We are not responsible for user-generated content and do not endorse any opinions
          expressed by users.
        </Text>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          6. Artificial Intelligence and Matching
        </Title>
        <Text mb="md">
          JobRocket uses artificial intelligence (OpenAI's embedding models) to provide job matching
          functionality. By using our Service, you understand and agree that:
        </Text>
        <List mb="md">
          <List.Item>
            AI-generated match scores are recommendations only and not guarantees
          </List.Item>
          <List.Item>
            Match scores are based on algorithmic analysis and may not reflect all relevant factors
          </List.Item>
          <List.Item>
            Your data may be processed by third-party AI services (see our Privacy Policy)
          </List.Item>
          <List.Item>
            AI matching is provided "as is" without warranties of accuracy or completeness
          </List.Item>
          <List.Item>
            You should exercise your own judgment when applying for jobs or evaluating candidates
          </List.Item>
        </List>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          7. Third-Party Services and Links
        </Title>
        <Text mb="md">
          JobRocket may contain links to third-party websites or integrate with third-party services
          (such as OpenAI, EmailJS, LinkedIn, etc.). We are not responsible for:
        </Text>
        <List mb="md">
          <List.Item>The content, privacy practices, or terms of third-party services</List.Item>
          <List.Item>Any damages or losses caused by third-party services</List.Item>
          <List.Item>The availability or functionality of external links</List.Item>
        </List>
        <Text>Your use of third-party services is subject to their own terms and policies.</Text>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          8. Disclaimers and Limitations of Liability
        </Title>

        <Title order={3} size="h4" mb="xs" mt="md">
          8.1 Service "As Is"
        </Title>
        <Text mb="md">
          JobRocket is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either
          express or implied, including but not limited to warranties of merchantability, fitness
          for a particular purpose, or non-infringement. We do not warrant that:
        </Text>
        <List mb="md">
          <List.Item>The Service will be uninterrupted, secure, or error-free</List.Item>
          <List.Item>The results obtained from the Service will be accurate or reliable</List.Item>
          <List.Item>Any errors or defects will be corrected</List.Item>
          <List.Item>The Service will meet your specific requirements</List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          8.2 No Employment Guarantees
        </Title>
        <Text mb="md">
          JobRocket is a platform that facilitates connections between job seekers and employers. We
          do not:
        </Text>
        <List mb="md">
          <List.Item>Guarantee that jobseekers will find employment</List.Item>
          <List.Item>Guarantee that employers will find suitable candidates</List.Item>
          <List.Item>Verify the accuracy of job listings or user profiles</List.Item>
          <List.Item>Participate in hiring decisions or employment relationships</List.Item>
          <List.Item>Act as an employer, recruiter, or employment agency</List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          8.3 Limitation of Liability
        </Title>
        <Text mb="md">
          To the maximum extent permitted by Israeli law, JobRocket and its officers, directors,
          employees, and agents shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages, including but not limited to:
        </Text>
        <List mb="md">
          <List.Item>Lost profits, data, or opportunities</List.Item>
          <List.Item>Business interruption</List.Item>
          <List.Item>Loss of employment or hiring opportunities</List.Item>
          <List.Item>Damages arising from your use or inability to use the Service</List.Item>
          <List.Item>Damages arising from user content or conduct of other users</List.Item>
          <List.Item>Damages arising from unauthorized access to your account</List.Item>
        </List>
        <Text mb="md">
          Our total liability to you for all claims arising from your use of the Service shall not
          exceed the amount you paid us in the 12 months prior to the claim (currently zero, as the
          Service is free).
        </Text>

        <Title order={3} size="h4" mb="xs" mt="md">
          8.4 User Interactions
        </Title>
        <Text mb="md">
          JobRocket is not responsible for interactions between users. You are solely responsible
          for your interactions with other users, including employers and jobseekers. We recommend
          exercising caution and good judgment in all communications and transactions.
        </Text>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          9. Indemnification
        </Title>
        <Text mb="md">
          You agree to indemnify, defend, and hold harmless JobRocket and its officers, directors,
          employees, agents, and affiliates from and against any and all claims, liabilities,
          damages, losses, costs, and expenses (including reasonable attorneys' fees) arising from:
        </Text>
        <List mb="md">
          <List.Item>Your use or misuse of the Service</List.Item>
          <List.Item>Your violation of these Terms</List.Item>
          <List.Item>Your violation of any rights of another party</List.Item>
          <List.Item>Content you post or submit to the Service</List.Item>
          <List.Item>Your interactions with other users</List.Item>
        </List>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          10. Service Modifications and Pricing
        </Title>

        <Title order={3} size="h4" mb="xs" mt="md">
          10.1 Right to Modify
        </Title>
        <Text mb="md">We reserve the right to:</Text>
        <List mb="md">
          <List.Item>
            Modify, suspend, or discontinue any aspect of the Service at any time
          </List.Item>
          <List.Item>Change features, functionality, or availability of the Service</List.Item>
          <List.Item>Implement rate limits or usage restrictions</List.Item>
          <List.Item>Update these Terms from time to time</List.Item>
        </List>
        <Text mb="md">
          We will provide reasonable notice of material changes when feasible, but are not obligated
          to do so.
        </Text>

        <Title order={3} size="h4" mb="xs" mt="md">
          10.2 Future Pricing
        </Title>
        <Text mb="md">
          JobRocket is currently free to use. However, we reserve the right to introduce:
        </Text>
        <List mb="md">
          <List.Item>Subscription plans or membership fees</List.Item>
          <List.Item>Premium features or services</List.Item>
          <List.Item>Fees for job listings or applications</List.Item>
          <List.Item>Transaction fees or commissions</List.Item>
        </List>
        <Text mb="md">
          If we introduce pricing, we will provide advance notice and you will have the opportunity
          to decide whether to continue using the Service. Existing free features may be modified or
          limited when paid plans are introduced.
        </Text>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          11. Termination and Suspension
        </Title>

        <Title order={3} size="h4" mb="xs" mt="md">
          11.1 Termination by JobRocket
        </Title>
        <Text mb="sm">
          We reserve the right to suspend or terminate your account and access to the Service at any
          time, with or without cause, with or without notice, for any reason including:
        </Text>
        <List mb="md">
          <List.Item>Violation of these Terms</List.Item>
          <List.Item>Fraudulent, abusive, or illegal activity</List.Item>
          <List.Item>Extended periods of inactivity</List.Item>
          <List.Item>At our sole discretion</List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          11.2 Effect of Termination
        </Title>
        <Text mb="sm">Upon termination of your account:</Text>
        <List mb="md">
          <List.Item>Your right to access and use the Service immediately ceases</List.Item>
          <List.Item>Your content may be deleted from our active systems</List.Item>
          <List.Item>We are not liable for any losses resulting from termination</List.Item>
          <List.Item>
            Sections of these Terms that by their nature should survive termination will continue to
            apply
          </List.Item>
        </List>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          12. Dispute Resolution and Governing Law
        </Title>

        <Title order={3} size="h4" mb="xs" mt="md">
          12.1 Governing Law
        </Title>
        <Text mb="md">
          These Terms shall be governed by and construed in accordance with the laws of the State of
          Israel, without regard to its conflict of law provisions.
        </Text>

        <Title order={3} size="h4" mb="xs" mt="md">
          12.2 Jurisdiction
        </Title>
        <Text mb="md">
          Any legal action, suit, or proceeding arising out of or relating to these Terms or the
          Service shall be instituted exclusively in the competent courts located in Jerusalem,
          Israel. You consent to the personal jurisdiction of such courts and waive any objection to
          venue in such courts.
        </Text>

        <Title order={3} size="h4" mb="xs" mt="md">
          12.3 Informal Resolution
        </Title>
        <Text mb="md">
          Before filing any formal legal action, you agree to first contact us at{' '}
          <Anchor href="mailto:admin@jobrocket.co.il">admin@jobrocket.co.il</Anchor> to attempt to
          resolve the dispute informally. We will make reasonable efforts to resolve disputes
          amicably.
        </Text>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          13. Changes to Terms
        </Title>
        <Text mb="md">
          We reserve the right to modify these Terms at any time. When we make changes:
        </Text>
        <List mb="md">
          <List.Item>We will update the "Last Updated" date at the top of these Terms</List.Item>
          <List.Item>
            Material changes will be communicated via email or prominent notice on the platform
          </List.Item>
          <List.Item>
            Your continued use of the Service after changes become effective constitutes acceptance
            of the new Terms
          </List.Item>
          <List.Item>
            If you do not agree to the modified Terms, you must stop using the Service
          </List.Item>
        </List>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          14. General Provisions
        </Title>

        <Title order={3} size="h4" mb="xs" mt="md">
          14.1 Entire Agreement
        </Title>
        <Text mb="md">
          These Terms, together with our Privacy Policy, constitute the entire agreement between you
          and JobRocket regarding the Service and supersede all prior agreements and understandings.
        </Text>

        <Title order={3} size="h4" mb="xs" mt="md">
          14.2 Severability
        </Title>
        <Text mb="md">
          If any provision of these Terms is found to be invalid or unenforceable, the remaining
          provisions shall remain in full force and effect.
        </Text>

        <Title order={3} size="h4" mb="xs" mt="md">
          14.3 Waiver
        </Title>
        <Text mb="md">
          No waiver of any term or condition of these Terms shall be deemed a further or continuing
          waiver of such term or condition or any other term or condition.
        </Text>

        <Title order={3} size="h4" mb="xs" mt="md">
          14.4 Assignment
        </Title>
        <Text mb="md">
          You may not assign or transfer these Terms or your rights under them without our prior
          written consent. We may freely assign these Terms.
        </Text>

        <Title order={3} size="h4" mb="xs" mt="md">
          14.5 No Agency
        </Title>
        <Text mb="md">
          Nothing in these Terms creates any agency, partnership, joint venture, or employment
          relationship between you and JobRocket.
        </Text>

        <Title order={3} size="h4" mb="xs" mt="md">
          14.6 Language
        </Title>
        <Text mb="md">
          These Terms are written in English. In the event of any conflict between an English
          version and a translated version, the English version shall prevail.
        </Text>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          15. Contact Information
        </Title>
        <Paper p="md" withBorder mb="md">
          <Text mb="sm">
            If you have any questions, concerns, or feedback regarding these Terms, please contact
            us:
          </Text>
          <Text>
            <strong>Email:</strong>{' '}
            <Anchor href="mailto:admin@jobrocket.co.il">admin@jobrocket.co.il</Anchor>
          </Text>
          <Text>
            <strong>Service:</strong> JobRocket
          </Text>
          <Text>
            <strong>Website:</strong>{' '}
            <Anchor href="https://jobrocket-site.onrender.com" target="_blank">
              https://jobrocket-site.onrender.com
            </Anchor>
          </Text>
        </Paper>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          16. Acknowledgment
        </Title>
        <Text mb="md">
          BY USING JOBROCKET, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE, UNDERSTAND
          THEM, AND AGREE TO BE BOUND BY THEM. IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST NOT USE
          THE SERVICE.
        </Text>
      </Box>

      <Box ta="center" c="dimmed" pt="xl" mt="xl" style={{ borderTop: '1px solid #e0e0e0' }}>
        <Text size="sm">© {new Date().getFullYear()} JobRocket. All rights reserved.</Text>
        <Text size="sm">
          For questions about these Terms, contact{' '}
          <Anchor href="mailto:admin@jobrocket.co.il">admin@jobrocket.co.il</Anchor>
        </Text>
      </Box>
    </Container>
  );
};

export default TermsOfService;
