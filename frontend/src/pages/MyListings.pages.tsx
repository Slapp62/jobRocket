import MappedCards from "@/components/MappedCards";
import { addUserCards } from "@/store/cardSlice";
import { RootState } from "@/store/store"
import { TCards } from "@/Types";
import { loadUserCards } from "@/utils/loadUserCards";
import { Box, Button, Center, Flex, Loader, Title } from "@mantine/core";
import { IconCards, IconMoodSad } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";

export function MyCards()  {
  const dispatch = useDispatch();
	const userCards = useSelector((state:RootState) => state.cardSlice.userCards);  
	const [isLoading, setIsLoading] = useState(false);
	
	const jumpTo = useNavigate();
  
	useEffect(() => {
    const getUserCards = async () => {
      setIsLoading(true);
      const cards: TCards[] = await loadUserCards();
      dispatch(addUserCards(cards));
      setTimeout(() => {
        setIsLoading(false);
      }, 300);      
    }
    getUserCards();
  }, []);

    if (isLoading) {
    return <>
      <Center>
        <Loader color="cyan" size="xl" mt={100}/>
      </Center>
    </>      
    }

    if (!userCards || userCards?.length === 0) {
        return (
            <Flex mt={20} direction='column' align='center' gap={20}>
                <Box mt={20}><IconMoodSad color="gray" size={100}/></Box>
                <Title my={10} c='gray'>No Listings Found</Title>
                
                <Button onClick={() => jumpTo('/create-card')} variant='filled' color='blue' size='lg' fz={20}>     
                    Create A Listing
                </Button>
            </Flex>
        )
    }

    return (
        <Flex mt={20} direction='column' align='center' gap={20}>
            
            <Title>My Listings</Title>

            <Button 
            component={Link}
            to='/create-card'  
            mx='auto' variant='outline' 
            color='green' 
            size='md' 
            fz={20}
            rightSection={<IconCards/>}
            >     
            Create A New Listing
            </Button>

            <MappedCards cardsArr={userCards}/>
        </Flex>
    )
}