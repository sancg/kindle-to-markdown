const Core = require('./utils/Core');
const File = require('./utils/File');
const { clippingFile, tempFile } = require('./utils/Routes');
const testingSource = './data/fullSet.txt';

(async () => {
  // IMPROVE: SyncNote is a function that search the tempFile last Entry and compare it with the new ExtractedNotes
  const { default: SyncNote } = await import('./utils/Sync.mjs');

  const timeStart = performance.now();

  // Perform sync process
  const { parseNotes, parseBooks } = await Core.DataStructure(testingSource);
  const isSync = await SyncNote.SyncEntry(parseNotes);
  console.log({ isSync });
  if (!isSync) {
    /**
     * Creating the tempFile that will detect or last entry.
     * @type {NoteResults}
     */
    const temp = {
      lastEntry: parseNotes[parseNotes.length - 1],
      totalBooks: parseBooks.length,
      highlightCount: parseNotes.length
    };

    await Core.formatNoteToMD(parseBooks);
    await File.SaveResults(temp, tempFile);
  }

  const timeEnd = performance.now();
  const secondsElapse = (timeEnd - timeStart) / 1000;
  console.log(`\x1b[32m All books extracted\x1b[0m => ${secondsElapse.toFixed(4)} seconds.`);
})();
