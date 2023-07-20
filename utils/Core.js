const Core = {
    /**
     *
     * @param {string} raw_text main source to classify the highlighted notes
     * @returns
     */
    DataStructure(raw_text) {
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
        return extracted_notes.filter((item) => item);
    },

    /**
     * GroupBy implementation to create an Array of objects(books by title) with its matching highlights
     * Object.values() would return an Array with all its string-keyed -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
     * @param {[]} collection Array of elements to perform the groupBy function
     * @param {string} by the key element to match and join
     * @returns {[]} Array of objects
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
};

module.exports = { Core };
