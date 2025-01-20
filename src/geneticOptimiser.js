import { runTestWithCoverage } from "./testRunner.js";

export class GeneticOptimizer {
    constructor(populationSize = 20, mutationRate = 0.1) {
      this.populationSize = populationSize;
      this.mutationRate = mutationRate;
      this.generation = 0;
      this.population = [];
      this.bestFitness = 0;
    }
  
    // Initialize random population
    initializePopulation() {
      for (let i = 0; i < this.populationSize; i++) {
        this.population.push({
          a: Math.random() * 20,
          b: Math.random() * 20,
          c: Math.random() * 10
        });
      }
    }
  
    // Calculate fitness based on code coverage
    async calculateFitness(testCase) {
      // Run tests with the current test case and get coverage
      const coverage = await runTestWithCoverage(testCase);
      return coverage.percentage;
    }
  
    // Select parents using tournament selection
    selectParent() {
      const tournamentSize = 3;
      let best = this.population[Math.floor(Math.random() * this.population.length)];
      
      for (let i = 0; i < tournamentSize - 1; i++) {
        const contestant = this.population[Math.floor(Math.random() * this.population.length)];
        if (contestant.fitness > best.fitness) {
          best = contestant;
        }
      }
      return best;
    }
  
    // Crossover two parents to create a child
    crossover(parent1, parent2) {
      return {
        a: Math.random() < 0.5 ? parent1.a : parent2.a,
        b: Math.random() < 0.5 ? parent1.b : parent2.b,
        c: Math.random() < 0.5 ? parent1.c : parent2.c
      };
    }
  
    // Mutate a test case
    mutate(testCase) {
      const mutated = { ...testCase };
      if (Math.random() < this.mutationRate) mutated.a += (Math.random() - 0.5) * 4;
      if (Math.random() < this.mutationRate) mutated.b += (Math.random() - 0.5) * 4;
      if (Math.random() < this.mutationRate) mutated.c += (Math.random() - 0.5) * 2;
      return mutated;
    }
  
    // Evolve the population
    async evolve() {
      // Calculate fitness for current population
      for (const testCase of this.population) {
        testCase.fitness = await this.calculateFitness(testCase);
        if (testCase.fitness > this.bestFitness) {
          this.bestFitness = testCase.fitness;
        }
      }
  
      const newPopulation = [];
  
      // Elitism: Keep the best performing test case
      const elite = this.population.reduce((a, b) => a.fitness > b.fitness ? a : b);
      newPopulation.push({ ...elite });
  
      // Generate new population
      while (newPopulation.length < this.populationSize) {
        const parent1 = this.selectParent();
        const parent2 = this.selectParent();
        let child = this.crossover(parent1, parent2);
        child = this.mutate(child);
        newPopulation.push(child);
      }
  
      this.population = newPopulation;
      this.generation++;
    }
  }