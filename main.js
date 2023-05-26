const fs = require("fs");
const path = require("path");

const file_path = path.join(__dirname, "./data/My Clippings.txt");
const data = fs.readFileSync(file_path, "utf8");

const data_structure = (raw_text) => {
    const all_notes = raw_text.split("=========="); // Cut the file by the identified separator
    const extracted_notes = all_notes.map((item) => {
        const note = {};
        cleaning_note = item.replace(/\\r+/g, "").trim(); // As it gets a raw_text

        schema = cleaning_note.split("\n");
        /* Filtering empty data IE: raw text appeared as "\r",
         * but using the trim() it gets an empty string.
         */
        schema = schema.filter((item) => item.trim());
        const [title, reference, annotation] = schema;
        // If the schema hasn't values after the process it would return a null type
        if (schema.length < 1) return;

        note.title = title.trim();
        // Evaluating the book's author
        const reg_author = new RegExp(/\(.*\)/, "g");
        if (reg_author.test(note.title)) {
            note.author = note.title.match(reg_author)[0].replace(/\(|\)/g, "").trim();
            note.title = note.title.replace(reg_author, "").trim();
        }

        // CHANGES THIS SECTION TO OBTAIN THE NOTES AS WELL IN THEIR RESPECTIVE ORDER.
        let type_of_annotation = reference.includes("Your Highlight");
        note.reference = reference.replace(/^\-/, "").trim();
        if (!type_of_annotation) {
            type_of_annotation = reference.includes("Your Bookmark");
            if (!type_of_annotation) {
                note.note = annotation?.trim();
                return note;
            } else {
                return;
            }
        }
        // console.log(is_highlight);

        note.highlight = annotation.trim();
        return note;
    });

    return extracted_notes;
};

const notes = data_structure(data).filter((item) => item);
// console.log(data_structure(data));

/**Group-by implementation to create an Array of objects(books by title) with its matching highlights
 *
 * Object.values() would return an Array with all its string-keyed -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
 */
const grouping = Object.values(
    notes.reduce((grouped, note) => {
        const { title, author, ...rest } = note;
        grouped[title] ??= { book: title, author, highlights: [] };
        grouped[title].highlights.push(rest);
        return grouped;
    }, {})
);
// console.log(grouping);
fs.writeFileSync("./data/result.json", JSON.stringify(grouping, null, 4));
