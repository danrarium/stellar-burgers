<<<<<<< Updated upstream
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const getFeed = createAsyncThunk(
  'feed/getFeed',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return rejectWithValue(message);
    }
  }
);

interface IFeedState {
=======
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

interface FeedState {
>>>>>>> Stashed changes
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
}

<<<<<<< Updated upstream
const initialState: IFeedState = {
=======
const initialState: FeedState = {
>>>>>>> Stashed changes
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

<<<<<<< Updated upstream
=======
export const fetchFeeds = createAsyncThunk('feed/fetchAll', getFeedsApi);

export const wsConnectFeed = createAction<string>('feed/wsConnect');
export const wsDisconnectFeed = createAction('feed/wsDisconnect');
export const wsOpenFeed = createAction('feed/wsOpen');
export const wsCloseFeed = createAction('feed/wsClose');
export const wsErrorFeed = createAction<string>('feed/wsError');
export const wsMessageFeed = createAction<TOrdersData>('feed/wsMessage');

>>>>>>> Stashed changes
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
<<<<<<< Updated upstream
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
=======
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
>>>>>>> Stashed changes
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
<<<<<<< Updated upstream
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = String(action.payload) || 'Ошибка при загрузке ленты';
=======
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
>>>>>>> Stashed changes
      });
  }
});

<<<<<<< Updated upstream
=======
export const selectFeedOrders = (state: { feed: FeedState }) =>
  state.feed.orders;
export const selectFeedData = (state: { feed: FeedState }) => ({
  orders: state.feed.orders,
  total: state.feed.total,
  totalToday: state.feed.totalToday
});

>>>>>>> Stashed changes
export default feedSlice.reducer;
