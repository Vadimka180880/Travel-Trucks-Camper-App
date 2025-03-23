import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронний Thunk для завантаження кемперів
export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async (page = 1, { getState }) => {
    const { filters, vehicleType } = getState().campers;
    const limit = 4;

    const params = {
      page,
      limit,
      ...filters,
      form: vehicleType || undefined,
    };

    Object.keys(params).forEach((key) => {
      if (params[key] === false) delete params[key];
    });

    const response = await axios.get('https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers', {
      params,
    });
    return response.data;
  }
);

// Початковий стан
const initialState = {
  items: [],
  status: 'idle',
  page: 1,
  hasMore: true,
  filters: JSON.parse(localStorage.getItem('filters')) || {
    AC: false,
    kitchen: false,
    bathroom: false,
    TV: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  },
  vehicleType: JSON.parse(localStorage.getItem('vehicleType')) || '',
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

// Створення slice
const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      localStorage.setItem('filters', JSON.stringify(state.filters));
    },
    setVehicleType: (state, action) => {
      state.vehicleType = action.payload;
      localStorage.setItem('vehicleType', JSON.stringify(state.vehicleType));
    },
    addToFavorites: (state, action) => {
      const camper = action.payload;
      if (!state.favorites.some((fav) => fav.id === camper.id)) {
        state.favorites.push(camper);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action) => {
      const camperId = action.payload;
      state.favorites = state.favorites.filter((fav) => fav.id !== camperId);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload && Array.isArray(action.payload.items)) {
          state.items = [...state.items, ...action.payload.items];
          state.page += 1;
          state.hasMore = action.payload.items.length > 0;
        } else {
          console.error('Invalid API response:', action.payload);
          state.status = 'failed';
        }
      })
      .addCase(fetchCampers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setFilters, setVehicleType, addToFavorites, removeFromFavorites } =
  campersSlice.actions;

export default campersSlice.reducer;