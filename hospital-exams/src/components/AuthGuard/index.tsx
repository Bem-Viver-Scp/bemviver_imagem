import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../service/auth';

export default function AuthGuard() {
  const isAuthed = useAuth((s) => s.isAuthenticated());
  const loc = useLocation();
  if (!isAuthed) return <Navigate to="/login" replace state={{ from: loc }} />;
  return <Outlet />;
}
