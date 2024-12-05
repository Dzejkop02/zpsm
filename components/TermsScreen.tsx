import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function TermsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms of Service</Text>
      <Text style={styles.text}>You will be redirected to the app soon...</Text>
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
    fontSize: 12,
    textAlign: 'center',
  },
});
