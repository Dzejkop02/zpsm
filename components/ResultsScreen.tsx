import React from 'react';
import {Text, View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {results} from './mocks/results';

type ItemProps = {
  nick: 'string';
  score: 'number';
  total: 'number';
  type: 'string';
  date: 'string';
};

const Item = ({nick, score, total, type, date}: ItemProps) => (
  <View style={styles.row}>
    <Text style={styles.cell}>{nick}</Text>
    <Text style={styles.cell}>
      {score}/{total}
    </Text>
    <Text style={styles.cell}>{type}</Text>
    <Text style={styles.cell}>{date}</Text>
  </View>
);

export default function ResultsScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
          data={results}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({item}: ItemProps) => (
            <Item
              nick={item.nick}
              score={item.score}
              total={item.total}
              type={item.type}
              date={item.date}
            />
          )}
          ListHeaderComponent={
            <View style={[styles.row, styles.header]}>
              <Text style={styles.cell}>Nick</Text>
              <Text style={styles.cell}>Point</Text>
              <Text style={styles.cell}>Type</Text>
              <Text style={styles.cell}>Date</Text>
            </View>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.container}
        />
      </SafeAreaView>
    </SafeAreaProvider>
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
    fontSize: 13,
    color: 'black',
  },
});
