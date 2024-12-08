import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import TestResultScreen from './TestResultScreen';
import {task1, task2, task3} from './mocks/tasks';
import {RouteProp, useRoute} from '@react-navigation/native';

interface Answer {
  content: string;
  isCorrect: boolean;
}

interface Task {
  question: string;
  answers: Answer[];
  duration: number;
}

type RootStackParamList = {
  TestScreen: {testId: string};
};

type TestScreenRouteProp = RouteProp<RootStackParamList, 'TestScreen'>;

export default function TestScreen() {
  const route = useRoute<TestScreenRouteProp>();
  const {testId} = route.params;

  let selectedTasks: Task[] = [];
  switch (testId) {
    case 'test1':
      selectedTasks = task1;
      break;
    case 'test2':
      selectedTasks = task2;
      break;
    case 'test3':
      selectedTasks = task3;
      break;
    default:
      selectedTasks = [];
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    selectedTasks.length > 0 ? selectedTasks[0].duration : 30,
  );
  const [progress, setProgress] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const totalQuestions = selectedTasks.length;

  useEffect(() => {
    if (totalQuestions === 0) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(0);
      setTimeLeft(selectedTasks[0].duration);
      setProgress(1);
      setScore(0);
      setShowResult(false);
    }
  }, [selectedTasks, totalQuestions]);

  useEffect(() => {
    if (showResult) {
      return;
    }

    if (timeLeft === 0) {
      handleNextQuestion(false);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          handleNextQuestion(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, showResult]);

  useEffect(() => {
    if (totalQuestions === 0) {
      return;
    }
    const currentDuration = selectedTasks[currentQuestionIndex].duration;
    setProgress(timeLeft / currentDuration);
  }, [timeLeft, currentQuestionIndex, totalQuestions, selectedTasks]);

  const handleNextQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimeLeft(selectedTasks[currentQuestionIndex + 1].duration);
    } else {
      setShowResult(true);
    }
  };

  const handleAnswerPress = (isCorrect: boolean) => {
    handleNextQuestion(isCorrect);
  };

  if (showResult) {
    return <TestResultScreen result={score} total={totalQuestions} />;
  }

  const currentQuestion = selectedTasks[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Text style={styles.text}>
          Pytanie {currentQuestionIndex + 1} z {totalQuestions}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
  },
  topBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  progress: {
    borderRadius: 10,
    height: 15,
    marginTop: 20,
    marginBottom: 40,
  },
  questionText: {
    color: 'black',
    marginTop: 10,
    textAlign: 'center',
  },
  answers: {
    marginTop: 15,
    padding: 10,
    paddingTop: 30,
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  answer: {
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    width: '47%',
    borderRadius: 6,
    backgroundColor: '#ccc',
    borderWidth: 1,
    marginBottom: 25,
  },
  answerText: {
    color: 'black',
    textAlign: 'center',
  },
});
