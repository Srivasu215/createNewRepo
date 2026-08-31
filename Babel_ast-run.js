import fs from "node:fs";
import path from "node:path";
import { parse } from "@babel/parser";

const PROJECT_ROOT = process.cwd();
const BASE_FILE = "app.js";
const OUTPUT_DIR = path.join(PROJECT_ROOT, "Babel_ast-output");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "project-ast.json");

// Folders that should not be scanned
const IGNORE_DIRS = new Set([
    "node_modules",
    ".git",
    ".vscode",
    "Babel_ast-output"
]);

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const report = {
    baseFile: BASE_FILE,
    filesScanned: 0,
    filesFailed: 0,
    totalNodes: 0,
    totalNodeTypes: 0,
    nodeTypes: {},
    files: []
};

// --------------------------------------------------
// Get all JavaScript files recursively
// --------------------------------------------------

function getJavaScriptFiles(dir) {
    const files = [];

    const entries = fs.readdirSync(dir, {
        withFileTypes: true
    });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (!IGNORE_DIRS.has(entry.name)) {
                files.push(...getJavaScriptFiles(fullPath));
            }
        }

        if (
            entry.isFile() &&
            (entry.name.endsWith(".js") ||
                entry.name.endsWith(".mjs"))
        ) {
            files.push(fullPath);
        }
    }

    return files;
}

// --------------------------------------------------
// Recursively walk Babel AST
// --------------------------------------------------

function walkAst(node, result) {
    if (!node || typeof node !== "object") {
        return;
    }

    // Ignore Babel metadata
    if (node.type && typeof node.type === "string") {
        report.totalNodes++;

        result.totalNodes++;

        result.nodeTypes[node.type] =
            (result.nodeTypes[node.type] || 0) + 1;

        report.nodeTypes[node.type] =
            (report.nodeTypes[node.type] || 0) + 1;
    }

    for (const key of Object.keys(node)) {
        if (
            key === "loc" ||
            key === "start" ||
            key === "end" ||
            key === "extra"
        ) {
            continue;
        }

        const value = node[key];

        if (Array.isArray(value)) {
            for (const child of value) {
                walkAst(child, result);
            }
        } else if (
            value &&
            typeof value === "object"
        ) {
            walkAst(value, result);
        }
    }
}

// --------------------------------------------------
// Parse one JavaScript file
// --------------------------------------------------

function analyzeFile(filePath) {
    const relativePath = path.relative(
        PROJECT_ROOT,
        filePath
    );

    const source = fs.readFileSync(
        filePath,
        "utf8"
    );

    try {
        const ast = parse(source, {
            sourceType: "unambiguous",
            plugins: [
                "jsx",
                "typescript",
                "classProperties",
                "objectRestSpread",
                "optionalChaining",
                "dynamicImport",
                "topLevelAwait"
            ]
        });

        const fileResult = {
            file: relativePath,
            totalNodes: 0,
            nodeTypes: {}
        };

        walkAst(ast.program, fileResult);

        return fileResult;

    } catch (error) {
        report.filesFailed++;

        return {
            file: relativePath,
            error: error.message
        };
    }
}

// --------------------------------------------------
// Scan complete project
// --------------------------------------------------

const jsFiles = getJavaScriptFiles(PROJECT_ROOT);

// Keep app.js first
jsFiles.sort((a, b) => {
    if (path.basename(a) === BASE_FILE) return -1;
    if (path.basename(b) === BASE_FILE) return 1;
    return a.localeCompare(b);
});

// Analyze every file
for (const file of jsFiles) {
    const result = analyzeFile(file);

    report.files.push(result);
    report.filesScanned++;
}

// --------------------------------------------------
// Sort node types by count
// --------------------------------------------------

report.nodeTypes = Object.fromEntries(
    Object.entries(report.nodeTypes)
        .sort(([, a], [, b]) => b - a)
);

report.totalNodeTypes =
    Object.keys(report.nodeTypes).length;

// --------------------------------------------------
// Write JSON
// --------------------------------------------------

fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(report, null, 2),
    "utf8"
);

console.log("");
console.log("======================================");
console.log(" Babel AST Project Analysis");
console.log("======================================");
console.log("Base File      :", BASE_FILE);
console.log("Files Scanned  :", report.filesScanned);
console.log("Files Failed   :", report.filesFailed);
console.log("Total Nodes    :", report.totalNodes);
console.log("Node Types     :", report.totalNodeTypes);
console.log("Output         :", OUTPUT_FILE);
console.log("======================================");
console.log("");
console.log("Node Type Usage:");
console.table(report.nodeTypes);