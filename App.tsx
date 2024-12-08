import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './components/HomeScreen';
import ResultsScreen from './components/ResultsScreen';
import TestScreen from './components/TestScreen';
import { task1, task2, task3 } from './components/mocks/tasks';

const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen
          name="Results"
          component={ResultsScreen}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen
          name="Test #1"
          component={TestScreen}
          initialParams={{testId: 'test1'}}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen
          name="Test #2"
          component={TestScreen}
          initialParams={{testId: 'test2'}}
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Drawer.Screen
          name="Test #3"
          component={TestScreen}
          initialParams={{testId: 'test3'}}
          options={{
            headerTitleAlign: 'center',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
