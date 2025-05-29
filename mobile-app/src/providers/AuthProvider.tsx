import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as authService from '../services/api/auth';

interface User {
  id: string;
  email?: string;
  [key: string]: any;
}

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const result = await authService.checkAuth();
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const result = await authService.login(email, password);
      
      if (result.success && result.data) {
        setUser(result.data.user);
        return { error: null };
      } else {
        return { error: result.error || 'Erreur de connexion' };
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { error: error.message || 'Erreur inattendue' };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const result = await authService.register(email, password);
      
      if (result.success) {
        Alert.alert(
          'Inscription réussie !',
          result.data.message || 'Vérifiez votre email pour confirmer votre compte.',
          [{ text: 'OK' }]
        );
        return { error: null };
      } else {
        return { error: result.error || 'Erreur d\'inscription' };
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { error: error.message || 'Erreur inattendue' };
    }
  };

  const signOut = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Erreur', 'Impossible de se déconnecter');
    }
  };

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};