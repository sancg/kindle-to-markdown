import fs from 'node:fs/promises';
import { Note, NoteType } from '../types/models/book.d.js';
export class Core {
  private fileLastEntry = 'checkLastEntry.json';
  private fileGroupBook = 'groupBooks.json';
  private splitPattern = '==========';
  private clippingPath: string;

  constructor(clippingPath: string) {
    this.clippingPath = clippingPath;
  }

  async DataStructure(rawText: string): Promise<Note[]> {
    //const raw_text = await fs.readFile(clippingPath, 'utf8');
    const allNotes = rawText.split(this.splitPattern);
    const extractedNotes: Note[] = allNotes.map((item) => {
      const note: Note = {
        title: '',
        author: '',
        date: new Date(),
        reference: NoteType.HIGHLIGHT
      };
      /*
        As it gets a raw_text it will leave a trace of unwanted spaces
        A carriage return moved your carriage all the way to the right 
        so you were typing at the start of the line. 
     */

      return note;
    });
    return extractedNotes;
  }
}
