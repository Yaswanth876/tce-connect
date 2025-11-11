import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Simple client-side auth check (placeholder)
  const isAuth = typeof window !== 'undefined' && localStorage.getItem('tce_isAuthenticated') === 'true';

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
