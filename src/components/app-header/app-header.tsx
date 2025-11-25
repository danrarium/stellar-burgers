import { FC } from 'react';
import { useSelector, type RootState } from '../../services/store';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const userName = useSelector(
    (state: RootState) => state.user.user?.name || ''
  );

  return <AppHeaderUI userName={userName} />;
};
