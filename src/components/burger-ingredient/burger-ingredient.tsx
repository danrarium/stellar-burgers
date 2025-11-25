import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import {
  addIngredient as addIngredientAction,
  addBun as addBunAction
} from '../../services/slices/constructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const makeConstructorId = () =>
      `${ingredient._id}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const handleAdd = () => {
      // Create a constructor-specific id so identical ingredients can be added multiple times
      const constructorItem = { ...ingredient, id: makeConstructorId() };

      if (ingredient.type === 'bun') {
        dispatch(addBunAction(constructorItem));
      } else {
        dispatch(addIngredientAction(constructorItem));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
