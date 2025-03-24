import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  status: 'idle',
  error: null,
  filters: {},
  vehicleType: '',
  hasMore: true,
  page: 1,
};

export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async (page) => {
    const response = await axios.get(
      `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?page=${page}&limit=4`
    );
    return response.data; 
  }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setVehicleType(state, action) {
      state.vehicleType = action.payload;
    },
    resetCampers(state) {
      state.items = [];
      state.hasMore = true;
      state.page = 1;
    },
    toggleFavorite(state, action) {
      const camperId = action.payload;
      const existing = state.favorites.find(fav => fav.id === camperId);

      if (existing) {
        state.favorites = state.favorites.filter(fav => fav.id !== camperId);
        toast.info('Removed from favorites');
      } else {
        const camperToAdd = state.items.find(c => c.id === camperId);
        if (camperToAdd) {
          state.favorites.push(camperToAdd);
          toast.success('Added to favorites');
        }
      }

      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    nextPage(state) {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const campersArray = action.payload.items;

        if (Array.isArray(campersArray)) {
          state.items = [...state.items, ...campersArray];
          if (campersArray.length < 4) {
            state.hasMore = false;
          }
        } else {
          state.error = 'Unexpected data format from server';
          state.hasMore = false;
        }
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setFilters,
  setVehicleType,
  resetCampers,
  toggleFavorite,
  nextPage,
} = campersSlice.actions;

export default campersSlice.reducer;
