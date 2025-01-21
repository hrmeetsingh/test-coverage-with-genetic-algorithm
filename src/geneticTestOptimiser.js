import { CoverageTracker } from "./coverage";
import { InstrumentedCalculator } from "./instrumentedCalculator";

export class GeneticTestOptimizer {
    constructor(populationSize = 20, generations = 50) {
      this.populationSize = populationSize;
      this.generations = generations;
      this.population = [];
      this.testDataRange = {
        min: -100,
        max: 100
      };
      this.coverageTracker = new CoverageTracker();
    }
  
    initializePopulation() {
      for (let i = 0; i < this.populationSize; i++) {
        const testCase = {
          a: this.getRandomNumber(),
          b: this.getRandomNumber()
        };
        this.population.push(testCase);
      }
    }
  
    getRandomNumber() {
      return Math.floor(Math.random() * (this.testDataRange.max - this.testDataRange.min + 1)) + this.testDataRange.min;
    }
  
    calculateFitness(testCase) {
      this.coverageTracker.reset();
      const calculator = new InstrumentedCalculator(this.coverageTracker);
  
      try {
        // Run all test cases
        calculator.add(testCase.a, testCase.b);
        calculator.multiply(testCase.a, testCase.b);
        calculator.divide(testCase.a, testCase.b);
      } catch (error) {
        // Errors are expected and handled by coverage tracking
      }
  
      return this.coverageTracker.getCoveragePercentage();
    }
  
    selectParents() {
      const tournamentSize = 3;
      const tournament = [];
      
      for (let i = 0; i < tournamentSize; i++) {
        const randomIndex = Math.floor(Math.random() * this.population.length);
        tournament.push({
          testCase: this.population[randomIndex],
          fitness: this.calculateFitness(this.population[randomIndex])
        });
      }
  
      tournament.sort((a, b) => b.fitness - a.fitness);
      return tournament[0].testCase;
    }
  
    crossover(parent1, parent2) {
      const child = {
        a: Math.random() < 0.5 ? parent1.a : parent2.a,
        b: Math.random() < 0.5 ? parent1.b : parent2.b
      };
      return child;
    }
  
    mutate(testCase, mutationRate = 0.1) {
      const mutated = { ...testCase };
      if (Math.random() < mutationRate) {
        mutated.a = this.getRandomNumber();
      }
      if (Math.random() < mutationRate) {
        mutated.b = this.getRandomNumber();
      }
      return mutated;
    }
  
    optimize() {
      this.initializePopulation();
      let bestOverallFitness = 0;
      let bestOverallTestCase = null;
      
      for (let generation = 0; generation < this.generations; generation++) {
        const newPopulation = [];
        const fitnessScores = this.population.map(testCase => ({
          testCase,
          fitness: this.calculateFitness(testCase)
        }));
  
        // Keep track of best solution
        const bestInGeneration = fitnessScores.reduce((best, current) => 
          current.fitness > best.fitness ? current : best
        );
  
        if (bestInGeneration.fitness > bestOverallFitness) {
          bestOverallFitness = bestInGeneration.fitness;
          bestOverallTestCase = bestInGeneration.testCase;
        }
  
        console.log(`Generation ${generation + 1}: Best Coverage = ${bestInGeneration.fitness.toFixed(2)}%`);
  
        // Create new population
        while (newPopulation.length < this.populationSize) {
          const parent1 = this.selectParents();
          const parent2 = this.selectParents();
          let offspring = this.crossover(parent1, parent2);
          offspring = this.mutate(offspring);
          newPopulation.push(offspring);
        }
  
        this.population = newPopulation;
  
        // Early termination if we achieve 100% coverage
        if (bestOverallFitness === 100) {
          console.log('Achieved 100% coverage! Stopping early.');
          break;
        }
      }
  
      return {
        bestTestCase: bestOverallTestCase,
        coverage: bestOverallFitness
      };
    }
  }
  