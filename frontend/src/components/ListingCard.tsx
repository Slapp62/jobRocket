import { Card, Image, Text, Button, Flex, ListItem, List, Box, Group, Modal, Skeleton} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Link, useLocation } from 'react-router-dom';
import { useDeleteCard } from '@/hooks/UseDeleteCard';
import { FavoritesButton } from './Buttons/FavoritesButton';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { motion } from 'framer-motion';
import SocialIcons from './SocialMedia';

function ListingCard({ cardID} : { cardID: string}) {
    const card = useSelector((state:RootState) => state.cardSlice.cards?.find((card) => card._id === cardID));
    const isLoading = useSelector((state:RootState) => state.cardSlice.loading);
    if (!card) {return null};
    
    const [opened, { open, close }] = useDisclosure(false);

    const deleteCard = useDeleteCard();
    const location = useLocation();
    const myListingsPage = location.pathname === '/my-listings';
    const loggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
    const isMobile = useMediaQuery('(max-width: 500px)');
    const defaultImage = "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D";
   
  return (
    <motion.div
        key={card._id}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        style={{width: isMobile ? '90%' : '320px'}}
        >
            
        <Card shadow="sm" radius="md" withBorder>
        <Card.Section>
            <Skeleton visible={isLoading}>
                <Image
                src={card.image.url}
                height={160}
                alt="picture"
                fit='cover'
                loading='lazy'
                fallbackSrc={defaultImage}
                />
            </Skeleton>
        
        </Card.Section> 

        <Card.Section px={15}>
            <Box p={5}>
                <Text truncate my="xs" fw={500}>{card.title} </Text>
                <Text truncate >{card.subtitle}</Text>
                <hr/>
                <Text truncate >{card.description} </Text>
            
                <List>
                    <ListItem>{card.phone}</ListItem>
                    <ListItem>{card.email}</ListItem>
                    
                </List>
                {card.createdAt && <Text fw={500} size='sm' mt={10}>Posted On: {new Date(card.createdAt).toLocaleDateString()}</Text>}
            </Box>

            <Flex mx="auto"  my={10} gap={5} direction='column'>
                <Group justify='center'>
                    <Button  h={40} style={{flex: 1}} variant='filled' fz={12} component={Link} to={`/card-details/${card._id}`}>
                        <Text fw='bold'>More Info</Text>
                    </Button>
                </Group>
                

                <Group justify='center'>
                    {loggedIn && myListingsPage && 
                    <Button variant='outline' color='green' style={{flex: 1}} component={Link} to={`/edit-card/${card._id}`}>
                        <IconEdit/>
                    </Button>}

                    {myListingsPage && 
                    <Button variant='outline' style={{flex: 1}} color='red' onClick={open}>
                        <IconTrash />
                    </Button>}
                 </Group>
                
                <Group>
                    {loggedIn && <FavoritesButton card={card}/>}

                    <Group mx='auto'>
                        <SocialIcons cardID={card._id}/>
                    </Group>
                </Group>
            </Flex>
        </Card.Section>
        </Card>

        <Modal centered opened={opened} onClose={close} title="Confirmation">
            <Text>Are you sure you want to delete this card?</Text>
            <Group mt={20} justify="center">
                <Button color="red" onClick={() => {
                    deleteCard(card);
                    close();
                }}>
                Yes, Delete It</Button>
                <Button variant="outline" onClick={close}>No, Take Me Back</Button>
            </Group>
        </Modal>
    </motion.div>
  );
}

export default React.memo(ListingCard, (prev, next) => prev.cardID === next.cardID);
