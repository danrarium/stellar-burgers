<<<<<<< Updated upstream
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIngredientsApi();
      return data;
    } catch (error) {
      // Ensure we return a serializable value (string) to avoid
      // non-serializable action payload warnings from redux-toolkit
      const message = error instanceof Error ? error.message : String(error);
      return rejectWithValue(message);
    }
  }
);

interface IIngredientsState {
=======
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

interface IngredientsState {
>>>>>>> Stashed changes
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

<<<<<<< Updated upstream
const initialState: IIngredientsState = {
=======
const initialState: IngredientsState = {
>>>>>>> Stashed changes
  items: [],
  isLoading: false,
  error: null
};

<<<<<<< Updated upstream
=======
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  getIngredientsApi
);

>>>>>>> Stashed changes
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
<<<<<<< Updated upstream
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          String(action.payload) || 'Ошибка при загрузке ингредиентов';
=======
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch ingredients';
>>>>>>> Stashed changes
      });
  }
});

<<<<<<< Updated upstream
=======
export const selectIngredients = (state: { ingredients: IngredientsState }) =>
  state.ingredients.items;
export const selectIngredientsLoading = (state: {
  ingredients: IngredientsState;
}) => state.ingredients.isLoading;

>>>>>>> Stashed changes
export default ingredientsSlice.reducer;
