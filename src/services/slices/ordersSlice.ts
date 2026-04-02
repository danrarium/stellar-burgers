<<<<<<< Updated upstream
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getOrdersApi();
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return rejectWithValue(message);
    }
  }
);

interface IOrdersState {
  items: TOrder[];
=======
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getOrdersApi, getOrderByNumberApi } from '@api';

interface OrdersState {
  orders: TOrder[];
  orderByNumber: TOrder | null;
>>>>>>> Stashed changes
  isLoading: boolean;
  error: string | null;
}

<<<<<<< Updated upstream
const initialState: IOrdersState = {
  items: [],
=======
const initialState: OrdersState = {
  orders: [],
  orderByNumber: null,
>>>>>>> Stashed changes
  isLoading: false,
  error: null
};

<<<<<<< Updated upstream
=======
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  getOrdersApi
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

export const wsConnectOrders = createAction<string>('orders/wsConnect');
export const wsDisconnectOrders = createAction('orders/wsDisconnect');
export const wsOpenOrders = createAction('orders/wsOpen');
export const wsCloseOrders = createAction('orders/wsClose');
export const wsErrorOrders = createAction<string>('orders/wsError');
export const wsMessageOrders = createAction<TOrdersData>('orders/wsMessage');

>>>>>>> Stashed changes
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
<<<<<<< Updated upstream
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          String(action.payload) || 'Ошибка при загрузке истории заказов';
=======
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.orderByNumber = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderByNumber = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch order';
      })
      .addCase(wsMessageOrders, (state, action) => {
        state.orders = action.payload.orders;
        state.isLoading = false;
      })
      .addCase(wsErrorOrders, (state, action) => {
        state.error = action.payload;
>>>>>>> Stashed changes
      });
  }
});

<<<<<<< Updated upstream
=======
export const selectUserOrders = (state: { orders: OrdersState }) =>
  state.orders.orders;
export const selectOrderByNumber = (state: { orders: OrdersState }) =>
  state.orders.orderByNumber;

>>>>>>> Stashed changes
export default ordersSlice.reducer;
