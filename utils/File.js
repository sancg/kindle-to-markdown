const fs = require('node:fs');

const Routes = require('./Routes.js');

const File = {
  /**
   * Creates a folder at the specified path. If the folder does not exist, it will be created.
   *
   * @async
   * @param {object} options - The options for creating the folder.
   * @param {string} [options.folder=""] - The name of the folder to be created (optional).
   * @param {boolean} [options.is_source=false] - Indicates whether the folder is for testing purposes (optional).
   * @returns {Promise<string>} A Promise that resolves to the path of the created folder.
   * @throws {Error} If there's an issue with creating the folder or any other errors during the process.
   *
   * @example
   * // Create a folder named "myFolder" in the default root directory
   * const resultPath = await CreateFolder({ folder: "myFolder" });
   * console.log(`Folder created at: ${resultPath}`);
   *
   * // Create inside the **source folder** a folder named "testFolder"
   * const testPath = await CreateFolder({ folder: "testFolder", is_source: true });
   * console.log(`Testing folder created at: ${testPath}`);
   */
  async CreateFolder({ folder = '', is_source = false }) {
    let wanted_path = `${Routes.root}/${folder}`;
    if (is_source) wanted_path = `${Routes.source}/${folder}`;

    if (!fs.existsSync(wanted_path)) {
      await fs.promises.mkdir(wanted_path, { recursive: true });
    }
    return wanted_path;
  },

  /**
   * Asynchronously saves notes to a JSON file.
   *
   * @async
   * @param {NoteResults} notes - An array of notes or data to be saved to a JSON file.
   * @param {string} [path_file=null] - The file path where the data should be saved. If not provided, a default path is used.
   * @returns {Promise<void>} - A Promise that resolves when the data is successfully saved to the file, or rejects on error.
   *
   * @throws {Error} If there is an issue with writing the data to the file.
   *
   * @example
   * const notesData = [{ id: 1, text: 'Note 1' }, { id: 2, text: 'Note 2' }];
   * await SaveResults(notesData, './data/notes.json');
   */
  async SaveResults(notes, path_file = './data/generic_results.json') {
    if (!notes || notes.length < 1) {
      console.error(`Notes must be extracted - Argument Notes: ${notes?.length}`);
      return;
    }
    await fs.promises.writeFile(path_file, JSON.stringify(notes));
  }
};
module.exports = File;
