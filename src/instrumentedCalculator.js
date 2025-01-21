import Calculator from './testSubject';  
export class InstrumentedCalculator {
    constructor(coverageTracker) {
      this.calculator = new Calculator();
      this.coverage = coverageTracker;
    }
  
    add(a, b) {
      try {
        const result = this.calculator.add(a, b);
        this.coverage.trackFunctionCall('add', 'success');
        return result;
      } catch (error) {
        this.coverage.trackFunctionCall('add', 'error');
        throw error;
      }
    }
  
    multiply(a, b) {
      try {
        if (a === 0 || b === 0) {
          this.coverage.trackFunctionCall('multiply', 'zero');
        }
        const result = this.calculator.multiply(a, b);
        this.coverage.trackFunctionCall('multiply', 'success');
        return result;
      } catch (error) {
        this.coverage.trackFunctionCall('multiply', 'error');
        throw error;
      }
    }
  
    divide(a, b) {
      try {
        if (b === 0) {
          this.coverage.trackFunctionCall('divide', 'zero');
          throw new Error('Division by zero');
        }
        const result = this.calculator.divide(a, b);
        this.coverage.trackFunctionCall('divide', 'success');
        return result;
      } catch (error) {
        this.coverage.trackFunctionCall('divide', 'error');
        throw error;
      }
    }
  }