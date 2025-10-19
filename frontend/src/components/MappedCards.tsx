import { TCards } from "@/Types";
import { Flex } from "@mantine/core"
import ListingCard from "./ListingCard";
import { useMediaQuery } from "@mantine/hooks";

function MappedCards(props: {cardsArr : TCards[]})  {
    const isMobile = useMediaQuery('(max-width: 500px)');
    
    return (
        <Flex 
            wrap="wrap" 
            gap="lg" 
            align='stretch' 
            justify="center" 
            w={isMobile ? "100%" : "80%"} 
            >

            {props.cardsArr.map((card:TCards) => (
                <ListingCard key={card._id} cardID={card._id} />
            ))}
        </Flex>
    )
}

export default MappedCards