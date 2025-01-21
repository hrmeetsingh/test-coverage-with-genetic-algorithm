// genetic-optimizer.test.js
import { GeneticTestOptimizer } from '../geneticTestOptimiser.js';
import { CoverageTracker } from '../coverage.js';
import { InstrumentedCalculator } from '../instrumentedCalculator.js';

describe('Genetic Test Optimizer', () => {
  let optimizer;
  
  beforeEach(() => {
    // Create a smaller population and fewer generations for testing
    optimizer = new GeneticTestOptimizer(10, 5);
  });

  test('should initialize population correctly', () => {
    optimizer.initializePopulation();
    expect(optimizer.population).toHaveLength(10);
    optimizer.population.forEach(testCase => {
      expect(testCase).toHaveProperty('a');
      expect(testCase).toHaveProperty('b');
      expect(typeof testCase.a).toBe('number');
      expect(typeof testCase.b).toBe('number');
    });
  });

  test('should calculate fitness correctly', () => {
    const testCase = { a: 5, b: 2 };
    const fitness = optimizer.calculateFitness(testCase);
    expect(typeof fitness).toBe('number');
    expect(fitness).toBeGreaterThanOrEqual(0);
    expect(fitness).toBeLessThanOrEqual(100);
  });

  test('should perform crossover correctly', () => {
    const parent1 = { a: 1, b: 2 };
    const parent2 = { a: 3, b: 4 };
    const child = optimizer.crossover(parent1, parent2);
    
    expect(child).toHaveProperty('a');
    expect(child).toHaveProperty('b');
    expect([parent1.a, parent2.a]).toContain(child.a);
    expect([parent1.b, parent2.b]).toContain(child.b);
  });

  test('should perform mutation within specified range', () => {
    const testCase = { a: 50, b: 50 };
    const mutated = optimizer.mutate(testCase, 1.0); // Force mutation
    
    expect(mutated.a).toBeGreaterThanOrEqual(optimizer.testDataRange.min);
    expect(mutated.a).toBeLessThanOrEqual(optimizer.testDataRange.max);
    expect(mutated.b).toBeGreaterThanOrEqual(optimizer.testDataRange.min);
    expect(mutated.b).toBeLessThanOrEqual(optimizer.testDataRange.max);
  });

  test('should complete optimization process', () => {
    const result = optimizer.optimize();
    
    expect(result).toHaveProperty('bestTestCase');
    expect(result).toHaveProperty('coverage');
    expect(typeof result.coverage).toBe('number');
    expect(result.coverage).toBeGreaterThanOrEqual(0);
    expect(result.coverage).toBeLessThanOrEqual(100);
  });
});

// coverage.test.js
describe('Coverage Tracker', () => {
  let coverageTracker;
  
  beforeEach(() => {
    coverageTracker = new CoverageTracker();
  });

  test('should track function calls', () => {
    coverageTracker.trackFunctionCall('add', 'success');
    expect(coverageTracker.getCoveragePercentage()).toBeGreaterThan(0);
  });

  test('should reset coverage data', () => {
    coverageTracker.trackFunctionCall('add', 'success');
    coverageTracker.reset();
    expect(coverageTracker.getCoveragePercentage()).toBe(0);
  });
});

// instrumentedCalculator.test.js
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