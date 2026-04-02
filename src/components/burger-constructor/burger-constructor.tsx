import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch, useSelector, type RootState } from '../../services/store';
import {
  setOrderModalData,
  createOrder
} from '../../services/slices/constructorSlice';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData,
  orderBurger,
  resetConstructor
} from '../../services/slices/constructorSlice';
import { selectIsAuthenticated } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

<<<<<<< Updated upstream
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

=======
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
>>>>>>> Stashed changes
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
<<<<<<< Updated upstream

    const ids: string[] = [];
    if (bun?._id) ids.push(bun._id);
    ids.push(...(ingredients ?? []).map((i: TConstructorIngredient) => i._id));
    if (bun?._id) ids.push(bun._id);

    dispatch(createOrder(ids));
=======
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ];
    dispatch(orderBurger(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(resetConstructor());
>>>>>>> Stashed changes
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
  };

<<<<<<< Updated upstream
  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = (ingredients ?? []).reduce(
      (s: number, v: TConstructorIngredient) => s + v.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

=======
>>>>>>> Stashed changes
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
