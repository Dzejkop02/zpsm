import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {ProgressBar} from 'react-native-paper';

export default function TestScreen() {
  const MAX_TIME = 30;
  const QUESTIONS = 10;
  const [time, setTime] = useState(MAX_TIME);
  const [progress, setProgress] = useState(1);
  const [question, setQuestion] = useState(1);

  useEffect(() => {
    setTime(MAX_TIME);
    setQuestion(1);
  }, []);

  useEffect(() => {
    if (time === 0) {
      nextQuestion();
      return;
    }

    const timerId = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [time]);

  useEffect(() => {
    setProgress(time / MAX_TIME);
  }, [time]);

  const nextQuestion = () => {
    if (question < QUESTIONS) {
      setQuestion(prev => prev + 1);
      setTime(MAX_TIME);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Text style={styles.text}>
          Question {question} of {QUESTIONS}
        </Text>
        <Text style={styles.text}>Time: {time} sec</Text>
      </View>
      <ProgressBar
        progress={progress}
        color="#4293DA"
        style={styles.progress}
      />
      <Text style={styles.text}>
        This is some example of a long question to fill the content?
      </Text>
      <Text style={styles.textDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam varius
        vitae eros nec pellentesque. Class aptent taciti sociosqu ad litora
        torquent per conubia nostra, per.
      </Text>
      <View style={styles.answers}>
        <TouchableOpacity style={styles.answer} onPress={nextQuestion}>
          <Text style={styles.answerText}>Answer A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.answer} onPress={nextQuestion}>
          <Text style={styles.answerText}>Answer B</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.answer} onPress={nextQuestion}>
          <Text style={styles.answerText}>Answer C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.answer} onPress={nextQuestion}>
          <Text style={styles.answerText}>Answer D</Text>
        </TouchableOpacity>
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
  textDescription: {
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
