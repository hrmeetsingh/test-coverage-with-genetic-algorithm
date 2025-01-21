import { CoverageTracker } from '../coverage.js';

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