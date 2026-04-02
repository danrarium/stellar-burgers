import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getOrdersApi, getOrderByNumberApi } from '@api';

interface OrdersState {
  orders: TOrder[];
  orderByNumber: TOrder | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  orderByNumber: null,
  isLoading: false,
  error: null
};

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

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  }
});

export const selectUserOrders = (state: { orders: OrdersState }) =>
  state.orders.orders;
export const selectOrderByNumber = (state: { orders: OrdersState }) =>
  state.orders.orderByNumber;

export default ordersSlice.reducer;
