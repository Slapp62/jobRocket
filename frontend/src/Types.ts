
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

export type TUsers = {
  _id: string;
  name: {
    first: string;
    middle?: string;
    last: string;
    _id: string;
  };
  phone: string;
  email: string;
  password: string;
  image?: {
    url?: string;
    alt?: string;
    _id?: string;
  };
  address: {
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string | number;
    zip: string | number;
    _id: string;
  };
  isAdmin: boolean;
  isBusiness: boolean;
  createdAt: string;
};

export interface TdecodedToken{
  iat: number;
  isAdmin: boolean;
  isBusiness: boolean;
  _id: string;
}