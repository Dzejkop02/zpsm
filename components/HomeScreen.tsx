import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TestPreview from './TestPreview';
import TermsScreen from './TermsScreen';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [termsRead, setTermsRead] = useState(true);

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('my-key', value);
    } catch (e) {}
  };

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      return value === 'key';
    } catch (e) {}
  };

  useEffect(() => {
    (async () => {
      const result = await readData();
      if (!result) {
        setTermsRead(false);
        await storeData('key');

        setTimeout(() => setTermsRead(true), 3000);
      }
    })();
  }, []);

  if (!termsRead) {
    return <TermsScreen />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.previews}>
        <TestPreview title={'Title Test #1'} />
        <TestPreview title={'Title Test #2'} />
        <TestPreview title={'Title Test #3'} />
        <TestPreview title={'Title Test #4'} />
      </View>
      <View style={styles.results}>
        <Text style={styles.resultsTitle}>Get to know your ranking result</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Results')}>
          <Text style={styles.buttonText}>Check!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
  },
  previews: {
    paddingLeft: 14,
    paddingRight: 14,
  },
  results: {
    borderWidth: 1,
    marginBottom: 24,
    padding: 12,
    alignItems: 'center',
  },
  resultsTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 8,
    color: 'black',
  },
  button: {
    padding: 8,
    paddingRight: 40,
    paddingLeft: 40,
    borderRadius: 5,
    backgroundColor: '#ccc',
    borderWidth: 1,
  },
  buttonText: {
    color: 'black',
  },
});
