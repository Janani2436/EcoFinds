import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import apiClient from '../services/apiClient';
import { jwtDecode } from 'jwt-decode'; // You need to install this!

// Run: npm install jwt-decode

interface User {
  id: string;
  name: string; // The backend returns 'name'
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for a token in localStorage when the app loads
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: { id: string, name: string } = jwtDecode(token);
      setUser({ id: decodedToken.id, name: decodedToken.name });
    }
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    const decodedToken: { id: string, name: string } = jwtDecode(token);
    setUser({ id: decodedToken.id, name: decodedToken.name });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};