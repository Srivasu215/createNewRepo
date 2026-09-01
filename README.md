# Babel AST Project Analysis
A Node.js project for analyzing JavaScript and TypeScript source code using Babel Parser.

## Overview
- Parses source files into Babel AST.
- Scans `.js` and `.mjs` files recursively.
- Uses root `app.js` as the base project file.
- Counts AST nodes and node types.
- Generates a JSON analysis report.

## Project Structure
```text
createNewRepo/
├── app.js
├── Api/
├── Config/
├── Data/
└── Analyzer/v2/
    ├── app.js
    ├── config.js
    ├── analyzeFile.js
    ├── walkAst.js
    └── report files
```
## Run
```bash
npm install
node Analyzer/v2/app.js
```
Run the command from the project root.
## Output
`dist/project-ast.json` contains the analysis report.
## Ignored Directories
`node_modules`, `.git`, `.vscode` and `dist` are excluded.
## Analysis Flow
```text
Root app.js → Scan Files → Babel Parser → AST → Walk AST → Count Nodes → JSON
```
## Author
**KeshavSoft** — Parse · Inspect · Analyze · Automate
