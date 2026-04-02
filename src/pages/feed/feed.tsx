import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
<<<<<<< Updated upstream
import { useDispatch, useSelector, type RootState } from '../../services/store';
import { getFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.feed.orders);
  const isLoading = useSelector((state: RootState) => state.feed.isLoading);
=======
import { useDispatch, useSelector } from '../../services/store';
import { selectFeedOrders } from '../../services/slices/feedSlice';
import {
  wsConnectFeed,
  wsDisconnectFeed
} from '../../services/slices/feedSlice';

const WS_FEED_URL = 'wss://norma.education-services.ru/orders/all';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);

  useEffect(() => {
    dispatch(wsConnectFeed(WS_FEED_URL));
    return () => {
      dispatch(wsDisconnectFeed());
    };
  }, [dispatch]);
>>>>>>> Stashed changes

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

<<<<<<< Updated upstream
  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeed())} />;
=======
  const handleGetFeeds = () => {
    dispatch(wsDisconnectFeed());
    dispatch(wsConnectFeed(WS_FEED_URL));
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
>>>>>>> Stashed changes
};
