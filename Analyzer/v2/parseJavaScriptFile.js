import { parse } from "@babel/parser";

export function parseJavaScriptFile(source) {
    return parse(source, {
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
}