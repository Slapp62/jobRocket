import { Container, Stack, Text } from '@mantine/core';
import { Logo } from './Logo';
import classes from '../ComponentStyles/FooterStyles.module.css';

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
      { label: 'Accessibility Statement', link: '/accessibility' },
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
  // Desktop footer groups (existing layout)
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <li key={index}>
        <Text<'a'> className={classes.link} component="a" href={link.link}>
          {link.label}
        </Text>
      </li>
    ));

    return (
      <nav className={classes.wrapper} key={group.title} aria-label={group.title}>
        <Text className={classes.title} component="h3">
          {group.title}
        </Text>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{links}</ul>
      </nav>
    );
  });

  // Mobile sections (prioritized content: Legal, Quick Links, About Me)
  const mobileData = [
    data[1], // Legal (highest priority)
    data[0], // Quick Links
    data[3], // About Me
    // Excluding data[2] (Project links - less critical for mobile)
  ];

  const mobileSections = mobileData.map((group) => (
    <Stack key={group.title} gap="xs">
      <Text className={classes.mobileTitle} fw={600} size="sm">
        {group.title}
      </Text>
      {group.links.map((link, index) => (
        <Text<'a'>
          key={index}
          className={classes.mobileLink}
          component="a"
          href={link.link}
          size="xs"
        >
          {link.label}
        </Text>
      ))}
    </Stack>
  ));

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Stack className={classes.logo} bg="rocketRed.7">
          <Logo />
          <Text size="xs" ta="center" className={classes.description}>
            Launch yourself into a world of possibility.
          </Text>
        </Stack>

        {/* Desktop navigation - hidden on mobile */}
        <div className={classes.groups}>{groups}</div>

        {/* Mobile navigation - hidden on desktop */}
        <Stack className={classes.mobileNav} gap="md">
          {mobileSections}
        </Stack>
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
