import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk('feed/fetchAll', getFeedsApi);

export const wsConnectFeed = createAction<string>('feed/wsConnect');
export const wsDisconnectFeed = createAction('feed/wsDisconnect');
export const wsOpenFeed = createAction('feed/wsOpen');
export const wsCloseFeed = createAction('feed/wsClose');
export const wsErrorFeed = createAction<string>('feed/wsError');
export const wsMessageFeed = createAction<TOrdersData>('feed/wsMessage');

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch feeds';
      })
      .addCase(wsMessageFeed, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(wsErrorFeed, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const selectFeedOrders = (state: { feed: FeedState }) =>
  state.feed.orders;
export const selectFeedData = (state: { feed: FeedState }) => ({
  orders: state.feed.orders,
  total: state.feed.total,
  totalToday: state.feed.totalToday
});

export default feedSlice.reducer;
