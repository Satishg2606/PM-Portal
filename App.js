import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './components/LoginScreen.js'; // Ensure the correct path to your LoginScreen component
import RegisterScreen from './components/UserRegisterScreen.js';
import DashboardScreen from './components/DashboardScreen.js';
import AddFlightScreen from './components/AddFlight.js';
import AddAirportScreen from './components/AddAirport.js';
import AddFlightTabNavigator from './components/AddFlightTabNavigator.js';
import BookFlightScreen from './components/BookFlightScreen.js';
const Stack = createNativeStackNavigator();

const App=({navigation}) =>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addFlight"
          component={AddFlightScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addAirport"
          component={AddAirportScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addFlightTab"
          component={AddFlightTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="bookFlight"
          component={BookFlightScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export  {App};
