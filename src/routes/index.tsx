import React, { useEffect } from 'react';

import AuthRoutes from './auth.routes';
import { useAuth } from '../hooks/auth';
import { View, ActivityIndicator } from 'react-native';
import HomeRoutes from './home.routes';

const RoutesChooser: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#E13352" />
      </View>
    );
  }

  return user ? <HomeRoutes /> : <AuthRoutes />;
};

export default RoutesChooser;
