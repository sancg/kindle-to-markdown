const fs = require("node:fs/promises");
const path = require("node:path");

const { source } = require("./Routes");
const File = require("./File");
/**
 * @typedef {{
 *  title: string,
 *  author?: string,
 *  reference: string,
 *  highlight?: string,
 *  note?: string
 * }} ExtractedNote
 *
 * @typedef {{
 *book: string;
 *annotations: [{
 *        reference: string;
 *       highlight?: string | undefined;
 *       note?: string | undefined;
 *  }]}} Book
 */

const Core = {
    fileParsedNotes: "parsedNotes.json",
    fileGroupedBook: "parsedBooks.json",
    /**
     *
     * @param {string} clippingFile Path where is located the clipping file
     * @returns {Promise<Book[]>}
     */
    async DataStructure(clippingFile) {
        const raw_text = await fs.readFile(clippingFile, "utf8");

        // Cut the file by the identified separator
        const all_notes = raw_text.split("==========");
        const extracted_notes = all_notes.map((item) => {
            const note = {};
            /*
            As it gets a raw_text it will leave a trace of unwanted spaces
            A carriage return moved your carriage all the way to the right 
            so you were typing at the start of the line. 
        */
            cleaning_note = item.replace(/\\r+/g, "").trim();

            schema = cleaning_note.split("\n");
            // Filtering empty data IE: raw text with a carriage return as "\r",
            schema = schema.filter((item) => item.trim());

            /**
             * title: The book's title itself
             * reference: where is allocated inside the book
             * annotation: Type of annotation -> Highlight, Bookmark, Note
             */
            const [title, reference, annotation] = schema;
            // If the schema hasn't values after the process it would return a null type
            if (schema.length < 1) return;

            /* ---- MAPPING THE OBJECT TO BE RETURNED ---- */
            note["title"] = title.trim();
            // Evaluating the book's author from the title
            const reg_author = new RegExp(/\(.*\)/, "g");
            if (reg_author.test(note.title)) {
                note["author"] = note.title.match(reg_author)[0].replace(/\(|\)/g, "").trim();
                note["title"] = note.title.replace(reg_author, "").trim();
            }

            note["reference"] = reference.replace(/^\-/, "").trim();

            // CHANGES THIS SECTION TO OBTAIN THE NOTES IN THEIR RESPECTIVE ORDER.
            let type_of_annotation = reference.includes("Your Highlight");

            if (!type_of_annotation) {
                type_of_annotation = reference.includes("Your Bookmark");
                if (!type_of_annotation) {
                    note["note"] = annotation?.trim();
                    return note;
                } else {
                    return;
                }
            }

            note["highlight"] = annotation.trim();
            return note;
        });

        // Deleting bookmarks from the results
        // And storage the files
        /**
         * @type {ExtractedNote[]}
         */
        const parseNotes = extracted_notes.filter((item) => item);
        /**
         * @type {Book[]}
         */
        const parseBooks = this.GroupBy(parseNotes);

        // NOTE: Evaluate if it is necessary to save the parsedBooks or only the last entry of the notes
        await File.SaveResults(parseNotes, `${source}/${this.fileParsedNotes}`);
        await File.SaveResults(parseBooks, `${source}/${this.fileGroupedBook}`);

        return parseBooks;
    },

    /**
     * GroupBy implementation to create an Array of objects(books by title) with its matching highlights
     * Object.values() would return an Array with all its string-keyed -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
     * @param {{
     *  title: string,
     *  author?: string,
     *  reference: string,
     *  highlight?: string,
     *  note?: string
     * }[]} collection Array of elements to perform the groupBy function
     * @returns {{
     *  book: string,
     *  annotations: [
     *      {reference: string, highlight?: string, note?: string}
     *  ]
     * }[]} Array of grouped books
     */
    GroupBy(collection) {
        return Object.values(
            collection.reduce((grouped, note) => {
                const { title, author, ...rest } = note;
                grouped[title] ??= { book: title, author, annotations: [] };
                grouped[title].annotations.push(rest);
                return grouped;
            }, {})
        );
    },

    /**
     *
     * @param {Book[]} library - Collection of parsed books
     * @returns {Promise<void>}
     */
    async formatNoteToMD(library) {
        const pathBook = await File.CreateFolder({ folder: "Notes", is_source: true });
        let text;
        return await Promise.all(
            library.map(async (item) => {
                const currentDate = new Date().toISOString().split("T").shift();
                text = `---
tags: reading
folder: undefined
author: ${item.author ?? "Mr. X"}
date: ${currentDate}  
---
`;
                text += `
# ${item.book}
## Fragments:
`;
                item.annotations.forEach((ad) => {
                    if (ad.highlight) {
                        text += `
\`\`\`ad-quote
title: ${ad.reference}
${ad.highlight}
\`\`\`
`;
                    } else {
                        text += `
\`\`\`ad-hint
title: ${ad.reference}
${ad.note}
\`\`\`
`;
                    }
                });
                await fs.writeFile(path.join(pathBook, `${item.book}.md`), text);
                // return text;
            })
        );
    },
};

module.exports = Core;
