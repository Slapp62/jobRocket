import { Button, Group, Modal, Text } from '@mantine/core';

type DeleteUserModalProps = {
  opened: boolean;
  close: () => void;
  deleteUser: (id?: string) => void;
  id?: string;
  isDeleting?: boolean;
};

export const DeleteUserModal = ({ opened, close, deleteUser, id, isDeleting }: DeleteUserModalProps) => {
  const handleDelete = () => {
    deleteUser(id);
    close();
  };

  return (
    <Modal centered opened={opened} onClose={close} title="Confirmation">
      <Text>Are you sure you want to delete this account?</Text>
      <Group mt={20} justify="center">
        <Button color="red" onClick={handleDelete} loading={isDeleting}>
          Yes, Delete It
        </Button>
        <Button variant="outline" onClick={close}>
          No, Take Me Back
        </Button>
      </Group>
    </Modal>
  );
};
