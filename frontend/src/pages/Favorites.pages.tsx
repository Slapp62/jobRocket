import { Hero } from "@/components/Hero";
import MappedCards from "@/components/MappedCards";
import { RootState } from "@/store/store"
import { Box, Button, Center, Flex, Loader, Title } from "@mantine/core"
import { IconMoodSad } from "@tabler/icons-react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

export function FavoriteCards()  {
    
    const jumpTo = useNavigate();
    const allCards = useSelector((state:RootState) => state.cardSlice.cards);
    const isLoading = useSelector((state:RootState) => state.cardSlice.loading);
    const user = useSelector((state:RootState) => state.userSlice.user);

    const likedCards = allCards?.filter((card) => card.likes?.includes(`${user?._id}`))

    if (isLoading) {
        return <>
          <Box pos='relative'>
            <Hero/>
          </Box>
    
          <Center>
            <Loader color="cyan" size="xl" mt={30}/>
          </Center>
        </>      
    }

    if (likedCards?.length === 0) {
        return (
            <Flex mt={20} direction='column' align='center' gap={20}>
                <Box mt={20}><IconMoodSad color="gray" size={100}/></Box>
                <Title my={10} c='gray'>No Favorites Found</Title>
                
                <Button onClick={() => jumpTo('/')} variant='filled' color='blue' size='lg' fz={20}>     
                    Find Some Favorites
                </Button>
            </Flex>
        )
    }

    return (
        <Flex mt={20} direction='column' align='center' gap={20}>
            <Title>Favorites</Title>
            <MappedCards cardsArr={likedCards}/>
        </Flex>
    )
}