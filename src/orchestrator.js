import { GeneticOptimizer } from './geneticOptimiser.js';

export async function optimizeTestCoverage() {
    const optimizer = new GeneticOptimizer();
    optimizer.initializePopulation();
  
    const maxGenerations = 50;
    const targetCoverage = 95;
  
    while (optimizer.generation < maxGenerations && optimizer.bestFitness < targetCoverage) {
      await optimizer.evolve();
      console.log(`Generation ${optimizer.generation}: Best Coverage = ${optimizer.bestFitness}%`);
      
      if (optimizer.bestFitness >= targetCoverage) {
        console.log('Target coverage achieved!');
        break;
      }
    }
  
    return optimizer.population.reduce((a, b) => a.fitness > b.fitness ? a : b);
  }