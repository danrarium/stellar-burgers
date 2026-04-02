import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/userSlice';
=======
>>>>>>> Stashed changes
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
<<<<<<< Updated upstream
    dispatch(logoutUser()).then(() => {
      navigate('/login', { replace: true });
    });
=======
    dispatch(logoutUser()).then(() => navigate('/login'));
>>>>>>> Stashed changes
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
