import { Button, Group, List, Modal, Stack, Text } from '@mantine/core';

type DeleteUserModalProps = {
  opened: boolean;
  close: () => void;
  deleteUser: (id?: string) => void;
  id?: string;
  isDeleting?: boolean;
};

export const DeleteUserModal = ({
  opened,
  close,
  deleteUser,
  id,
  isDeleting,
}: DeleteUserModalProps) => {
  const handleDelete = () => {
    deleteUser(id);
    close();
  };

  return (
    <Modal centered opened={opened} onClose={close} title="Delete Account - 30-Day Grace Period">
      <Stack gap="md">
        <Text>
          Your account will be deactivated immediately, but you have a <strong>30-day grace period</strong> to restore it.
        </Text>
        <List size="sm">
          <List.Item>Your profile will be hidden from employers</List.Item>
          <List.Item>Pending applications will be withdrawn</List.Item>
          <List.Item>You can restore your account within 30 days by contacting support</List.Item>
          <List.Item>After 30 days, all data will be permanently deleted</List.Item>
        </List>
        <Text size="sm" c="dimmed">
          To restore your account, email <strong>support@jobrocket.work</strong> within 30 days.
        </Text>
      </Stack>
      <Group mt={20} justify="center">
        <Button color="red" onClick={handleDelete} loading={isDeleting}>
          Yes, Delete Account
        </Button>
        <Button variant="outline" onClick={close}>
          No, Keep Account
        </Button>
      </Group>
    </Modal>
  );
};
