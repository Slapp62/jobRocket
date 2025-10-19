import { TCards } from "@/Types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCardsThunk = createAsyncThunk('card/fetchCards', async () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  
  const response = await axios.get(`${API_BASE_URL}/api/cards/`);  
  return response.data;
})

type CardState = {
    cards: TCards[];
    userCards: TCards[];
    loading: boolean;
    error: string | null;
    sortOption: string;
}
const initialState:CardState = {
    cards: [],
    userCards: [],
    loading: false,
    error: null,
    sortOption: '',
}

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        addCard: (state, action:PayloadAction<TCards>) => {
            if (state.cards){
              state.cards.push(action.payload);
            }
        },
        editCard: (state, action:PayloadAction<{card:TCards}>) => {
            const updatedCard = action.payload.card;
            
            if (state.cards) {
                const index = state.cards?.findIndex((reduxCard) => reduxCard._id === updatedCard._id);
                    if (index !== -1){
                        state.cards[index] = updatedCard;
                    }
            }
        },
        removeCard: (state, action:PayloadAction<TCards>) => {
            if (state.cards){
                state.cards = state.cards?.filter((card) => 
                    card._id !== action.payload._id)
            }
        },
        addUserCards: (state, action:PayloadAction<TCards[]>) => {
          state.userCards = action.payload;
        },
        removeUserCard: (state, action:PayloadAction<TCards>) => {
          state.userCards = state.userCards?.filter((card) => 
            card._id !== action.payload._id)
        },
        addLike: (state, action:PayloadAction<{card:TCards; userID:string}>) => {
            const {card, userID} = action.payload;
            if (!state.cards) {return}
            
            const cardIndex = state.cards.findIndex((reduxCard) => reduxCard._id === card._id);
            if (cardIndex !== -1) {
                const currentCard = state.cards[cardIndex];
            
                if (!currentCard.likes?.includes(userID)) {
                    state.cards[cardIndex] = {
                        ...currentCard, 
                        likes: [...(currentCard.likes || []), userID]
                    }
                }
            }          
        },
        removeLike: (state, action:PayloadAction<{card:TCards; userID:string}>) => {
            const {card, userID} = action.payload;
            if (!state.cards) {return}

            const cardIndex = state.cards.findIndex((reduxCard) => reduxCard._id === card._id);
            if (cardIndex !== -1) {
                const currentCard = state.cards[cardIndex];
                const currentLikes = currentCard.likes || [];
                if (currentCard.likes?.includes(userID)) {
                    state.cards[cardIndex] = {
                        ...currentCard!, 
                        likes: currentLikes.filter((like) => like !== userID)
                    }
                }
            }          
        },
        setSortOption: (state, action:PayloadAction<string>) => {
            state.sortOption = action.payload   
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCardsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCardsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.cards = action.payload;
        });
        builder.addCase(fetchCardsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch cards';
        });
    },
});

export const {addCard, addUserCards, editCard, removeCard, addLike, removeLike, setSortOption, removeUserCard} = cardSlice.actions;
export default cardSlice.reducer;