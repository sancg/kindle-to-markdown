const fs = require("node:fs");
const path = require("node:path");

const File = require("./utils/File");
const Core = require("./utils/Core");

const file_path = path.join(__dirname, "./data/My Clippings.txt");
const raw_data = fs.readFileSync(file_path, "utf8");

(async () => {
    // TODO: Sync file -> It must be a function to search into the core.json the last entry
    // as a reference point to Sync the new entries.

    // Default naming files -------------->
    const converted_file = "core.json";
    const books = "books.json";

    const root = await File.CreateFolder({ is_source: true });

    // Structuring Notes from the Clipping.txt --------------->
    const notes = Core.DataStructure(raw_data);
    const separateBooks = Core.GroupBy(notes);
    await File.SaveResults(notes, `${root}/${converted_file}`);
    await File.SaveResults(separateBooks, `${root}/${books}`);
})();
