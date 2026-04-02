import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
<<<<<<< Updated upstream
  removeIngredient as removeIngredientAction,
  moveIngredient as moveIngredientAction
=======
  moveIngredient,
  removeIngredient
>>>>>>> Stashed changes
} from '../../services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
<<<<<<< Updated upstream
      if (index < totalItems - 1) {
        dispatch(moveIngredientAction({ from: index, to: index + 1 }));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(moveIngredientAction({ from: index, to: index - 1 }));
      }
    };

    const handleClose = () => {
      dispatch(removeIngredientAction(ingredient.id));
=======
      dispatch(moveIngredient({ from: index, to: index + 1 }));
    };

    const handleMoveUp = () => {
      dispatch(moveIngredient({ from: index, to: index - 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(index));
>>>>>>> Stashed changes
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
