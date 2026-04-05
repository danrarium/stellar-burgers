import { FC } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import styles from './constructor-page.module.css';

import { ConstructorPageUIProps } from './type';
import { Preloader } from '@ui';
import {
  Modal,
  IngredientDetails,
  BurgerIngredients,
  BurgerConstructor
} from '@components';

export const ConstructorPageUI: FC<ConstructorPageUIProps> = ({
  isIngredientsLoading
}) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const background = (location.state as { background?: Location })?.background;

  const handleCloseModal = () => {
    navigate(-1);
  };

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
      {id && background && (
        <Modal title='Детали ингредиента' onClose={handleCloseModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};
