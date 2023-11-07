const path = require('node:path');

const Core = require('./utils/Core');

const clippingFile = path.join(__dirname, './data/My Clippings.txt');

(async () => {
  // TODO: Sync file -> It must be a function to search into the core.json the last entry
  // as a reference point to Sync the new entries.

  // Structuring Notes from the Clipping.txt --------------->
  const timeStart = performance.now();
  const books = await Core.DataStructure(clippingFile);
  await Core.formatNoteToMD(books);
  const timeEnd = performance.now();
  const secondsElapse = (timeEnd - timeStart) / 1000;
  console.log(`\x1b[32m All books extracted\x1b[0m => ${secondsElapse.toFixed(4)} seconds.`);
})();
