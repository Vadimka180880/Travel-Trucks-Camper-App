import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронний Thunk для завантаження кемперів
export const fetchCampers = createAsyncThunk(
  'campers/fetchCampers',
  async (page = 1, { getState }) => {
    const { filters, vehicleType } = getState().campers; // Отримуємо поточні фільтри та тип авто
    const limit = 4; // Кількість кемперів на сторінку

    // Параметри запиту для фільтрації
    const params = {
      page,
      limit,
      ...filters,
      form: vehicleType || undefined, // Додаємо тип авто, якщо він вибраний
    };

    // Видаляємо параметри зі значенням `false`
    Object.keys(params).forEach((key) => {
      if (params[key] === false) delete params[key];
    });

    console.log('Fetching campers with params:', params); // Логування для налагодження

    try {
      const response = await axios.get('https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers', {
        params,
      });
      console.log('API response:', response.data); // Логування для налагодження
      return response.data; // Повертаємо весь об'єкт відповіді
    } catch (error) {
      console.error('Error fetching campers:', error); // Логування для налагодження
      throw error;
    }
  }
);

// Початковий стан
const initialState = {
  items: [], // Список кемперів
  status: 'idle', // Стан завантаження: 'idle', 'loading', 'succeeded', 'failed'
  page: 1, // Поточна сторінка
  hasMore: true, // Чи є ще кемпери для завантаження
  filters: {
    // Початкові значення фільтрів
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
  vehicleType: '', // Тип авто (Van, Fully Integrated, Alcove)
  favorites: [], // Список улюблених кемперів
};

// Створення slice
const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    // Оновлення фільтрів
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1; // Скидаємо сторінку при зміні фільтрів
      state.items = []; // Скидаємо список кемперів
    },
    // Оновлення типу авто
    setVehicleType: (state, action) => {
      state.vehicleType = action.payload;
      state.page = 1; // Скидаємо сторінку при зміні типу авто
      state.items = []; // Скидаємо список кемперів
    },
    // Додавання кемпера до улюблених
    addToFavorites: (state, action) => {
      const camper = action.payload;
      if (!state.favorites.some((fav) => fav.id === camper.id)) {
        state.favorites.push(camper);
      }
    },
    // Видалення кемпера з улюблених
    removeFromFavorites: (state, action) => {
      const camperId = action.payload;
      state.favorites = state.favorites.filter((fav) => fav.id !== camperId);
    },
  },
  extraReducers: (builder) => {
    builder
      // Обробка стану "loading"
      .addCase(fetchCampers.pending, (state) => {
        state.status = 'loading';
      })
      // Обробка стану "succeeded"
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload && Array.isArray(action.payload.items)) {
          state.items = [...state.items, ...action.payload.items]; // Використовуємо action.payload.items
          state.page += 1; // Збільшуємо номер сторінки
          state.hasMore = action.payload.items.length > 0; // Визначаємо, чи є ще кемпери для завантаження
        } else {
          console.error('Invalid API response:', action.payload);
          state.status = 'failed';
        }
      })
      // Обробка стану "failed"
      .addCase(fetchCampers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// Експорт дій
export const { setFilters, setVehicleType, addToFavorites, removeFromFavorites } =
  campersSlice.actions;

// Експорт редюсера
export default campersSlice.reducer;