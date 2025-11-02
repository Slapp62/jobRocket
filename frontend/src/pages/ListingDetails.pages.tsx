import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Anchor,
  Badge,
  Card,
  Container,
  Divider,
  Flex,
  Group,
  List,
  ListItem,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FavoritesButton } from '@/components/Buttons/FavoritesButton';
import SocialIcons from '@/components/SocialMedia';
import { RootState } from '@/store/store';

export function ListingDetails() {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.userSlice.user);

  return (
    <Container style={{ width: isMobile ? '100%' : '40%' }}>
      <Title ta="center" my={20}>
        Listing not found
      </Title>
    </Container>
  );
}
