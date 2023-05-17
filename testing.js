const path = require("path");
const fs = require("fs");

const directory = path.join(__dirname, "./data");
console.log("Directory => " + directory);

const file_names = fs.readdirSync(directory);
console.log(file_names);
