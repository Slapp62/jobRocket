import { Stack, Text, Title } from '@mantine/core';
import styles from '@/styles/gradients.module.css';

type HomePageCardsProps = {
  title: string;
  description: string;
  height?: string;
  width?: string;
  fontSize?: string;
  image?: string;
};

const HomePageCards = ({ title, description, height, width, fontSize, image }: HomePageCardsProps) => {
  return (
    <Stack
      c="rocketRed.8"
      bg='rocketOrange.1'
      h={height}
      w={width}
      p="lg"
      justify="center"
      style={{ borderRadius: '8px' }}
    >
      <Title order={2}>{title}</Title>
      <Text size={fontSize}>{description}</Text>
    </Stack>
  );
};

export default HomePageCards;
