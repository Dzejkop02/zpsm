import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

export default function ResultsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.table}>
        <View style={[styles.row, styles.header]}>
          <Text style={styles.cell}>Nick</Text>
          <Text style={styles.cell}>Point</Text>
          <Text style={styles.cell}>Type</Text>
          <Text style={styles.cell}>Date</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>asdf</Text>
          <Text style={styles.cell}>18/20</Text>
          <Text style={styles.cell}>test1</Text>
          <Text style={styles.cell}>01-12-2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>fghj</Text>
          <Text style={styles.cell}>18/20</Text>
          <Text style={styles.cell}>test1</Text>
          <Text style={styles.cell}>01-12-2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>zxc</Text>
          <Text style={styles.cell}>16/20</Text>
          <Text style={styles.cell}>test1</Text>
          <Text style={styles.cell}>01-12-2024</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>qwe</Text>
          <Text style={styles.cell}>3/20</Text>
          <Text style={styles.cell}>test1</Text>
          <Text style={styles.cell}>01-12-2024</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 6,
  },
  table: {
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 30,
  },
  header: {
    backgroundColor: '#dadada',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    padding: 10,
    paddingTop: 25,
    paddingBottom: 25,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
  },
});
