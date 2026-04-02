import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { loginUser } from '../../services/slices/userSlice';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, selectLoginError } from '../../services/slices/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< Updated upstream
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');

    dispatch(loginUser({ email, password })).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        // Redirect back to the page user tried to access, or to home
        const from =
          (location.state as { from?: Location })?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else if (loginUser.rejected.match(result)) {
        setError(String(result.payload) || 'Ошибка при входе');
      }
    });
=======
  const errorText = useSelector(selectLoginError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
>>>>>>> Stashed changes
  };

  return (
    <LoginUI
<<<<<<< Updated upstream
      errorText={error}
=======
      errorText={errorText || ''}
>>>>>>> Stashed changes
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
