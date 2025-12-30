import { FC } from 'react';
import { Accordion, Anchor, Container, List, Paper, Text, Title } from '@mantine/core';
import { PageMeta } from '@/SEO/PageMeta';

const TermsOfService: FC = () => {
  return (
    <>
      <PageMeta
        title="Terms of Service | JobRocket"
        description="JobRocket's Terms of Service - rules and guidelines for using our job board platform"
        keywords="terms of service, user agreement, terms and conditions"
      />

      <Container size="lg" py="xl">
        <Title order={1} mb="md">
          Terms of Service
        </Title>
        <Text c="dimmed" fs="italic" mb="xl">
          Last Updated: December 30, 2025
          <br />
          Effective Date: January 1, 2026
        </Text>

        {/* Introduction */}
        <Text mb="md">
          Welcome to JobRocket! These Terms of Service ("Terms") govern your use of our job board
          platform connecting English-speaking professionals with Israeli companies.
        </Text>
        <Text mb="xl">
          By creating an account or using JobRocket, you agree to be bound by these Terms. If you
          don't agree, please don't use our services.
        </Text>

        <Accordion variant="separated" radius="md">
          {/* Service Description */}
          <Accordion.Item value="service-description">
            <Accordion.Control>
              <Title order={3} size="h4">
                1. What JobRocket Provides
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Text mb="sm">JobRocket is an online job board platform that:</Text>
              <List mb="md">
                <List.Item>
                  Connects English-speaking job seekers with Israeli companies seeking
                  English-speaking talent
                </List.Item>
                <List.Item>
                  Uses AI-powered matching technology (OpenAI) to recommend relevant job
                  opportunities based on your profile
                </List.Item>
                <List.Item>
                  Allows businesses to post job listings and review applications
                </List.Item>
                <List.Item>
                  Provides an internal application system for job seekers to apply to positions
                </List.Item>
              </List>
              <Paper p="md" withBorder bg="blue.0" mb="md">
                <Text fw={700} mb="xs">
                  Important:
                </Text>
                <Text>
                  JobRocket is a platform that facilitates connections between job seekers and
                  employers. We do not employ job seekers, hire on behalf of employers, or guarantee
                  job placements. Employment relationships are solely between you and the employer.
                </Text>
              </Paper>

              <Title order={4} size="h5" mb="xs" mt="lg">
                Job Listing Expiration and Grace Period (Business Users)
              </Title>
              <Text mb="sm">
                All job listings must have an expiration date (maximum 90 days from creation). When a
                listing expires:
              </Text>
              <List mb="md">
                <List.Item>
                  The listing enters a <strong>7-day grace period</strong>
                </List.Item>
                <List.Item>
                  You can extend the listing through your dashboard during this grace period
                </List.Item>
                <List.Item>
                  Your dashboard will display a warning indicator showing days remaining until deletion
                </List.Item>
                <List.Item>
                  If not extended within 7 days, the listing and all associated applications are
                  permanently deleted
                </List.Item>
                <List.Item>
                  If you manually delete a listing before expiration, it is deleted immediately along
                  with all applications
                </List.Item>
              </List>
              <Text mb="md" size="sm" c="dimmed">
                See our{' '}
                <Anchor href="/privacy-policy" target="_blank">
                  Privacy Policy
                </Anchor>{' '}
                for details on data retention and deletion.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          {/* User Obligations */}
          <Accordion.Item value="user-obligations">
            <Accordion.Control>
              <Title order={3} size="h4">
                2. Your Obligations and Responsibilities
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Title order={4} size="h5" mb="xs" mt="md">
                Eligibility Requirements
              </Title>
              <Text mb="sm">To use JobRocket, you must:</Text>
              <List mb="md">
                <List.Item>
                  Be at least <strong>16 years old</strong>
                </List.Item>
                <List.Item>Provide accurate and truthful information in your profile</List.Item>
                <List.Item>
                  <strong>Job Seekers:</strong> Have the legal right to work in the locations you're
                  applying to (e.g., valid work visa, citizenship, or work permit)
                </List.Item>
                <List.Item>
                  <strong>Business Users:</strong> Be authorized to post job listings on behalf of
                  your company
                </List.Item>
              </List>

              <Title order={4} size="h5" mb="xs" mt="lg">
                Account Security
              </Title>
              <Text mb="sm">You are responsible for:</Text>
              <List mb="md">
                <List.Item>Keeping your password confidential and secure</List.Item>
                <List.Item>All activities that occur under your account</List.Item>
                <List.Item>
                  Notifying us immediately at{' '}
                  <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor> if
                  you suspect unauthorized access to your account
                </List.Item>
              </List>

              <Title order={4} size="h5" mb="xs" mt="lg">
                Truthful Information
              </Title>
              <Text mb="sm">You agree to:</Text>
              <List mb="md">
                <List.Item>
                  Provide accurate information in your profile, resume, and applications
                </List.Item>
                <List.Item>Update your information if it changes</List.Item>
                <List.Item>
                  Not misrepresent your qualifications, experience, or credentials
                </List.Item>
                <List.Item>
                  Not create fake profiles or impersonate another person or company
                </List.Item>
              </List>
            </Accordion.Panel>
          </Accordion.Item>

          {/* Prohibited Uses */}
          <Accordion.Item value="prohibited-uses">
            <Accordion.Control>
              <Title order={3} size="h4">
                3. Prohibited Uses
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Text mb="sm">You may NOT use JobRocket to:</Text>
              <List mb="md">
                <List.Item>
                  <strong>Post fake profiles or listings:</strong> All job listings must be for
                  real, available positions. All user profiles must represent real people.
                </List.Item>
                <List.Item>
                  <strong>Spam or harass:</strong> Send unsolicited messages, spam job listings, or
                  harass other users
                </List.Item>
                <List.Item>
                  <strong>Discriminate:</strong> Post job listings that discriminate based on race,
                  religion, gender, age, disability, sexual orientation, or other protected
                  characteristics under Israeli or international law
                </List.Item>
                <List.Item>
                  <strong>Scrape or automate:</strong> Use bots, scrapers, or automated tools to
                  extract data from JobRocket without our written permission
                </List.Item>
                <List.Item>
                  <strong>Violate laws:</strong> Use the platform for any illegal purpose or to
                  promote illegal activities
                </List.Item>
                <List.Item>
                  <strong>Bypass security:</strong> Attempt to circumvent security features, access
                  other users' accounts, or interfere with the platform's functionality
                </List.Item>
                <List.Item>
                  <strong>Post malicious content:</strong> Upload viruses, malware, or any harmful
                  code
                </List.Item>
              </List>

              <Paper p="md" withBorder bg="red.0" mb="md">
                <Text fw={700} mb="xs">
                  Consequences of Prohibited Use:
                </Text>
                <Text>
                  Violations of these prohibited uses may result in immediate suspension or
                  permanent deletion of your account without warning. We reserve the right to report
                  illegal activities to law enforcement.
                </Text>
              </Paper>
            </Accordion.Panel>
          </Accordion.Item>

          {/* Account Termination */}
          <Accordion.Item value="account-termination">
            <Accordion.Control>
              <Title order={3} size="h4">
                4. Account Suspension and Termination
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Title order={4} size="h5" mb="xs" mt="md">
                Your Right to Terminate
              </Title>
              <Text mb="sm">
                You may delete your account at any time by going to My Account &gt; Delete Account
                or by contacting us at{' '}
                <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor>.
              </Text>
              <Paper p="md" withBorder bg="blue.0" mb="md">
                <Text fw={700} mb="xs">
                  30-Day Grace Period for Account Deletion:
                </Text>
                <Text mb="sm">
                  When you delete your account, it enters a <strong>30-day grace period</strong>:
                </Text>
                <List size="sm">
                  <List.Item>Your profile is immediately hidden from all users</List.Item>
                  <List.Item>You cannot log in during this period</List.Item>
                  <List.Item>Your account data is preserved for 30 days</List.Item>
                  <List.Item>
                    You can restore your account by emailing{' '}
                    <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor>{' '}
                    within 30 days
                  </List.Item>
                  <List.Item>
                    After 30 days, all personal data is permanently deleted and cannot be recovered
                  </List.Item>
                </List>
              </Paper>

              <Title order={4} size="h5" mb="xs" mt="md">
                Our Right to Terminate
              </Title>
              <Text mb="sm">We reserve the right to suspend or terminate your account if:</Text>
              <List mb="md">
                <List.Item>You violate these Terms of Service</List.Item>
                <List.Item>You violate our Privacy Policy</List.Item>
                <List.Item>
                  You engage in fraudulent, abusive, or illegal activity on the platform
                </List.Item>
                <List.Item>
                  Your account has been inactive for 24 consecutive months (we'll send warnings
                  before deletion)
                </List.Item>
                <List.Item>We're required to do so by law or court order</List.Item>
              </List>

              <Text mb="md">
                We will attempt to notify you before terminating your account unless doing so would
                violate the law or a court order, or we reasonably believe notification could cause
                harm to JobRocket, other users, or third parties.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          {/* Liability Limitations */}
          <Accordion.Item value="liability">
            <Accordion.Control>
              <Title order={3} size="h4">
                5. Disclaimers and Limitation of Liability
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Title order={4} size="h5" mb="xs" mt="md">
                "As-Is" Service
              </Title>
              <Text mb="md">
                JobRocket is provided <strong>"as is"</strong> and <strong>"as available"</strong>{' '}
                without warranties of any kind, either express or implied. We do not guarantee that
                the platform will be uninterrupted, error-free, or completely secure.
              </Text>

              <Title order={4} size="h5" mb="xs" mt="md">
                No Guarantee of Results
              </Title>
              <Text mb="sm">We do NOT guarantee:</Text>
              <List mb="md">
                <List.Item>
                  <strong>Job Seekers:</strong> That you will receive job offers, interviews, or be
                  hired
                </List.Item>
                <List.Item>
                  <strong>Businesses:</strong> That you will find qualified candidates or fill open
                  positions
                </List.Item>
                <List.Item>The accuracy of AI match scores or recommendations</List.Item>
                <List.Item>
                  The accuracy, completeness, or truthfulness of user-generated content (profiles,
                  listings, applications)
                </List.Item>
              </List>

              <Title order={4} size="h5" mb="xs" mt="md">
                User-Generated Content
              </Title>
              <Text mb="md">
                JobRocket is not responsible for the content posted by users, including job
                listings, profiles, or applications. We do not verify the accuracy of job listings
                or user credentials. You interact with other users at your own risk.
              </Text>

              <Paper p="md" withBorder bg="yellow.0" mb="md">
                <Text fw={700} mb="xs">
                  Due Diligence Required:
                </Text>
                <List size="sm">
                  <List.Item>
                    <strong>Job Seekers:</strong> Research companies before applying, verify job
                    listings are legitimate, and never pay money to apply for a job
                  </List.Item>
                  <List.Item>
                    <strong>Businesses:</strong> Verify candidate credentials, conduct your own
                    background checks, and comply with employment laws
                  </List.Item>
                </List>
              </Paper>

              <Title order={4} size="h5" mb="xs" mt="md">
                Limitation of Liability
              </Title>
              <Text mb="sm">
                To the maximum extent permitted by Israeli law, JobRocket and its operators shall
                not be liable for:
              </Text>
              <List mb="md">
                <List.Item>
                  Indirect, incidental, special, consequential, or punitive damages
                </List.Item>
                <List.Item>Loss of profits, revenue, data, or business opportunities</List.Item>
                <List.Item>
                  Damages arising from your interactions with other users (employers or job seekers)
                </List.Item>
                <List.Item>
                  Damages resulting from unauthorized access to your account or data breaches
                </List.Item>
                <List.Item>Damages from errors, bugs, or service interruptions</List.Item>
              </List>
              <Text>
                Our total liability for any claim arising from your use of JobRocket shall not
                exceed the amount you paid to us in the past 12 months (currently NIS 0, as
                JobRocket is free to use).
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          {/* Intellectual Property */}
          <Accordion.Item value="intellectual-property">
            <Accordion.Control>
              <Title order={3} size="h4">
                6. Intellectual Property
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Title order={4} size="h5" mb="xs" mt="md">
                JobRocket's Intellectual Property
              </Title>
              <Text mb="md">
                JobRocket's name, logo, design, software, and other materials are owned by or
                licensed to us and are protected by copyright, trademark, and other intellectual
                property laws. You may not copy, modify, distribute, or create derivative works
                without our written permission.
              </Text>

              <Title order={4} size="h5" mb="xs" mt="md">
                Your Content License to Us
              </Title>
              <Text mb="sm">
                When you post content on JobRocket (profiles, job listings, applications), you grant
                us a <strong>non-exclusive, royalty-free, worldwide license</strong> to:
              </Text>
              <List mb="md">
                <List.Item>Display your content on the JobRocket platform</List.Item>
                <List.Item>
                  Store your content on our servers and third-party services (Cloudinary, MongoDB)
                </List.Item>
                <List.Item>
                  Process your content through AI services (OpenAI) to generate match scores
                </List.Item>
                <List.Item>
                  Show your profile to employers (job seekers) or show your listings to job seekers
                  (businesses)
                </List.Item>
              </List>
              <Text mb="md">
                This license ends when you delete your content or close your account, except for
                content that has been shared with other users (e.g., applications sent to
                employers).
              </Text>

              <Title order={4} size="h5" mb="xs" mt="md">
                You Retain Ownership
              </Title>
              <Text>
                You retain all ownership rights to your content. We do not claim ownership of your
                resume, profile information, or other materials you upload.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          {/* Dispute Resolution */}
          <Accordion.Item value="dispute-resolution">
            <Accordion.Control>
              <Title order={3} size="h4">
                7. Dispute Resolution and Governing Law
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Title order={4} size="h5" mb="xs" mt="md">
                Governing Law
              </Title>
              <Text mb="md">
                These Terms of Service are governed by the laws of the State of Israel. Any disputes
                arising from these Terms or your use of JobRocket will be subject to the exclusive
                jurisdiction of the competent courts in Israel.
              </Text>

              <Title order={4} size="h5" mb="xs" mt="md">
                Contact Us First
              </Title>
              <Text mb="md">
                Before initiating any legal action, please contact us at{' '}
                <Anchor href="mailto:support@jobrocket.work">support@jobrocket.work</Anchor> to see
                if we can resolve the issue informally. Most concerns can be addressed quickly and
                amicably without legal proceedings.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          {/* Changes to Terms */}
          <Accordion.Item value="changes-to-terms">
            <Accordion.Control>
              <Title order={3} size="h4">
                8. Changes to These Terms
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Text mb="md">
                We may update these Terms of Service from time to time to reflect changes in our
                practices, technology, legal requirements, or other factors.
              </Text>
              <Text mb="sm">
                <strong>For minor changes:</strong> We'll update the "Last Updated" date at the top
                of this page
              </Text>
              <Text mb="md">
                <strong>For significant changes:</strong> We'll notify you via email and display a
                prominent notice on JobRocket. You'll have 30 days to review the changes before they
                take effect. If you continue using JobRocket after the effective date, you accept
                the new Terms.
              </Text>
              <Text>
                If you don't agree to the updated Terms, you must stop using JobRocket and may
                delete your account.
              </Text>
            </Accordion.Panel>
          </Accordion.Item>

          {/* Contact */}
          <Accordion.Item value="contact">
            <Accordion.Control>
              <Title order={3} size="h4">
                Questions About These Terms?
              </Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Paper p="md" withBorder mb="md">
                <Text mb="sm">
                  If you have questions about these Terms of Service or need clarification on any
                  section:
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
          By using JobRocket, you acknowledge that you have read, understood, and agree to be bound
          by these Terms of Service.
        </Text>
      </Container>
    </>
  );
};

export default TermsOfService;
