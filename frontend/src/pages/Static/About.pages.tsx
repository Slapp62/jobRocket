import { FC, useState } from 'react';
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

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
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
          At <strong>JobRocket</strong>, we connect job seekers with employers through intelligent
          AI-powered matching. Our platform uses advanced OpenAI embeddings to analyze your skills,
          experience, and preferences to find the perfect job matches tailored to you.
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
                involved.
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>
        <Flex direction={{ base: 'column', md: 'row' }} gap='lg' justify='center' align='stretch' >
          <Stat icon={<IconBriefcase size={24} />} label="AI-Powered Matching" value="Smart" />
          <Stat icon={<IconUsers size={24} />} label="Job Seekers & Employers" value="Connected" />
          <Stat icon={<IconWorld size={24} />} label="Match Score Technology" value="OpenAI" />
        </Flex>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Email"
              placeholder="Your email"
              name="email"
              variant="filled"
              {...form.getInputProps('email')}
            />
          </SimpleGrid>
          <TextInput
            label="Subject"
            placeholder="Subject"
            mt="md"
            name="subject"
            variant="filled"
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
