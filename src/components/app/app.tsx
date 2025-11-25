import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
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
import { ProtectedRoute, GuestRoute } from '@components';
import { useDispatch, useSelector, type RootState } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { getUser } from '../../services/slices/userSlice';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Modal, IngredientDetails } from '@components';

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
          }
        />
        <Route
          path='/register'
          element={
            <GuestRoute isAuthenticated={isAuthenticated}>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <GuestRoute isAuthenticated={isAuthenticated}>
              <ForgotPassword />
            </GuestRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
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
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:id'
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        {/* Маршрут 404 */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Если был передан background, показать модальное окно для ингредиента */}
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => {
                  navigate(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
