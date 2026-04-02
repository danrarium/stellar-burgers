import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
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

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(wsDisconnectFeed());
    dispatch(wsConnectFeed(WS_FEED_URL));
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
