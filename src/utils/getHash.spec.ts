import { readFile, writeFile } from 'node:fs/promises';
import { describe, beforeEach, expect, it } from 'vitest';
import { Core } from '../index.js';
import { Note } from '../types/models/book.js';

describe('how to identify a note', async () => {
  let mockData: string;
  let note: Note[] | null;
  beforeEach(async () => {
    mockData = await readFile('./data/My Clippings.txt', 'utf8');
    note = await new Core('').DataStructure(mockData);
    // console.log(note);
  });
  it('should have a hash', () => {
    // Hash method used md5 with crypto.createHash()
    if (note) {
      note.forEach((item) => expect(item.id).toBeTruthy());
    }
  });

  it('has unique IDs', async () => {
    // Extract all ID values from the array of objects
    if (note) {
      await writeFile('src/bookResults/test.json', JSON.stringify(note), {
        encoding: 'utf8'
      });
      const ids = note.map((obj) => obj.id);
      // Filter out unique IDs
      const uniqueIds = new Set(ids);
      // Find duplicate IDs
      const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
      console.log('Duplicate IDs:', duplicateIds);

      // Assert that there are duplicate IDs
      expect(uniqueIds.size).toEqual(ids.length);
    }
  });
});
