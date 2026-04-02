import { FC } from 'react';
import { useParams } from 'react-router-dom';
<<<<<<< Updated upstream
import { useSelector, type RootState } from '../../services/store';
=======
>>>>>>> Stashed changes
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
<<<<<<< Updated upstream
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.items
  );
  const ingredientData = ingredients.find((ing) => ing._id === id);
=======
  const ingredients = useSelector(selectIngredients);
  const ingredientData = ingredients.find((i) => i._id === id) || null;
>>>>>>> Stashed changes

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
