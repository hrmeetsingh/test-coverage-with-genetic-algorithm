export class CoverageTracker {
    constructor() {
        this.coverageData = new Map();
        this.reset();
    }

    reset() {
        this.coverageData.clear();
        this.currentTestPassed = true;
    }

    trackFunctionCall(functionName, branchId = 'default') {
        if (!this.coverageData.has(functionName)) {
            this.coverageData.set(functionName, new Set());
        }
        this.coverageData.get(functionName).add(branchId);
    }

    getCoveragePercentage() {
        // Calculate total possible branches
        const totalPossibleBranches = {
            add: 2,      // normal path + error path
            multiply: 3,  // normal path + error path + zero path
            divide: 3     // normal path + error path + division by zero path
        };

        let coveredBranches = 0;
        let totalBranches = 0;

        for (const [functionName, branches] of this.coverageData.entries()) {
            coveredBranches += branches.size;
            totalBranches += totalPossibleBranches[functionName] || 0;
        }

        return totalBranches === 0 ? 0 : (coveredBranches / totalBranches) * 100;
    }
}