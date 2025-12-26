import { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { IconBriefcase, IconUsers, IconWorld } from '@tabler/icons-react';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import styles from '@/styles/gradients.module.css';

const AboutPage: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  // Scroll to contact form if hash is present in URL
  useEffect(() => {
    if (location.hash === '#contact') {
      // Small delay to ensure the element is rendered
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) =>
        value.trim().length < 2 ? 'Name must be at least 2 characters' : null,
      email: (value) =>
        !/^\S+@\S+\.\S+$/.test(value) ? 'Please enter a valid email address' : null,
      subject: (value) =>
        value.trim().length === 0 ? 'Subject is required' : null,
      message: (value) =>
        value.trim().length < 10 ? 'Message must be at least 10 characters' : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    // Replace with your EmailJS service ID, template ID, and public key
    const serviceID = 'service_5zblm38';
    const templateID = 'template_itsqp9u';
    const publicKey = 'a6IxywqmqlHjFDfxD';

    setIsSubmitting(true);
    emailjs
      .send(serviceID, templateID, values, publicKey)
      .then(() => {
        notifications.show({
          title: 'Success',
          message: 'Message sent successfully!',
          color: 'green',
        });
        form.reset();
      })
      .catch((error: any) => {
        notifications.show({
          title: 'Error',
          message: `Failed to send the message, please try again. ${error.message}`,
          color: 'red',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Box className={styles.pageBackgroundAlt} style={{ paddingBottom: '40px' }}>
      <Container size="md" py="xl">
        <Title order={1} mb="md" ta="center">
          About Us
        </Title>
        <Text size="lg" mb="xl">
          In his search for a position as a web developer, a man by the name of Simcha Lapp noticed that no job board site targeted at English speakers contained both a simple, easy to use interface and an AI-powered matching system. Recognizing the need for such a platform, he decided to create <strong>JobRocket</strong>.
        </Text>
        <Grid gutter="xl" mb="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              radius="md"
              src="/office-hero.jpg"
              alt="Professional office environment"
              loading="lazy"
              fit="cover"
              h={300}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper shadow="md" p="md" radius="md" className={styles.cardGradientSubtle}>
              <Title order={4}>Our Mission</Title>
              <Text mt="sm">
                We leverage cutting-edge AI technology to transform job searching and hiring. Our
                intelligent matching system analyzes compatibility between job seekers and
                positions, ensuring better fits and more successful placements for everyone
                involved. We offer an intuitive job search platform for those seeking careers and a powerful management system for companies who choose to receive applications through our site.
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>
        <Flex direction={{ base: 'column', md: 'row' }} gap='lg' justify='center' align='stretch' >
          <Stat icon={<IconBriefcase size={24} />} label="AI-Powered Matching" value="Smart" />
          <Stat icon={<IconUsers size={24} />} label="Job Seekers & Employers" value="Connected" />
          <Stat icon={<IconWorld size={24} />} label="Intuitive & Easy to Use" value="Interface" />
        </Flex>
        <form onSubmit={form.onSubmit(handleSubmit)} id="contact">
          <Title
            mt={30}
            order={2}
            size="h1"
            style={{ fontFamily: 'Outfit, var(--mantine-font-family)' }}
            fw={700}
            ta="center"
          >
            Get in touch
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
            <TextInput
              label="Name"
              placeholder="Your name"
              name="name"
              variant="filled"
              required
              withAsterisk
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Email"
              placeholder="Your email"
              name="email"
              variant="filled"
              required
              withAsterisk
              {...form.getInputProps('email')}
            />
          </SimpleGrid>
          <TextInput
            label="Subject"
            placeholder="Subject"
            mt="md"
            name="subject"
            variant="filled"
            required
            withAsterisk
            {...form.getInputProps('subject')}
          />
          <Textarea
            mt="md"
            label="Message"
            placeholder="Your message"
            maxRows={10}
            minRows={5}
            autosize
            name="message"
            variant="filled"
            required
            withAsterisk
            {...form.getInputProps('message')}
          />
          <Group justify="center" mt="xl">
            <Button type="submit" size="md" loading={isSubmitting} c='white'>
              Send message
            </Button>
          </Group>
        </form>
      </Container>
    </Box>
  );
};

type StatProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const Stat: FC<StatProps> = ({ icon, label, value }) => (
  <Paper shadow="xs" p="md" radius="md" withBorder className={styles.cardGradientOrange}>
    <Group>
      <ThemeIcon variant="light" size="lg" radius="xl" color="rocketOrange">
        {icon}
      </ThemeIcon>
      <div>
        <Text size="lg" fw={500}>
          {value}
        </Text>
        <Text size="sm" c="dimmed">
          {label}
        </Text>
      </div>
    </Group>
  </Paper>
);

export default AboutPage;
