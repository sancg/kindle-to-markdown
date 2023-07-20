const fs = require("fs");
const path = require("path");
const { File } = require("./utils/File");
const { Core } = require("./utils/Core");

const file_path = path.join(__dirname, "./data/My Clippings.txt");
const raw_data = fs.readFileSync(file_path, "utf8");

(async () => {
    const converted_file = "core.json";
    const books = "books.json";

    const root = await File.CreateFolder("", true);
    const notes = Core.DataStructure(raw_data);

    const separate_books = Core.GroupBy(notes);
    await File.SaveResults(notes, `${root}/${converted_file}`);
    await File.SaveResults(separate_books, `${root}/${books}`);
})();
// console.log(grouping);
