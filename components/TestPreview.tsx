import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default function TestPreview({title, onPress, description, tags}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.tags}>
        {tags.map(tag => (
          <Text key={tag} style={styles.tag}>
            #{tag}
          </Text>
        ))}
      </View>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginBottom: 24,
    padding: 12,
  },
  title: {
    fontSize: 30,
    marginBottom: 12,
    color: 'black',
    fontFamily: 'Bebas Neue Regular',
  },
  tags: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tag: {
    marginRight: 7,
    color: '#555',
    fontFamily: 'Roboto Regular',
  },
  description: {
    color: 'black',
    fontFamily: 'Roboto Regular',
  },
});
