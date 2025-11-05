import { useState } from 'react';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

type EditDeleteActionsProps = {
  listingId: string;
  listingTitle: string;
  onDelete: () => Promise<void>;
  onEdit?: () => void;
};

export function EditDeleteActions({
  listingId,
  listingTitle,
  onDelete,
  onEdit
}: EditDeleteActionsProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
      close();
    } catch (error) {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Stack gap="xs">
        {onEdit ? (
          <Button
            fullWidth
            variant="outline"
            color="green"
            size="sm"
            onClick={onEdit}
            leftSection={<IconEdit size={16} />}
          >
            Edit
          </Button>
        ) : (
          <Button
            fullWidth
            variant="outline"
            color="green"
            size="sm"
            component={Link}
            to={`/edit-listing/${listingId}`}
            leftSection={<IconEdit size={16} />}
          >
            Edit
          </Button>
        )}
        <Button
          fullWidth
          variant="outline"
          color="red"
          size="sm"
          onClick={open}
          leftSection={<IconTrash size={16} />}
        >
          Delete
        </Button>
      </Stack>

      <Modal
        opened={opened}
        onClose={close}
        title="Delete Listing"
        centered
      >
        <Text>Are you sure you want to delete "{listingTitle}"?</Text>
        <Group mt={20} justify="flex-end" gap="sm">
          <Button
            variant="outline"
            onClick={close}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={handleDelete}
            loading={isDeleting}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
}
