import { FC } from 'react';
import { Accordion, Anchor, Container, List, Paper, Text, Title } from '@mantine/core';

const PrivacyPolicy: FC = () => {
  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="md">
        Privacy Policy
      </Title>
      <Text c="dimmed" fs="italic" mb="xl">
        Last Updated: December 24, 2025
        <br />
        Effective Date: January 1, 2026
      </Text>

      {/* Introduction */}
      <Text mb="md">
        JobRocket is committed to protecting your privacy. This Privacy Policy explains how we
        collect, use, share, and protect your personal information when you use our job board
        platform.
      </Text>
      <Text mb="md">
        By using JobRocket, you agree to the practices described in this Privacy Policy. If you
        don't agree, please don't use our services.
      </Text>
      <Text mb="xl">
        This policy complies with Israeli Privacy Protection Law (Amendment 13, effective August
        14, 2025).
      </Text>

      <Accordion variant="separated" radius="md">
        {/* Data Controller */}
        <Accordion.Item value="data-controller">
          <Accordion.Control>
            <Title order={3} size="h4">
              1. Data Controller & Contact Information
            </Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Paper p="md" withBorder mb="md">
              <Text>
                <strong>Data Controller:</strong> Elazar Lapp
              </Text>
              <Text>
                <strong>Email:</strong>{' '}
                <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor>
              </Text>
              <Text>
                <strong>Phone:</strong> 058-434-5797
              </Text>
              <Text>
                <strong>Address:</strong> Beit Shemesh, Israel
              </Text>
            </Paper>
            <Text>
              If you have questions about how we handle your personal data, or if you want to
              exercise any of your privacy rights, contact us using the information above. We'll
              respond within 30 days.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        {/* What Data We Collect */}
        <Accordion.Item value="data-collection">
          <Accordion.Control>
            <Title order={3} size="h4">
              2. What Personal Data We Collect and Why
            </Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Title order={4} size="h5" mb="xs" mt="md">
              Account Information (All Users)
            </Title>
            <Text mb="sm">
              <strong>What we collect:</strong>
            </Text>
            <List mb="md">
              <List.Item>Email address</List.Item>
              <List.Item>Password (stored as encrypted hash)</List.Item>
              <List.Item>Phone number</List.Item>
              <List.Item>Account type (job seeker or business)</List.Item>
              <List.Item>Registration date</List.Item>
              <List.Item>Account status</List.Item>
            </List>
            <Text mb="sm">
              <strong>Why we collect it:</strong> Create and authenticate your account, allow you
              to log in, contact you about your account or applications
            </Text>
            <Text mb="sm">
              <strong>Legal basis:</strong> Contractual necessity (we need this to provide the
              service)
            </Text>
            <Text mb="sm">
              <strong>Mandatory:</strong> Yes (phone is optional for business accounts)
            </Text>
            <Text mb="md">
              <strong>How long we keep it:</strong> Until you delete your account
            </Text>

            <Title order={4} size="h5" mb="xs" mt="lg">
              Job Seeker Profile Information
            </Title>
            <Text mb="sm">
              <strong>What we collect:</strong>
            </Text>
            <List mb="md">
              <List.Item>First name and last name</List.Item>
              <List.Item>Highest education level</List.Item>
              <List.Item>Preferred work arrangement</List.Item>
              <List.Item>Resume file (PDF)</List.Item>
              <List.Item>LinkedIn profile URL</List.Item>
              <List.Item>Skills list</List.Item>
              <List.Item>Professional summary/description</List.Item>
            </List>
            <Text mb="sm">
              <strong>Why we collect it:</strong> Display your profile to employers, match you with
              relevant job listings, allow employers to evaluate your applications
            </Text>
            <Text mb="sm">
              <strong>Legal basis:</strong> Your consent (you provided this information
              voluntarily)
            </Text>
            <Text mb="sm">
              <strong>Mandatory:</strong> Only name, education, and work arrangement are required.
              Resume, LinkedIn, skills, and summary are optional but recommended.
            </Text>
            <Text mb="sm">
              <strong>Storage location:</strong> Resume files are stored on Cloudinary (US-based
              service)
            </Text>

            <Title order={4} size="h5" mb="xs" mt="lg">
              Business Profile Information
            </Title>
            <Text mb="sm">
              <strong>What we collect:</strong>
            </Text>
            <List mb="md">
              <List.Item>Company name</List.Item>
              <List.Item>Location (country, region, city)</List.Item>
              <List.Item>Number of employees</List.Item>
              <List.Item>Company logo and description</List.Item>
              <List.Item>Website URL</List.Item>
              <List.Item>Contact email</List.Item>
              <List.Item>Social media links (LinkedIn, Twitter, Facebook)</List.Item>
            </List>
            <Text mb="sm">
              <strong>Why we collect it:</strong> Display your company profile, show company
              information on job listings, allow job seekers to research your company
            </Text>
            <Text mb="md">
              <strong>Mandatory:</strong> Company name, location, and employee count are required.
              Everything else is optional.
            </Text>

            <Title order={4} size="h5" mb="xs" mt="lg">
              AI Processing Data
            </Title>
            <Text mb="sm">
              <strong>What we collect:</strong>
            </Text>
            <List mb="md">
              <List.Item>
                Text extracted from job seeker profiles (job title, skills, professional summary)
              </List.Item>
              <List.Item>Text from job listings (title, description, requirements)</List.Item>
            </List>
            <Text mb="sm">
              <strong>Why we collect it:</strong> Generate AI-powered job match scores (this is a
              core feature of JobRocket), recommend relevant jobs to job seekers, help employers
              find qualified candidates
            </Text>
            <Text mb="sm">
              <strong>Legal basis:</strong> Contractual necessity - AI matching is integral to how
              JobRocket works
            </Text>
            <Paper p="md" withBorder bg="yellow.0" mb="md">
              <Text fw={700} mb="xs">
                Can I opt out of AI processing?
              </Text>
              <Text>
                No - AI job matching is a fundamental feature of our platform, not an optional
                add-on. Without it, we cannot provide you with personalized job recommendations or
                match scores. If you prefer not to use AI-powered matching, you may want to
                consider other job platforms.
              </Text>
            </Paper>
            <Text mb="sm">
              <strong>Who processes it:</strong> OpenAI (US-based service). We send only profile
              text - never your name, email, or phone number.
            </Text>

            <Title order={4} size="h5" mb="xs" mt="lg">
              Job Application Data
            </Title>
            <Text mb="sm">
              <strong>What we collect when you apply through JobRocket's internal system:</strong>
            </Text>
            <List mb="md">
              <List.Item>Your name, email, phone number (if provided)</List.Item>
              <List.Item>Your resume file</List.Item>
              <List.Item>Your cover letter/message (optional)</List.Item>
              <List.Item>Application timestamp</List.Item>
              <List.Item>Application status (pending, reviewed, rejected)</List.Item>
              <List.Item>The job and company you applied to</List.Item>
            </List>
            <Paper p="md" withBorder bg="blue.0" mb="md">
              <Text fw={700} mb="xs">
                About Deletion Rights:
              </Text>
              <Text mb="sm">
                Once you submit an application, you can delete it from our system{' '}
                <strong>only while it's in "pending" status</strong> (the employer hasn't reviewed
                it yet). Once an employer marks your application as "reviewed" or "rejected," you
                can no longer delete it from our system. This is because:
              </Text>
              <List size="sm">
                <List.Item>The employer has invested time reviewing your application</List.Item>
                <List.Item>
                  The employer needs records for their hiring process and legal compliance
                </List.Item>
                <List.Item>The application becomes part of the employer's business records</List.Item>
              </List>
              <Text size="sm" mt="sm">
                If you want an employer to delete your reviewed application, contact them directly
                through the contact information on the job listing.
              </Text>
            </Paper>

            <Title order={4} size="h5" mb="xs" mt="lg">
              Technical and Security Data
            </Title>
            <Text mb="sm">
              <strong>What we collect automatically:</strong>
            </Text>
            <List mb="md">
              <List.Item>IP address</List.Item>
              <List.Item>Browser type and version (user-agent)</List.Item>
              <List.Item>Login timestamps</List.Item>
              <List.Item>Session information</List.Item>
            </List>
            <Text mb="sm">
              <strong>Why we collect it:</strong> Prove you consented to data processing
              (regulatory requirement), prevent fraud and unauthorized access, secure your account
            </Text>
            <Text mb="md">
              <strong>How long we keep it:</strong> Consent records permanently (legal
              requirement), security logs for 90 days
            </Text>

            <Title order={4} size="h5" mb="xs" mt="lg">
              What We DON'T Collect
            </Title>
            <Text>
              We do not use cookies for tracking or analytics. We do not collect sensitive data
              such as race, religion, political opinions, health information, or financial data.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        {/* Third Parties */}
        <Accordion.Item value="third-parties">
          <Accordion.Control>
            <Title order={3} size="h4">
              3. Who Receives Your Data (Third Parties)
            </Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Title order={4} size="h5" mb="xs" mt="md">
              Cloudinary (United States)
            </Title>
            <Text mb="sm">
              <strong>What they receive:</strong> Resume files (PDF documents)
            </Text>
            <Text mb="sm">
              <strong>Why:</strong> We use Cloudinary to securely store and deliver resume files.
            </Text>
            <Text mb="md">
              <strong>Your control:</strong> Resume files are deleted from Cloudinary when you
              delete your application or account.
            </Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              OpenAI (United States)
            </Title>
            <Text mb="sm">
              <strong>What they receive:</strong> Text extracted from your profile (job title,
              skills, professional summary) and job listing descriptions
            </Text>
            <Text mb="sm">
              <strong>What they DON'T receive:</strong> Your name, email, phone number, or resume
              file
            </Text>
            <Text mb="sm">
              <strong>Why:</strong> We use OpenAI's API to generate AI embeddings that power our
              job matching algorithm.
            </Text>
            <Text mb="md">
              <strong>Your control:</strong> AI embeddings are deleted from our system when you
              delete your account. OpenAI retains API data for 30 days for abuse monitoring, then
              deletes it.
            </Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              Employers (Israel and potentially international)
            </Title>
            <Text mb="sm">
              <strong>What they receive when you apply through our internal system:</strong>
            </Text>
            <List mb="md">
              <List.Item>Your name, email, phone (if provided)</List.Item>
              <List.Item>Your resume file</List.Item>
              <List.Item>Your cover letter/message</List.Item>
              <List.Item>Your match score</List.Item>
            </List>
            <Paper p="md" withBorder bg="orange.0" mb="md">
              <Text fw={700} mb="xs">
                Important:
              </Text>
              <Text>
                Once an employer receives your application through JobRocket's internal system,
                they become independently responsible for handling your data according to privacy
                laws. We cannot control what they do with your application after you submit it.
              </Text>
            </Paper>

            <Title order={4} size="h5" mb="xs" mt="md">
              Render (United States)
            </Title>
            <Text mb="sm">
              <strong>What they receive:</strong> All data stored on our platform (they host our
              database and application servers)
            </Text>
            <Text mb="md">
              <strong>Why:</strong> Render provides our hosting infrastructure - the servers that
              run JobRocket
            </Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              International Data Transfers
            </Title>
            <Text mb="sm">
              Some of the third parties listed above are based in the United States, which does not
              have an "adequacy decision" from Israeli privacy authorities (meaning U.S. privacy
              laws are considered less protective than Israeli law).
            </Text>
            <Text mb="sm">
              <strong>How we protect international transfers:</strong>
            </Text>
            <List mb="md">
              <List.Item>
                All third parties are contractually bound to protect your data according to Israeli
                privacy standards
              </List.Item>
              <List.Item>Data is transmitted using encrypted connections (HTTPS/TLS)</List.Item>
              <List.Item>
                We minimize the data sent (e.g., OpenAI never receives identifying information)
              </List.Item>
            </List>
          </Accordion.Panel>
        </Accordion.Item>

        {/* Privacy Rights */}
        <Accordion.Item value="privacy-rights">
          <Accordion.Control>
            <Title order={3} size="h4">
              4. Your Privacy Rights
            </Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Text mb="md">
              Under Israeli privacy law (Amendment 13), you have the following rights regarding
              your personal data:
            </Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              Right to Access Your Data
            </Title>
            <Text mb="md">
              You can request a copy of all personal data we hold about you. Go to Settings &gt;
              Privacy &gt; Download My Data, or email us at{' '}
              <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor>. We'll
              provide this within 30 days of your request.
            </Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              Right to Correct Your Data
            </Title>
            <Text mb="md">
              You can update or correct inaccurate information in your profile. Go to Settings &gt;
              Profile to update your information. For corrections we cannot provide through the
              interface, email{' '}
              <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor>.
            </Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              Right to Delete Your Data
            </Title>
            <Text mb="sm">
              You can request deletion of your account and personal data. Go to Settings &gt;
              Account &gt; Delete Account, or email{' '}
              <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor>.
            </Text>
            <Text mb="sm">
              <strong>Important limitations:</strong>
            </Text>
            <List mb="md">
              <List.Item>
                <strong>Pending applications:</strong> You can delete these at any time
              </List.Item>
              <List.Item>
                <strong>Reviewed/rejected applications:</strong> You cannot delete these from our
                system. Contact the employer directly if you want them to delete it.
              </List.Item>
              <List.Item>
                <strong>Consent records:</strong> We must keep records showing that you consented
                to data processing permanently for legal compliance.
              </List.Item>
            </List>

            <Title order={4} size="h5" mb="xs" mt="md">
              Right to Data Portability
            </Title>
            <Text mb="md">
              You can receive your data in a structured, commonly used format (JSON) that you can
              transfer to another service. Go to Settings &gt; Privacy &gt; Download My Data.
            </Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              Right to Lodge a Complaint
            </Title>
            <Text mb="sm">
              If you believe we've violated your privacy rights, you can file a complaint with the
              Israeli Privacy Protection Authority:
            </Text>
            <Paper p="md" withBorder mb="md">
              <Text fw={700}>Israel Privacy Protection Authority</Text>
              <Text>Ministry of Justice</Text>
              <Text>29 Salah a-Din Street, Jerusalem</Text>
              <Text>
                Website:{' '}
                <Anchor
                  href="https://www.gov.il/he/departments/the_privacy_protection_authority"
                  target="_blank"
                >
                  gov.il/he/departments/the_privacy_protection_authority
                </Anchor>
              </Text>
            </Paper>
            <Text>
              Before filing a complaint, we encourage you to contact us first at{' '}
              <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor>. We take
              privacy concerns seriously and will work to resolve any issues.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        {/* Security */}
        <Accordion.Item value="security">
          <Accordion.Control>
            <Title order={3} size="h4">
              5. How We Protect Your Data
            </Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Text mb="sm">
              We take the security of your personal data seriously and implement multiple layers of
              protection:
            </Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              Technical Security Measures
            </Title>
            <List mb="md">
              <List.Item>
                <strong>Encrypted connections:</strong> All data transmitted between your browser
                and our servers uses HTTPS/TLS encryption
              </List.Item>
              <List.Item>
                <strong>Password security:</strong> Your password is never stored in plain text. We
                use bcrypt hashing, an industry-standard method
              </List.Item>
              <List.Item>
                <strong>Secure file storage:</strong> Resume files are stored on Cloudinary's
                secure infrastructure with restricted access controls
              </List.Item>
              <List.Item>
                <strong>Session management:</strong> Your login sessions use secure, HTTP-only
                cookies that cannot be accessed by malicious scripts
              </List.Item>
              <List.Item>
                <strong>Database security:</strong> Our database is hosted on encrypted servers
                with restricted network access
              </List.Item>
            </List>

            <Paper p="md" withBorder bg="red.0" mb="md">
              <Text fw={700} mb="xs">
                Your Responsibility:
              </Text>
              <List size="sm">
                <List.Item>Keep your password confidential and don't share it with others</List.Item>
                <List.Item>Use a strong, unique password for your JobRocket account</List.Item>
                <List.Item>Log out from shared or public computers</List.Item>
                <List.Item>
                  Report any suspicious activity to{' '}
                  <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor>{' '}
                  immediately
                </List.Item>
              </List>
            </Paper>
          </Accordion.Panel>
        </Accordion.Item>

        {/* Data Retention */}
        <Accordion.Item value="data-retention">
          <Accordion.Control>
            <Title order={3} size="h4">
              6. How Long We Keep Your Data
            </Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Text mb="md">
              We only retain your personal data for as long as necessary to provide our services
              and comply with legal obligations.
            </Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              Active Accounts
            </Title>
            <List mb="md">
              <List.Item>
                <strong>Profile data:</strong> Kept until you delete your account
              </List.Item>
              <List.Item>
                <strong>Resume files:</strong> Kept until you delete your account or the specific
                application
              </List.Item>
              <List.Item>
                <strong>AI embeddings:</strong> Kept until you delete your account
              </List.Item>
              <List.Item>
                <strong>Applications:</strong> Kept until you delete (if pending), employer
                deletes, or 2 years after job closes
              </List.Item>
            </List>

            <Title order={4} size="h5" mb="xs" mt="md">
              After Account Deletion
            </Title>
            <Text mb="sm">
              <strong>30-day grace period:</strong> When you delete your account, we retain your
              data for 30 days in case you change your mind. Contact{' '}
              <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor> to
              restore your account during this period.
            </Text>
            <Text mb="sm">
              <strong>Permanent deletion:</strong> After 30 days, we permanently delete your
              profile information, resume files, AI embeddings, and pending applications.
            </Text>
            <Text mb="md">
              <strong>What we keep permanently:</strong> Consent records (timestamps, IP addresses)
              - required by law to prove we obtained proper consent. These do not include your
              profile data.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        {/* Cookies */}
        <Accordion.Item value="cookies">
          <Accordion.Control>
            <Title order={3} size="h4">
              7. Cookies and Tracking
            </Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Text mb="md">
              We currently use minimal cookies and do not track your browsing behavior.
            </Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              Cookies We Use
            </Title>
            <Text mb="sm">
              <strong>Essential cookies only:</strong> We only use cookies that are strictly
              necessary for the platform to function:
            </Text>
            <List mb="md">
              <List.Item>
                <strong>Session cookie:</strong> Keeps you logged in as you navigate the site
              </List.Item>
              <List.Item>
                <strong>CSRF protection token:</strong> Prevents malicious websites from
                impersonating you
              </List.Item>
            </List>
            <Text mb="md">These cookies are essential and cannot be disabled.</Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              What We Don't Use
            </Title>
            <List mb="md">
              <List.Item>No analytics cookies (like Google Analytics)</List.Item>
              <List.Item>No advertising cookies</List.Item>
              <List.Item>No third-party tracking</List.Item>
            </List>
          </Accordion.Panel>
        </Accordion.Item>

        {/* Children */}
        <Accordion.Item value="children">
          <Accordion.Control>
            <Title order={3} size="h4">
              8. Children's Privacy
            </Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Paper p="md" withBorder bg="yellow.0" mb="md">
              <Text fw={700} mb="xs">
                Age Restriction:
              </Text>
              <Text>
                JobRocket is not intended for children under the age of 18. We do not knowingly
                collect personal information from anyone under 18 years old. By using JobRocket,
                you confirm that you are at least 18 years old.
              </Text>
            </Paper>
            <Text>
              If you're a parent or guardian and believe your child has created an account on
              JobRocket, please contact us immediately at{' '}
              <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor> and
              we'll delete the account.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        {/* Policy Changes */}
        <Accordion.Item value="policy-changes">
          <Accordion.Control>
            <Title order={3} size="h4">
              9. Changes to This Privacy Policy
            </Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Text mb="md">
              We may update this Privacy Policy from time to time to reflect changes in our
              practices, technology, legal requirements, or other factors.
            </Text>
            <Text mb="sm">
              <strong>For minor changes:</strong> We'll update the "Last Updated" date at the top
              of this policy
            </Text>
            <Text mb="md">
              <strong>For significant changes:</strong> We'll notify you via email and display a
              prominent notice on the JobRocket website. You'll have 30 days to review the changes
              before they take effect.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        {/* Governing Law */}
        <Accordion.Item value="governing-law">
          <Accordion.Control>
            <Title order={3} size="h4">
              10. Governing Law and Legal Jurisdiction
            </Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Text mb="md">
              This Privacy Policy and our handling of your personal data are governed by the laws
              of the State of Israel, including the Privacy Protection Law, 5741-1981, as amended
              by Amendment 13 (effective August 14, 2025).
            </Text>
            <Text>
              Any disputes arising from this Privacy Policy or our data practices will be subject
              to the exclusive jurisdiction of the competent courts in Israel.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>

        {/* Contact */}
        <Accordion.Item value="contact">
          <Accordion.Control>
            <Title order={3} size="h4">
              Questions or Concerns?
            </Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Paper p="md" withBorder mb="md">
              <Text mb="sm">
                If you have any questions about this Privacy Policy or how we handle your personal
                data:
              </Text>
              <Text>
                <strong>Email:</strong>{' '}
                <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor>
              </Text>
              <Text>
                <strong>Phone:</strong> 058-434-5797
              </Text>
              <Text>
                <strong>Mail:</strong> Elazar Lapp, Beit Shemesh, Israel
              </Text>
              <Text mt="sm" size="sm" c="dimmed">
                We'll respond to your inquiry within 30 days.
              </Text>
            </Paper>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      {/* Footer */}
      <Text ta="center" c="dimmed" pt="xl" mt="xl" size="sm" style={{ borderTop: '1px solid #e0e0e0' }}>
        © {new Date().getFullYear()} JobRocket. All rights reserved.
        <br />
        Thank you for trusting JobRocket with your personal information. We're committed to
        protecting your privacy and handling your data responsibly.
      </Text>
    </Container>
  );
};

export default PrivacyPolicy;
