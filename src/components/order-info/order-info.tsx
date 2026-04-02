<<<<<<< Updated upstream
import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, type RootState } from '../../services/store';
=======
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
>>>>>>> Stashed changes
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { selectFeedOrders } from '../../services/slices/feedSlice';
import {
  selectUserOrders,
  selectOrderByNumber,
  fetchOrderByNumber
} from '../../services/slices/ordersSlice';

export const OrderInfo: FC = () => {
<<<<<<< Updated upstream
  const { id } = useParams<{ id: string }>();
  const feedOrders = useSelector((state: RootState) => state.feed.orders);
  const userOrders = useSelector((state: RootState) => state.orders.items);
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.items
  );

  const orderData = [...feedOrders, ...userOrders].find(
    (order) => order.number.toString() === id
  );
=======
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredients);
  const feedOrders = useSelector(selectFeedOrders);
  const userOrders = useSelector(selectUserOrders);
  const orderByNumber = useSelector(selectOrderByNumber);

  const orderData = useMemo(() => {
    if (!number) return null;
    const orderNum = Number(number);
    return (
      feedOrders.find((o) => o.number === orderNum) ||
      userOrders.find((o) => o.number === orderNum) ||
      orderByNumber ||
      null
    );
  }, [number, feedOrders, userOrders, orderByNumber]);

  useEffect(() => {
    if (!orderData && number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [number, orderData, dispatch]);
>>>>>>> Stashed changes

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
