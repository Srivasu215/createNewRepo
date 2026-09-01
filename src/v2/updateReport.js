export function updateReport(
    report,
    fileResult
) {
    report.files.push(fileResult);

    report.filesScanned++;

    if (fileResult.error) {
        report.filesFailed++;
        return;
    }

    report.totalNodes +=
        fileResult.totalNodes;

    for (const [
        nodeType,
        count
    ] of Object.entries(
        fileResult.nodeTypes
    )) {
        report.nodeTypes[nodeType] =
            (report.nodeTypes[nodeType] || 0) +
            count;
    }
}