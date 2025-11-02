import React from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@mantine/hooks';
import { Badge, Card, Flex, Group, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import style from './ListingSnip.module.css';
import { IconMapPin } from '@tabler/icons-react';

function ListingSnip({ listingID }: { listingID: string }) {
  return null;
}

export default React.memo(ListingSnip, (prev, next) => prev.listingID === next.listingID);
