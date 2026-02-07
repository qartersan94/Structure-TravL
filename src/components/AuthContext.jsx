import React, { createContext, useContext, useState, useEffect } from 'react';
import { authenticate } from '../data/users';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger user depuis localStorage au démarrage
    const storedUser = localStorage.getItem('travl_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const result = authenticate(username, password);
    
    if (result.success) {
      setUser(result.user);
      setIsAuthenticated(true);
      localStorage.setItem('travl_user', JSON.stringify(result.user));
      return { success: true };
    }
    
    return { success: false, error: result.error };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('travl_user');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
