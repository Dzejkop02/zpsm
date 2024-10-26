import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function CalculatorHorizontal(props) {
    const {handlePress} = props;
    return (
        <View style={styles.calculatorContainer}>
            <View style={[styles.resultBox]}>
                <Text style={styles.result}>{props.value}</Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('(')}>
                    <Text style={styles.buttonText}>(</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress(')')}>
                    <Text style={styles.buttonText}>)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('mc')}>
                    <Text style={styles.buttonText}>mc</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('m+')}>
                    <Text style={styles.buttonText}>m+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('m-')}>
                    <Text style={styles.buttonText}>m-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('mr')}>
                    <Text style={styles.buttonText}>mr</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('AC')}>
                    <Text style={styles.buttonText}>AC</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('+/-')}>
                    <Text style={styles.buttonText}>+/-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('%')}>
                    <Text style={styles.buttonText}>%</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.orange]} onPress={() => handlePress('/')}>
                    <Text style={styles.buttonText}>÷</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('2nd')}>
                    <Text style={styles.buttonText}>2ⁿᵈ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('x2')}>
                    <Text style={styles.buttonText}>x²</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('x3')}>
                    <Text style={styles.buttonText}>x³</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('xy')}>
                    <Text style={styles.buttonText}>xʸ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('ex')}>
                    <Text style={styles.buttonText}>eˣ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('10x')}>
                    <Text style={styles.buttonText}>10ˣ</Text>
                </TouchableOpacity>
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
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('1/x')}>
                    <Text style={styles.buttonText}>⅟ₓ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('2sqrtx')}>
                    <Text style={styles.buttonText}>²√x</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('3sqrtx')}>
                    <Text style={styles.buttonText}>³√x</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('ysqrtx')}>
                    <Text style={styles.buttonText}>ʸ√x</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('ln')}>
                    <Text style={styles.buttonText}>ln</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('log10')}>
                    <Text style={styles.buttonText}>log₁₀</Text>
                </TouchableOpacity>
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
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('x!')}>
                    <Text style={styles.buttonText}>x!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('sin')}>
                    <Text style={styles.buttonText}>sin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('cos')}>
                    <Text style={styles.buttonText}>cos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('tan')}>
                    <Text style={styles.buttonText}>tan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('e')}>
                    <Text style={styles.buttonText}>e</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('EE')}>
                    <Text style={styles.buttonText}>EE</Text>
                </TouchableOpacity>
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
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('Rad')}>
                    <Text style={styles.buttonText}>Rad</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('sinh')}>
                    <Text style={styles.buttonText}>sinh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('cosh')}>
                    <Text style={styles.buttonText}>cosh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('tanh')}>
                    <Text style={styles.buttonText}>tanh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('pi')}>
                    <Text style={styles.buttonText}>π</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.element, styles.darkGray]} onPress={() => handlePress('Rand')}>
                    <Text style={styles.buttonText}>Rand</Text>
                </TouchableOpacity>
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
        width: '10%',
        borderWidth: 1,
        borderColor: '#505155',
        textAlign: 'center',
        padding: 8,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 22,
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
        fontSize: 54,
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
