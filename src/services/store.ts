import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/constructorSlice';
import feedReducer from './slices/feedSlice';
import ordersReducer from './slices/ordersSlice';
import userReducer from './slices/userSlice';

import { createSocketMiddleware } from './middleware/socketMiddleware';
import {
  wsConnectFeed,
  wsDisconnectFeed,
  wsOpenFeed,
  wsCloseFeed,
  wsMessageFeed,
  wsErrorFeed
} from './slices/feedSlice';
import {
  wsConnectOrders,
  wsDisconnectOrders,
  wsOpenOrders,
  wsCloseOrders,
  wsMessageOrders,
  wsErrorOrders
} from './slices/ordersSlice';

const feedSocketMiddleware = createSocketMiddleware({
  connect: wsConnectFeed.type,
  disconnect: wsDisconnectFeed.type,
  onOpen: wsOpenFeed.type,
  onClose: wsCloseFeed.type,
  onMessage: wsMessageFeed.type,
  onError: wsErrorFeed.type
});

const ordersSocketMiddleware = createSocketMiddleware({
  connect: wsConnectOrders.type,
  disconnect: wsDisconnectOrders.type,
  onOpen: wsOpenOrders.type,
  onClose: wsCloseOrders.type,
  onMessage: wsMessageOrders.type,
  onError: wsErrorOrders.type
});

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBurger: constructorReducer,
  feed: feedReducer,
  orders: ordersReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedSocketMiddleware, ordersSocketMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
