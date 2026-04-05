import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';
import { v4 as uuidv4 } from 'uuid';

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

export const orderBurger = createAsyncThunk(
  'constructor/orderBurger',
  orderBurgerApi
);

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, id: uuidv4() } };
      }
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.ingredients.splice(action.payload, 1);
    },
    moveIngredient(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      const [item] = state.ingredients.splice(from, 1);
      state.ingredients.splice(to, 0, item);
    },
    closeOrderModal(state) {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.bun = null;
        state.ingredients = [];
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  closeOrderModal
} = constructorSlice.actions;

export const selectConstructorItems = (state: {
  constructorBurger: ConstructorState;
}) => state.constructorBurger;
export const selectOrderRequest = (state: {
  constructorBurger: ConstructorState;
}) => state.constructorBurger.orderRequest;
export const selectOrderModalData = (state: {
  constructorBurger: ConstructorState;
}) => state.constructorBurger.orderModalData;

export default constructorSlice.reducer;
