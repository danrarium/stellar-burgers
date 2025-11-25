import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch, useSelector, type RootState } from '../../services/store';
import {
  setOrderModalData,
  createOrder
} from '../../services/slices/constructorSlice';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bun = useSelector((state: RootState) => state.burgerConstructor.bun);
  const ingredients = useSelector(
    (state: RootState) => state.burgerConstructor.ingredients
  );
  const constructorItems = useMemo(
    () => ({ bun, ingredients: ingredients ?? [] }),
    [bun, ingredients]
  );
  const orderRequest = useSelector(
    (state: RootState) => state.burgerConstructor.orderRequest
  );
  const orderModalData = useSelector(
    (state: RootState) => state.burgerConstructor.orderModalData
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const ids: string[] = [];
    if (bun?._id) ids.push(bun._id);
    ids.push(...(ingredients ?? []).map((i: TConstructorIngredient) => i._id));
    if (bun?._id) ids.push(bun._id);

    dispatch(createOrder(ids));
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
  };

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = (ingredients ?? []).reduce(
      (s: number, v: TConstructorIngredient) => s + v.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
