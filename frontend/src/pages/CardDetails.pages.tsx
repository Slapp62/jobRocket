import { Card, Text, Image, List, ListItem, Flex, Title, Container, Group} from "@mantine/core";
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
    
    return ( 
        <Container style={{width: isMobile ? "100%" : "40%"}}>
            <Title ta="center" my={10}>Card Details</Title>
            <Card shadow="sm" padding="lg" radius="md" withBorder mx="auto">
                <Card.Section>
                    <Image
                    src={card?.image.url}
                    height={250}
                    alt="picture"
                    fit='cover'
                    loading='lazy'
                    fallbackSrc='https://images.pexels.com/photos/5598328/pexels-photo-5598328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    p={10}
                    style={{objectPosition:"center"}}
                    />
                </Card.Section> 

                <Card.Section p={15} >
                    <Flex direction='column' gap={10}>
                        <Text size="xl" fw={500}><strong>Title:</strong> {card?.title}</Text>
                        <Text size='md'><strong>Subtitle:</strong> {card?.subtitle}</Text>
                        <Text size="md" w='95%'><strong>Description:</strong> {card?.description} </Text>
                        {card?.createdAt && <Text size="sm" mt={5}><strong>Posted: </strong>{new Date(card?.createdAt).toLocaleDateString()}</Text>}
                    </Flex>

                    <hr/>
                    <Flex justify='space-between' mt={10} gap={10} direction='column'>
                        <List spacing={5} style={{wordBreak: 'break-word'}} w='100%'>
                            <Title order={4}>Contact</Title>
                            <ListItem><strong>Phone:</strong> {card?.phone}</ListItem>
                            <ListItem><strong>Email:</strong> {card?.email}</ListItem>
                            {card?.web && <ListItem ><strong>Website:</strong> {card?.web}</ListItem>}
                            <hr/>
                        </List> 

                        <Flex justify='space-between' direction='column' gap={20}>    
                            <List spacing={5} style={{wordBreak: 'break-word'}}>
                                <Title order={4}>Address</Title>
                                <ListItem><strong>Country:</strong> {card?.address.country}</ListItem>
                                <ListItem><strong>City:</strong> {card?.address.city}</ListItem>
                                {card?.address.state && <ListItem><strong>State:</strong> {card?.address.state}</ListItem>}
                                <ListItem><strong>Street:</strong> {card?.address.street}</ListItem>
                                <ListItem><strong>Number:</strong> {card?.address.houseNumber}</ListItem>
                                <ListItem><strong>Zipcode:</strong> {card?.address.zip}</ListItem>
                            </List>
                        </Flex>
                    </Flex>     
                </Card.Section>

            {user && 
            <Group my={5} justify="space-evenly">
                    {card && <FavoritesButton card={card} />}
                    {card && <SocialIcons cardID={card._id} />}
            </Group>}
            </Card>
        </Container>
    )
}