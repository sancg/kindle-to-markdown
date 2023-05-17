const fs = require("fs");
const { it } = require("node:test");
const path = require("path");

const file_path = path.join(__dirname, "./data/My Clippings.txt");
const data = fs.readFileSync(file_path, "utf8");

const data_structure = (raw_text) => {
    const all_notes = raw_text.split("==========");
    const extracted_notes = all_notes.map((item) => {
        const note = {};
        cleaning_note = item.replace(/\\r+/g, "").trim();

        schema = cleaning_note.split("\n");
        schema = schema.filter((item) => item.trim()); // Filtering empty data

        if (schema.length < 1) return;

        note.title = schema[0].trim();
        note.author = note.title
            .match(/\(.*\)/)?.[0]
            ?.replace(/\(|\)/g, "")
            ?.trim();
        const is_highlight = schema.find((item) => /Your Highlight/gi.test(item.trim()));
        if (!is_highlight) return;
        // console.log(is_highlight);

        note.reference = is_highlight;
        note.highlight = schema[2]?.trim();
        return note;
    });

    return extracted_notes;
};

const notes = data_structure(data).filter((item) => item);
// console.log(notes);
const grouping = Object.values(
    notes.reduce((grouped, note) => {
        const { title, author, ...rest } = note;
        grouped[title] ??= { book: title, author, highlights: [] };
        grouped[title].highlights.push(rest);
        return grouped;
    }, {})
);

console.log(grouping);
fs.writeFileSync("./data/result.json", JSON.stringify(grouping, null, 4));
