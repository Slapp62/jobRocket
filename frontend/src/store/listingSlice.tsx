import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TListing } from '@/Types';

export const fetchListingsThunk = createAsyncThunk('listing/fetchListings', async () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const response = await axios.get(`${API_BASE_URL}/api/listings/`);
  return response.data;
});

type ListingState = {
  listings: TListing[];
  userListings: TListing[];
  loading: boolean;
  error: string | null;
};
const initialState: ListingState = {
  listings: [],
  userListings: [],
  loading: false,
  error: null,
};

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    addListing: (state, action: PayloadAction<TListing>) => {
      if (state.listings) {
        state.listings.push(action.payload);
      }
    },
    editListing: (state, action: PayloadAction<{ listing: TListing }>) => {
      const updatedListing = action.payload.listing;

      if (state.listings) {
        const index = state.listings?.findIndex(
          (reduxListing) => reduxListing._id === updatedListing._id
        );
        if (index !== -1) {
          state.listings[index] = updatedListing;
        }
      }
    },
    removeListing: (state, action: PayloadAction<TListing>) => {
      if (state.listings) {
        state.listings = state.listings?.filter((listing) => listing._id !== action.payload._id);
      }
    },
    addUserListings: (state, action: PayloadAction<TListing[]>) => {
      state.userListings = action.payload;
    },
    removeUserListing: (state, action: PayloadAction<TListing>) => {
      state.userListings = state.userListings?.filter(
        (listing) => listing._id !== action.payload._id
      );
    },
    addLike: (state, action: PayloadAction<{ listing: TListing; userID: string }>) => {
      const { listing, userID } = action.payload;
      if (!state.listings) {
        return;
      }

      const listingIndex = state.listings.findIndex(
        (reduxListing) => reduxListing._id === listing._id
      );
      if (listingIndex !== -1) {
        const currentListing = state.listings[listingIndex];

        if (!currentListing.likes?.includes(userID)) {
          state.listings[listingIndex] = {
            ...currentListing,
            likes: [...(currentListing.likes || []), userID],
          };
        }
      }
    },
    removeLike: (state, action: PayloadAction<{ listing: TListing; userID: string }>) => {
      const { listing, userID } = action.payload;
      if (!state.listings) {
        return;
      }

      const listingIndex = state.listings.findIndex(
        (reduxListing) => reduxListing._id === listing._id
      );
      if (listingIndex !== -1) {
        const currentListing = state.listings[listingIndex];
        const currentLikes = currentListing.likes || [];
        if (currentListing.likes?.includes(userID)) {
          state.listings[listingIndex] = {
            ...currentListing!,
            likes: currentLikes.filter((like) => like !== userID),
          };
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListingsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchListingsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.listings = action.payload;
    });
    builder.addCase(fetchListingsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch listings';
    });
  },
});

export const {
  addListing,
  addUserListings,
  editListing,
  removeListing,
  addLike,
  removeLike,
  removeUserListing,
} = listingSlice.actions;
export default listingSlice.reducer;
