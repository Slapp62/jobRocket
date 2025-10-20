
export type TCards = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: {
    url: string;
    alt: string;
    _id: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number | string;
    zip: number | string;
    _id: string;
  };
  bizNumber?: number;
  likes?: string[];
  user_id?: string;
  createdAt?: string; 
  __v?: number;
};

export type TCardsArray = TCards[];

export type TPaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

export type TJobseekerProfile = {
  firstName: string;
  lastName: string;
  highestEducation: "High School" | "Associate Degree" | "Bachelor's Degree" | "Master's Degree" | "Doctorate" | "Other";
  preferredWorkArrangement: string;
  linkedinPage?: string;
  resume?: string;
  skills?: string[];
  description?: string;
  _id?: string;
};

export type TBusinessProfile = {
  name: string;
  location: {
    country: string;
    city: string;
    _id?: string;
  };
  logo?: {
    url?: string;
    alt?: string;
    _id?: string;
  };
  industry: string;
  numberOfEmployees: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+";
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
  profileType: "jobseeker" | "business";
  jobseekerProfile?: TJobseekerProfile;
  businessProfile?: TBusinessProfile;
  isAdmin: boolean;
  createdAt: string;
};

export interface TdecodedToken{
  iat: number;
  exp: number;
  isAdmin: boolean;
  profileType: "jobseeker" | "business";
  _id: string;
}