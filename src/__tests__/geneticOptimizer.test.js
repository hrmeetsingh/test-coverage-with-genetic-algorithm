import { GeneticTestOptimizer } from '../geneticTestOptimiser.js';

describe('Genetic Test Optimizer', () => {
  let optimizer;
  
  beforeEach(() => {
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
