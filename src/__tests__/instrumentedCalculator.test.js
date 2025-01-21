import { InstrumentedCalculator } from '../instrumentedCalculator.js';
import { CoverageTracker } from '../coverage.js';

describe('Instrumented Calculator', () => {
    let calculator;
    let coverageTracker;

    beforeEach(() => {
        coverageTracker = new CoverageTracker();
        calculator = new InstrumentedCalculator(coverageTracker);
    });

    test('should track successful addition', () => {
        calculator.add(2, 3);
        expect(coverageTracker.getCoveragePercentage()).toBeGreaterThan(0);
    });

    test('should track error in addition', () => {
        expect(() => calculator.add('invalid', 3)).toThrow();
        expect(coverageTracker.getCoveragePercentage()).toBeGreaterThan(0);
    });

    test('should track zero case in multiplication', () => {
        calculator.multiply(0, 5);
        expect(coverageTracker.getCoveragePercentage()).toBeGreaterThan(0);
    });

    test('should track division by zero', () => {
        expect(() => calculator.divide(5, 0)).toThrow();
        expect(coverageTracker.getCoveragePercentage()).toBeGreaterThan(0);
    });
});