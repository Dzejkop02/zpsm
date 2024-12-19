import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import _ from 'lodash';
import HomeScreen from './components/HomeScreen';
import ResultsScreen from './components/ResultsScreen';
import TestScreen from './components/TestScreen';

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
      setTests(_.shuffle(data));
    } catch (error) {
      console.error('Error fetching tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomTest = navigation => {
    if (tests.length === 0) {
      Alert.alert('No Tests Available', 'Please refresh the tests first.');
      return;
    }
    const randomTest = tests[Math.floor(Math.random() * tests.length)];
    navigation.navigate(`Test: ${randomTest.name}`, {testId: randomTest.id});
  };

  const CustomDrawerContent = props => (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Refresh Tests" onPress={fetchTests} />
      <DrawerItem
        label="Random Test"
        onPress={() => handleRandomTest(props.navigation)}
      />
    </DrawerContentScrollView>
  );

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
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
