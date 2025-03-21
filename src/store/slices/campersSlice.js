import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCampers = createAsyncThunk('campers/fetchCampers', async () => {
  const response = await axios.get('https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers');
  return response.data.items;
});

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    favorites: [], 
    status: 'idle',
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      const camper = action.payload;
      if (!state.favorites.some((fav) => fav.id === camper.id)) {
        state.favorites.push(camper);
      }
    },
    removeFromFavorites: (state, action) => {
      const camperId = action.payload;
      state.favorites = state.favorites.filter((fav) => fav.id !== camperId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = campersSlice.actions;
export default campersSlice.reducer;