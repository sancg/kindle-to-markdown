import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { ArrayToMd } from '../utils/Core';
import Routes from '../utils/Routes';

describe('Format Notes to text', async () => {
  const mockData = [
    {
      book: 'Dive into Refactoring',
      annotations: [
        {
          reference:
            'Your Highlight on page 6-6 | Added on Wednesday, April 5, 2023 2:54:05 AM',
          highlight:
            'Therefore, it is necessary to get rid of code smells while they are still small.'
        },
        {
          reference: 'Your Highlight on page 6-6 | Added on Monday, May 1, 2023 1:33:28 AM',
          highlight: 'Code smells'
        }
      ]
    }
  ];

  await ArrayToMd(mockData);
  // Test the folder created at the start of the function
  const absolutePath = path.join(Routes.source, 'Notes');

  it('Should have a folder to store the files', () => {
    expect(fs.existsSync(absolutePath)).toBe(true);
  });

  it('Note folder should has files with .md', () => {
    const files = fs.readdirSync(absolutePath).filter((f) => f.includes('.md')) ?? null;
    expect(files.length).toBeGreaterThan(0);
  });
});
