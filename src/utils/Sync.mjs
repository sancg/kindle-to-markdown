import fs from 'node:fs/promises';

import Routes from './Routes.js';

const SyncNote = {
  HasSyncFile: async function (processPath = Routes.tempFile) {
    let existsFile;
    try {
      await fs.access(processPath);
      existsFile = true;
    } catch (error) {
      existsFile = false;
    }

    return { existsFile, processPath };
  },

  /**
   *
   * @param {ExtractedNotes} currentNotes
   * @param {*} clippingFile
   * @returns
   */
  SyncEntry: async function (currentNotes) {
    const { existsFile, processPath } = await this.HasSyncFile();
    if (!existsFile) return false;

    try {
      let foundIndex;

      /**
       * @type {NoteResults}
       */
      const prevCore = JSON.parse(await fs.readFile(processPath, 'utf8'));

      const lastPrevEntry = prevCore.lastEntry;
      const lastCurrentEntry = currentNotes.length - 1;

      // Finding match by Highlight or Note
      if (lastPrevEntry['highlight']) {
        foundIndex = currentNotes.findIndex((n) => {
          const matchHigh = n.highlight === lastPrevEntry.highlight;
          const matchRef = n.reference === lastPrevEntry.reference;
          return matchHigh && matchRef;
        });
      } else {
        foundIndex = currentNotes.findIndex((n) => {
          const matchNote = n.note === lastPrevEntry.note;
          const matchRef = n.reference == lastPrevEntry.reference;

          return matchNote && matchRef;
        });
      }

      console.log({ lastPrevEntry, lastCurrentEntry, foundIndex });
      if (foundIndex === lastCurrentEntry) {
        console.info('Already Sync');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('\x1b[33mProcessed file cannot be access\x1b[0m');
      console.log(error);
      // process.exit(1);
    }
  }
};

export default SyncNote;
