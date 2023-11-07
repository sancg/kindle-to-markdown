import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { formatNoteToMD } from '../utils/Core';
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
    },
    {
      book: "You Don't Know JS: This & Object Prototypes",
      author: 'Kyle Simpson',
      annotations: [
        {
          reference:
            'Your Highlight on page 2 | Location 27-28 | Added on Thursday, April 6, 2023 1:28:09 AM',
          highlight:
            'Explore how the this binding points to objects based on how the function is cal ed'
        },
        {
          reference:
            'Your Note on page 2 | Location 28 | Added on Thursday, April 6, 2023 1:28:55 AM',
          note: '[[key aspects of the book]]'
        },
        {
          reference:
            'Your Highlight on page 2 | Location 29-29 | Added on Thursday, April 6, 2023 1:29:10 AM',
          highlight: 'Look into the nature of JS objects and why you’d need to point to them'
        },
        {
          reference:
            'Your Highlight on page 2 | Location 30-30 | Added on Thursday, April 6, 2023 1:29:17 AM',
          highlight: 'Learn how developers use the mixin pattern to fake classes in JS'
        },
        {
          reference:
            'Your Highlight on page 3 | Location 35-36 | Added on Thursday, April 6, 2023 1:29:26 AM',
          highlight: 'Examine how JS’s prototype mechanism forms links between objects T PR'
        },
        {
          reference:
            'Your Highlight on page 3 | Location 36-37 | Added on Thursday, April 6, 2023 1:29:38 AM',
          highlight: 'Learn how to move from class/inheritance design to behavior delegation O'
        },
        {
          reference:
            'Your Highlight on page 16 | Location 245-246 | Added on Thursday, April 6, 2023 1:44:43 AM',
          highlight:
            'Because JavaScript can be used without understanding, the understanding of the language is often never attained.'
        },
        {
          reference:
            'Your Highlight on page 24 | Location 355-356 | Added on Thursday, April 6, 2023 1:52:36 AM',
          highlight: 'CHAPTER 1 this or That?'
        },
        {
          reference:
            'Your Note on page 24 | Location 356 | Added on Thursday, April 6, 2023 1:52:49 AM',
          note: '.h2'
        },
        {
          reference:
            'Your Highlight on page 24 | Location 358-359 | Added on Thursday, April 6, 2023 1:53:22 AM',
          highlight:
            'Any sufficiently  advanced technology is indistinguishable from magic. — Arthur C. Clarke'
        }
      ]
    },
    {
      book: 'Learn Three.js: Program 3D animations and visualizations for the web with JavaScript and WebGL, 4th Edition',
      author: 'Dirksen, Jos',
      annotations: [
        {
          reference:
            'Your Highlight on page 33 | Location 435-436 | Added on Sunday, April 23, 2023 2:09:56 AM',
          highlight: 'Part 1: Getting Up and Running'
        },
        {
          reference:
            'Your Note on page 33 | Location 436 | Added on Sunday, April 23, 2023 2:10:09 AM',
          note: '.h2'
        }
      ]
    }
  ];

  await formatNoteToMD(mockData);
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
