import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

/**
 * Route guard wrapper. Redirects unauthenticated users to the appropriate
 * login page based on the current route prefix.
 */
export default function RequireAuth({ children }) {
  const { session } = useApp();
  const { pathname } = useLocation();

  if (!session) {
    const target = pathname.startsWith('/profesor')
      ? '/login/profesor'
      : '/login/alumno';
    return <Navigate to={target} replace />;
  }

  return children;
}
