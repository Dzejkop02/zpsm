import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const calculate = (expression) => {
    try {
        const numbers = expression.split(/([+\-*/])/);
        let result = parseFloat(numbers[0]);

        for (let i = 1; i < numbers.length; i += 2) {
            const operator = numbers[i];
            const nextNumber = parseFloat(numbers[i + 1]);

            switch (operator) {
                case '+':
                    result += nextNumber;
                    break;
                case '-':
                    result -= nextNumber;
                    break;
                case '*':
                    result *= nextNumber;
                    break;
                case '/':
                    result /= nextNumber;
                    break;
                default:
                    break;
            }
        }

        return result.toString();
    } catch (error) {
        return 'Error';
    }
};

export default function App() {
    const [currentInput, setCurrentInput] = useState('');

    const handlePress = (value) => {
        if (value === 'AC') {
            setCurrentInput('');
        } else if (value === '=') {
            const result = calculate(currentInput);
            setCurrentInput(result);
        } else {
            setCurrentInput(currentInput + value);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>{currentInput || '0'}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.buttonGray} onPress={() => handlePress('AC')}>
                        <Text style={styles.buttonText}>AC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonGray} />
                    <TouchableOpacity style={styles.buttonGray} />
                    <TouchableOpacity style={styles.buttonOrange} onPress={() => handlePress('/')}>
                        <Text style={styles.buttonText}>÷</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}>
                        <Text style={styles.buttonText}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}>
                        <Text style={styles.buttonText}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}>
                        <Text style={styles.buttonText}>9</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonOrange} onPress={() => handlePress('*')}>
                        <Text style={styles.buttonText}>×</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}>
                        <Text style={styles.buttonText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}>
                        <Text style={styles.buttonText}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}>
                        <Text style={styles.buttonText}>6</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonOrange} onPress={() => handlePress('-')}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}>
                        <Text style={styles.buttonText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}>
                        <Text style={styles.buttonText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}>
                        <Text style={styles.buttonText}>3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonOrange} onPress={() => handlePress('+')}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.buttonZero} onPress={() => handlePress('0')}>
                        <Text style={styles.buttonText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlePress(',')}>
                        <Text style={styles.buttonText}>,</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonOrange} onPress={() => handlePress('=')}>
                        <Text style={styles.buttonText}>=</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
    },
    resultContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 20,
        backgroundColor: '#000',
    },
    resultText: {
        fontSize: 80,
        color: '#fff',
    },
    buttonsContainer: {
        backgroundColor: '#333',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#666',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonGray: {
        backgroundColor: '#a6a6a6',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonOrange: {
        backgroundColor: '#f1c40f',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonZero: {
        backgroundColor: '#666',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
    },
    buttonText: {
        fontSize: 36,
        color: '#fff',
    },
});
