import fs from "node:fs";
import path from "node:path";

import { IGNORE_DIRS } from "./config.js";

export function getJavaScriptFiles(dir) {

    const files = [];

    const entries = fs.readdirSync(
        dir,
        {
            withFileTypes: true
        }
    );

    for (const entry of entries) {

        const fullPath = path.join(
            dir,
            entry.name
        );

        // -------------------------------
        // Directory
        // -------------------------------

        if (entry.isDirectory()) {

            if (
                IGNORE_DIRS.has(entry.name)
            ) {
                continue;
            }

            files.push(
                ...getJavaScriptFiles(
                    fullPath
                )
            );

            continue;
        }

        // -------------------------------
        // JavaScript files
        // -------------------------------

        if (
            entry.isFile() &&
            (
                entry.name.endsWith(".js") ||
                entry.name.endsWith(".mjs")
            )
        ) {
            files.push(fullPath);
        }
    }

    return files;
}