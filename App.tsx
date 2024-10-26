import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Calculator from './Calculator/Calculator';

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Calculator/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'sans-serif',
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
});
