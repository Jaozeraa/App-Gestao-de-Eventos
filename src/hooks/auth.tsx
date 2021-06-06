import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface LogInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  logIn(credentials: LogInCredentials): Promise<void>;
  updateUser(user: User): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [accessToken, refreshToken, user] = await AsyncStorage.multiGet([
        '@GoTickets:accessToken',
        '@GoTickets:refreshToken',
        '@GoTickets:user',
      ]);

      if (accessToken[1] && refreshToken[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${accessToken[1]}`;

        setData({
          accessToken: accessToken[1],
          refreshToken: refreshToken[1],
          user: JSON.parse(user[1]),
        });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const logIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { accessToken, refreshToken, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoTickets:accessToken', accessToken],
      ['@GoTickets:refreshToken', refreshToken],
      ['@GoTickets:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${accessToken}`;

    setData({ accessToken, refreshToken, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@GoTickets:user',
      '@GoTickets:accessToken',
      '@GoTickets:refreshToken',
    ]);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@GoTickets:user', JSON.stringify(user));

      setData({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user,
      });
    },
    [setData, data.accessToken, data.refreshToken],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, logIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
