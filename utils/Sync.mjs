import fs from "node:fs/promises";
import path from "node:path";

import Routes from "./Routes.js";
import Core from "./Core.js";

const SyncEntry = async (processPath = `${Routes.source}/core.json`) => {
    const raw_data = await fs.readFile(path.join("./data/My Clippings.txt"), "utf8");
    try {
        let foundIndex;
        await fs.access(processPath);
        const prevCore = JSON.parse(await fs.readFile(processPath, "utf8"));
        const currentCore = Core.DataStructure(raw_data);

        const lastPrevEntry = prevCore[prevCore.length - 1];
        const indexCurrentEntry = currentCore.length - 1;

        if (lastPrevEntry.hasOwnProperty("highlight")) {
            foundIndex = currentCore.findIndex((n) => n.highlight === lastPrevEntry.highlight);
        } else {
            foundIndex = currentCore.findIndex((n) => n.note === lastPrevEntry.note);
        }

        if (!foundIndex || foundIndex === indexCurrentEntry) {
            console.info("Already Sync");
            return;
        }
    } catch (error) {
        console.error("\x1b[33mProcessed file cannot be access\x1b[0m");
        console.log(error);
        process.exit(1);
    }
};

await SyncEntry();
