import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function TestPreview(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.tags}>
        <Text style={styles.tag}>#Tag1</Text>
        <Text style={styles.tag}>#Tag2</Text>
        <Text style={styles.tag}>#Tag3</Text>
      </View>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam varius
        vitae eros nec pellentesque. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginBottom: 24,
    padding: 12,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    color: 'black',
  },
  tags: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tag: {
    marginRight: 7,
  },
  description: {
    color: 'black',
  },
});
