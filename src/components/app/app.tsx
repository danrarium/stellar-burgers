import { useEffect } from 'react';
<<<<<<< Updated upstream
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
=======
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { AppHeader } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { Modal } from '@components';
import { IngredientDetails } from '@components';
import { OrderInfo } from '@components';

>>>>>>> Stashed changes
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
<<<<<<< Updated upstream
import { ProtectedRoute, GuestRoute } from '@components';
import { useDispatch, useSelector, type RootState } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { getUser } from '../../services/slices/userSlice';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Modal, IngredientDetails, OrderDetails } from '@components';

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  useEffect(() => {
    // Загрузить ингредиенты при инициализации
    dispatch(getIngredients());

    // Проверить, есть ли токен и загрузить данные пользователя
    const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1];

    if (accessToken) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <AppRoutes isAuthenticated={isAuthenticated} />
    </Router>
  );
};

const AppRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = (location.state as { background?: Location })?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        {/* Публичные маршруты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:id' element={<Feed />} />
        <Route path='/ingredients/:id' element={<ConstructorPage />} />

        {/* Гостевые маршруты (доступны только без авторизации) */}
        <Route
          path='/login'
          element={
            <GuestRoute isAuthenticated={isAuthenticated}>
              <Login />
            </GuestRoute>
=======

import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { checkUserAuth } from '../../services/slices/userSlice';

import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
>>>>>>> Stashed changes
          }
        />
        <Route
          path='/register'
          element={
<<<<<<< Updated upstream
            <GuestRoute isAuthenticated={isAuthenticated}>
              <Register />
            </GuestRoute>
=======
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
>>>>>>> Stashed changes
          }
        />
        <Route
          path='/forgot-password'
          element={
<<<<<<< Updated upstream
            <GuestRoute isAuthenticated={isAuthenticated}>
              <ForgotPassword />
            </GuestRoute>
=======
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
>>>>>>> Stashed changes
          }
        />
        <Route
          path='/reset-password'
          element={
<<<<<<< Updated upstream
            <GuestRoute isAuthenticated={isAuthenticated}>
              <ResetPassword />
            </GuestRoute>
          }
        />

        {/* Защищённые маршруты (только для авторизованных) */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
=======
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
>>>>>>> Stashed changes
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
<<<<<<< Updated upstream
            <ProtectedRoute isAuthenticated={isAuthenticated}>
=======
            <ProtectedRoute>
>>>>>>> Stashed changes
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
<<<<<<< Updated upstream
          path='/profile/orders/:id'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfileOrders />
=======
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
>>>>>>> Stashed changes
            </ProtectedRoute>
          }
        />

<<<<<<< Updated upstream
        {/* Маршрут 404 */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Если был передан background, показать модальное окно для ингредиента */}
      {background && (
        <Routes>
          <Route
=======
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
>>>>>>> Stashed changes
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
<<<<<<< Updated upstream
            path='/feed/:id'
            element={
              <Modal title='Детали заказа' onClose={() => navigate(-1)}>
                <OrderDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:id'
            element={
              <Modal title='Детали заказа' onClose={() => navigate(-1)}>
                <OrderDetails />
              </Modal>
=======
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Детали заказа' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
>>>>>>> Stashed changes
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
