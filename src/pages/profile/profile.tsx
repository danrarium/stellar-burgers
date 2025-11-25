import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector, type RootState } from '../../services/store';
import { updateUser } from '../../services/slices/userSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== (user?.name ?? '') ||
    formValue.email !== (user?.email ?? '') ||
    (passwordTouched && !!formValue.password);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const updated = await dispatch(
        updateUser({
          name: formValue.name,
          email: formValue.email,
          password: formValue.password
        })
      ).unwrap();

      // On success, reset password and sync form with returned user
      setFormValue({
        name: updated.name || '',
        email: updated.email || '',
        password: ''
      });
      setPasswordTouched(false);
    } catch (err) {
      // error is handled in the slice; nothing to do here
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    setPasswordTouched(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    if (e.target.name === 'password') setPasswordTouched(true);
  };

  const updateUserError = useSelector((state: RootState) => state.user.error);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={updateUserError ?? undefined}
      isLoading={isLoading}
    />
  );
};
