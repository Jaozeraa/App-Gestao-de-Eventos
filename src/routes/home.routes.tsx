import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Events from '../pages/Events';

const Tab = createBottomTabNavigator();

const possibleIcons = {
  Feed: 'home',
  SearchProfile: 'search',
  Explorer: 'grid',
  Profile: 'user',
  EditProfile: 'none',
  CreatePost: 'plus',
};

const HomeRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        position: 'relative',
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          return <Text>MAccaco</Text>;
        },
        tabBarLabel: () => null,
      })}
      tabBarOptions={{
        activeTintColor: '#130F26',
        inactiveTintColor: '#130F26',
      }}
    >
      <Tab.Screen component={Events} name="Events" />
    </Tab.Navigator>
  );
};

export default HomeRoutes;
