import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import TestResultScreen from './TestResultScreen';
import {RouteProp, useRoute} from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import _ from 'lodash';

const db = SQLite.openDatabase({name: 'QuizDB.db', location: 'default'});

interface Answer {
  content: string;
  isCorrect: boolean;
}

interface Task {
  question: string;
  answers: Answer[];
  duration: number;
}

interface TestDetails {
  id: string;
  name: string;
  description: string;
  tags: string[];
  level: string;
  numberOfTasks: number;
  tasks: Task[];
}

type RootStackParamList = {
  TestScreen: {testId: string};
};

type TestScreenRouteProp = RouteProp<RootStackParamList, 'TestScreen'>;

export default function TestScreen() {
  const route = useRoute<TestScreenRouteProp>();
  const {testId} = route.params;

  const [testDetails, setTestDetails] = useState<TestDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(1);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    fetchTestDetailsFromDatabase();
  }, [testId]);

  const fetchTestDetailsFromDatabase = () => {
    setLoading(true);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM TestDetails WHERE id = ?;',
        [testId],
        (tx, results) => {
          if (results.rows.length > 0) {
            const row = results.rows.item(0);
            const tasks = JSON.parse(row.tasks || '[]');
            const details: TestDetails = {
              id: row.id,
              name: row.name,
              description: row.description,
              tags: JSON.parse(row.tags || '[]'),
              level: row.level,
              numberOfTasks: tasks.length,
              tasks: _.shuffle(tasks),
            };
            setTestDetails(details);
            if (tasks.length > 0) {
              setCurrentQuestionIndex(0);
              setTimeLeft(tasks[0].duration);
              setProgress(1);
              setScore(0);
            } else {
              setShowResult(true);
            }
          } else {
            setError(
              'Nie znaleziono szczegółów testu w lokalnej bazie danych.',
            );
          }
        },
        error => {
          console.error('Error fetching test details from database:', error);
          setError('Wystąpił błąd podczas odczytu danych z bazy.');
        },
      );
    });
    setLoading(false);
  };

  useEffect(() => {
    if (showResult || !testDetails) {
      return;
    }

    if (timeLeft === 0) {
      handleNextQuestion(false);
      return;
    }

    if (timeLeft === null) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime !== null && prevTime <= 1) {
          clearInterval(timerId);
          handleNextQuestion(false);
          return 0;
        }
        return prevTime !== null ? prevTime - 1 : null;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, showResult, testDetails]);

  useEffect(() => {
    if (!testDetails || testDetails.tasks.length === 0) {
      return;
    }
    const currentDuration = testDetails.tasks[currentQuestionIndex].duration;
    setProgress(timeLeft / currentDuration);
  }, [timeLeft, currentQuestionIndex, testDetails]);

  const handleNextQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    if (testDetails && currentQuestionIndex + 1 < testDetails.tasks.length) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimeLeft(testDetails.tasks[currentQuestionIndex + 1].duration);
    } else {
      setShowResult(true);
    }
  };

  const handleAnswerPress = (isCorrect: boolean) => {
    handleNextQuestion(isCorrect);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchTestDetailsFromDatabase}>
          <Text style={styles.retryButtonText}>Spróbuj ponownie</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!testDetails) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (showResult) {
    return (
      <TestResultScreen
        result={score}
        total={testDetails.tasks.length}
        type={testDetails.tags[0]}
      />
    );
  }

  const currentQuestion = testDetails.tasks[currentQuestionIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBox}>
        <Text style={styles.text}>
          Pytanie {currentQuestionIndex + 1} z {testDetails.tasks.length}
        </Text>
        <Text style={styles.text}>Czas: {timeLeft} sek</Text>
      </View>
      <ProgressBar
        progress={progress}
        color="#4293DA"
        style={styles.progress}
      />
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      <View style={styles.answers}>
        {currentQuestion.answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={styles.answer}
            onPress={() => handleAnswerPress(answer.isCorrect)}>
            <Text style={styles.answerText}>{answer.content}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 22,
    flexGrow: 1,
    justifyContent: 'center',
  },
  topBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Roboto Regular',
  },
  progress: {
    borderRadius: 10,
    height: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  questionText: {
    color: 'black',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto Regular',
  },
  answers: {
    marginTop: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  answer: {
    padding: 15,
    borderRadius: 6,
    backgroundColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
  },
  answerText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto Regular',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto Regular',
  },
  retryButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#4293DA',
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto Regular',
  },
});
