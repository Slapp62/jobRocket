import { Modal, Group, Button, Text } from "@mantine/core";
import { deleteApplication } from "../utils/dashboardApi";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

interface DeleteApplicationModalProps {
  opened: boolean;
  onClose: () => void;
  applicationId: string;
  applicationTitle: string;
  handleDelete: (applicationId: string) => Promise<void>;
}

export const DeleteApplicationModal = ({opened, onClose, handleDelete, applicationId, applicationTitle} : DeleteApplicationModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <Modal opened={opened} onClose={onClose} title="Delete application" centered>
      <Text>
        Are you sure you want to delete the 
        <span style={{fontWeight: 'bold'}}> {applicationTitle} </span> 
        application?
      </Text>
      <Group mt={20} justify="flex-end" gap="sm">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={() => {onClose(), handleDelete(applicationId)}} loading={isDeleting}>
          Delete
        </Button>
      </Group>
    </Modal>
  )
}