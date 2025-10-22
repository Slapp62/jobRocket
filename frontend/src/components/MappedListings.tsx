import { TListing } from "@/Types";
import { Flex } from "@mantine/core"
import ListingCard from "./ListingCard";
import { useMediaQuery } from "@mantine/hooks";

function MappedListings(props: {listings : TListing[]})  {
    const isMobile = useMediaQuery('(max-width: 500px)');

    return (
        <Flex
            wrap="wrap"
            gap="lg" 
            align='stretch' 
            justify="center" 
            w={isMobile ? "100%" : "80%"} 
            >

            {props.listings.map((listing:TListing) => (
                <ListingCard key={listing._id} listingID={listing._id} />
            ))}
        </Flex>
    )
}

export default MappedListings

