import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
<<<<<<< Updated upstream
import { useDispatch, useSelector, type RootState } from '../../services/store';
import { getOrders } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.items);

  useEffect(() => {
    dispatch(getOrders());
=======
import { useDispatch, useSelector } from '../../services/store';
import { selectUserOrders } from '../../services/slices/ordersSlice';
import {
  wsConnectOrders,
  wsDisconnectOrders
} from '../../services/slices/ordersSlice';
import { getCookie } from '../../utils/cookie';

const WS_ORDERS_URL = 'wss://norma.education-services.ru/orders';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    const rawToken = getCookie('accessToken');
    const token = rawToken?.replace('Bearer ', '') ?? '';
    dispatch(wsConnectOrders(`${WS_ORDERS_URL}?token=${token}`));
    return () => {
      dispatch(wsDisconnectOrders());
    };
>>>>>>> Stashed changes
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
