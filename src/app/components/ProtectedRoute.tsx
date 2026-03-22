import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-[#f9fafb] dark:bg-[#111827] flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-[#ef4444]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🚫</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1a1a2e] dark:text-white mb-3">Access Denied</h1>
          <p className="text-[#6b7280] dark:text-[#9ca3af] mb-6">
            You do not have permission to view this page. Only <strong>{allowedRoles.join(', ')}</strong> users can access this area.
          </p>
          <a href="/auth" className="inline-block px-6 py-3 bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] text-white rounded-lg hover:opacity-90 transition-opacity">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
