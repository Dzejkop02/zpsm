import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Button from './Button';
import {buttonsVertical} from './buttonsList';

export default function CalculatorVertical(props) {
    const {handlePress} = props;
    return (
        <View style={styles.calculatorContainer}>
            <View style={[styles.resultBox]}>
                <Text style={styles.result}>{props.value}</Text>
            </View>

            <View style={styles.buttons}>
                {buttonsVertical.map((btn, i) => (
                    <Button
                        key={i}
                        title={btn.title}
                        bgc={btn.bgc}
                        disabled={btn.disable}
                        big={btn.big}
                        handlePress={() => handlePress(btn.onPressText)}
                        vertical={true}
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
});
