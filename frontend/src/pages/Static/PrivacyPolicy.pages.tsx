import { FC } from 'react';
import { Accordion, Anchor, Container, List, Paper, Text, Title } from '@mantine/core';

const PrivacyPolicy: FC = () => {
  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="md">
        Privacy Policy
      </Title>
      <Text c="dimmed" fs="italic" mb="xl">
        Last Updated: December 30, 2025
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
        This policy complies with Israeli Privacy Protection Law (Amendment 13, effective August 14,
        2025).
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
              <strong>Why we collect it:</strong> Create and authenticate your account, allow you to
              log in, contact you about your account or applications
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
              <strong>Legal basis:</strong> Your consent (you provided this information voluntarily)
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
                match scores. If you prefer not to use AI-powered matching, you may want to consider
                other job platforms.
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
              <List.Item>Your message (optional)</List.Item>
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
                <List.Item>
                  The application becomes part of the employer's business records
                </List.Item>
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
              <strong>Why we collect it:</strong> Prove you consented to data processing (regulatory
              requirement), prevent fraud and unauthorized access, secure your account
            </Text>
            <Text mb="md">
              <strong>How long we keep it:</strong> Consent records permanently (legal requirement),
              security logs for 90 days
            </Text>

            <Title order={4} size="h5" mb="xs" mt="lg">
              Cookies and Similar Technologies
            </Title>
            <Text mb="sm">
              We use session cookies to keep you logged in. These are essential for the platform to
              function and cannot be disabled.
            </Text>
            <Paper p="md" withBorder bg="yellow.0" mb="md">
              <Text fw={700} mb="xs">
                What are session cookies?
              </Text>
              <List size="sm">
                <List.Item>Small text files stored in your browser</List.Item>
                <List.Item>Used only to maintain your login session</List.Item>
                <List.Item>Contain a random session ID (no personal information)</List.Item>
                <List.Item>
                  Automatically deleted when you log out or after 24 hours of inactivity
                </List.Item>
              </List>
            </Paper>
            <Text mb="sm">
              <strong>We do NOT use:</strong>
            </Text>
            <List mb="md">
              <List.Item>Tracking cookies</List.Item>
              <List.Item>Analytics cookies</List.Item>
              <List.Item>Advertising cookies</List.Item>
              <List.Item>Third-party cookies</List.Item>
            </List>
            <Text mb="md">
              You cannot opt out of session cookies because they're required for basic functionality
              (logging in, submitting applications). If you don't accept cookies, you cannot use
              JobRocket.
            </Text>

            <Title order={4} size="h5" mb="xs" mt="lg">
              What We DON'T Collect
            </Title>
            <Text>
              We do not collect sensitive data such as race, religion, political opinions, health
              information, or financial data (beyond basic job salary ranges in listings).
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
              <strong>Why:</strong> We use OpenAI's API to generate AI embeddings that power our job
              matching algorithm.
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
              <List.Item>Your message (if provided)</List.Item>
              <List.Item>Your match score</List.Item>
            </List>
            <Paper p="md" withBorder bg="orange.0" mb="md">
              <Text fw={700} mb="xs">
                Important:
              </Text>
              <Text>
                Once an employer receives your application through JobRocket's internal system, they
                become independently responsible for handling your data according to privacy laws.
                We cannot control what they do with your application after you submit it.
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
              Under Israeli privacy law (Amendment 13), you have the following rights regarding your
              personal data:
            </Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              Right to Access Your Data
            </Title>
            <Text mb="md">
              You can request a copy of all personal data we hold about you. Go to My Account &gt;
              Download My Data, or email us at{' '}
              <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor>. We'll
              provide this within 30 days of your request.
            </Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              Right to Correct Your Data
            </Title>
            <Text mb="md">
              You can update or correct inaccurate information in your profile. Go to My Account to
              update your information. For corrections we cannot provide through the interface,
              email <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor>.
            </Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              Right to Delete Your Data
            </Title>
            <Text mb="sm">
              You can request deletion of your account and personal data. Go to My Account &gt;
              Delete Account, or email{' '}
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
                <strong>Consent records:</strong> We must keep records showing that you consented to
                data processing permanently for legal compliance.
              </List.Item>
            </List>

            <Title order={4} size="h5" mb="xs" mt="md">
              Right to Data Portability
            </Title>
            <Text mb="md">
              You can receive your data in a structured, commonly used format (JSON) that you can
              transfer to another service. Go to My Account &gt; Download My Data.
            </Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              Right to Lodge a Complaint
            </Title>
            <Text mb="md">
              If you believe your privacy rights have been violated or you're not satisfied with how
              we've handled your data protection concerns, you have the right to lodge a complaint
              with the Israeli Privacy Protection Authority (PPA).
            </Text>
            <Paper p="md" withBorder mb="md">
              <Text fw={700} mb="xs">
                Privacy Protection Authority
              </Text>
              <Text mb="xs">Ministry of Justice, Israel</Text>
              <Text mb="xs">
                <strong>Email:</strong>{' '}
                <Anchor href="mailto:privacy@justice.gov.il">privacy@justice.gov.il</Anchor>
              </Text>
              <Text mb="xs">
                <strong>Website:</strong>{' '}
                <Anchor
                  href="https://www.gov.il/en/departments/the_privacy_protection_authority"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  gov.il/en/departments/the_privacy_protection_authority
                </Anchor>
              </Text>
              <Text>
                <strong>Phone:</strong> *2539 (from Israel) or +972-2-646-6666
              </Text>
            </Paper>
            <Text mb="sm">
              You can file a complaint without needing to prove you suffered harm. The PPA has the
              authority to investigate complaints and enforce data protection laws.
            </Text>
            <Text>
              We encourage you to contact us first at{' '}
              <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor> so we can
              try to resolve your concerns directly, but you have the right to contact the PPA at
              any time.
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
                <strong>Secure file storage:</strong> Resume files are stored on Cloudinary's secure
                infrastructure with restricted access controls
              </List.Item>
              <List.Item>
                <strong>Session management:</strong> Your login sessions use secure, HTTP-only
                cookies that cannot be accessed by malicious scripts
              </List.Item>
              <List.Item>
                <strong>Database security:</strong> Our database is hosted on encrypted servers with
                restricted network access
              </List.Item>
            </List>

            <Paper p="md" withBorder bg="red.0" mb="md">
              <Text fw={700} mb="xs">
                Your Responsibility:
              </Text>
              <List size="sm">
                <List.Item>
                  Keep your password confidential and don't share it with others
                </List.Item>
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
              We only retain your personal data for as long as necessary to provide our services and
              comply with legal obligations. Here are the specific retention periods for different
              types of data:
            </Text>

            <Title order={4} size="h5" mb="xs" mt="md">
              Active Accounts
            </Title>
            <Text mb="sm">
              We keep your data as long as your account is active. You can delete your account
              anytime from My Account &gt; Delete Account.
            </Text>

            <Title order={4} size="h5" mb="xs" mt="lg">
              Inactive Accounts
            </Title>
            <List mb="md">
              <List.Item>
                If you don't log in for <strong>24 consecutive months</strong>, we'll send you 2
                email warnings (at 22 months and 23 months)
              </List.Item>
              <List.Item>
                After 24 months of inactivity, we'll automatically delete your account and all
                associated data
              </List.Item>
              <List.Item>
                <strong>Exception:</strong> Applications to jobs are controlled by the employer, not
                deleted automatically
              </List.Item>
            </List>

            <Title order={4} size="h5" mb="xs" mt="lg">
              Deleted Accounts (30-Day Grace Period)
            </Title>
            <Text mb="sm">
              When you delete your account, it enters a <strong>30-day grace period</strong> during which you can restore your account by contacting support.
            </Text>
            <List mb="md">
              <List.Item>
                Your profile is <strong>immediately hidden</strong> from employers and job seekers
              </List.Item>
              <List.Item>
                You cannot log in, but your account data is preserved for 30 days
              </List.Item>
              <List.Item>
                Pending job applications are withdrawn immediately
              </List.Item>
              <List.Item>
                To restore your account within 30 days, email{' '}
                <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor>
              </List.Item>
              <List.Item>
                After 30 days: all personal data is <strong>permanently deleted</strong>, including profile data, resume files, and account information
              </List.Item>
            </List>

            <Title order={4} size="h5" mb="xs" mt="lg">
              Application Data
            </Title>
            <Text mb="sm">
              Your applications remain accessible to employers even after you delete your account.
            </Text>
            <List mb="md">
              <List.Item>Employers control retention of application data</List.Item>
              <List.Item>
                Recommend contacting employers directly if you want them to delete your applications
              </List.Item>
            </List>

            <Title order={4} size="h5" mb="xs" mt="lg">
              Security & Consent Logs
            </Title>
            <List mb="md">
              <List.Item>
                <strong>Login timestamps and IP addresses:</strong> 90 days
              </List.Item>
              <List.Item>
                <strong>Consent records</strong> (when you agreed to privacy policy):{' '}
                <strong>Kept permanently</strong> (legal requirement)
              </List.Item>
              <List.Item>
                <strong>Browser user-agent</strong> at time of consent:{' '}
                <strong>Kept permanently</strong> (legal requirement)
              </List.Item>
            </List>

            <Title order={4} size="h5" mb="xs" mt="lg">
              Business Listings (7-Day Grace Period)
            </Title>
            <Text mb="sm">
              Job listings remain visible until their expiration date. After expiration, listings enter a <strong>7-day grace period</strong>.
            </Text>
            <List mb="md">
              <List.Item>
                <strong>Active listings:</strong> Visible until the expiration date you set (maximum 90 days from creation)
              </List.Item>
              <List.Item>
                <strong>Expired listings:</strong> After expiration, you have <strong>7 days</strong> to extend the listing through your dashboard. Expired listings remain in your dashboard with a warning indicator.
              </List.Item>
              <List.Item>
                <strong>Permanent deletion:</strong> If not extended, listings are permanently deleted <strong>7 days after expiration</strong>, along with all associated applications and resume files.
              </List.Item>
              <List.Item>
                <strong>Manual deletion:</strong> If you manually delete a listing before it expires, it is permanently deleted immediately along with all applications.
              </List.Item>
            </List>

            <Paper p="md" withBorder bg="blue.0" mt="md">
              <Text fw={700} mb="xs">
                Need to restore a deleted account?
              </Text>
              <Text size="sm">
                Contact <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor>{' '}
                within 30 days of deletion. After 30 days, account restoration is not possible.
              </Text>
            </Paper>
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
                JobRocket is not intended for children under the age of 16. We do not knowingly
                collect personal information from anyone under 16 years old. By using JobRocket, you
                confirm that you are at least 16 years old.
              </Text>
            </Paper>
            <Text>
              If you're a parent or guardian and believe your child under 16 has created an account
              on JobRocket, please contact us immediately at{' '}
              <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor> and we'll
              delete the account.
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
              <strong>For minor changes:</strong> We'll update the "Last Updated" date at the top of
              this policy
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
              This Privacy Policy and our handling of your personal data are governed by the laws of
              the State of Israel, including the Privacy Protection Law, 5741-1981, as amended by
              Amendment 13 (effective August 14, 2025).
            </Text>
            <Text>
              Any disputes arising from this Privacy Policy or our data practices will be subject to
              the exclusive jurisdiction of the competent courts in Israel.
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
      <Text
        ta="center"
        c="dimmed"
        pt="xl"
        mt="xl"
        size="sm"
        style={{ borderTop: '1px solid light-dark(#e0e0e0, var(--mantine-color-rocketDark-6))' }}
      >
        © {new Date().getFullYear()} JobRocket. All rights reserved.
        <br />
        Thank you for trusting JobRocket with your personal information. We're committed to
        protecting your privacy and handling your data responsibly.
      </Text>
    </Container>
  );
};

export default PrivacyPolicy;
