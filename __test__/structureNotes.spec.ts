import fs from 'node:fs/promises';

import { describe, beforeEach, expect, it } from 'vitest';
import { Core } from '../src/index.ts';
import { Note } from '../types/models/book';

const core = new Core('');

describe('the clipping.txt structure', async () => {
  let mockData: string;
  let result: Note[] | null;
  beforeEach(async () => {
    mockData = await fs.readFile('./__test__/NoteTest.txt', 'utf8');
    result = await core.DataStructure(mockData);
  });

  it('should be an array', () => {
    expect(Array.isArray(result)).toBeTruthy();
  });

  it('should match the values of first note', async () => {
    if (result) {
      expect(result[0].title).toBe('Dive into Refactoring');
      expect(result[0].noteType).toBe('Highlight');
      expect(result[0].content).toBe(
        'Therefore, it is necessary to get rid of code smells while they are still small.'
      );
      expect(result[0].location).toBe('page 6-6');
      expect(result[0].date).toBe('04/05/2023, 02:54');
    }
  });
});
