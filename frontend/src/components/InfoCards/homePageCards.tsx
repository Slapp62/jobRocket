import { Stack, StyleProp, Text, Title, TitleOrder } from '@mantine/core';

type HomePageCardsProps = {
  title: string;
  titleOrder?: TitleOrder | undefined;
  description: string;
  height?: string;
  width?: StyleProp<React.CSSProperties['width']> ;
  fontSize?: string;
  image?: string;
};

const HomePageCards = ({ title, description, height, width, fontSize, titleOrder  }: HomePageCardsProps) => {
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
      <Title order={titleOrder}>{title}</Title>
      <Text size={fontSize}>{description}</Text>
    </Stack>
  );
};

export default HomePageCards;
