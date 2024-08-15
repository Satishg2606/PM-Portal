import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AddFlightScreen from './AddFlight.js';
import AddAirportScreen from './AddAirport.js';

const Tab = createMaterialTopTabNavigator();

const AddFlightTabNavigator = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: '#3D5280' },
        }}
        initialRouteName='Add Flight'
      >
        <Tab.Screen name="Add Flight" component={AddFlightScreen} />
        <Tab.Screen name="Add Airport" component={AddAirportScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AddFlightTabNavigator;
