import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Events from '../pages/Events';
import Profile from '../pages/Profile';
import Tickets from '../pages/Tickets';
import { createStackNavigator } from '@react-navigation/stack';
import Details from '../pages/Details';
import Payment from '../pages/Payment';

const EventsStack = createStackNavigator();

function EventsStackScreen() {
  return (
    <EventsStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <EventsStack.Screen name="Events" component={Events} />
      <EventsStack.Screen name="Details" component={Details} />
      <EventsStack.Screen name="Payment" component={Payment} />
    </EventsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const HomeRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        position: 'relative',
        backgroundColor: '#fff',
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const possibleRouteIcons = {
            Events: <Icon name="home" size={32} color={color} />,
            Profile: <Icon name="user" size={32} color={color} />,
            Tickets: <Icon2 name="ticket-outline" size={32} color={color} />,
          };

          return possibleRouteIcons[route.name as 'Events'];
        },
        tabBarLabel: () => null,
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#E13352',
        inactiveTintColor: '#ADB5BD',
        style: {
          height: 80,
          backgroundColor: '#ffffff',
        },
      }}
    >
      <Tab.Screen component={EventsStackScreen} name="Events" />
      <Tab.Screen component={Profile} name="Profile" />
      <Tab.Screen component={Tickets} name="Tickets" />
    </Tab.Navigator>
  );
};

export default HomeRoutes;
