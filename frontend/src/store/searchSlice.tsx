import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchWord: '',
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchWord: (state, action) => {
            state.searchWord = action.payload;
        },
    },
});

export const {setSearchWord} = searchSlice.actions;
export default searchSlice.reducer;