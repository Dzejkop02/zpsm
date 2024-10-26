import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function CalculatorVertical(props) {
    const {handlePress} = props;
    return (
        <View style={styles.calculatorContainer}>
            <View style={[styles.resultBox]}>
                <Text style={styles.result}>{props.value}</Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('AC')}>
                    <Text style={styles.buttonText}>AC</Text>
                </TouchableOpacity>
                <View style={[styles.element, styles.darkGray, styles.grow]} />
                <TouchableOpacity style={[styles.element, styles.orange]} onPress={() => handlePress('/')}>
                    <Text style={styles.buttonText}>÷</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.element, styles.gray]} onPress={() => handlePress('7')}>
                    <Text style={styles.buttonText}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.gray]} onPress={() => handlePress('8')}>
                    <Text style={styles.buttonText}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.gray]} onPress={() => handlePress('9')}>
                    <Text style={styles.buttonText}>9</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.orange]} onPress={() => handlePress('*')}>
                    <Text style={styles.buttonText}>×</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.element, styles.gray]} onPress={() => handlePress('4')}>
                    <Text style={styles.buttonText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.gray]} onPress={() => handlePress('5')}>
                    <Text style={styles.buttonText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.gray]} onPress={() => handlePress('6')}>
                    <Text style={styles.buttonText}>6</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.orange]} onPress={() => handlePress('-')}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.element, styles.gray]} onPress={() => handlePress('1')}>
                    <Text style={styles.buttonText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.gray]} onPress={() => handlePress('2')}>
                    <Text style={styles.buttonText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.gray]} onPress={() => handlePress('3')}>
                    <Text style={styles.buttonText}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.orange]} onPress={() => handlePress('+')}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.element, styles.gray, styles.grow]} onPress={() => handlePress('0')}>
                    <Text style={styles.buttonText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.gray]} onPress={() => handlePress('.')}>
                    <Text style={styles.buttonText}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.orange]} onPress={() => handlePress('=')}>
                    <Text style={styles.buttonText}>=</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    calculatorContainer: {
        flexGrow: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    element: {
        width: '25%',
        borderWidth: 1,
        borderColor: '#505155',
        textAlign: 'center',
        padding: 18,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 38,
        fontWeight: '300',
    },
    resultBox: {
        flexGrow: 1,
        backgroundColor: '#505155',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    result: {
        color: 'white',
        fontSize: 64,
        fontWeight: '300',
    },
    grow: {
        flexGrow: 1,
    },
    darkGray: {
        backgroundColor: '#646464',
    },
    orange: {
        backgroundColor: '#f0a03b',
    },
    gray: {
        backgroundColor: '#7c7d7d',
    },
});
