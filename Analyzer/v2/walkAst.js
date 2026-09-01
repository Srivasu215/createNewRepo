export function walkAst(node, result) {
    if (!node || typeof node !== "object") {
        return;
    }

    if (
        node.type &&
        typeof node.type === "string"
    ) {
        result.totalNodes++;

        result.nodeTypes[node.type] =
            (result.nodeTypes[node.type] || 0) + 1;
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