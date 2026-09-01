export function createReport(baseFile) {
    return {
        baseFile,
        filesScanned: 0,
        filesFailed: 0,
        totalNodes: 0,
        totalNodeTypes: 0,
        nodeTypes: {},
        files: []
    };
}