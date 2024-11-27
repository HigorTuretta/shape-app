// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import WorkoutsScreen from './screens/WorkoutsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {/* Header persistente */}
      <View style={{ backgroundColor: '#000' }}>
        <Header />
      </View>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#000' },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Treinos') {
              iconName = focused ? 'fitness' : 'fitness-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Treinos" component={WorkoutsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
