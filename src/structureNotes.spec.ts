import { readFile } from 'node:fs/promises';

import { describe, beforeEach, expect, it } from 'vitest';
import { Core } from './index.js';
import { Note } from './types/models/book.js';

const core = new Core('');

describe('the clipping.txt structure', async () => {
  let mockData: string;
  let result: Note[] | null;
  beforeEach(async () => {
    mockData = await readFile('./data/NoteTest.txt', 'utf8');
    result = await core.DataStructure(mockData);
    // console.log(result);
  });

  it('should be an array', () => {
    expect(Array.isArray(result)).toBeTruthy();
  });

  // TODO: Create a scenario where the title, noteType and Content is generated separately and then cross check if it is what the DataStructure function give us
  it('should match the title, noteType and content of first note', () => {
    if (result) {
      expect(result[0].title).toBe('Dive into Refactoring');
      expect(result[0].noteType).toBe('Highlight');
      expect(result[0].content).toBe(
        'Therefore, it is necessary to get rid of code smells while they are still small.'
      );
      expect(result[0].location).toBe('page 6-6');
    }
  });
});
