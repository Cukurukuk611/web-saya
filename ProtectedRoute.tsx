import { Navigate } from 'react-router-dom';
import { isAdminAuth } from '../store';
import type { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!isAdminAuth()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
