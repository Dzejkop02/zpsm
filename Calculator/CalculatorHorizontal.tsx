import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Button from './Button';
import {buttonsHorizontal} from './buttonsList';

export default function CalculatorHorizontal(props) {
    const {handlePress} = props;
    return (
        <View style={styles.calculatorContainer}>
            <View style={[styles.resultBox]}>
                <Text style={styles.result}>{props.value}</Text>
            </View>
            <View style={styles.buttons}>
                {buttonsHorizontal.map((btn, i) => (
                    <Button
                        key={i}
                        title={btn.title}
                        bgc={btn.bgc}
                        disabled={btn.disable}
                        big={btn.big}
                        handlePress={() => handlePress(btn.onPressText)}
                        vertical={false}
                    />))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    calculatorContainer: {
        flexGrow: 1,
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    element: {
        width: '9.999999%',
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
    big20: {
        width: '20%',
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
