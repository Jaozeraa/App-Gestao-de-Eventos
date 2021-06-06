import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import Routes from './routes';
import { NavigationContainer } from '@react-navigation/native';
import RootProvider from './hooks';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
    <RootProvider>
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Routes />
      </View>
    </RootProvider>
  </NavigationContainer>
);

export default App;
