# Babel AST Project Analysis

A Node.js project that analyzes JavaScript/TypeScript code and generates an Abstract Syntax Tree (AST) using Babel.

## Getting Started

clone 
```bash
https://github.com/Srivasu215/createNewRepo
```

### Installation

```bash
npm install
```

### Running Babel AST Analysis

Generate the AST analysis for the project:

```bash
node Babel_ast-run.js
```

This will create:
- **Output folder**: `dist/`
- **Analysis file**: `project-ast.json`

### Sample Output

The script analyzes your codebase and provides:
- **Files Scanned**: 20
- **Total Nodes**: 1882
- **Node Types**: 50+
- **Top Node Types**: Identifier (732), MemberExpression (153), CallExpression (127), etc.
