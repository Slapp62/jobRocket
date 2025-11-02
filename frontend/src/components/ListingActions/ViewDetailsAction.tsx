import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

type ViewDetailsActionProps = {
  listingId: string;
  width?: string;
};

export function ViewDetailsAction({ listingId, width }: ViewDetailsActionProps) {
  return (
    <Button
      fullWidth
      variant="outline"
      size="sm"
      component={Link}
      to={`/listing-details/${listingId}`}
      w={width}
    >
      View Details
    </Button>
  );
}
