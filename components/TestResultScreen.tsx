import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function TestResultScreen({result, total, type}) {
  useEffect(() => {
    const sendResult = async () => {
      const payload = {
        nick: 'Jakub',
        score: result,
        total: total,
        type: type || 'undefined',
      };

      try {
        const response = await fetch('https://tgryl.pl/quiz/result', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Result successfully sent:', responseData);
      } catch (err) {
        console.error('Error sending test result:', err);
      }
    };

    sendResult();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test result</Text>
      <Text style={styles.text}>
        You scored {result} out of {total}
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
    fontSize: 38,
    marginBottom: 44,
    textAlign: 'center',
    fontFamily: 'Bebas Neue Regular',
  },
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto Regular',
  },
});
