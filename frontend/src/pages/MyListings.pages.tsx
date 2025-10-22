import MappedListings from "@/components/MappedListings";
import { addUserListings } from "@/store/listingSlice";
import { RootState } from "@/store/store"
import { TListing } from "@/Types";
import { loadUserListings } from "@/utils/loadUserListings";
import { Box, Button, Center, Flex, Loader, Title } from "@mantine/core";
import { IconCards, IconMoodSad } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";

export function MyListings()  {
  const dispatch = useDispatch();
        const userListings = useSelector((state:RootState) => state.listingSlice.userListings);
        const [isLoading, setIsLoading] = useState(false);
	
	const jumpTo = useNavigate();
  
	useEffect(() => {
    const getUserListings = async () => {
      setIsLoading(true);
      const listings: TListing[] = await loadUserListings();
      dispatch(addUserListings(listings));
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
    getUserListings();
  }, []);

    if (isLoading) {
    return <>
      <Center>
        <Loader color="cyan" size="xl" mt={100}/>
      </Center>
    </>      
    }

    if (!userListings || userListings?.length === 0) {
        return (
            <Flex mt={20} direction='column' align='center' gap={20}>
                <Box mt={20}><IconMoodSad color="gray" size={100}/></Box>
                <Title my={10} c='gray'>No Listings Found</Title>

                <Button onClick={() => jumpTo('/create-listing')} variant='filled' color='blue' size='lg' fz={20}>
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
            to='/create-listing'
            mx='auto' variant='outline'
            color='green'
            size='md'
            fz={20}
            rightSection={<IconCards/>}
            >
            Create A New Listing
            </Button>

            <MappedListings listings={userListings}/>
        </Flex>
    )
}