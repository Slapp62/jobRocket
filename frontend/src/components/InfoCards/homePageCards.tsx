import { Stack, Text, Title } from "@mantine/core";

type HomePageCardsProps = {
    title: string;
    description: string;
    height?: string;
    width?: string;
    fontSize?: string;
};

const HomePageCards = ({ title, description, height, width, fontSize }: HomePageCardsProps) => {
    return (
      <Stack c="red" bg="white" h={height} w={width} p="lg" justify="center" style={{border: '1px solid #dee2e6', borderRadius: '8px'}}>
        <Title order={2}>{title}</Title>
        <Text size={fontSize}>{description}</Text>
      </Stack>
    );
};

export default HomePageCards;