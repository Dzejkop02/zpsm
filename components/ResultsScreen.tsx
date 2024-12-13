import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

interface ResultItem {
  nick: string;
  score: number;
  total: number;
  type: string;
  createdOn: string;
  id: string;
}

const Item = ({nick, score, total, type, date}: ResultItem) => (
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
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async () => {
    try {
      setError(null);
      const response = await fetch('https://tgryl.pl/quiz/results?last=20');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ResultItem[] = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setError('Nie udało się pobrać wyników. Spróbuj ponownie później.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchResults();
  }, []);

  const renderItem = ({item}: {item: ResultItem}) => (
    <Item
      nick={item.nick}
      score={item.score}
      total={item.total}
      type={item.type}
      date={item.createdOn}
    />
  );

  const keyExtractor = (item: ResultItem) => item.id;

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4293DA" />
          <Text style={styles.loaderText}>Ładowanie wyników...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (error) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchResults}>
            <Text style={styles.retryButtonText}>Spróbuj ponownie</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
          data={results}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={[styles.row, styles.header]}>
              <Text style={styles.cell}>Nick</Text>
              <Text style={styles.cell}>Punkty</Text>
              <Text style={styles.cell}>Typ</Text>
              <Text style={styles.cell}>Data</Text>
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
  header: {
    backgroundColor: '#dadada',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
    minWidth: 80,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Roboto Regular',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 20,
    fontSize: 18,
    color: '#4293DA',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    padding: 15,
    backgroundColor: '#4293DA',
    borderRadius: 8,
    width: '60%',
  },
  retryButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
