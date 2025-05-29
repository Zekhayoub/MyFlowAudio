import { getApiUrl } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// Login
export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(getApiUrl('/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur de connexion');
    }

    // Sauvegarder le token et l'utilisateur
    if (data.token) {
      await AsyncStorage.setItem(TOKEN_KEY, data.token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Register
export const register = async (email: string, password: string) => {
  try {
    const response = await fetch(getApiUrl('/auth/register'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur d\'inscription');
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Logout
export const logout = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

// Récupérer le token
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

// Récupérer l'utilisateur actuel
export const getCurrentUser = async () => {
  try {
    const userStr = await AsyncStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

// Vérifier l'auth avec l'API
export const checkAuth = async () => {
  try {
    const token = await getToken();
    if (!token) return { success: false };

    const response = await fetch(getApiUrl('/auth/me'), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      await logout(); // Token invalide, déconnexion
      return { success: false };
    }

    const data = await response.json();
    return { success: true, user: data.user };
  } catch {
    return { success: false };
  }
};