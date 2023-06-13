const path = require("path");
const fs = require("fs");

const directory = path.join(__dirname, "./data");
console.log("Directory => " + directory);

const file_names = fs.readdirSync(directory);
const only_text_files = file_names.filter((item) => item.includes(".txt"));

const full_path = path.dirname(__filename);
const file_needed = path.join(__dirname, "root from the file");
console.log(full_path);
console.log(file_needed);
