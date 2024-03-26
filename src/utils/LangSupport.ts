import type { NoteType } from 'src/types/models/book.js';

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
