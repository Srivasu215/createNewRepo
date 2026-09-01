import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Analyzer/v1
//        ↓
// Analyzer
//        ↓
// createNewRepo
export const PROJECT_ROOT = path.resolve(
    __dirname,
    "../.."
);

export const BASE_FILE = "app.js";

export const BASE_FILE_PATH = path.join(
    PROJECT_ROOT,
    BASE_FILE
);

export const OUTPUT_DIR = path.join(
    __dirname,"../../dist"
);

export const OUTPUT_FILE = path.join(
    OUTPUT_DIR,
    "project-ast.json"
);

export const IGNORE_DIRS = new Set([
    "node_modules",
    ".git",
    ".vscode",
    "dist",
    "Analyzer"
]);