import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import Game from './screens/Game';
import Finish from './screens/Finish';
import { Provider } from 'react-redux';
import store from './store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={Home}/>
        <Stack.Screen name="Game" options={{headerShown:false}} component={Game}/>
        <Stack.Screen name="Finish" options={{headerShown:false}} component={Finish}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({

});
