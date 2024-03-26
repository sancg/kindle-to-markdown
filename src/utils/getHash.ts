import type { Note } from '@/types/models/book.js';
import crypto from 'node:crypto';

export default function getHash(note: Note) {
  const hash = crypto.createHash('md5');
  const input = `${note.title}${note.content}${note.location}${note.createdAt}`;
  hash.update(input);
  return hash.digest('hex');
}
