const fs = require("fs");
const path = require("path");

const Folder = {
    root: path.dirname(__dirname),
    testing: `${path.dirname(__dirname)}/data/testing`,
};

const File = {
    /**
     * CreateFolder checks whether a folder exists to create it
     * @param {string} folder folder name
     * @param {boolean} is_testing if **true** it would created a path for testing files in the ***./data/testing*** path
     * @returns path for the created folder
     */
    async CreateFolder(folder = "", is_testing = false) {
        let wanted_path = `${Folder.root}/data/${folder}`;
        if (is_testing) wanted_path = `${Folder.testing}/${folder}`;

        if (fs.existsSync(wanted_path)) {
            console.log("\x1b[33mFile or directory already created\x1b[0m");
        } else {
            await fs.promises.mkdir(wanted_path, { recursive: true });
        }
        return wanted_path;
    },

    async SaveResults(notes, path_file = null) {
        path_file = path_file ?? "./data/generic_results.json";
        await fs.promises.writeFile(path_file, JSON.stringify(notes, null, 4));
    },
};
module.exports = { File };
