import { Hero } from '@/components/Hero';
import { RootState } from '@/store/store';
import { TCards } from '@/Types';
import { Box, Button, Center, Flex, Loader, Pagination, Text, Title } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconArrowUp, IconMoodSad2 } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { fetchCardsThunk } from '@/store/cardSlice';
import ListingCard from '@/components/ListingCard';

export function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCardsThunk() as any);
    }, [dispatch]);
    
    const allCards = useSelector((state:RootState) => state.cardSlice.cards);
   
    const isLoading = useSelector((state:RootState) => state.cardSlice.loading);

    const cards = useMemo(() => {
        if (!allCards) {return []};

        return [...allCards].sort((a : TCards, b : TCards) => 
            (a.createdAt && b.createdAt) ? b.createdAt?.localeCompare(a.createdAt) :  0);
    }, [allCards]);

    const searchWord = useSelector((state: RootState)=> state.searchSlice.searchWord)
    const sortOption = useSelector((state: RootState) => state.cardSlice.sortOption);
    const isMobile = useMediaQuery('(max-width: 500px)');

    const sortedCards = useMemo(() => {
        return [...cards].sort((a, b) => {
        if (sortOption === 'title-asc') {return a.title.localeCompare(b.title)}; 
        if (sortOption === 'title-desc') {return b.title.localeCompare(a.title)}; 
        if (sortOption === 'date-created-old'){
            if (a.createdAt && b.createdAt){
                return a.createdAt?.localeCompare(b.createdAt)
            }
        } 
        if (sortOption === 'date-created-new'){
            if (a.createdAt && b.createdAt){
                return b.createdAt?.localeCompare(a.createdAt)
            }
        }
        return 0
    });
    }, [cards, sortOption]);
    
    const searchCards = useMemo(() => {
        return sortedCards.filter((card:TCards) => {
            const keyWord = searchWord.toLowerCase();
            return (
                card.title.toLowerCase().includes(keyWord) ||
                card.subtitle.toLowerCase().includes(keyWord) ||
                card.description.toLowerCase().includes(keyWord)
            )
        });
    }, [sortedCards, searchWord]);
  
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 12;
    
    const paginatedCards = useMemo(() => {
        return searchCards.slice(
        (currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);
    }, [searchCards, currentPage, cardsPerPage]).map((card:TCards) => card._id);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchCards]);

    const startCurrentCards = (currentPage - 1) * cardsPerPage + 1;
    const endCurrentCards = Math.min(currentPage * cardsPerPage, searchCards.length);
    const totalCurrentCards = searchCards.length;
    const noCards = searchCards.length === 0;

  return (
    <>
      <Hero />
      {isLoading || !allCards ? 
        (
            <Center>
                <Loader color="cyan" size="xl" mt={30} />
            </Center>
        ) 
        : 
        (
        <Flex direction="column" align="center" gap={20}>
          
          <Flex wrap="wrap" gap='lg' justify="center" w={isMobile ? "100%" : "80%"}>
            {paginatedCards.map((id: string) => (
              <ListingCard cardID={id} key={id} />
            ))}
          </Flex>

          {!noCards && (
            <>
              <Text fw={500}>
                Showing {startCurrentCards} to {endCurrentCards} of {totalCurrentCards} results
              </Text>
              <Pagination
                mt="md"
                total={Math.ceil(searchCards.length / cardsPerPage)}
                value={currentPage}
                onChange={page => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </>
          )}

          {noCards && (
            <Box ta="center">
              <IconMoodSad2 color="red" size={80} />
              <Title order={2} fw={700} c="red">
                No Cards Found
              </Title>
            </Box>
          )}

          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            mt={20}
            c="green"
            variant="light"
            rightSection={<IconArrowUp />}
          >
            Back to Top
          </Button>
        </Flex>
      )}
    </>
  );
}