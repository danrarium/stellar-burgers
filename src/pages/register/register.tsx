import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { registerUser } from '../../services/slices/userSlice';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  registerUser,
  selectRegisterError
} from '../../services/slices/userSlice';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< Updated upstream
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');

    dispatch(registerUser({ name: userName, email, password })).then(
      (result) => {
        if (registerUser.fulfilled.match(result)) {
          navigate('/', { replace: true });
        } else if (registerUser.rejected.match(result)) {
          setError(String(result.payload) || 'Ошибка при регистрации');
        }
      }
    );
=======
  const errorText = useSelector(selectRegisterError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, name: userName, password }));
>>>>>>> Stashed changes
  };

  return (
    <RegisterUI
<<<<<<< Updated upstream
      errorText={error}
=======
      errorText={errorText || ''}
>>>>>>> Stashed changes
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
