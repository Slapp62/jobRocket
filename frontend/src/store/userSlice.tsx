import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUsers } from '@/Types';

interface UserState {
  user: TUsers | null;
  allUsers: TUsers[] | null;
  isLoggedIn: boolean;
  isAdminView: boolean;
}

const initialState: UserState = {
  user: null as TUsers | null,
  allUsers: null as TUsers[] | null,
  isLoggedIn: false,
  isAdminView: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUsers>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setAllUsers(state, action: PayloadAction<TUsers[]>) {
      state.allUsers = action.payload;
    },
    updateUser(state, action: PayloadAction<TUsers>) {
      if (state.allUsers) {
        const index = state.allUsers.findIndex((user) => user._id === action.payload._id);
        if (index !== -1) {
          state.allUsers[index] = action.payload;
        }
      }
    },
    clearUser() {
      // Return to complete initial state to prevent data from previous user persisting
      // This fixes race condition where old user data could briefly appear after re-login
      return initialState;
    },
    removeUser(state, action: PayloadAction<string>) {
      if (state.allUsers) {
        state.allUsers = state.allUsers?.filter((user) => user._id !== action.payload);
      }
    },
    toggleAdminView(state, action: PayloadAction<boolean>) {
      state.isAdminView = action.payload;
    },
  },
});

export const { setUser, setAllUsers, updateUser, clearUser, removeUser, toggleAdminView } =
  userSlice.actions;
export default userSlice.reducer;
