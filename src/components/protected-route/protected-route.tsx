import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  isAuthenticated,
  children
}) => {
  const location = useLocation();

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};
