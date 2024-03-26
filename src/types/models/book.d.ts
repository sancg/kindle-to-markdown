type LanguageNoteType = {
  Spanish: 'nota' | 'resaltado' | 'marca';
  English: 'note' | 'highlight' | 'bookmark';
  // Add more languages as needed
};

type NoteType = LanguageNoteType[keyof LanguageNoteType];

export interface Note {
  id: string;
  title: string;
  author: string;
  content: string;
  noteType: NoteType;
  location?: string;
  createdAt?: string;
}

export interface Book {
  bookTitle: string;
  bookAuthor: string;
  collection: Omit<Note, 'title' | 'author'>[];
}
