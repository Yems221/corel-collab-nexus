
import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
type UserRole = 'user' | 'admin' | 'superadmin';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
};

// Mock data for demonstration
const MOCK_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
  role: 'user'
};

// Mock superadmin for testing
const MOCK_SUPERADMIN: User = {
  id: '2',
  name: 'Admin User',
  email: 'admin@example.com',
  avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
  role: 'superadmin'
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage (simulating persistence)
    const storedUser = localStorage.getItem('corel_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, provide superadmin access for specific credentials
    if (email === 'admin@example.com' && password === 'admin123') {
      setUser(MOCK_SUPERADMIN);
      localStorage.setItem('corel_user', JSON.stringify(MOCK_SUPERADMIN));
    } else {
      // Regular user login
      setUser(MOCK_USER);
      localStorage.setItem('corel_user', JSON.stringify(MOCK_USER));
    }
    
    setLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a new user with the provided info
    const newUser = {
      ...MOCK_USER,
      name,
      email,
      avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=0D8ABC&color=fff`,
      role: 'user' as UserRole
    };
    
    setUser(newUser);
    localStorage.setItem('corel_user', JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('corel_user');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isSuperAdmin: user?.role === 'superadmin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
