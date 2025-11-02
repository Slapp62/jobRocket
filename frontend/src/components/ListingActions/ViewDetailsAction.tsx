import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

type ViewDetailsActionProps = {
  listingId: string;
};

export function ViewDetailsAction({ listingId }: ViewDetailsActionProps) {
  return (
    <Button
      fullWidth
      variant="filled"
      size="sm"
      component={Link}
      to={`/listing-details/${listingId}`}
    >
      View Details
    </Button>
  );
}
