import { execSync } from 'child_process';
import fs from 'fs';

export async function runTestWithCoverage(testCase) {
  // Generate test file with current test case
  const testContent = `
    import { complexMath } from './mathOperations.js';
    
    describe('complexMath', () => {
      test('with generated values', () => {
        const result = complexMath(${testCase.a}, ${testCase.b}, ${testCase.c});
        expect(typeof result).toBe('number');
      });
    });
  `;

  fs.writeFileSync('src/__tests__/generated.test.js', testContent);

  // Run Jest with coverage
  try {
    execSync('npx jest --coverage', { stdio: 'pipe' });
    const coverage = JSON.parse(fs.readFileSync('coverage/coverage-final.json'));
    
    // Calculate overall coverage percentage
    const stats = getCoverageStats(coverage);
    return {
      percentage: stats.percentage,
      details: stats.details
    };
  } catch (error) {
    console.error('Test execution failed:', error);
    return { percentage: 0, details: {} };
  }
}