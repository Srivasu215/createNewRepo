export function displayReport(
    report,
    outputFile
) {
    console.log("");

    console.log(
        "======================================"
    );

    console.log(
        " Babel AST Project Analysis"
    );

    console.log(
        "======================================"
    );

    console.log(
        "Base File      :",
        report.baseFile
    );

    console.log(
        "Files Scanned  :",
        report.filesScanned
    );

    console.log(
        "Files Failed   :",
        report.filesFailed
    );

    console.log(
        "Total Nodes    :",
        report.totalNodes
    );

    console.log(
        "Node Types     :",
        report.totalNodeTypes
    );

    console.log(
        "Output         :",
        outputFile
    );

    console.log(
        "======================================"
    );

    console.log("");

    console.log(
        "Node Type Usage:"
    );

    console.table(
        report.nodeTypes
    );
}