export default class Calculator {
    constructor() {
    }

    add(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Invalid input');
        }
        return a + b;
    }

    multiply(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Invalid input');
        }
        if (a === 0 || b === 0) {
            return 0;
        }
        return a * b;
    }

    divide(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Invalid input');
        }
        if (b === 0) {
            throw new Error('Division by zero');
        }
        return a / b;
    }
}
