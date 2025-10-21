import { Card, Text, List, ListItem, Flex, Title, Container, Group, Badge, Anchor, Divider } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useParams } from "react-router-dom"
import { FavoritesButton } from "@/components/Buttons/FavoritesButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SocialIcons from "@/components/SocialMedia";

export function CardDetails() {
    const isMobile = useMediaQuery('(max-width: 700px)');
    const {id} = useParams();
    const user = useSelector((state:RootState) => state.userSlice.user);
    const allCards = useSelector((state:RootState) => state.cardSlice.cards);
    const card = allCards.find((card) => card._id === id);

    if (!card) {
        return (
            <Container style={{width: isMobile ? "100%" : "40%"}}>
                <Title ta="center" my={20}>Listing not found</Title>
            </Container>
        );
    }
    
    return ( 
        <Container style={{width: isMobile ? "100%" : "40%"}}>
            <Title ta="center" my={10}>Listing Details</Title>
            <Card shadow="sm" padding="lg" radius="md" withBorder mx="auto">
                <Flex direction='column' gap={10}>
                    <Title order={2}>{card?.jobTitle}</Title>
                    <Group gap="xs">
                        <Badge color="teal" variant="light">
                            {card?.workArrangement}
                        </Badge>
                        <Badge color="blue" variant="light">
                            {card?.industry}
                        </Badge>
                        {card?.isActive === false && (
                            <Badge color="red" variant="light">
                                Inactive
                            </Badge>
                        )}
                    </Group>

                    {card?.createdAt && (
                        <Text size="sm" c="dimmed">
                            Posted on {new Date(card.createdAt).toLocaleDateString()}
                        </Text>
                    )}

                    <Divider my="sm" />

                    <Text size="sm">{card?.jobDescription}</Text>

                    {card?.requirements && card.requirements.length > 0 && (
                        <>
                            <Divider my="sm" />
                            <Title order={4}>Requirements</Title>
                            <List spacing={5} style={{ wordBreak: "break-word" }}>
                                {card.requirements.map((item, index) => (
                                    <ListItem key={`req-${index}`}>{item}</ListItem>
                                ))}
                            </List>
                        </>
                    )}

                    {card?.advantages && card.advantages.length > 0 && (
                        <>
                            <Divider my="sm" />
                            <Title order={4}>Nice to Have</Title>
                            <List spacing={5} style={{ wordBreak: "break-word" }}>
                                {card.advantages.map((item, index) => (
                                    <ListItem key={`adv-${index}`}>{item}</ListItem>
                                ))}
                            </List>
                        </>
                    )}

                    <Divider my="sm" />

                    <Title order={4}>Location</Title>
                    <Text size="sm">
                        {card?.location.region}, {card?.location.city}
                    </Text>

                    <Divider my="sm" />

                    <Title order={4}>How to Apply</Title>
                    <Text size="sm">
                        Submit via {card?.apply.method === "email" ? "email" : "external link"}:
                    </Text>
                    {card?.apply.method === "email" ? (
                        <Anchor href={`mailto:${card?.apply.contact}`} target="_blank">
                            {card?.apply.contact}
                        </Anchor>
                    ) : (
                        <Anchor href={card?.apply.contact} target="_blank">
                            {card?.apply.contact}
                        </Anchor>
                    )}
                </Flex>

                {user && (
                    <Group my={20} justify="space-evenly">
                        <FavoritesButton card={card} />
                        <SocialIcons cardID={card._id} />
                    </Group>
                )}
            </Card>
        </Container>
    )
}
