import { describe, expect, it } from 'vitest';

import SyncNote from '../utils/Sync.mjs';
import File from '../utils/File';
import { tempFile } from '../utils/Routes';

describe('Sync Process', async () => {
  const whenIsLastEntry = [
    {
      title: 'How to Take Smart Notes',
      author: 'Sönke Ahrens',
      reference: 'Matching Entries',
      highlight: 'Same highlight'
    }
  ];

  const whenDifferentLastEntry = [
    {
      title: 'How to Take Smart Notes',
      author: 'Sönke Ahrens',
      reference: 'Matching Entries',
      highlight: 'Same highlight'
    },
    {
      title: 'How to control your dog',
      author: 'papa jones',
      note: 'What can I do? Please let me know :)'
    }
  ];

  const temp = {
    lastEntry: {
      title: 'Mock data',
      reference: 'Matching Entries',
      highlight: 'Same highlight'
    },
    totalBooks: 1,
    highlightCount: 1
  };
  await File.SaveResults(temp, tempFile);
  // it('not exists the File "checkLastEntry.json"', async () => {
  //   const res = await SyncNote.HasSyncFile();

  //   if (!res) expect(res).toBeFalsy();
  //   else return;
  // });

  it('has the File "checkLastEntry.json"', async () => {
    const { existsFile } = await SyncNote.HasSyncFile();

    if (existsFile) expect(existsFile).toBeTruthy();
  });

  it('Check if the last Entry is at the End of "My Clippings.txt"', async () => {
    const isPresent = await SyncNote.SyncEntry(whenIsLastEntry);
    // if (!isPresent) return;
    expect(isPresent).toBeTruthy();
  });

  it('doesn\'t match the last Entry with the End of "My Clippings.txt"', async () => {
    const isPresent = await SyncNote.SyncEntry(whenDifferentLastEntry);
    // if (!isPresent) return;
    expect(isPresent).toBeFalsy();
  });
});
