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
import SQLite from 'react-native-sqlite-storage';
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

const db = SQLite.openDatabase(
  {name: 'QuizDB.db', location: 'default'},
  () => {
    console.log('Database opened successfully');
  },
  error => {
    console.error('Error opening database:', error);
  },
);

export default function App() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
    initializeDatabase();
    checkLastUpdateAndFetchTests();
  }, []);

  const initializeDatabase = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Tests (
          id TEXT PRIMARY KEY,
          name TEXT,
          description TEXT,
          tags TEXT,
          level TEXT,
          numberOfTasks INTEGER
        );`,
        [],
        () => console.log('Tests table created successfully'),
        error => console.error('Error creating Tests table:', error),
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS TestDetails (
          id TEXT PRIMARY KEY,
          name TEXT,
          description TEXT,
          level TEXT,
          tasks TEXT
        );`,
        [],
        () => console.log('TestDetails table created successfully'),
        error => console.error('Error creating TestDetails table:', error),
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Meta (
          key TEXT PRIMARY KEY,
          value TEXT
        );`,
        [],
        () => console.log('Meta table created successfully'),
        error => console.error('Error creating Meta table:', error),
      );
    });
  };

  const checkLastUpdateAndFetchTests = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT value FROM Meta WHERE key = ?',
        ['lastUpdate'],
        (tx, results) => {
          const rows = results.rows;
          const lastUpdate =
            rows.length > 0 ? new Date(rows.item(0).value) : null;
          const now = new Date();
          if (!lastUpdate || now - lastUpdate > 24 * 60 * 60 * 1000) {
            fetchAndStoreTests();
            updateLastUpdate();
          } else {
            fetchTestsFromDatabase();
          }
        },
        error => console.error('Error fetching last update time:', error),
      );
    });
  };

  const updateLastUpdate = () => {
    const now = new Date().toISOString();
    db.transaction(tx => {
      tx.executeSql(
        'INSERT OR REPLACE INTO Meta (key, value) VALUES (?, ?);',
        ['lastUpdate', now],
        () => console.log('Last update time updated successfully'),
        error => console.error('Error updating last update time:', error),
      );
    });
  };

  const fetchTestsFromDatabase = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Tests;',
        [],
        (tx, results) => {
          const rows = results.rows;
          const tests = [];
          for (let i = 0; i < rows.length; i++) {
            const test = rows.item(i);
            test.tags = JSON.parse(test.tags || '[]'); // Ensure tags are parsed
            tests.push(test);
          }
          setTests(_.shuffle(tests));
          setLoading(false);
        },
        error => console.error('Error fetching tests from database:', error),
      );
    });
  };

  const fetchAndStoreTests = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://tgryl.pl/quiz/tests');
      const data = await response.json();
      storeTestsInDatabase(data);
      setTests(_.shuffle(data));
    } catch (error) {
      console.error('Error fetching tests:', error);
      Alert.alert('Error', 'Failed to fetch tests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const storeTestsInDatabase = tests => {
    db.transaction(tx => {
      tests.forEach(test => {
        const tags = JSON.stringify(test.tags || []); // Ensure tags are always an array
        tx.executeSql(
          'INSERT OR REPLACE INTO Tests (id, name, description, tags, level, numberOfTasks) VALUES (?, ?, ?, ?, ?, ?);',
          [
            test.id,
            test.name,
            test.description,
            tags,
            test.level,
            test.numberOfTasks,
          ],
          () => console.log(`Test ${test.id} inserted successfully`),
          error => console.error('Error inserting test:', error),
        );
        fetchAndStoreTestDetails(test.id);
      });
    });
  };

  const fetchAndStoreTestDetails = async testId => {
    try {
      const response = await fetch(`https://tgryl.pl/quiz/test/${testId}`);
      const data = await response.json();
      const tasks = JSON.stringify(data.tasks);
      db.transaction(tx => {
        tx.executeSql(
          'INSERT OR REPLACE INTO TestDetails (id, name, description, level, tasks) VALUES (?, ?, ?, ?, ?);',
          [data.id, data.name, data.description, data.level, tasks],
          () =>
            console.log(`Test details for ${data.id} inserted successfully`),
          error => console.error('Error inserting test details:', error),
        );
      });
    } catch (error) {
      console.error(`Error fetching details for test ${testId}:`, error);
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
      <DrawerItem label="Refresh Tests" onPress={fetchAndStoreTests} />
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
          children={() => <HomeScreen tests={_.shuffle(tests)} />}
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
