import { Modal, Group, Button, Text } from "@mantine/core";
import { deleteListing } from "../utils/dashboardApi";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

interface DeleteListingModalProps {
  opened: boolean;
  onClose: () => void;
  listingId: string;
  listingTitle: string;
  handleDelete: (listingId: string) => Promise<void>;
}

export const DeleteListingModal = ({opened, onClose, handleDelete, listingId, listingTitle} : DeleteListingModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <Modal opened={opened} onClose={onClose} title="Delete Listing" centered>
      <Text>
        Are you sure you want to delete the 
        <span style={{fontWeight: 'bold'}}> {listingTitle} </span> 
        listing?
      </Text>
      <Group mt={20} justify="flex-end" gap="sm">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={() => {onClose(), handleDelete(listingId)}} loading={isDeleting}>
          Delete
        </Button>
      </Group>
    </Modal>
  )
}