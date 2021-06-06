import React, { useEffect } from 'react';

import AuthRoutes from './auth.routes';
import { useAuth } from '../hooks/auth';
import { View, ActivityIndicator } from 'react-native';
import AppRoutes from './app.routes';

const RoutesChooser: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#E13352" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default RoutesChooser;
