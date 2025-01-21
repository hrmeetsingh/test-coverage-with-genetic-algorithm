import { optimizeTestCoverage } from './orchestrator.js';

// Example usage script (src/example.js)
async function runExample() {
    console.log('Starting test coverage optimization...');
    
    try {
      const bestTestCase = await optimizeTestCoverage();
      
      console.log('\nOptimization complete!');
      console.log('Best test case found:', bestTestCase);
      console.log('Achieved coverage:', bestTestCase.fitness + '%');
      
      // Run the actual function with the optimized values
      const result = complexMath(
        bestTestCase.a,
        bestTestCase.b,
        bestTestCase.c
      );
      console.log('Function output with optimized values:', result);
    } catch (error) {
      console.error('Error during optimization:', error);
    }
  }


// Run the example if this file is executed directly
// if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runExample();
// }