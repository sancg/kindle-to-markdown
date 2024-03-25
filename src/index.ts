import fs from 'node:fs/promises';
import { Note, NoteType } from '../types/models/book.d.js';
import dateConversion from './utils/dateConversion.js';

function isNoteType(value: string): value is NoteType {
  const supportedPatterns: Record<string, RegExp> = {
    Spanish: /nota|resaltado|marca/i,
    English: /note|highlight|bookmark/i
  };

  const languages = Object.keys(supportedPatterns);
  for (const lang of languages) {
    if (supportedPatterns[lang].test(value)) {
      return true;
    }
  }

  return false;
}

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
        const isNoteType = location.match(this.supportPattern)?.[0];
        if (isNoteType) {
          let findDate = location
            .split(/added on/i)
            .pop()
            ?.trim();
          if (findDate) {
            findDate = dateConversion(findDate);
          }

          return {
            title: title?.trim(),
            author: '',
            noteType: isNoteType as NoteType,
            content: content?.replace(/\s+/g, ' '),
            location: location
              .match(/page.*(?=\|)/)?.[0]
              ?.replace(' | ', '; ')
              ?.trim(),
            date: findDate
          } satisfies Note;
        }
      })
      .filter(Boolean);

    return extractedNotes as Note[];
  }
}
