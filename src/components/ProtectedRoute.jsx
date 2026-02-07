import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Vérifier rôle si requis
  if (requiredRole) {
    const roleLevel = {
      'PRESIDENT': 5,
      'CAPITAINE': 4,
      'COACH': 3,
      'MANAGER': 2,
      'JOUEUR': 1
    };

    if (roleLevel[user.role] < roleLevel[requiredRole]) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
