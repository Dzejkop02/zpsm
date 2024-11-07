import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function Button(props) {
    const {handlePress, title, bgc, disabled, big, vertical} = props;
    return (
        <TouchableOpacity style={[
            vertical ? styles.elementVertical : styles.element,
            big === 'big20' ? styles.big20 : big === 'big50' ? styles.big50 : null,
            {backgroundColor: bgc},
        ]} disabled={disabled} onPress={handlePress}>
            <Text style={vertical ? styles.buttonTextVertical : styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    elementVertical: {
        width: '25%',
        borderWidth: 1,
        borderColor: '#505155',
        textAlign: 'center',
        padding: 18,
    },
    element: {
        width: '9.999999%',
        borderWidth: 1,
        borderColor: '#505155',
        textAlign: 'center',
        padding: 8,
    },
    buttonTextVertical: {
        color: 'white',
        textAlign: 'center',
        fontSize: 38,
        fontWeight: '300',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
    },
    big20: {
        width: '20%',
    },
    big50: {
        width: '50%',
    },
});
