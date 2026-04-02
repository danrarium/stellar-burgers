import { FC } from 'react';
import { useSelector, type RootState } from '../../services/store';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUserName } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
<<<<<<< Updated upstream
  const userName = useSelector(
    (state: RootState) => state.user.user?.name || ''
  );

=======
  const userName = useSelector(selectUserName);
>>>>>>> Stashed changes
  return <AppHeaderUI userName={userName} />;
};
