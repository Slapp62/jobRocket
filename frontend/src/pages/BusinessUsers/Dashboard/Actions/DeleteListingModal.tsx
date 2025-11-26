import { Modal, Group, Button, Text } from "@mantine/core";
import { deleteListing } from "../dashboardApi";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

interface DeleteListingModalProps {
  opened: boolean;
  onClose: () => void;
  listingId: string;
  listingTitle: string;
  onSuccess: () => void;
}

export const DeleteListingModal = ({opened, onClose, listingId, listingTitle, onSuccess} : DeleteListingModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const response = await deleteListing(listingId)
      notifications.show({
        title: 'Success',
        message: 'Listing successfully deleted.',
        color: 'green',
      });
      onSuccess() 
    } catch (error : any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || error.message,
        color: 'red',
      });
    } finally {
      setIsDeleting(false)
    }
  }

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
        <Button color="red" onClick={handleDelete} loading={isDeleting}>
          Delete
        </Button>
      </Group>
    </Modal>
  )
}