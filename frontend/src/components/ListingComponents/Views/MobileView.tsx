import { FavoritesButton } from "@/components/ListingActions/FavoritesButton"
import { ViewDetailsAction } from "@/components/ListingActions/ViewDetailsAction"
import { Flex, Group, Pagination, Button } from "@mantine/core"
import { IconMoodSad2, IconArrowUp } from "@tabler/icons-react"
import ListingCard from "../ListingCard"
import { useMediaQuery } from "@mantine/hooks"
import { Text } from "@mantine/core"
import { useState } from "react";

interface MobileViewProps {
    displayListings: any[];
}

const MobileView = ({displayListings}: MobileViewProps) => {
    const isMobile = useMediaQuery('(max-width: 500px)');
    const listingsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const startCurrentListings = (currentPage - 1) * listingsPerPage + 1;
    const endCurrentListings = Math.min(currentPage * listingsPerPage, displayListings.length);
    const totalCurrentListings = displayListings.length;
    const noListings = displayListings.length === 0;
    
    return (
      <Flex direction="column" align="center" gap={20}>
          <Flex
            wrap="wrap"
            gap="lg"
            align="stretch"
            justify="center"
            w={isMobile ? '95vw' : '80vw'}
          >
            {displayListings.map((listing) => (
              <ListingCard
                key={listing._id}
                listing={listing}
                actions={
                  <Group gap={10} w="100%">
                    <FavoritesButton listing={listing} />
                    <ViewDetailsAction listingId={listing._id} width="70%" />
                  </Group>
                }
              />
            ))}
          </Flex>

          {noListings && (
            <Flex direction="column" align="center" gap={10} mt={50}>
              <IconMoodSad2 size={80} />
              <Text size="xl" fw={500}>
                No listings found
              </Text>
              <Text c="dimmed">Try adjusting your search filters</Text>
            </Flex>
          )}

          {!noListings && (
            <>
              <Text c="dimmed">
                Showing {startCurrentListings}-{endCurrentListings} of {totalCurrentListings}{' '}
                results
              </Text>

              <Pagination
                total={Math.ceil(displayListings.length / listingsPerPage)}
                value={currentPage}
                onChange={setCurrentPage}
                color="cyan"
                size={isMobile ? 'sm' : 'md'}
              />

              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                variant="light"
              >
                <IconArrowUp />
              </Button>
            </>
          )}
        </Flex>
    )
}

export default MobileView
