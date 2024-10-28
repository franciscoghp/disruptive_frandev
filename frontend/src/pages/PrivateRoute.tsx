import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <h1 className="text-3xl font-bold">Loading...</h1>;
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default PrivateRoute;

