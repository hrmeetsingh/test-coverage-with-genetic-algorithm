import { optimizeTestCoverage } from './orchestrator.js';

const result = await optimizeTestCoverage();
console.log('Best test case:', result);