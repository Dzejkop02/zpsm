import React, {useEffect} from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Calculator from './Calculator/Calculator';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
    useEffect(() => {
        SplashScreen.hide();
    });
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
