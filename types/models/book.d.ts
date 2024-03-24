export enum NoteType {
  HIGHLIGHT = 'highligh',
  NOTE = 'note',
  BOOKMARK = 'bookmark'
}

export interface Note {
  title: string;
  author: string;
  reference: NoteType;
  location?: string;
  date: Date;
}

export interface Book {
  bookTitle: string;
  collection: Note[];
}
