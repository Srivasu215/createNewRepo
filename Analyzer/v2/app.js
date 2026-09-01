import path from "node:path";

import {
    PROJECT_ROOT,
    BASE_FILE,
    BASE_FILE_PATH,
    OUTPUT_DIR,
    OUTPUT_FILE
} from "./config.js";

import {
    getJavaScriptFiles
} from "./getJavaScriptFiles.js";

import {
    analyzeFile
} from "./analyzeFile.js";

import {
    createReport
} from "./createReport.js";

import {
    updateReport
} from "./updateReport.js";

import {
    sortNodeTypes
} from "./sortNodeTypes.js";

import {
    writeReport
} from "./writeReport.js";

import {
    displayReport
} from "./displayReport.js";

// ------------------------------------------
// 1. Create report
// ------------------------------------------

const report =
    createReport(BASE_FILE);

// ------------------------------------------
// 2. Check BASE app.js
// ------------------------------------------

console.log(
    "Project Root:",
    PROJECT_ROOT
);

console.log(
    "Base File:",
    BASE_FILE_PATH
);

// ------------------------------------------
// 3. Get project JavaScript files
// ------------------------------------------

const jsFiles =
    getJavaScriptFiles(
        PROJECT_ROOT
    );

// ------------------------------------------
// 4. Keep ROOT app.js first
// ------------------------------------------

jsFiles.sort((a, b) => {

    if (a === BASE_FILE_PATH) {
        return -1;
    }

    if (b === BASE_FILE_PATH) {
        return 1;
    }

    return a.localeCompare(b);
});

// ------------------------------------------
// 5. Analyze files
// ------------------------------------------

for (const file of jsFiles) {

    console.log(
        "Analyzing:",
        path.relative(
            PROJECT_ROOT,
            file
        )
    );

    const result =
        analyzeFile(
            file,
            PROJECT_ROOT
        );

    updateReport(
        report,
        result
    );
}

// ------------------------------------------
// 6. Sort node types
// ------------------------------------------

sortNodeTypes(report);

// ------------------------------------------
// 7. Write JSON
// ------------------------------------------

writeReport(
    OUTPUT_DIR,
    OUTPUT_FILE,
    report
);

// ------------------------------------------
// 8. Display
// ------------------------------------------

displayReport(
    report,
    OUTPUT_FILE
);