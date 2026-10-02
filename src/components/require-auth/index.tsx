import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useGermanStore from '../../store';

// Pages that need an account send guests to sign in
const RequireAuth = ({ children }: { children: ReactNode }) => {
  const isSignedIn = useGermanStore((s) => !!s.user);
  return isSignedIn ? <>{children}</> : <Navigate to="/sign-in" replace />;
};

export default RequireAuth;
