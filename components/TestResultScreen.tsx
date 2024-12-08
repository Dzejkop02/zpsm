import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function TestResultScreen({result, total}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test result</Text>
      <Text style={styles.text}>
        You scored {result}/{total} points
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    padding: 12,
  },
  title: {
    color: 'black',
    fontSize: 28,
    marginBottom: 44,
    textAlign: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});
