import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import { evaluate } from 'mathjs';

import CalculatorVertical from './CalculatorVertical';
import CalculatorHorizontal from './CalculatorHorizontal';

export default function Calculator() {
    const [currentInput, setCurrentInput] = useState('0');
    const [memory, setMemory] = useState(0);
    const [isRad, setIsRad] = useState(false);
    const [isHorizontal, setIsHorizontal] = useState(
        Dimensions.get('window').width > Dimensions.get('window').height
    );

    const factorial = (n: number): number | string => {
        if (n < 0 || !Number.isInteger(n)) {return 'Error';}
        if (n === 0 || n === 1) {return 1;}
        let result = 1;
        for (let i = 2; i <= n; i++) {result *= i;}
        return result;
    };

    const calculate = (arg: string) => {
        if (arg === 'AC') {
            setCurrentInput('0');
            return;
        }

        if (arg === '+/-') {
            if (currentInput.startsWith('-')) {
                setCurrentInput(currentInput.substring(1));
            } else {
                setCurrentInput('-' + currentInput);
            }
            return;
        }

        if (arg === '%') {
            setCurrentInput((parseFloat(currentInput) / 100).toString());
            return;
        }

        if (arg === '.') {
            if (!currentInput.includes('.')) {
                setCurrentInput(currentInput + '.');
            }
            return;
        }

        if ('0123456789'.includes(arg)) {
            if (currentInput === '0') {
                setCurrentInput(arg);
            } else {
                setCurrentInput(currentInput + arg);
            }
            return;
        }

        if (['+', '-', '*', '/'].includes(arg)) {
            setCurrentInput(currentInput + arg);
            return;
        }

        if (arg === '=') {
            try {
                const result = evaluate(currentInput);
                setCurrentInput(result.toString());
            } catch (e) {
                setCurrentInput('Error');
            }
            return;
        }

        if (arg === 'mc') {
            setMemory(0);
            return;
        }

        if (arg === 'm+') {
            setMemory(memory + parseFloat(currentInput));
            return;
        }

        if (arg === 'm-') {
            setMemory(memory - parseFloat(currentInput));
            return;
        }

        if (arg === 'mr') {
            setCurrentInput(memory.toString());
            return;
        }

        if (arg === 'sin') {
            let input = parseFloat(currentInput);
            if (!isRad) {
                input = input * (Math.PI / 180);
            }
            setCurrentInput(Math.sin(input).toString());
            return;
        }

        if (arg === 'cos') {
            let input = parseFloat(currentInput);
            if (!isRad) {
                input = input * (Math.PI / 180);
            }
            setCurrentInput(Math.cos(input).toString());
            return;
        }

        if (arg === 'tan') {
            let input = parseFloat(currentInput);
            if (!isRad) {
                input = input * (Math.PI / 180);
            }
            setCurrentInput(Math.tan(input).toString());
            return;
        }

        if (arg === 'sinh') {
            let input = parseFloat(currentInput);
            let result = Math.sinh(input);
            setCurrentInput(result.toString());
            return;
        }

        if (arg === 'cosh') {
            let input = parseFloat(currentInput);
            let result = Math.cosh(input);
            setCurrentInput(result.toString());
            return;
        }

        if (arg === 'tanh') {
            let input = parseFloat(currentInput);
            let result = Math.tanh(input);
            setCurrentInput(result.toString());
            return;
        }

        if (arg === 'x!') {
            const input = parseFloat(currentInput);
            const result = factorial(input);
            setCurrentInput(result.toString());
            return;
        }

        if (arg === 'Rad') {
            setIsRad(true);
            return;
        }

        if (arg === 'Deg') {
            setIsRad(false);
            return;
        }

        if (arg === 'pi') {
            setCurrentInput(Math.PI.toString());
            return;
        }

        if (arg === 'e') {
            setCurrentInput(Math.E.toString());
            return;
        }

        if (arg === 'x2' || arg === 'x²') {
            let input = parseFloat(currentInput);
            let result = input * input;
            setCurrentInput(result.toString());
            return;
        }

        if (arg === 'x3' || arg === 'x³') {
            let input = parseFloat(currentInput);
            let result = input * input * input;
            setCurrentInput(result.toString());
            return;
        }

        if (arg === '1/x') {
            let input = parseFloat(currentInput);
            if (input === 0) {
                setCurrentInput('Error');
            } else {
                let result = 1 / input;
                setCurrentInput(result.toString());
            }
            return;
        }

        if (arg === '2sqrtx') {
            let input = parseFloat(currentInput);
            if (input < 0) {
                setCurrentInput('Error');
            } else {
                let result = Math.sqrt(input);
                setCurrentInput(result.toString());
            }
            return;
        }

        if (arg === '3sqrtx') {
            let input = parseFloat(currentInput);
            let result = Math.cbrt(input);
            setCurrentInput(result.toString());
            return;
        }

        if (arg === 'ln') {
            let input = parseFloat(currentInput);
            if (input <= 0) {
                setCurrentInput('Error');
            } else {
                let result = Math.log(input);
                setCurrentInput(result.toString());
            }
            return;
        }

        if (arg === 'log10') {
            let input = parseFloat(currentInput);
            if (input <= 0) {
                setCurrentInput('Error');
            } else {
                let result = Math.log10(input);
                setCurrentInput(result.toString());
            }
            return;
        }

        if (arg === 'ex') {
            let input = parseFloat(currentInput);
            let result = Math.exp(input);
            setCurrentInput(result.toString());
            return;
        }

        if (arg === '10x') {
            let input = parseFloat(currentInput);
            let result = Math.pow(10, input);
            setCurrentInput(result.toString());
            return;
        }
    };

    useEffect(() => {
        const handleOrientationChange = () => {
            const {width, height} = Dimensions.get('window');
            setIsHorizontal(width > height);
        };
        const subscription = Dimensions.addEventListener('change', handleOrientationChange);
        return () => {
            subscription.remove();
        };
    }, []);

    return isHorizontal ? (
        <CalculatorHorizontal handlePress={calculate} value={currentInput} />
    ) : (
        <CalculatorVertical handlePress={calculate} value={currentInput} />
    );
}
