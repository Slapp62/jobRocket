import { FC } from 'react';
import {Container,Title,Text,Grid,Image,Paper,Group,ThemeIcon,Button,SimpleGrid,Textarea,TextInput,}from '@mantine/core';
import {IconBriefcase,IconUsers,IconWorld,} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';


const AboutPage: FC = () => {
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

    emailjs.send(serviceID, templateID, values, publicKey)
        .then(() => {
        toast.success('Message sent successfully!');
        form.reset();
        })
        .catch((error:any) => {
        toast.error(`Failed to send the message, please try again. ${error.message}`);
        });
    };

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="md" ta='center'>
        About Us
      </Title>

      <Text size="lg" mb="xl">
        At <strong>IsraJobs</strong>, we connect motivated professionals in Israel with companies seeking great talent.
        Whether you're hiring or job-hunting, our goal is to make the process faster, fairer, and more effective.
      </Text>

      <Grid gutter="xl" mb="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Image
            radius="md"
            src="https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="People collaborating"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="md" p="md" radius="md">
            <Title order={4}>Our Mission</Title>
            <Text mt="sm">
              We’re building the go-to platform for job seekers and employers to connect with purpose.
              From transparent listings to smart matching tools, we’re reshaping the future of work.
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>

      <Group grow>
        <Stat icon={<IconBriefcase size={24} />} label="Jobs Posted" value="12.5m+" />
        <Stat icon={<IconUsers size={24} />} label="Employers" value="3.2b+" />
        <Stat icon={<IconWorld size={24} />} label="Countries Served" value="All" />
      </Group>


      <form onSubmit={form.onSubmit(handleSubmit)}>
        `<Title
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
          <Button type="submit" size="md">
            Send message
          </Button>
        </Group>
      </form>`
    </Container>

    
  );
};

type StatProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const Stat: FC<StatProps> = ({ icon, label, value }) => (
  <Paper shadow="xs" p="md" radius="md" withBorder>
    <Group>
      <ThemeIcon variant="light" size="lg" radius="xl">
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
