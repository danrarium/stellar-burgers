import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, type RootState } from '../../services/store';
import { OrderDetailsUI } from '../ui/order-details';
import { Preloader } from '../ui/preloader';

export const OrderDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const feedOrders = useSelector((state: RootState) => state.feed.orders);
  const userOrders = useSelector((state: RootState) => state.orders.orders);

  // Look for order in both feed and user orders
  const order = [...feedOrders, ...userOrders].find(
    (order) => order.number.toString() === id
  );

  if (!order) {
    return <Preloader />;
  }

  return <OrderDetailsUI orderNumber={order.number} />;
};
