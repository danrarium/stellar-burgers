import { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface IGuestRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export const GuestRoute: FC<IGuestRouteProps> = ({
  isAuthenticated,
  children
}) => (isAuthenticated ? <Navigate to='/' replace /> : <>{children}</>);
