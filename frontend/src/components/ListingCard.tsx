import { Card, Text, Button, Flex, Box, Group, Modal, Skeleton, Badge } from '@mantine/core';
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
    const card = useSelector((state:RootState) => state.cardSlice.cards?.find((listing) => listing._id === cardID));
    const isLoading = useSelector((state:RootState) => state.cardSlice.loading);
    if (!card) {return null};
    
    const [opened, { open, close }] = useDisclosure(false);

    const deleteCard = useDeleteCard();
    const location = useLocation();
    const myListingsPage = location.pathname === '/my-listings';
    const loggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
    const isMobile = useMediaQuery('(max-width: 500px)');
   
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
        <Skeleton visible={isLoading}>
            <Box p={5}>
                <Text fw={600} size="lg" lineClamp={2}>{card.jobTitle}</Text>
                <Badge mt={6} variant="light" color="teal">
                    {card.workArrangement}
                </Badge>
                <Badge ml={6} mt={6} variant="light" color="blue">
                    {card.industry}
                </Badge>

                <Text mt="sm" size="sm" c="dimmed" lineClamp={3}>
                    {card.jobDescription}
                </Text>

                <Flex mt="sm" direction="column" gap={4}>
                    <Text size="sm"><strong>Location:</strong> {card.location.region}, {card.location.city}</Text>
                    <Text size="sm"><strong>Apply via:</strong> {card.apply.method === 'email' ? 'Email' : 'External Link'}</Text>
                </Flex>

                {card.createdAt && (
                    <Text fw={500} size="xs" mt={10}>
                        Posted on: {new Date(card.createdAt).toLocaleDateString()}
                    </Text>
                )}
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
        </Skeleton>
        </Card>

        <Modal centered opened={opened} onClose={close} title="Confirmation">
            <Text>Are you sure you want to delete this listing?</Text>
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
