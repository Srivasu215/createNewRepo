import fs from "node:fs";

export function writeReport(
    outputDir,
    outputFile,
    report
) {
    fs.mkdirSync(
        outputDir,
        {
            recursive: true
        }
    );

    fs.writeFileSync(
        outputFile,
        JSON.stringify(
            report,
            null,
            2
        ),
        "utf8"
    );
}