# Business Dashboard Implementation Guide

This guide provides step-by-step instructions for implementing a comprehensive business dashboard that allows businesses to view and manage all their listings and incoming applications.

## Table of Contents
1. [Overview](#overview)
2. [Backend Implementation](#backend-implementation)
3. [Frontend Implementation](#frontend-implementation)
4. [Testing](#testing)
5. [Optional Enhancements](#optional-enhancements)

---

## Overview

### Features to Implement
- ✅ View all current listings with application counts
- ✅ See all incoming applications across all listings
- ✅ Update application status (pending → reviewed/rejected)
- ✅ View applicant profiles
- ✅ Dashboard metrics showing totals and breakdowns
- ✅ Filter applications by status and listing
- ✅ Responsive design for mobile/desktop

### Tech Stack
- **Backend**: Node.js, Express, MongoDB/Mongoose
- **Frontend**: React, TypeScript, Mantine UI
- **State Management**: React hooks (useState, useEffect)
- **API**: RESTful endpoints

---

## Backend Implementation

### Step 1: Create Dashboard Service Function

**File**: `backend/services/applicationsService.js`

Add the following function to aggregate dashboard data:

```javascript
async function getBusinessDashboard(businessId) {
  // Get all listings for this business
  const listings = await Listings.find({ businessId }).sort({ createdAt: -1 });

  if (!listings || listings.length === 0) {
    return {
      listings: [],
      applications: [],
      metrics: {
        totalListings: 0,
        totalApplications: 0,
        pendingApplications: 0,
        reviewedApplications: 0,
        rejectedApplications: 0,
      },
    };
  }

  const listingIds = listings.map((listing) => listing._id);

  // Get all applications for these listings
  const applications = await Applications.find({ listingId: { $in: listingIds } })
    .populate('listingId')
    .populate(
      'applicantId',
      'jobseekerProfile.firstName jobseekerProfile.lastName jobseekerProfile.email jobseekerProfile.phone'
    )
    .sort({ createdAt: -1 });

  // Calculate metrics
  const metrics = {
    totalListings: listings.length,
    totalApplications: applications.length,
    pendingApplications: applications.filter((app) => app.status === 'pending').length,
    reviewedApplications: applications.filter((app) => app.status === 'reviewed').length,
    rejectedApplications: applications.filter((app) => app.status === 'rejected').length,
  };

  return {
    listings,
    applications,
    metrics,
  };
}
```

**Export the function**:
```javascript
module.exports = {
  submitApplication,
  getApplicantApplications,
  getListingApplications,
  updateApplicationStatus,
  updateApplicationData,
  getBusinessDashboard, // Add this
};
```

### Step 2: Create Dashboard Controller

**File**: `backend/controllers/applicationsController.js`

Add the controller function:

```javascript
async function getBusinessDashboard(req, res) {
  try {
    const businessId = req.user._id;
    const dashboardData = await applicationsService.getBusinessDashboard(businessId);
    handleSuccess(res, 200, dashboardData);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
}
```

**Export the function**:
```javascript
module.exports = {
  submitApplication,
  getApplicationsByID,
  getListingApplications,
  updateApplicationStatus,
  updateApplicationData,
  getBusinessDashboard, // Add this
};
```

### Step 3: Create Dashboard Route

**File**: `backend/routes/applicationRoutes.js`

1. Import the `businessAuth` middleware and controller:
```javascript
const { authenticateUser, optionalAuthenticateUser, businessAuth } = require('../middleware/authService');
const {
  submitApplication,
  getApplicationsByID,
  getListingApplications,
  updateApplicationStatus,
  updateApplicationData,
  getBusinessDashboard, // Add this
} = require('../controllers/applicationsController');
```

2. Add the route (place it BEFORE the `/listing/:listingId` route to avoid conflicts):
```javascript
router.get('/business/dashboard', authenticateUser, businessAuth, getBusinessDashboard);
```

**Why this order matters**:
- `/business/dashboard` must come before `/listing/:listingId`
- Otherwise Express will treat "business" as a listing ID parameter

---

## Frontend Implementation

### Step 1: Update TypeScript Types

**File**: `frontend/src/Types.ts`

Update the `TApplication` type and add new dashboard types:

```typescript
export type TApplication = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  applicantId?: TUsers | string;  // Changed from jobseekerId
  listingId: TListing | string;   // Changed from any
  resume: string;
  message?: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'rejected';  // Changed from string
};

export type TDashboardMetrics = {
  totalListings: number;
  totalApplications: number;
  pendingApplications: number;
  reviewedApplications: number;
  rejectedApplications: number;
};

export type TBusinessDashboard = {
  listings: TListing[];
  applications: TApplication[];
  metrics: TDashboardMetrics;
};
```

**Important**: After updating `TApplication`, you may need to fix type errors in `MyApplications.page.tsx`:

```typescript
// Change this:
<Title order={5}>{application.listingId.companyName}</Title>

// To this (to handle both string and object):
{applications.map((application, index) => {
  const listing = typeof application.listingId === 'object' ? application.listingId : null;
  return (
    <Card withBorder key={index} p="md" w="250px">
      <Stack>
        <Title order={5}>{listing?.companyName}</Title>
        <Text>{listing?.jobTitle}</Text>
        {/* ... rest of component */}
      </Stack>
    </Card>
  );
})}
```

### Step 2: Create API Utility Functions

**File**: `frontend/src/utils/dashboardApi.ts` (create this file)

```typescript
import axios from 'axios';
import { TBusinessDashboard } from '@/Types';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const getAuthToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const fetchBusinessDashboard = async (): Promise<TBusinessDashboard> => {
  const token = getAuthToken();
  const response = await axios.get(`${API_BASE_URL}/api/applications/business/dashboard`, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

export const updateApplicationStatus = async (
  applicationId: string,
  status: 'pending' | 'reviewed' | 'rejected'
): Promise<any> => {
  const token = getAuthToken();
  const response = await axios.patch(
    `${API_BASE_URL}/api/applications/${applicationId}/status`,
    { status },
    {
      headers: { 'x-auth-token': token },
    }
  );
  return response.data;
};

export const fetchApplicantProfile = async (userId: string): Promise<any> => {
  const token = getAuthToken();
  const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};
```

### Step 3: Create Reusable Components

#### 3.1 Application Status Badge

**File**: `frontend/src/components/Application/ApplicationStatusBadge.tsx`

```typescript
import { Badge } from '@mantine/core';

type ApplicationStatusBadgeProps = {
  status: 'pending' | 'reviewed' | 'rejected';
  variant?: 'filled' | 'outline' | 'light' | 'dot';
};

export function ApplicationStatusBadge({ status, variant = 'outline' }: ApplicationStatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'reviewed':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Badge variant={variant} c={getStatusColor()}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
```

#### 3.2 Dashboard Metrics

**File**: `frontend/src/components/Application/DashboardMetrics.tsx`

```typescript
import { Card, Text, Group, Stack, SimpleGrid } from '@mantine/core';
import { IconBriefcase, IconFileText, IconClock, IconCheck, IconX } from '@tabler/icons-react';
import { TDashboardMetrics } from '@/Types';

type DashboardMetricsProps = {
  metrics: TDashboardMetrics;
};

export function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  const stats = [
    {
      title: 'Total Listings',
      value: metrics.totalListings,
      icon: IconBriefcase,
      color: 'blue',
    },
    {
      title: 'Total Applications',
      value: metrics.totalApplications,
      icon: IconFileText,
      color: 'gray',
    },
    {
      title: 'Pending',
      value: metrics.pendingApplications,
      icon: IconClock,
      color: 'yellow',
    },
    {
      title: 'Reviewed',
      value: metrics.reviewedApplications,
      icon: IconCheck,
      color: 'green',
    },
    {
      title: 'Rejected',
      value: metrics.rejectedApplications,
      icon: IconX,
      color: 'red',
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 5 }} spacing="md">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} withBorder padding="md">
            <Group justify="space-between">
              <Stack gap={0}>
                <Text size="xs" c="dimmed" fw={500}>
                  {stat.title}
                </Text>
                <Text fw={700} size="xl">
                  {stat.value}
                </Text>
              </Stack>
              <Icon size={24} color={`var(--mantine-color-${stat.color}-6)`} stroke={1.5} />
            </Group>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
```

#### 3.3 Application Card

**File**: `frontend/src/components/Application/ApplicationCard.tsx`

```typescript
import { Card, Text, Stack, Group, Button, Select } from '@mantine/core';
import { IconMail, IconPhone, IconUser, IconFileText } from '@tabler/icons-react';
import { TApplication } from '@/Types';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';
import { useState } from 'react';

type ApplicationCardProps = {
  application: TApplication;
  onStatusChange: (applicationId: string, newStatus: 'pending' | 'reviewed' | 'rejected') => void;
  onViewProfile: (applicantId: string) => void;
  isUpdating?: boolean;
};

export function ApplicationCard({
  application,
  onStatusChange,
  onViewProfile,
  isUpdating = false,
}: ApplicationCardProps) {
  const [localStatus, setLocalStatus] = useState(application.status);
  const listing = typeof application.listingId === 'object' ? application.listingId : null;
  const applicant = typeof application.applicantId === 'object' ? application.applicantId : null;

  const handleStatusChange = (newStatus: string | null) => {
    if (newStatus && (newStatus === 'pending' || newStatus === 'reviewed' || newStatus === 'rejected')) {
      setLocalStatus(newStatus);
      onStatusChange(application._id, newStatus);
    }
  };

  return (
    <Card withBorder padding="md" radius="md">
      <Stack gap="sm">
        {/* Listing Info */}
        {listing && (
          <Group justify="space-between">
            <Stack gap={0}>
              <Text fw={600} size="lg">
                {listing.jobTitle}
              </Text>
              <Text size="sm" c="dimmed">
                {listing.companyName}
              </Text>
            </Stack>
            <ApplicationStatusBadge status={localStatus} />
          </Group>
        )}

        {/* Applicant Info */}
        <Stack gap="xs">
          <Group gap="xs">
            <IconUser size={16} />
            <Text size="sm" fw={500}>
              {application.firstName} {application.lastName}
            </Text>
          </Group>

          <Group gap="xs">
            <IconMail size={16} />
            <Text size="sm">{application.email}</Text>
          </Group>

          {application.phone && (
            <Group gap="xs">
              <IconPhone size={16} />
              <Text size="sm">{application.phone}</Text>
            </Group>
          )}

          {application.message && (
            <Group gap="xs" align="flex-start">
              <IconFileText size={16} style={{ marginTop: 2 }} />
              <Text size="sm" lineClamp={2}>
                {application.message}
              </Text>
            </Group>
          )}
        </Stack>

        {/* Application Date */}
        <Text size="xs" c="dimmed">
          Applied on {new Date(application.createdAt).toLocaleDateString()}
        </Text>

        {/* Actions */}
        <Stack gap="xs">
          <Select
            label="Status"
            value={localStatus}
            onChange={handleStatusChange}
            data={[
              { value: 'pending', label: 'Pending' },
              { value: 'reviewed', label: 'Reviewed' },
              { value: 'rejected', label: 'Rejected' },
            ]}
            disabled={isUpdating}
          />

          <Group grow>
            {application.resume && (
              <Button
                variant="outline"
                component="a"
                href={application.resume}
                target="_blank"
                rel="noopener noreferrer"
                size="xs"
              >
                View Resume
              </Button>
            )}

            {applicant && applicant._id && (
              <Button variant="outline" onClick={() => onViewProfile(applicant._id)} size="xs">
                View Profile
              </Button>
            )}

            {!applicant && application.applicantId && typeof application.applicantId === 'string' && (
              <Button
                variant="outline"
                onClick={() => onViewProfile(application.applicantId as string)}
                size="xs"
              >
                View Profile
              </Button>
            )}
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
}
```

#### 3.4 Applicant Profile Modal

**File**: `frontend/src/components/Application/ApplicantProfileModal.tsx`

```typescript
import { Modal, Stack, Text, Group, Badge, Divider, Loader, Center, Box, Title } from '@mantine/core';
import { TUsers } from '@/Types';
import { IconMail, IconPhone, IconBriefcase, IconSchool, IconLink } from '@tabler/icons-react';

type ApplicantProfileModalProps = {
  opened: boolean;
  onClose: () => void;
  applicant: TUsers | null;
  isLoading?: boolean;
};

export function ApplicantProfileModal({
  opened,
  onClose,
  applicant,
  isLoading = false,
}: ApplicantProfileModalProps) {
  if (isLoading) {
    return (
      <Modal opened={opened} onClose={onClose} title="Applicant Profile" size="lg" centered>
        <Center py={50}>
          <Loader size="lg" />
        </Center>
      </Modal>
    );
  }

  if (!applicant || !applicant.jobseekerProfile) {
    return (
      <Modal opened={opened} onClose={onClose} title="Applicant Profile" size="lg" centered>
        <Text c="dimmed">No profile information available</Text>
      </Modal>
    );
  }

  const profile = applicant.jobseekerProfile;

  return (
    <Modal opened={opened} onClose={onClose} title="Applicant Profile" size="lg" centered zIndex={1000}>
      <Stack gap="md">
        {/* Header */}
        <Box>
          <Title order={2} mb="xs">
            {profile.firstName} {profile.lastName}
          </Title>
          {applicant.email && (
            <Group gap="xs" mb={5}>
              <IconMail size={16} />
              <Text size="sm">{applicant.email}</Text>
            </Group>
          )}
          {applicant.phone && (
            <Group gap="xs">
              <IconPhone size={16} />
              <Text size="sm">{applicant.phone}</Text>
            </Group>
          )}
        </Box>

        <Divider />

        {/* Education */}
        {profile.highestEducation && (
          <Box>
            <Group gap="xs" mb={5}>
              <IconSchool size={18} />
              <Text fw={600} size="sm">
                Education
              </Text>
            </Group>
            <Badge variant="light" color="blue">
              {profile.highestEducation}
            </Badge>
          </Box>
        )}

        {/* Work Arrangement */}
        {profile.preferredWorkArrangement && (
          <Box>
            <Group gap="xs" mb={5}>
              <IconBriefcase size={18} />
              <Text fw={600} size="sm">
                Preferred Work Arrangement
              </Text>
            </Group>
            <Badge variant="light" color="teal">
              {profile.preferredWorkArrangement}
            </Badge>
          </Box>
        )}

        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <Box>
            <Text fw={600} size="sm" mb={5}>
              Skills
            </Text>
            <Group gap="xs">
              {profile.skills.map((skill, index) => (
                <Badge key={index} variant="outline" color="gray">
                  {skill}
                </Badge>
              ))}
            </Group>
          </Box>
        )}

        {/* Description */}
        {profile.description && (
          <Box>
            <Text fw={600} size="sm" mb={5}>
              About
            </Text>
            <Text size="sm">{profile.description}</Text>
          </Box>
        )}

        {/* LinkedIn */}
        {profile.linkedinPage && (
          <Box>
            <Group gap="xs" mb={5}>
              <IconLink size={18} />
              <Text fw={600} size="sm">
                LinkedIn
              </Text>
            </Group>
            <Text
              size="sm"
              component="a"
              href={profile.linkedinPage}
              target="_blank"
              rel="noopener noreferrer"
              c="blue"
              style={{ textDecoration: 'underline' }}
            >
              {profile.linkedinPage}
            </Text>
          </Box>
        )}

        {/* Resume */}
        {profile.resume && (
          <Box>
            <Text fw={600} size="sm" mb={5}>
              Resume
            </Text>
            <Text
              size="sm"
              component="a"
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              c="blue"
              style={{ textDecoration: 'underline' }}
            >
              View Resume
            </Text>
          </Box>
        )}
      </Stack>
    </Modal>
  );
}
```

### Step 4: Create Dashboard Page

**File**: `frontend/src/pages/BusinessUsers/Dashboard.pages.tsx`

```typescript
import { useEffect, useState } from 'react';
import {
  Stack,
  Title,
  Text,
  Center,
  Loader,
  Select,
  Group,
  SimpleGrid,
  Button,
  Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { PageMeta } from '@/SEO/PageMeta';
import { TBusinessDashboard, TApplication, TUsers } from '@/Types';
import { DashboardMetrics } from '@/components/Application/DashboardMetrics';
import { ApplicationCard } from '@/components/Application/ApplicationCard';
import { ApplicantProfileModal } from '@/components/Application/ApplicantProfileModal';
import { fetchBusinessDashboard, updateApplicationStatus, fetchApplicantProfile } from '@/utils/dashboardApi';

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<TBusinessDashboard | null>(null);
  const [filteredApplications, setFilteredApplications] = useState<TApplication[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | null>('all');
  const [listingFilter, setListingFilter] = useState<string | null>('all');
  const [updatingApplicationId, setUpdatingApplicationId] = useState<string | null>(null);

  // Profile modal state
  const [profileOpened, { open: openProfile, close: closeProfile }] = useDisclosure(false);
  const [selectedApplicant, setSelectedApplicant] = useState<TUsers | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Fetch dashboard data
  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true);
      try {
        const data = await fetchBusinessDashboard();
        setDashboardData(data);
        setFilteredApplications(data.applications);
      } catch (error: any) {
        notifications.show({
          title: 'Error',
          message: error.response?.data?.message || 'Failed to load dashboard',
          color: 'red',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // Apply filters
  useEffect(() => {
    if (!dashboardData) return;

    let filtered = [...dashboardData.applications];

    // Filter by status
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    // Filter by listing
    if (listingFilter && listingFilter !== 'all') {
      filtered = filtered.filter((app) => {
        const listingId = typeof app.listingId === 'object' ? app.listingId._id : app.listingId;
        return listingId === listingFilter;
      });
    }

    setFilteredApplications(filtered);
  }, [statusFilter, listingFilter, dashboardData]);

  // Handle status change
  const handleStatusChange = async (applicationId: string, newStatus: 'pending' | 'reviewed' | 'rejected') => {
    setUpdatingApplicationId(applicationId);
    try {
      await updateApplicationStatus(applicationId, newStatus);

      // Update local state
      if (dashboardData) {
        const updatedApplications = dashboardData.applications.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        );

        // Recalculate metrics
        const newMetrics = {
          totalListings: dashboardData.metrics.totalListings,
          totalApplications: dashboardData.metrics.totalApplications,
          pendingApplications: updatedApplications.filter((app) => app.status === 'pending').length,
          reviewedApplications: updatedApplications.filter((app) => app.status === 'reviewed').length,
          rejectedApplications: updatedApplications.filter((app) => app.status === 'rejected').length,
        };

        setDashboardData({
          ...dashboardData,
          applications: updatedApplications,
          metrics: newMetrics,
        });
      }

      notifications.show({
        title: 'Success',
        message: 'Application status updated',
        color: 'green',
      });
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to update status',
        color: 'red',
      });
    } finally {
      setUpdatingApplicationId(null);
    }
  };

  // Handle view profile
  const handleViewProfile = async (applicantId: string) => {
    setIsLoadingProfile(true);
    openProfile();
    try {
      const profile = await fetchApplicantProfile(applicantId);
      setSelectedApplicant(profile);
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to load profile',
        color: 'red',
      });
      closeProfile();
    } finally {
      setIsLoadingProfile(false);
    }
  };

  // Clear filters
  const clearFilters = () => {
    setStatusFilter('all');
    setListingFilter('all');
  };

  if (isLoading) {
    return (
      <Center py={50} h="calc(100vh - 200px)">
        <Loader size="xl" variant="oval" />
      </Center>
    );
  }

  if (!dashboardData) {
    return (
      <Center py={50}>
        <Text c="dimmed">No dashboard data available</Text>
      </Center>
    );
  }

  const listingOptions = [
    { value: 'all', label: 'All Listings' },
    ...dashboardData.listings.map((listing) => ({
      value: listing._id,
      label: `${listing.jobTitle} - ${listing.companyName}`,
    })),
  ];

  return (
    <>
      <PageMeta
        title="Business Dashboard | JobRocket"
        description="Manage your job listings and applications"
        keywords="business dashboard, job listings, applications"
      />

      <Stack gap="xl" w="100%">
        {/* Header */}
        <Title order={1} ta="center">
          Dashboard
        </Title>

        {/* Metrics */}
        <DashboardMetrics metrics={dashboardData.metrics} />

        <Divider />

        {/* Filters */}
        <Stack gap="md">
          <Group justify="space-between" align="flex-end">
            <Group>
              <Select
                label="Filter by Status"
                value={statusFilter}
                onChange={setStatusFilter}
                data={[
                  { value: 'all', label: 'All Statuses' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'reviewed', label: 'Reviewed' },
                  { value: 'rejected', label: 'Rejected' },
                ]}
                style={{ minWidth: 150 }}
              />

              <Select
                label="Filter by Listing"
                value={listingFilter}
                onChange={setListingFilter}
                data={listingOptions}
                style={{ minWidth: 250 }}
              />

              {(statusFilter !== 'all' || listingFilter !== 'all') && (
                <Button variant="subtle" onClick={clearFilters} mt={24}>
                  Clear Filters
                </Button>
              )}
            </Group>

            <Text size="sm" c="dimmed">
              Showing {filteredApplications.length} of {dashboardData.applications.length} applications
            </Text>
          </Group>
        </Stack>

        {/* Applications */}
        {filteredApplications.length === 0 ? (
          <Center py={50}>
            <Text c="dimmed">No applications found</Text>
          </Center>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application._id}
                application={application}
                onStatusChange={handleStatusChange}
                onViewProfile={handleViewProfile}
                isUpdating={updatingApplicationId === application._id}
              />
            ))}
          </SimpleGrid>
        )}
      </Stack>

      {/* Applicant Profile Modal */}
      <ApplicantProfileModal
        opened={profileOpened}
        onClose={closeProfile}
        applicant={selectedApplicant}
        isLoading={isLoadingProfile}
      />
    </>
  );
}
```

### Step 5: Add Route to Router

**File**: `frontend/src/routing/AppRouter.tsx`

1. Import the Dashboard component:
```typescript
import { Dashboard } from '../pages/BusinessUsers/Dashboard.pages';
```

2. Add the route (inside the children array):
```typescript
{
  path: 'dashboard',
  element: (
    <RouteGuard profileType="business">
      <Dashboard />
    </RouteGuard>
  ),
},
```

**Full route configuration example**:
```typescript
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <HomePage /> },
      // ... other routes
      {
        path: 'my-listings',
        element: (
          <RouteGuard profileType="business">
            <MyListings />
          </RouteGuard>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <RouteGuard profileType="business">
            <Dashboard />
          </RouteGuard>
        ),
      },
      { path: '*', element: <Error404 /> },
    ],
  },
]);
```

---

## Testing

### Backend Testing

1. **Test the dashboard endpoint directly**:
```bash
# In your terminal
curl -X GET http://localhost:3000/api/applications/business/dashboard \
  -H "x-auth-token: YOUR_BUSINESS_USER_TOKEN"
```

Expected response:
```json
{
  "listings": [...],
  "applications": [...],
  "metrics": {
    "totalListings": 5,
    "totalApplications": 12,
    "pendingApplications": 7,
    "reviewedApplications": 3,
    "rejectedApplications": 2
  }
}
```

2. **Test status update**:
```bash
curl -X PATCH http://localhost:3000/api/applications/APPLICATION_ID/status \
  -H "x-auth-token: YOUR_BUSINESS_USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "reviewed"}'
```

### Frontend Testing

1. **Run TypeScript check**:
```bash
cd frontend
npm run typecheck
```

2. **Build the frontend**:
```bash
npm run build
```

3. **Start the dev server**:
```bash
npm run dev
```

4. **Manual testing checklist**:
   - [ ] Navigate to `/dashboard` as a business user
   - [ ] Verify metrics display correctly
   - [ ] Test status filter (pending/reviewed/rejected)
   - [ ] Test listing filter
   - [ ] Update application status via dropdown
   - [ ] View applicant profile
   - [ ] View resume link works
   - [ ] Test on mobile (responsive layout)
   - [ ] Test with no applications
   - [ ] Test with no listings

### Edge Cases to Test

1. **Business with no listings**: Should show empty state
2. **Listings with no applications**: Should show 0 applications
3. **Anonymous applications** (no applicantId): Profile button should not break
4. **Invalid applicant ID**: Should handle gracefully with error notification
5. **Network errors**: Should show error notifications

---

## Optional Enhancements

### Enhancement 1: Pagination for Applications

If you have many applications, add pagination:

```typescript
// Add to Dashboard.pages.tsx
const [page, setPage] = useState(1);
const ITEMS_PER_PAGE = 12;

// Calculate pagination
const startIndex = (page - 1) * ITEMS_PER_PAGE;
const paginatedApplications = filteredApplications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);

// Use paginatedApplications in the render
```

### Enhancement 2: Search Functionality

Add text search for applicant names:

```typescript
const [searchQuery, setSearchQuery] = useState('');

// In filter useEffect
if (searchQuery) {
  filtered = filtered.filter((app) => {
    const fullName = `${app.firstName} ${app.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });
}

// Add TextInput component
<TextInput
  placeholder="Search applicants..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  leftSection={<IconSearch size={16} />}
/>
```

### Enhancement 3: Export to CSV

Add export functionality:

```typescript
const exportToCSV = () => {
  const headers = ['Name', 'Email', 'Phone', 'Listing', 'Status', 'Applied Date'];
  const rows = filteredApplications.map((app) => {
    const listing = typeof app.listingId === 'object' ? app.listingId : null;
    return [
      `${app.firstName} ${app.lastName}`,
      app.email,
      app.phone || '',
      listing?.jobTitle || '',
      app.status,
      new Date(app.createdAt).toLocaleDateString(),
    ];
  });

  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'applications.csv';
  a.click();
};
```

### Enhancement 4: Real-time Updates with WebSockets

For real-time application notifications, integrate Socket.io:

```typescript
// Backend
io.on('connection', (socket) => {
  socket.on('join-business-room', (businessId) => {
    socket.join(`business-${businessId}`);
  });
});

// Emit when new application is submitted
io.to(`business-${businessId}`).emit('new-application', application);

// Frontend
const socket = io(API_BASE_URL);
socket.emit('join-business-room', user._id);
socket.on('new-application', (application) => {
  // Refresh dashboard or show notification
});
```

### Enhancement 5: Bulk Actions

Allow selecting multiple applications and updating status in bulk:

```typescript
const [selectedApplications, setSelectedApplications] = useState<string[]>([]);

const handleBulkStatusUpdate = async (status: 'pending' | 'reviewed' | 'rejected') => {
  await Promise.all(
    selectedApplications.map(id => updateApplicationStatus(id, status))
  );
  // Refresh dashboard
};
```

---

## Troubleshooting

### Common Issues

**1. "Cannot find module" errors**
- Ensure all imports use the correct path aliases (`@/`)
- Check `tsconfig.json` has path mappings configured

**2. TypeScript errors after updating TApplication**
- Search for all usages of `application.listingId.X` and add type guards
- Use optional chaining: `application.listingId?.companyName`

**3. 401 Unauthorized errors**
- Verify business user has valid authentication token
- Check `businessAuth` middleware is working correctly

**4. Applications not populating correctly**
- Verify the `.populate()` calls in the backend service
- Check MongoDB relationships are set up correctly

**5. Metrics not updating after status change**
- Ensure you're recalculating metrics in the `handleStatusChange` function
- Check the filter logic is correct (`.filter((app) => app.status === 'pending')`)

---

## Summary

This implementation provides a complete, production-ready business dashboard with:

- ✅ Comprehensive backend API with efficient data aggregation
- ✅ Type-safe frontend with TypeScript
- ✅ Reusable, modular components
- ✅ Filtering and search capabilities
- ✅ Real-time optimistic updates
- ✅ Responsive design
- ✅ Error handling and loading states
- ✅ Professional UI with Mantine components

The dashboard is accessible at `/dashboard` for authenticated business users and provides a centralized view of all listings and applications with powerful management capabilities.
