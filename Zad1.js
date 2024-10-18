import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

class Zad1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        };
    }
    toggleVisibility = () => {
        this.setState(prevState => ({
            isVisible: !prevState.isVisible,
        }));
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Zadanie 2</Text>

                <TouchableOpacity onPress={this.toggleVisibility} style={styles.button}>
                    <Text style={styles.buttonText}>{this.state.isVisible ? 'Ukryj' : 'Pokaż'}</Text>
                </TouchableOpacity>

                {this.state.isVisible && (
                    <View>
                        <Text>Nazywam się</Text>
                        <Text style={styles.boldText}>Jakub Więcek</Text>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 18,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default Zad1;
