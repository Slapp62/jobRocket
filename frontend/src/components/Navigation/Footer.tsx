import { IconMailFilled, IconMapPinFilled, IconPhoneFilled } from '@tabler/icons-react';
import { Container, Flex, Group, Stack, Text, Title } from '@mantine/core';
import { Logo } from './Logo';
import classes from '../ComponentStyles/FooterStyles.module.css';
import { useMediaQuery } from '@mantine/hooks';

const data = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home Page', link: '/' },
      { label: 'Login', link: '/login' },
      { label: 'Register', link: '/register' },
      { label: 'About', link: '/about' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', link: '/privacy-policy' },
      { label: 'Terms of Service', link: '/terms-of-service' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'MantineUI', link: 'https://mantine.dev' },
      { label: 'React', link: 'https://react.dev' },
      { label: 'Vite', link: 'https://vitejs.dev' },
      { label: 'Redux', link: 'https://redux.js.org' },
    ],
  },
  {
    title: 'About Me',
    links: [
      { label: 'LinkedIn', link: 'https://www.linkedin.com/in/simcha-lapp-0b4081106/' },
      { label: 'Portfolio Website', link: 'https://simchalapp.com' },
    ],
  },
];

export function Footer() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'> key={index} className={classes.link} component="a" href={link.link}>
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Stack className={classes.logo} bg='rocketOrange.9'>
          <Logo />
          <Text size="xs" ta='center' className={classes.description}>
            Creating opportunities and careers with simplicity in mind.
          </Text>
        </Stack>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © {new Date().getFullYear()} - Developed by Simcha Lapp.
        </Text>

        <Text c="dimmed" size="sm">
          All rights reserved
        </Text>
      </Container>
    </footer>
  );
}
