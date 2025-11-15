import { FC } from 'react';
import { Anchor, Box, Container, List, Paper, Text, Title } from '@mantine/core';

const PrivacyPolicy: FC = () => {
  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="md">
        Privacy Policy
      </Title>
      <Text c="dimmed" fs="italic" mb="xl">
        Last Updated: January 2025
      </Text>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          1. Introduction
        </Title>
        <Text mb="md">
          Welcome to JobRocket ("we," "our," or "us"). We are committed to protecting your privacy
          and ensuring the security of your personal information. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your information when you use our job matching
          platform available at{' '}
          <Anchor href="https://jobrocket-site.onrender.com" target="_blank">
            https://jobrocket-site.onrender.com
          </Anchor>{' '}
          (the "Service").
        </Text>
        <Text mb="md">
          This Privacy Policy complies with the Israeli Privacy Protection Law, 1981, and its
          regulations. By using JobRocket, you agree to the collection and use of information in
          accordance with this policy.
        </Text>
        <Paper p="md" withBorder bg="yellow.0" mb="md">
          <Text fw={700} mb="xs">
            Age Restriction:
          </Text>
          <Text>
            You must be at least 15 years old to use JobRocket. We do not knowingly collect personal
            information from individuals under 15 years of age.
          </Text>
        </Paper>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          2. Information We Collect
        </Title>

        <Title order={3} size="h4" mb="xs" mt="md">
          2.1 Information You Provide Directly
        </Title>
        <Text mb="sm">
          When you register and use our Service, we collect the following information:
        </Text>

        <Text fw={600} mt="md" mb="xs">
          For All Users:
        </Text>
        <List mb="md">
          <List.Item>
            <strong>Account Information:</strong> Email address, password (encrypted), phone number
            (Israeli format), and profile type (jobseeker or business)
          </List.Item>
          <List.Item>
            <strong>Account Metadata:</strong> Account creation date, login history, and preferences
          </List.Item>
        </List>

        <Text fw={600} mb="xs">
          For Jobseekers:
        </Text>
        <List mb="md">
          <List.Item>
            <strong>Profile Information:</strong> First name, last name, highest education level,
            preferred work arrangement
          </List.Item>
          <List.Item>
            <strong>Optional Professional Information:</strong> LinkedIn profile URL, resume
            URL/link, skills list, professional description/summary (up to 2,000 characters)
          </List.Item>
          <List.Item>
            <strong>Job Applications:</strong> Application details including resume text (50-5,000
            characters), cover letter, messages, and application status
          </List.Item>
          <List.Item>
            <strong>Preferences:</strong> Liked/favorited job listings
          </List.Item>
        </List>

        <Text fw={600} mb="xs">
          For Businesses:
        </Text>
        <List mb="md">
          <List.Item>
            <strong>Company Information:</strong> Company name, location (region and city in
            Israel), industry, number of employees
          </List.Item>
          <List.Item>
            <strong>Optional Business Information:</strong> Company logo, website URL, contact
            email, social media links (LinkedIn, Twitter, Facebook), company description (up to
            2,000 characters)
          </List.Item>
          <List.Item>
            <strong>Job Listings:</strong> Job titles, descriptions, requirements, advantages,
            application methods, contact information, locations, work arrangements, industry, and
            listing status
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          2.2 Information Collected Automatically
        </Title>
        <List mb="md">
          <List.Item>
            <strong>Usage Data:</strong> Login attempts, account access patterns, and
            security-related information
          </List.Item>
          <List.Item>
            <strong>Technical Data:</strong> HTTP request logs (IP address, browser type, access
            times) for security and operational purposes
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          2.3 Contact Form Data
        </Title>
        <Text>
          When you use our contact form on the About page, we collect your name, email address,
          subject, and message. This information is transmitted through EmailJS and is not stored in
          our database.
        </Text>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          3. How We Use Your Information
        </Title>
        <Text mb="sm">We use the collected information for the following purposes:</Text>
        <List mb="md">
          <List.Item>
            <strong>Service Provision:</strong> To create and manage your account, facilitate job
            matching, process applications, and deliver core platform features
          </List.Item>
          <List.Item>
            <strong>AI-Powered Matching:</strong> To generate embeddings of your profile or job
            listings using artificial intelligence to provide personalized job match recommendations
          </List.Item>
          <List.Item>
            <strong>Communication:</strong> To respond to your inquiries, send service-related
            notifications, and provide customer support
          </List.Item>
          <List.Item>
            <strong>Security:</strong> To protect against unauthorized access, fraud, and abuse
            through authentication, rate limiting, and account lockout mechanisms
          </List.Item>
          <List.Item>
            <strong>Service Improvement:</strong> To analyze usage patterns and improve our
            platform's functionality and user experience
          </List.Item>
          <List.Item>
            <strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and
            legal processes
          </List.Item>
        </List>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          4. Artificial Intelligence and Data Processing
        </Title>
        <Text mb="sm">
          JobRocket uses artificial intelligence to enhance job matching capabilities:
        </Text>
        <List mb="md">
          <List.Item>
            <strong>Embedding Generation:</strong> We use OpenAI's API (text-embedding-3-small
            model) to create vector embeddings of jobseeker profiles and job listings
          </List.Item>
          <List.Item>
            <strong>Processed Data:</strong> The AI processes information including skills,
            education, job preferences, descriptions, requirements, and industry information
          </List.Item>
          <List.Item>
            <strong>Purpose:</strong> These embeddings enable our algorithm to calculate match
            scores between jobseekers and job listings
          </List.Item>
          <List.Item>
            <strong>Automatic Updates:</strong> Embeddings are automatically regenerated when you
            update your profile or listing information
          </List.Item>
        </List>
        <Paper p="md" withBorder bg="yellow.0" mb="md">
          <Text fw={700} mb="xs">
            International Data Transfer:
          </Text>
          <Text>
            OpenAI may process your data outside of Israel. By using JobRocket, you consent to this
            transfer. OpenAI's data processing is subject to their own privacy policies and terms of
            service.
          </Text>
        </Paper>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          5. Third-Party Services
        </Title>
        <Text mb="sm">
          We use the following third-party services that may collect or process your information:
        </Text>

        <Title order={3} size="h4" mb="xs" mt="md">
          5.1 OpenAI API
        </Title>
        <List mb="md">
          <List.Item>
            <strong>Purpose:</strong> Generate embeddings for job matching algorithm
          </List.Item>
          <List.Item>
            <strong>Data Shared:</strong> Profile information, job listings, skills, and
            descriptions
          </List.Item>
          <List.Item>
            <strong>Privacy Policy:</strong>{' '}
            <Anchor href="https://openai.com/privacy" target="_blank">
              https://openai.com/privacy
            </Anchor>
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          5.2 EmailJS
        </Title>
        <List mb="md">
          <List.Item>
            <strong>Purpose:</strong> Process contact form submissions
          </List.Item>
          <List.Item>
            <strong>Data Shared:</strong> Name, email, subject, and message content
          </List.Item>
          <List.Item>
            <strong>Note:</strong> This data is not stored in our database
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          5.3 MongoDB Atlas
        </Title>
        <List mb="md">
          <List.Item>
            <strong>Purpose:</strong> Cloud database hosting
          </List.Item>
          <List.Item>
            <strong>Data Stored:</strong> All user accounts, profiles, job listings, and
            applications
          </List.Item>
          <List.Item>
            <strong>Security:</strong> Industry-standard encryption and security measures
          </List.Item>
        </List>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          6. Data Storage and Security
        </Title>

        <Title order={3} size="h4" mb="xs" mt="md">
          6.1 Storage Locations
        </Title>
        <List mb="md">
          <List.Item>
            <strong>Server-Side:</strong> MongoDB Atlas (cloud database with encryption at rest and
            in transit)
          </List.Item>
          <List.Item>
            <strong>Client-Side:</strong>
            <List withPadding>
              <List.Item>localStorage: JWT authentication tokens and user preferences</List.Item>
              <List.Item>sessionStorage: Temporary session state data</List.Item>
            </List>
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          6.2 Security Measures
        </Title>
        <Text mb="sm">We implement comprehensive security measures to protect your data:</Text>
        <List mb="md">
          <List.Item>
            <strong>Encryption:</strong> Passwords are encrypted using bcrypt hashing algorithm
          </List.Item>
          <List.Item>
            <strong>Authentication:</strong> JWT (JSON Web Token) authentication with 1-hour token
            expiration
          </List.Item>
          <List.Item>
            <strong>Rate Limiting:</strong> Protection against abuse (5 login attempts per 15
            minutes, 5 registrations per hour, 10 listings per 24 hours, 50 applications per hour)
          </List.Item>
          <List.Item>
            <strong>Account Security:</strong> Automatic account lockout after failed login attempts
          </List.Item>
          <List.Item>
            <strong>Input Validation:</strong> Protection against NoSQL injection and malicious
            input
          </List.Item>
          <List.Item>
            <strong>HTTP Security:</strong> Security headers implemented via Helmet.js
          </List.Item>
          <List.Item>
            <strong>CORS Protection:</strong> Cross-origin resource sharing restrictions
          </List.Item>
          <List.Item>
            <strong>HTTPS:</strong> Encrypted connections in production environment
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          6.3 Data Retention
        </Title>
        <Text mb="sm">
          We retain your personal information only as long as necessary to provide our services and
          comply with legal obligations:
        </Text>
        <List mb="md">
          <List.Item>
            <strong>Active Accounts:</strong> Data is retained while your account remains active
          </List.Item>
          <List.Item>
            <strong>Account Deletion:</strong> Upon request, your account and associated data will
            be deleted immediately from our active database
          </List.Item>
          <List.Item>
            <strong>Backup Systems:</strong> Data may remain in backup systems for up to 30 days
            following deletion
          </List.Item>
          <List.Item>
            <strong>Legal Requirements:</strong> We may retain certain information if required by
            law or for legitimate business purposes
          </List.Item>
          <List.Item>
            <strong>Session Data:</strong> JWT tokens expire after 1 hour; session storage is
            cleared upon logout
          </List.Item>
        </List>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          7. How We Share Your Information
        </Title>
        <Text mb="md">
          We do not sell or rent your personal information to third parties. We may share your
          information in the following circumstances:
        </Text>

        <Title order={3} size="h4" mb="xs" mt="md">
          7.1 With Your Consent
        </Title>
        <List mb="md">
          <List.Item>
            <strong>Job Applications:</strong> When you apply for a job, your application
            information (resume, cover letter, message) is shared with the business that posted the
            listing
          </List.Item>
          <List.Item>
            <strong>Public Listings:</strong> Job listings posted by businesses are publicly visible
            to all users
          </List.Item>
          <List.Item>
            <strong>Profile Visibility:</strong> Certain profile information may be visible when you
            interact with the platform
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          7.2 Service Providers
        </Title>
        <List mb="md">
          <List.Item>
            We share data with third-party service providers (OpenAI, EmailJS, MongoDB Atlas) as
            necessary to operate our platform (see Section 5)
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          7.3 Legal Requirements
        </Title>
        <List mb="md">
          <List.Item>
            We may disclose your information if required by Israeli law, regulation, legal process,
            or governmental request
          </List.Item>
          <List.Item>
            To enforce our Terms of Service or protect the rights, property, or safety of JobRocket,
            our users, or the public
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          7.4 Business Transfers
        </Title>
        <List mb="md">
          <List.Item>
            In the event of a merger, acquisition, or sale of assets, your information may be
            transferred to the new entity
          </List.Item>
        </List>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          8. Your Rights
        </Title>
        <Text mb="sm">
          Under Israeli privacy law, you have the following rights regarding your personal
          information:
        </Text>

        <Title order={3} size="h4" mb="xs" mt="md">
          8.1 Right to Access
        </Title>
        <List mb="md">
          <List.Item>
            You can access and review your personal information at any time through your account
            settings
          </List.Item>
          <List.Item>
            Contact us at <Anchor href="mailto:admin@jobrocket.co.il">admin@jobrocket.co.il</Anchor>{' '}
            to request a copy of the information we hold about you
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          8.2 Right to Correction
        </Title>
        <List mb="md">
          <List.Item>
            You can update your profile information directly through the platform
          </List.Item>
          <List.Item>
            If you cannot update information yourself, contact us for assistance
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          8.3 Right to Deletion
        </Title>
        <List mb="md">
          <List.Item>
            You can delete your account at any time through your account settings
          </List.Item>
          <List.Item>
            Alternatively, submit a deletion request to{' '}
            <Anchor href="mailto:admin@jobrocket.co.il">admin@jobrocket.co.il</Anchor>
          </List.Item>
          <List.Item>
            Upon deletion, your data will be immediately removed from our active systems
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          8.4 Right to Object
        </Title>
        <List mb="md">
          <List.Item>You may object to certain processing of your personal information</List.Item>
          <List.Item>Contact us to discuss your concerns</List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          8.5 Role Switching
        </Title>
        <List mb="md">
          <List.Item>You can switch between jobseeker and business profiles at any time</List.Item>
          <List.Item>
            Note that switching roles may affect the visibility and functionality of certain
            features
          </List.Item>
        </List>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          9. Cookies and Local Storage
        </Title>
        <Text mb="sm">JobRocket uses browser storage technologies to enhance your experience:</Text>

        <Title order={3} size="h4" mb="xs" mt="md">
          9.1 localStorage
        </Title>
        <List mb="md">
          <List.Item>
            <strong>Purpose:</strong> Store JWT authentication tokens and "remember me" preferences
          </List.Item>
          <List.Item>
            <strong>Duration:</strong> Persists until you log out or clear browser data
          </List.Item>
          <List.Item>
            <strong>Control:</strong> You can clear localStorage through your browser settings
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          9.2 sessionStorage
        </Title>
        <List mb="md">
          <List.Item>
            <strong>Purpose:</strong> Store temporary session state (Redux store)
          </List.Item>
          <List.Item>
            <strong>Duration:</strong> Cleared when you close the browser tab
          </List.Item>
          <List.Item>
            <strong>Control:</strong> Automatically cleared when closing the browser
          </List.Item>
        </List>

        <Title order={3} size="h4" mb="xs" mt="md">
          9.3 Future Analytics
        </Title>
        <Text>
          We may implement analytics tools (such as Google Analytics) in the future to better
          understand how users interact with our platform. If we do so, we will update this Privacy
          Policy accordingly and may implement a cookie consent mechanism.
        </Text>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          10. Children's Privacy
        </Title>
        <Text mb="md">
          JobRocket requires users to be at least 15 years old. We do not knowingly collect personal
          information from individuals under 15. If we become aware that we have collected personal
          information from someone under 15 without parental consent, we will take steps to delete
          that information immediately.
        </Text>
        <Text>
          If you believe we have inadvertently collected information from someone under 15, please
          contact us at <Anchor href="mailto:admin@jobrocket.co.il">admin@jobrocket.co.il</Anchor>.
        </Text>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          11. International Data Transfers
        </Title>
        <Text mb="sm">
          While JobRocket primarily operates in Israel and serves the Israeli job market, some of
          your data may be processed or stored outside of Israel:
        </Text>
        <List mb="md">
          <List.Item>
            <strong>OpenAI Processing:</strong> Data sent to OpenAI for embedding generation may be
            processed in the United States or other countries where OpenAI operates
          </List.Item>
          <List.Item>
            <strong>Cloud Services:</strong> MongoDB Atlas may store data in data centers outside of
            Israel
          </List.Item>
          <List.Item>
            <strong>Safeguards:</strong> We work with service providers that implement appropriate
            security measures and comply with international data protection standards
          </List.Item>
        </List>
        <Text>By using JobRocket, you consent to these international data transfers.</Text>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          12. Changes to This Privacy Policy
        </Title>
        <Text mb="sm">
          We may update this Privacy Policy from time to time to reflect changes in our practices,
          technology, legal requirements, or other factors. When we make changes:
        </Text>
        <List mb="md">
          <List.Item>We will update the "Last Updated" date at the top of this policy</List.Item>
          <List.Item>
            Significant changes will be communicated through email or prominent notice on our
            platform
          </List.Item>
          <List.Item>
            Your continued use of JobRocket after changes become effective constitutes acceptance of
            the updated policy
          </List.Item>
        </List>
        <Text>
          We encourage you to review this Privacy Policy periodically to stay informed about how we
          protect your information.
        </Text>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          13. Data Breach Notification
        </Title>
        <Text mb="sm">
          In the unlikely event of a data breach that may compromise your personal information:
        </Text>
        <List mb="md">
          <List.Item>We will investigate the breach and assess its impact</List.Item>
          <List.Item>
            We will notify affected users via email within a reasonable timeframe
          </List.Item>
          <List.Item>We will notify relevant Israeli authorities as required by law</List.Item>
          <List.Item>
            We will take immediate steps to mitigate the breach and prevent future occurrences
          </List.Item>
        </List>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          14. Your Responsibilities
        </Title>
        <Text mb="sm">To help protect your privacy and security:</Text>
        <List mb="md">
          <List.Item>Keep your password secure and do not share it with others</List.Item>
          <List.Item>Use a strong, unique password for your JobRocket account</List.Item>
          <List.Item>Log out of your account when using shared or public computers</List.Item>
          <List.Item>
            Be cautious about the information you include in your profile, job listings, and
            applications
          </List.Item>
          <List.Item>Review your account settings and privacy preferences regularly</List.Item>
          <List.Item>
            Report any suspicious activity or security concerns to{' '}
            <Anchor href="mailto:admin@jobrocket.co.il">admin@jobrocket.co.il</Anchor>
          </List.Item>
        </List>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          15. Contact Us
        </Title>
        <Paper p="md" withBorder mb="md">
          <Text mb="sm">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our
            data practices, please contact us:
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
          16. Israeli Privacy Protection Authority
        </Title>
        <Text mb="sm">
          If you believe that your privacy rights have been violated or you have a complaint that we
          have not adequately addressed, you have the right to lodge a complaint with the Israeli
          Privacy Protection Authority:
        </Text>
        <Paper p="md" withBorder mb="md">
          <Text fw={700}>Privacy Protection Authority</Text>
          <Text>Ministry of Justice</Text>
          <Text>
            Email: <Anchor href="mailto:privacy@justice.gov.il">privacy@justice.gov.il</Anchor>
          </Text>
          <Text>
            Website:{' '}
            <Anchor
              href="https://www.gov.il/en/departments/the_privacy_protection_authority"
              target="_blank"
            >
              www.gov.il/en/departments/the_privacy_protection_authority
            </Anchor>
          </Text>
        </Paper>
      </Box>

      <Box mb="xl">
        <Title order={2} size="h3" mb="sm">
          17. Governing Law
        </Title>
        <Text>
          This Privacy Policy is governed by and construed in accordance with the laws of the State
          of Israel. Any disputes arising from this policy shall be subject to the exclusive
          jurisdiction of the competent courts in Jerusalem, Israel.
        </Text>
      </Box>

      <Box ta="center" c="dimmed" pt="xl" mt="xl" style={{ borderTop: '1px solid #e0e0e0' }}>
        <Text size="sm">© {new Date().getFullYear()} JobRocket. All rights reserved.</Text>
        <Text size="sm">
          By using JobRocket, you acknowledge that you have read and understood this Privacy Policy.
        </Text>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
