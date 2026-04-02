<<<<<<< Updated upstream
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TConstructorIngredient, TOrder } from '@utils-types';

interface IBun {
  price: number;
}

interface IConstructorState {
=======
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';
import { v4 as uuidv4 } from 'uuid';

interface ConstructorState {
>>>>>>> Stashed changes
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

<<<<<<< Updated upstream
const initialState: IConstructorState = {
=======
const initialState: ConstructorState = {
>>>>>>> Stashed changes
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

<<<<<<< Updated upstream
=======
export const orderBurger = createAsyncThunk(
  'constructor/orderBurger',
  orderBurgerApi
);

>>>>>>> Stashed changes
const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
<<<<<<< Updated upstream
    addBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const [movedItem] = state.ingredients.splice(action.payload.from, 1);
      state.ingredients.splice(action.payload.to, 0, movedItem);
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderModalData = action.payload;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
=======
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
    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
      state.orderRequest = false;
>>>>>>> Stashed changes
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
<<<<<<< Updated upstream
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
        state.bun = null;
        state.ingredients = [];
      })
      .addCase(createOrder.rejected, (state) => {
=======
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(orderBurger.rejected, (state) => {
>>>>>>> Stashed changes
        state.orderRequest = false;
      });
  }
});

<<<<<<< Updated upstream
export const createOrder = createAsyncThunk(
  'constructor/createOrder',
  async (ids: string[], { rejectWithValue }) => {
    try {
      const data = await orderBurgerApi(ids);
      // orderBurgerApi returns { success, order, name }
      return data.order;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return rejectWithValue(message);
    }
  }
);

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  setOrderRequest,
  setOrderModalData,
  clearConstructor
} = constructorSlice.actions;

=======
export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
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

>>>>>>> Stashed changes
export default constructorSlice.reducer;
