// import fs from 'node:fs/promises';
import dateConversion from './utils/dateConversion.js';
import type { Note, NoteType } from '@/types/models/book.js';
import getHash from './utils/getHash.js';

export class Core {
  fileLastEntry = 'checkLastEntry.json';
  fileGroupBook = 'groupBooks.json';
  private splitPattern = '==========';
  private supportPattern =
    /(?<Spanish>nota|resaltado|marca)|(?<English>note|highlight|bookmark)/gi;
  private clippingPath: string;

  constructor(clippingPath: string) {
    this.clippingPath = clippingPath;
  }

  async DataStructure(rawText: string): Promise<Note[] | null> {
    if (!rawText) return null;
    //const raw_text = await fs.readFile(clippingPath, 'utf8');
    const allNotes = rawText.split(this.splitPattern);
    const extractedNotes = allNotes
      .map((item) => {
        /*
          As it gets a raw_text it will leave a trace of unwanted spaces
          A carriage return moved your carriage all the way to the right 
          so you were typing at the start of the line. 
        */
        const cleanNote = item.replace(/\\r+|\r/g, '').trim();
        const [title, location, content] = cleanNote
          .split(/\n+/)
          .filter((item) => item?.trim());
        if (!title) return null;

        // Match the note types in the file content
        const isNoteType = location?.match(this.supportPattern)?.[0];
        if (isNoteType) {
          const findDate = location
            .split(/added on/i)
            .pop()
            ?.trim();
          const note: Note = {
            id: '',
            title: title?.trim(),
            author: '',
            noteType: isNoteType as NoteType,
            content: content?.replace(/\s+/g, ' '),
            location: location
              .match(/page.*(?=\|)/)?.[0]
              ?.replace(' | ', '; ')
              ?.trim(),
            createdAt: findDate ? dateConversion(findDate) : undefined
          };
          note.id = getHash(note);
          return note;
        }
      })
      .filter(Boolean);

    return !extractedNotes.length ? null : (extractedNotes as Note[]);
  }
}
