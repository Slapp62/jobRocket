export type TListing = {
  _id: string;
  businessId: string;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  requirements: string[];
  advantages: string[];
  apply: {
    method: 'email' | 'link';
    contact: string;
  };
  location: {
    region: string;
    city: string;
  };
  workArrangement: string;
  likes?: string[];
  isActive?: boolean;
  createdAt?: string;
  expiresAt?: string | null;
};

export type TListingsArray = TListing[];

export type TPaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

export type TJobseekerProfile = {
  firstName: string;
  lastName: string;
  highestEducation:
    | 'High School'
    | 'Associate Degree'
    | "Bachelor's Degree"
    | "Master's Degree"
    | 'Doctorate'
    | 'Other';
  preferredWorkArrangement: string;
  linkedinPage?: string;
  resume?: string;
  skills?: string[];
  description?: string;
  _id?: string;
};

export type TBusinessProfile = {
  companyName: string;
  location: {
    country: string;
    region: string;
    city: string;
    _id?: string;
  };
  logo?: {
    url?: string;
    alt?: string;
    _id?: string;
  };
  industry: string;
  numberOfEmployees: '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
  website?: string;
  contactEmail?: string;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    _id?: string;
  };
  description?: string;
  _id?: string;
};

export type TUsers = {
  _id: string;
  email: string;
  password?: string;
  phone: string;
  profileType: 'jobseeker' | 'business';
  name?: {
    first: string;
    middle?: string;
    last: string;
    _id?: string;
  };
  address?: {
    country: string;
    state?: string;
    city: string;
    street: string;
    houseNumber: number | string;
    zip: number | string;
    _id?: string;
  };
  jobseekerProfile?: TJobseekerProfile;
  businessProfile?: TBusinessProfile;
  isAdmin: boolean;
  isBusiness?: boolean;
  createdAt: string;
};

export interface TdecodedToken {
  iat: number;
  exp: number;
  isAdmin: boolean;
  profileType: 'jobseeker' | 'business';
  _id: string;
}

export type TApplication = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  applicantId: string;
  listingId: TListing | string;
  resumeUrl?: string;
  message?: string;
  createdAt: string;
  status: 'pending' | 'reviewed' | 'rejected';
};

export type TDashboardMetrics = {
  metrics: {
    totalListings: number;
    totalApplications: number;
    pendingApplications: number;
    reviewedApplications: number;
    rejectedApplications: number;
  }
}
