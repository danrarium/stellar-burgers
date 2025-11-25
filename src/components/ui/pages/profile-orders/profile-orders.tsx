import { FC } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import styles from './profile-orders.module.css';

import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList, Modal, OrderDetails } from '@components';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const background = (location.state as { background?: Location })?.background;

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <>
      <main className={`${styles.main}`}>
        <div className={`mt-30 mr-15 ${styles.menu}`}>
          <ProfileMenu />
        </div>
        <div className={`mt-10 ${styles.orders}`}>
          <OrdersList orders={orders} />
        </div>
      </main>
      {id &&
        (background ? (
          <Modal title='Детали заказа' onClose={handleCloseModal}>
            <OrderDetails />
          </Modal>
        ) : (
          // Direct navigation to /profile/orders/:id — show order details as a page
          <main className={styles.main}>
            <OrderDetails />
          </main>
        ))}
    </>
  );
};
