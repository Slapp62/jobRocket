import { Stack, Text, Title } from '@mantine/core';
import styles from '@/styles/gradients.module.css';

type HomePageCardsProps = {
  title: string;
  description: string;
  height?: string;
  width?: string;
  fontSize?: string;
};

const HomePageCards = ({ title, description, height, width, fontSize }: HomePageCardsProps) => {
  return (
    <Stack
      c="red"
      h={height}
      w={width}
      p="lg"
      justify="center"
      className={styles.cardGradientSubtle}
      style={{ borderRadius: '8px' }}
    >
      <Title order={2}>{title}</Title>
      <Text size={fontSize}>{description}</Text>
    </Stack>
  );
};

export default HomePageCards;
