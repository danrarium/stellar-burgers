<<<<<<< Updated upstream
import { useSelector, type RootState } from '../../services/store';
=======
import { useSelector } from '../../services/store';
import { selectIngredientsLoading } from '../../services/slices/ingredientsSlice';
>>>>>>> Stashed changes

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
<<<<<<< Updated upstream
  const isIngredientsLoading = useSelector(
    (state: RootState) => state.ingredients.isLoading
  );
=======
  const isIngredientsLoading = useSelector(selectIngredientsLoading);
>>>>>>> Stashed changes

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
