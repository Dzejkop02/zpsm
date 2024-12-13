import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './components/HomeScreen';
import ResultsScreen from './components/ResultsScreen';
import TestScreen from './components/TestScreen';
import {ActivityIndicator, View} from 'react-native';

const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function App() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await fetch('https://tgryl.pl/quiz/tests');
      const data = await response.json();
      setTests(data);
    } catch (error) {
      console.error('Error fetching tests:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          children={() => <HomeScreen tests={tests} />}
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
        {tests.map(test => (
          <Drawer.Screen
            key={test.id}
            name={`Test: ${test.name}`}
            component={TestScreen}
            initialParams={{testId: test.id}}
            options={{
              headerTitleAlign: 'center',
            }}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
