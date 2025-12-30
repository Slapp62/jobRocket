import { useState } from 'react';
import { IconFilter, IconPencil, IconSearch, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Anchor,
  Box,
  Card,
  Flex,
  Group,
  Loader,
  Pagination,
  Select,
  Stack,
  Table,
  Tabs,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { toggleAdminView } from '@/store/userSlice';
import { formatDate } from '@/utils/dateUtils';
import { DeleteUserModal } from '../../components/Modals/DeleteUserModal';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { useAdminControls } from './useAdminControls';

const AdminControls = () => {
  const [id, setId] = useState('');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const {
    opened,
    open,
    close,
    dispatch,
    allUsers,
    isLoading,
    deleteUser,
    paginatedUsers,
    currentPage,
    setCurrentPage,
    usersPerPage,
    sortOption,
    setSortOption,
    searchTerm,
    setSearchTerm,
    jumpTo,
  } = useAdminControls();

  // loader
  if (isLoading) {
    return (
      <>
        <Flex align="center" direction="column" mt={100}>
          <Text size="xl" fw={600}>
            Users Are Loading
          </Text>
          <Loader color="cyan" size="xl" mt={30} />
        </Flex>
        ;
      </>
    );
  }

  return (
    <>
      <Flex direction="column" w="100%">
        <Title fz={30} w="fit" mx="auto" my="sm">
          Admin Dashboard
        </Title>

        <Tabs defaultValue="users" mx="auto" w="95%" maw={1400}>
          <Tabs.List>
            <Tabs.Tab value="users">User Management</Tabs.Tab>
            <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="users" pt="md">
            {/* User Management Content */}
            {/* Mobile Filters */}
            <Stack gap="md" hiddenFrom="md" mx="auto" my="md" w="90%">
              <Select
                data={[
                  { value: 'last-name-asc', label: 'Last Name (A-Z)' },
                  { value: 'last-name-desc', label: 'Last Name (Z-A)' },
                  { value: 'account-type', label: 'Account Type' },
                  { value: 'date-created-old', label: 'Date Created (Oldest First)' },
                  { value: 'date-created-new', label: 'Date Created (Latest First)' },
                ]}
                placeholder="Sort By"
                value={sortOption}
                onChange={(value) => {
                  setSortOption(value || '');
                  setCurrentPage(1);
                }}
                rightSection={<IconFilter />}
              />
              <TextInput
                placeholder="Search"
                rightSection={<IconSearch />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Stack>

            {/* Desktop Filters */}
            <Flex direction="row" gap={5} mx="auto" my="md" visibleFrom="md">
              <Select
                data={[
                  { value: 'last-name-asc', label: 'Last Name (A-Z)' },
                  { value: 'last-name-desc', label: 'Last Name (Z-A)' },
                  { value: 'account-type', label: 'Account Type' },
                  { value: 'date-created-old', label: 'Date Created (Oldest First)' },
                  { value: 'date-created-new', label: 'Date Created (Latest First)' },
                ]}
                placeholder="Sort By"
                value={sortOption}
                onChange={(value) => {
                  setSortOption(value || '');
                  setCurrentPage(1);
                }}
                miw={210}
                rightSection={<IconFilter />}
              />
              <TextInput
                placeholder="Search"
                rightSection={<IconSearch />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                miw={210}
              />
            </Flex>

            {/* Mobile Card View */}
            <Stack hiddenFrom="md" gap="md" mx="auto" w="90%">
              {paginatedUsers.map((user) => (
                <Card key={user._id} withBorder p="md">
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <div>
                        <Text fw={600} size="lg">
                          {user.profileType === 'jobseeker'
                            ? `${user.jobseekerProfile?.firstName} ${user.jobseekerProfile?.lastName}`
                            : user.businessProfile?.companyName}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {user.isAdmin
                            ? 'Admin'
                            : user.profileType === 'business'
                              ? 'Business'
                              : 'Jobseeker'}
                        </Text>
                      </div>
                    </Group>

                    <Text size="sm">{user.email}</Text>

                    <Text size="xs" c="dimmed">
                      Created: {formatDate(user.createdAt)}
                    </Text>

                    <Group gap="xs" mt="xs">
                      <ActionIcon
                        size={36}
                        variant="outline"
                        color="yellow"
                        onClick={() => {
                          dispatch(toggleAdminView(true));
                          jumpTo(`/edit-profile/${user?._id}`);
                        }}
                      >
                        <IconPencil size={20} />
                      </ActionIcon>

                      {!user.isAdmin && (
                        <ActionIcon
                          size={36}
                          variant="outline"
                          color="red"
                          onClick={() => {
                            open();
                            setId(user._id);
                          }}
                        >
                          <IconTrash size={20} />
                        </ActionIcon>
                      )}
                    </Group>
                  </Stack>
                </Card>
              ))}
            </Stack>

            {/* Desktop Table View */}
            <Box visibleFrom="md">
              <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="sm" maw="75%" mx="auto">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th />
                      <Table.Th>First Name</Table.Th>
                      <Table.Th>Last Name</Table.Th>
                      <Table.Th>Email</Table.Th>
                      <Table.Th>Account Type</Table.Th>
                      <Table.Th>Date Created</Table.Th>
                      <Table.Th>Edit</Table.Th>
                      <Table.Th>Delete</Table.Th>
                    </Table.Tr>
                  </Table.Thead>

                  <Table.Tbody>
                    {paginatedUsers.map((user) => (
                      <Table.Tr key={user._id}>
                        <Table.Td
                          styles={{
                            td: { borderLeft: '1px solid #eee', borderRight: '1px solid #eee' },
                          }}
                        >
                          <Text fz="sm" fw="bold" c="dimmed" ta="center">
                            {paginatedUsers.indexOf(user) + 1}
                          </Text>
                        </Table.Td>

                        <Table.Td>
                          <Text fz="sm" fw={500}>
                            {user.profileType === 'jobseeker'
                              ? `${user.jobseekerProfile?.firstName} ${user.jobseekerProfile?.lastName}`
                              : user.businessProfile?.companyName}
                          </Text>
                        </Table.Td>

                        <Table.Td>
                          <Text fz="sm" fw={500}>
                            {user.profileType === 'jobseeker' ? 'Jobseeker' : 'Business'}
                          </Text>
                        </Table.Td>

                        <Table.Td>
                          <Anchor component="button" size="sm">
                            {user.email}
                          </Anchor>
                        </Table.Td>

                        <Table.Td>
                          <Text fz="sm">
                            {user.isAdmin
                              ? 'Admin'
                              : user.profileType === 'business'
                                ? 'Business'
                                : 'Jobseeker'}
                          </Text>
                        </Table.Td>

                        <Table.Td>
                          <Text fz="sm">{formatDate(user.createdAt)}</Text>
                        </Table.Td>

                        <Table.Td>
                          <ActionIcon
                            size={30}
                            variant="outline"
                            color="yellow"
                            onClick={() => {
                              dispatch(toggleAdminView(true));
                              jumpTo(`/edit-profile/${user?._id}`);
                            }}
                          >
                            <IconPencil size={25} stroke={1.5} />
                          </ActionIcon>
                        </Table.Td>

                        {!user.isAdmin && (
                          <Table.Td styles={{ td: { borderRight: '1px solid #eee' } }}>
                            <ActionIcon
                              size={30}
                              variant="outline"
                              color="red"
                              onClick={() => {
                                open();
                                setId(user._id);
                              }}
                            >
                              <IconTrash size={25} stroke={1.5} />
                            </ActionIcon>
                          </Table.Td>
                        )}
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            </Box>

            {allUsers && (
              <Pagination
                total={Math.ceil(allUsers.length / usersPerPage)}
                value={currentPage}
                onChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                mt="md"
                m="auto"
              />
            )}
          </Tabs.Panel>

          <Tabs.Panel value="analytics" pt="md">
            <AnalyticsDashboard />
          </Tabs.Panel>
        </Tabs>
      </Flex>

      <DeleteUserModal opened={opened} close={close} deleteUser={deleteUser} id={id} />
    </>
  );
};

export default AdminControls;
