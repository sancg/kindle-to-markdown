// export enum NoteType {
//   HIGHLIGHT = 'highlight',
//   NOTE = 'note',
//   BOOKMARK = 'bookmark'
// }
type NoteType = 'highlight' | 'note' | 'bookmark';

export interface Note {
  title: string;
  author: string;
  content: string;
  noteType: NoteType;
  location?: string;
  date?: string;
}

export interface Book {
  bookTitle: string;
  collection: Note[];
}
