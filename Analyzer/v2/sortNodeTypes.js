export function sortNodeTypes(report) {
    report.nodeTypes =
        Object.fromEntries(
            Object.entries(
                report.nodeTypes
            ).sort(
                ([, a], [, b]) => b - a
            )
        );

    report.totalNodeTypes =
        Object.keys(
            report.nodeTypes
        ).length;

    return report;
}